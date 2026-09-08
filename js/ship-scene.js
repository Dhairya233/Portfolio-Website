/**
 * 3D hero scene: a low-poly ship riding an animated ocean, built with
 * Three.js primitives (no external models/textures, so nothing can 404).
 * Self-contained — safe to delete this file and its <script> tag/canvas
 * in index.html if a future edit wants a flat hero instead; nothing else
 * depends on it.
 */
(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const heroEl = document.getElementById("hero");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x061826, 0.028);

  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
  camera.position.set(0, 6.2, 16);
  camera.lookAt(0, 1.2, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function sizeRenderer() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  sizeRenderer();

  /* ---------------- lighting ---------------- */
  const hemi = new THREE.HemisphereLight(0x9fd8e0, 0x0a2b40, 0.9);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe9b3, 1.1);
  sun.position.set(-8, 12, 6);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x2fa4a0, 0.5);
  rim.position.set(6, 4, -8);
  scene.add(rim);

  /* ---------------- ocean ---------------- */
  const oceanGeo = new THREE.PlaneGeometry(220, 220, 90, 90);
  oceanGeo.rotateX(-Math.PI / 2);
  const basePositions = oceanGeo.attributes.position.array.slice();

  const oceanMat = new THREE.MeshPhongMaterial({
    color: 0x104a5c,
    emissive: 0x06232f,
    shininess: 60,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  ocean.position.y = -0.4;
  scene.add(ocean);

  /* ---------------- low-poly ship ---------------- */
  const ship = new THREE.Group();

  const hullMat = new THREE.MeshPhongMaterial({ color: 0x5a3a26, flatShading: true });
  const deckMat = new THREE.MeshPhongMaterial({ color: 0x7a5636, flatShading: true });
  const sailMat = new THREE.MeshPhongMaterial({ color: 0xede0be, side: THREE.DoubleSide, flatShading: true });
  const goldMat = new THREE.MeshPhongMaterial({ color: 0xc79a44, flatShading: true });

  // hull: a stretched, tapered box built from a lathe-like shape
  const hullShape = new THREE.Shape();
  hullShape.moveTo(-1, 0);
  hullShape.lineTo(1, 0);
  hullShape.lineTo(0.7, -0.6);
  hullShape.lineTo(-0.7, -0.6);
  hullShape.closePath();
  const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 4.4, bevelEnabled: false, curveSegments: 1 });
  hullGeo.rotateY(Math.PI / 2);
  hullGeo.translate(-2.2, 0.6, -1);
  hullGeo.scale(1, 1, 1.05);
  const hull = new THREE.Mesh(hullGeo, hullMat);
  ship.add(hull);

  const deckGeo = new THREE.BoxGeometry(4.2, 0.12, 1.7);
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.position.y = 0.66;
  ship.add(deck);

  // bow/stern accents
  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1, 4), goldMat);
  bow.rotation.z = Math.PI / 2;
  bow.rotation.y = Math.PI / 4;
  bow.position.set(2.25, 0.55, 0);
  ship.add(bow);

  // mast
  const mastGeo = new THREE.CylinderGeometry(0.05, 0.07, 3.4, 6);
  const mast = new THREE.Mesh(mastGeo, deckMat);
  mast.position.set(-0.3, 2.3, 0);
  ship.add(mast);

  const crossGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6);
  const cross = new THREE.Mesh(crossGeo, deckMat);
  cross.rotation.z = Math.PI / 2;
  cross.position.set(-0.3, 3.5, 0);
  ship.add(cross);

  // sail — subtly curved via a shape with a bulge
  const sailShape = new THREE.Shape();
  sailShape.moveTo(0, 0);
  sailShape.quadraticCurveTo(0.9, 0.9, 0, 1.9);
  sailShape.lineTo(-0.05, 1.9);
  sailShape.quadraticCurveTo(0.55, 0.9, -0.05, 0);
  sailShape.closePath();
  const sailGeo = new THREE.ExtrudeGeometry(sailShape, { depth: 0.02, bevelEnabled: false });
  const sail = new THREE.Mesh(sailGeo, sailMat);
  sail.position.set(-0.3, 1.75, 0);
  sail.rotation.y = Math.PI / 2;
  ship.add(sail);

  // flag
  const flagGeo = new THREE.PlaneGeometry(0.55, 0.32, 4, 2);
  const flag = new THREE.Mesh(flagGeo, goldMat);
  flag.position.set(-0.3, 4.05, 0.28);
  flag.rotation.y = Math.PI / 2;
  ship.add(flag);
  const flagBase = flagGeo.attributes.position.array.slice();

  ship.position.set(0.6, 0, 0);
  ship.rotation.y = -0.18;
  scene.add(ship);

  /* ---------------- interaction: gentle parallax ---------------- */
  let mouseX = 0, mouseY = 0;
  window.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* ---------------- render loop ---------------- */
  let running = true;
  if ("IntersectionObserver" in window && heroEl) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (running = entry.isIntersecting));
    }, { threshold: 0.01 });
    io.observe(heroEl);
  }

  const clock = new THREE.Clock();
  const posAttr = oceanGeo.attributes.position;

  function animate() {
    requestAnimationFrame(animate);
    if (!running) return;

    const t = clock.getElapsedTime();

    if (!prefersReduced) {
      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3;
        const x = basePositions[ix];
        const z = basePositions[ix + 2];
        posAttr.array[ix + 1] =
          Math.sin(x * 0.18 + t * 0.9) * 0.35 +
          Math.cos(z * 0.22 + t * 0.7) * 0.28;
      }
      posAttr.needsUpdate = true;
      oceanGeo.computeVertexNormals();

      const shipWaveY =
        Math.sin(ship.position.x * 0.18 + t * 0.9) * 0.35 +
        Math.cos(0 * 0.22 + t * 0.7) * 0.28;
      ship.position.y = shipWaveY + 0.15;
      ship.rotation.z = Math.sin(t * 0.6) * 0.045;
      ship.rotation.x = Math.cos(t * 0.5) * 0.03 - 0.02;

      const flagArr = flagGeo.attributes.position.array;
      for (let i = 0; i < flagArr.length / 3; i++) {
        const ix = i * 3;
        const baseX = flagBase[ix];
        if (baseX > 0.01) {
          flagArr[ix + 2] = Math.sin(t * 6 + baseX * 6) * 0.08 * baseX;
        }
      }
      flagGeo.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.02;
      camera.position.y += (6.2 - mouseY * 0.6 - camera.position.y) * 0.02;
      camera.lookAt(0.6, 1.1, 0);
    }

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", sizeRenderer);
})();
