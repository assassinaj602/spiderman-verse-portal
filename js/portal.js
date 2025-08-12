// Portal Animation System
const PortalSystem = {
    portal: null,
    portalMaterial: null,
    isActive: false,
    animationMixer: null,

    async init() {
        await this.createPortal();
        this.setupInteractions();
    },

    async createPortal() {
        // Create portal geometry
        const portalGeometry = new THREE.TorusGeometry(5, 1, 16, 100);
        
        // Load or create chromatic aberration shader
        const fragmentShader = await this.getChromaticAberrationShader();
        const vertexShader = await this.getVertexShader();

        // Create portal material with shader
        this.portalMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                aberrationStrength: { value: 0.01 },
                glitchIntensity: { value: 0.0 },
                portalColor: { value: new THREE.Color(0x00ffff) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        // Create portal mesh
        this.portal = new THREE.Mesh(portalGeometry, this.portalMaterial);
        this.portal.position.set(0, 0, 0);
        
        // Add portal to scene
        MainApp.scene.add(this.portal);

        // Create inner portal ring
        const innerGeometry = new THREE.TorusGeometry(4, 0.5, 8, 50);
        const innerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const innerPortal = new THREE.Mesh(innerGeometry, innerMaterial);
        this.portal.add(innerPortal);

        // Create portal energy particles
        this.createPortalParticles();

        // Start initial animation
        this.animatePortal();
    },

    createPortalParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 3;
            
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            velocities[i * 3] = Math.cos(angle) * 0.01;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = Math.sin(angle) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 3,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const portalParticles = new THREE.Points(geometry, material);
        this.portal.add(portalParticles);

        // Store reference for animation
        this.portalParticles = portalParticles;
    },

    animatePortal() {
        const animate = () => {
            if (!this.portal) return;

            const time = Date.now() * 0.001;

            // Update shader uniforms
            if (this.portalMaterial && this.portalMaterial.uniforms) {
                this.portalMaterial.uniforms.time.value = time;
            }

            // Rotate portal
            this.portal.rotation.z = time * 0.5;

            // Animate portal particles
            if (this.portalParticles) {
                const positions = this.portalParticles.geometry.attributes.position.array;
                const velocities = this.portalParticles.geometry.attributes.velocity.array;

                for (let i = 0; i < positions.length; i += 3) {
                    // Spiral motion
                    const angle = time + i * 0.1;
                    const radius = 3 + Math.sin(time + i * 0.01) * 1.5;
                    
                    positions[i] = Math.cos(angle) * radius;
                    positions[i + 2] = Math.sin(angle) * radius;
                }

                this.portalParticles.geometry.attributes.position.needsUpdate = true;
            }

            requestAnimationFrame(animate);
        };

        animate();
    },

    setupInteractions() {
        const portalElement = document.getElementById('portal-canvas');
        
        portalElement.addEventListener('mouseenter', () => {
            this.activatePortal();
        });

        portalElement.addEventListener('mouseleave', () => {
            this.deactivatePortal();
        });

        portalElement.addEventListener('click', () => {
            this.pulsePortal();
        });
    },

    activatePortal() {
        if (this.isActive) return;
        this.isActive = true;

        // GSAP animation for portal activation
        gsap.to(this.portal.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.5,
            ease: "power2.out"
        });

        if (this.portalMaterial && this.portalMaterial.uniforms) {
            gsap.to(this.portalMaterial.uniforms.glitchIntensity, {
                value: 0.5,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        // Play portal sound
        Utils.playAudio('portal-sound', 0.3);
    },

    deactivatePortal() {
        if (!this.isActive) return;
        this.isActive = false;

        gsap.to(this.portal.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        if (this.portalMaterial && this.portalMaterial.uniforms) {
            gsap.to(this.portalMaterial.uniforms.glitchIntensity, {
                value: 0.0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    },

    pulsePortal() {
        // Create a pulsing effect
        gsap.timeline()
            .to(this.portal.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 0.2,
                ease: "power2.out"
            })
            .to(this.portal.scale, {
                x: this.isActive ? 1.2 : 1,
                y: this.isActive ? 1.2 : 1,
                z: this.isActive ? 1.2 : 1,
                duration: 0.3,
                ease: "back.out(4)"
            });

        // Trigger glitch effect
        GlitchSystem.triggerGlitch();
        Utils.playAudio('whoosh-sound', 0.4);
    },

    changePortalColor(color) {
        if (this.portalMaterial && this.portalMaterial.uniforms) {
            gsap.to(this.portalMaterial.uniforms.portalColor.value, {
                r: color.r,
                g: color.g,
                b: color.b,
                duration: 1,
                ease: "power2.out"
            });
        }
    },

    async getChromaticAberrationShader() {
        // Try to load from file, fallback to inline shader
        try {
            return await Utils.loadShader('assets/shaders/chromatic_aberration.frag');
        } catch (error) {
            // Fallback chromatic aberration shader
            return `
                uniform float time;
                uniform float aberrationStrength;
                uniform float glitchIntensity;
                uniform vec3 portalColor;
                
                varying vec2 vUv;
                
                void main() {
                    vec2 uv = vUv;
                    
                    // Create swirling UV offset
                    float angle = time * 2.0 + length(uv - 0.5) * 10.0;
                    vec2 offset = vec2(cos(angle), sin(angle)) * aberrationStrength;
                    
                    // Chromatic aberration
                    float r = sin(time + uv.x * 10.0) * 0.5 + 0.5;
                    float g = sin(time + uv.y * 10.0 + 2.0) * 0.5 + 0.5;
                    float b = sin(time + length(uv - 0.5) * 10.0 + 4.0) * 0.5 + 0.5;
                    
                    vec3 color = vec3(r, g, b) * portalColor;
                    
                    // Add glitch effect
                    if (glitchIntensity > 0.0) {
                        float glitch = sin(time * 50.0 + uv.y * 100.0) * glitchIntensity;
                        color += vec3(glitch);
                    }
                    
                    // Fade edges
                    float dist = length(uv - 0.5);
                    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `;
        }
    },

    async getVertexShader() {
        return `
            varying vec2 vUv;
            
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
    }
};
