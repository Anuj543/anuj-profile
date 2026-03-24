// ============================================
// THREE.JS INTEGRATION - ADVANCED 3D MODELS
// ============================================

let scene, camera, renderer, cube, particles;

function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // Get canvas container
    const container = document.getElementById('canvas-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create camera
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create rotating cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        emissive: 0x1e3a8a,
        shininess: 100,
        wireframe: false
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Create particle system
    createParticleSystem();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xa855f7, 1);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Mouse tracking for 3D interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Animate cube
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.008;

        // Mouse following effect
        camera.position.x = mouseX * 2;
        camera.position.y = mouseY * 2;
        camera.lookAt(scene.position);

        // Animate particles
        if (particles) {
            particles.rotation.x += 0.0002;
            particles.rotation.y += 0.0005;

            // Glow effect on particles
            particles.material.emissive.setHSL(
                (Date.now() * 0.0001) % 1,
                0.8,
                0.3
            );
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

function createParticleSystem() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;

        // Colors (gradient from blue to purple to pink)
        const hue = (i / (particleCount * 3)) * 0.3 + 0.5;
        const color = new THREE.Color().setHSL(hue, 1, 0.6);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        vertexColors: true,
        size: 0.02,
        sizeAttenuation: true,
        emissive: 0x3b82f6,
        transparent: true,
        opacity: 0.4
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// ============================================
// ABOUT SECTION 3D CANVAS
// ============================================

let aboutScene, aboutCamera, aboutRenderer, floatingOrbs;

function createAbout3DCanvas() {
    const container = document.getElementById('about-canvas');
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    aboutScene = new THREE.Scene();
    aboutScene.background = null;

    aboutCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    aboutCamera.position.z = 6;

    aboutRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    aboutRenderer.setSize(width, height);
    aboutRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(aboutRenderer.domElement);

    // Create floating orbs
    createFloatingOrbs();

    // Lighting for about section
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    aboutScene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 0.8);
    pointLight1.position.set(5, 5, 5);
    aboutScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 0.6);
    pointLight2.position.set(-5, -5, 5);
    aboutScene.add(pointLight2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        floatingOrbs.forEach((orb, index) => {
            const speed = 0.0005 + index * 0.0001;
            orb.position.y += Math.sin(Date.now() * speed) * 0.02;
            orb.rotation.x += 0.002;
            orb.rotation.y += 0.003;
        });

        aboutRenderer.render(aboutScene, aboutCamera);
    }

    animate();

    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        aboutCamera.aspect = newWidth / newHeight;
        aboutCamera.updateProjectionMatrix();
        aboutRenderer.setSize(newWidth, newHeight);
    });
}

function createFloatingOrbs() {
    floatingOrbs = [];
    const colors = [0x3b82f6, 0xa855f7, 0xec4899, 0x06b6d4];

    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.IcosahedronGeometry(1, 16);
        const material = new THREE.MeshStandardMaterial({
            color: colors[i],
            metalness: 0.7,
            roughness: 0.2,
            emissive: colors[i],
            emissiveIntensity: 0.3
        });

        const orb = new THREE.Mesh(geometry, material);
        orb.position.set(
            Math.cos(i * Math.PI / 2) * 3,
            Math.sin(i * Math.PI / 2) * 3,
            Math.cos(i * Math.PI / 4) * 2
        );

        aboutScene.add(orb);
        floatingOrbs.push(orb);
    }
}

// ============================================
// PROJECT SHOWCASE 3D EFFECT
// ============================================

function create3DCardEffect() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                rotationX: 5,
                rotationY: -5,
                transformPerspective: 1200,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        // Motion on mouse movement
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotX = (y / rect.height - 0.5) * 20;
            const rotY = (x / rect.width - 0.5) * -20;

            gsap.to(card, {
                rotationX: rotX,
                rotationY: rotY,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

function optimizeForMobile() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        // Reduce particle count on mobile
        if (particles) {
            particles.geometry.attributes.position.array = new Float32Array(300); // Reduced from 1000
        }

        // Disable 3D effects on project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.perspective = 'none';
            card.style.transformStyle = 'unset';
        });
    }
}

// ============================================
// SCROLL-TRIGGERED 3D ANIMATIONS
// ============================================

function setupScroll3DAnimations() {
    ScrollTrigger.create({
        trigger: '#projects',
        onEnter: () => {
            create3DCardEffect();
        }
    });

    ScrollTrigger.create({
        trigger: '#about',
        onEnter: () => {
            createAbout3DCanvas();
        },
        once: true
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js for hero section
    initThreeJS();

    // Setup scroll animations
    setupScroll3DAnimations();

    // Optimize for mobile
    optimizeForMobile();

    // Handle window resize
    window.addEventListener('resize', debounce(optimizeForMobile, 250));
});

// ============================================
// HELPER FUNCTIONS (from main script)
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
