import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Landing3DBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 3, 20);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0); // Transparent canvas on white body
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cherryLight = new THREE.PointLight(0xe11d48, 3.5, 50);
    cherryLight.position.set(0, 6, 8);
    scene.add(cherryLight);

    const secondaryLight = new THREE.PointLight(0xf43f5e, 2.0, 40);
    secondaryLight.position.set(-10, -5, 5);
    scene.add(secondaryLight);

    // 4. Undulating 3D Wave Mesh (Wireframe Lattice)
    const gridWidth = 70;
    const gridDepth = 60;
    const segmentsW = 65;
    const segmentsD = 55;
    const planeGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, segmentsW, segmentsD);
    planeGeo.rotateX(-Math.PI / 2.3);
    planeGeo.translate(0, -6, -8);

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      roughness: 0.3,
      metalness: 0.6
    });

    const waveMesh = new THREE.Mesh(planeGeo, planeMat);
    scene.add(waveMesh);

    // Original positions for wave computation
    const posAttr = planeGeo.attributes.position;
    const origPositions = posAttr.array.slice();

    // 5. Floating 3D Geometric Crystal Shapes (Cherry Theme)
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    const crystalMaterial = new THREE.MeshStandardMaterial({
      color: 0xbe123c,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.65,
      wireframe: false
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });

    const geometries = [
      new THREE.IcosahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TorusGeometry(1.5, 0.35, 16, 40),
      new THREE.IcosahedronGeometry(1.0, 1),
      new THREE.TetrahedronGeometry(1.1, 0)
    ];

    const crystals = [];
    const positions = [
      { x: -14, y: 7, z: 2, scale: 1.1, speed: 0.006 },
      { x: 15, y: 8, z: 1, scale: 1.2, speed: 0.007 },
      { x: -16, y: -2, z: 4, scale: 0.9, speed: 0.005 },
      { x: 16, y: -3, z: 3, scale: 1.0, speed: 0.008 },
      { x: -8, y: 11, z: -4, scale: 0.7, speed: 0.006 },
      { x: 9, y: 12, z: -3, scale: 0.8, speed: 0.005 }
    ];

    positions.forEach((p, idx) => {
      const geo = geometries[idx % geometries.length];
      const mesh = new THREE.Mesh(geo, crystalMaterial.clone());
      const wire = new THREE.Mesh(geo, wireframeMat);
      mesh.add(wire);

      mesh.position.set(p.x, p.y, p.z);
      mesh.scale.setScalar(p.scale);
      mesh.userData = {
        baseY: p.y,
        speed: p.speed,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        offset: Math.random() * Math.PI * 2
      };
      crystalGroup.add(mesh);
      crystals.push(mesh);
    });

    // 6. 3D Particle Constellation / Cherry Stardust
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      particleScales[i] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Circle texture for soft glowing particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(225, 29, 72, 1)');
    grad.addColorStop(0.4, 'rgba(244, 63, 94, 0.6)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.75,
      map: particleTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Interactive Mouse Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      curMouseX += (targetMouseX - curMouseX) * 0.05;
      curMouseY += (targetMouseY - curMouseY) * 0.05;

      // Parallax Camera Sway
      camera.position.x = curMouseX * 3.5;
      camera.position.y = 3 - curMouseY * 2.5;
      camera.lookAt(0, 0, 0);

      // Cherry light tracking
      cherryLight.position.x = curMouseX * 12;
      cherryLight.position.y = 6 - curMouseY * 8;

      // Animate Wave Mesh Vertices
      const posArray = posAttr.array;
      for (let i = 0; i < posAttr.count; i++) {
        const idx = i * 3;
        const origX = origPositions[idx];
        const origY = origPositions[idx + 1];

        // Harmonic 3D wave formula
        const wave =
          Math.sin(origX * 0.25 + elapsedTime * 1.5) * 1.4 +
          Math.cos(origY * 0.2 + elapsedTime * 1.2) * 1.1 +
          Math.sin((origX + origY) * 0.15 + elapsedTime * 0.8) * 0.6;

        posArray[idx + 2] = wave;
      }
      posAttr.needsUpdate = true;

      // Animate Floating Crystals
      crystals.forEach((mesh) => {
        const u = mesh.userData;
        mesh.position.y = u.baseY + Math.sin(elapsedTime * 1.6 + u.offset) * 0.65;
        mesh.rotation.x += u.rotSpeedX;
        mesh.rotation.y += u.rotSpeedY;
        mesh.rotation.z += u.rotSpeedZ;
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize handler
    const onResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      crystalMaterial.dispose();
      wireframeMat.dispose();
      geometries.forEach((g) => g.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.92 }}
    />
  );
};
