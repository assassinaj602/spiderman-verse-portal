// Main Three.js Application
const MainApp = {
    scene: null,
    camera: null,
    renderer: null,
    canvas: null,
    particles: null,
    animationId: null,

    init() {
        this.setupCanvas();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupParticles();
        this.setupLights();
        this.setupEventListeners();
        this.animate();
    },

    setupCanvas() {
        this.canvas = document.getElementById('portal-canvas');
    },

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000428, 1, 1000);
    },

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 15);
    },

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000428, 1);
    },

    setupParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Random positions in space
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

            // Random colors (blue/cyan/purple spectrum)
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i * 3] = 0; // R
                colors[i * 3 + 1] = Math.random(); // G
                colors[i * 3 + 2] = 1; // B
            } else if (colorChoice < 0.66) {
                colors[i * 3] = 0; // R
                colors[i * 3 + 1] = 1; // G
                colors[i * 3 + 2] = 1; // B
            } else {
                colors[i * 3] = Math.random(); // R
                colors[i * 3 + 1] = 0; // G
                colors[i * 3 + 2] = 1; // B
            }

            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    },

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Point lights for atmosphere
        const light1 = new THREE.PointLight(0x00ffff, 1, 100);
        light1.position.set(10, 10, 10);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0xff00ff, 1, 100);
        light2.position.set(-10, -10, 10);
        this.scene.add(light2);
    },

    setupEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Mouse movement for camera parallax
        document.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            gsap.to(this.camera.position, {
                x: mouseX * 2,
                y: mouseY * 2,
                duration: 1,
                ease: "power2.out"
            });
        });
    },

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));

        const time = Date.now() * 0.0005;

        // Animate particles
        if (this.particles) {
            this.particles.rotation.x = time * 0.1;
            this.particles.rotation.y = time * 0.2;
            
            // Animate individual particles
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.01;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    },

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
};

// Utility functions
const Utils = {
    // Load texture with promise
    loadTexture(url) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(url, resolve, undefined, reject);
        });
    },

    // Load shader file
    async loadShader(url) {
        try {
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.warn(`Failed to load shader from ${url}:`, error);
            return '';
        }
    },

    // Play audio with volume control
    playAudio(elementId, volume = 0.5) {
        const audio = document.getElementById(elementId);
        if (audio) {
            audio.volume = volume;
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    },

    // Random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
};
