// Glitch Effects System
const GlitchSystem = {
    isGlitching: false,
    glitchOverlay: null,
    composer: null,
    glitchPass: null,

    init() {
        this.setupGlitchOverlay();
        this.setupPostProcessing();
        this.setupGlitchText();
    },

    setupGlitchOverlay() {
        this.glitchOverlay = document.getElementById('glitch-overlay');
    },

    setupPostProcessing() {
        // Setup Three.js post-processing for advanced glitch effects
        if (typeof THREE.EffectComposer !== 'undefined') {
            this.setupAdvancedGlitch();
        }
    },

    setupAdvancedGlitch() {
        // This would require additional Three.js post-processing libraries
        // For now, we'll use simpler CSS-based effects
        console.log('Advanced glitch effects would require Three.js post-processing libraries');
    },

    setupGlitchText() {
        // Add glitch data attributes to text elements
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(element => {
            element.setAttribute('data-text', element.textContent);
        });
    },

    triggerGlitch(duration = 1000) {
        if (this.isGlitching) return;
        this.isGlitching = true;

        // Trigger multiple glitch effects
        this.triggerScreenGlitch(duration);
        this.triggerTextGlitch(duration);
        this.triggerColorGlitch(duration);
        this.triggerScanlineGlitch(duration);

        setTimeout(() => {
            this.isGlitching = false;
        }, duration);
    },

    triggerScreenGlitch(duration) {
        // CSS-based screen glitch effect
        gsap.to(this.glitchOverlay, {
            opacity: 1,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(this.glitchOverlay, {
                    opacity: 0,
                    duration: duration / 1000,
                    ease: "power2.out"
                });
            }
        });

        // Random glitch bursts
        const glitchCount = Math.floor(duration / 100);
        for (let i = 0; i < glitchCount; i++) {
            setTimeout(() => {
                this.createGlitchBurst();
            }, Math.random() * duration);
        }
    },

    createGlitchBurst() {
        const canvas = document.getElementById('portal-canvas');
        
        // Apply random transform
        const transforms = [
            'translateX(5px)',
            'translateX(-5px)',
            'translateY(2px)',
            'translateY(-2px)',
            'skewX(2deg)',
            'skewX(-2deg)'
        ];
        
        const randomTransform = transforms[Math.floor(Math.random() * transforms.length)];
        
        gsap.timeline()
            .to(canvas, {
                transform: randomTransform,
                duration: 0.05,
                ease: "power2.inOut"
            })
            .to(canvas, {
                transform: 'none',
                duration: 0.05,
                ease: "power2.inOut"
            });
    },

    triggerTextGlitch(duration) {
        const glitchTexts = document.querySelectorAll('.glitch-text, .holographic-text');
        
        glitchTexts.forEach((element, index) => {
            setTimeout(() => {
                this.glitchTextElement(element);
            }, index * 100);
        });
    },

    glitchTextElement(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        
        // Create glitch text variations
        const glitchVariations = [];
        for (let i = 0; i < 5; i++) {
            let glitchedText = '';
            for (let j = 0; j < originalText.length; j++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[j];
                }
            }
            glitchVariations.push(glitchedText);
        }

        // Rapidly cycle through variations
        let currentVariation = 0;
        const glitchInterval = setInterval(() => {
            element.textContent = glitchVariations[currentVariation];
            currentVariation = (currentVariation + 1) % glitchVariations.length;
        }, 50);

        // Return to original after 500ms
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, 500);
    },

    triggerColorGlitch(duration) {
        // Glitch the portal colors
        if (PortalSystem.portalMaterial && PortalSystem.portalMaterial.uniforms) {
            const originalColor = PortalSystem.portalMaterial.uniforms.portalColor.value.clone();
            
            const glitchColors = [
                new THREE.Color(0xff0000),
                new THREE.Color(0x00ff00),
                new THREE.Color(0x0000ff),
                new THREE.Color(0xffff00),
                new THREE.Color(0xff00ff)
            ];

            const colorGlitchInterval = setInterval(() => {
                const randomColor = glitchColors[Math.floor(Math.random() * glitchColors.length)];
                PortalSystem.portalMaterial.uniforms.portalColor.value.copy(randomColor);
            }, 100);

            setTimeout(() => {
                clearInterval(colorGlitchInterval);
                PortalSystem.portalMaterial.uniforms.portalColor.value.copy(originalColor);
            }, duration * 0.7);
        }
    },

    triggerScanlineGlitch(duration) {
        // Create animated scanlines
        const scanlineContainer = document.createElement('div');
        scanlineContainer.className = 'fixed inset-0 pointer-events-none z-40';
        scanlineContainer.style.background = `
            repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 2px,
                rgba(255, 255, 255, 0.03) 4px
            )
        `;
        scanlineContainer.style.animation = 'scanlines 0.1s linear infinite';
        
        document.body.appendChild(scanlineContainer);

        // Add scanline animation keyframes
        if (!document.getElementById('scanline-styles')) {
            const style = document.createElement('style');
            style.id = 'scanline-styles';
            style.textContent = `
                @keyframes scanlines {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(4px); }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            document.body.removeChild(scanlineContainer);
        }, duration);
    },

    triggerRGBSplit(intensity = 5, duration = 200) {
        const canvas = document.getElementById('portal-canvas');
        
        // Create RGB split effect using CSS filters
        gsap.timeline()
            .to(canvas, {
                filter: `
                    drop-shadow(${intensity}px 0 0 red) 
                    drop-shadow(-${intensity}px 0 0 cyan)
                `,
                duration: 0.05,
                ease: "power2.inOut"
            })
            .to(canvas, {
                filter: 'none',
                duration: duration / 1000,
                ease: "power2.out"
            });
    },

    triggerDatamosh(element) {
        // Create datamoshing effect on specific elements
        const originalContent = element.innerHTML;
        const moshFrames = [];
        
        // Generate moshed frames
        for (let i = 0; i < 10; i++) {
            let moshedContent = originalContent;
            
            // Randomly duplicate or remove characters
            moshedContent = moshedContent.replace(/(.)/g, (match) => {
                const rand = Math.random();
                if (rand < 0.1) return match + match; // Duplicate
                if (rand < 0.05) return ''; // Remove
                return match;
            });
            
            moshFrames.push(moshedContent);
        }

        // Cycle through moshed frames
        let frameIndex = 0;
        const moshInterval = setInterval(() => {
            element.innerHTML = moshFrames[frameIndex];
            frameIndex = (frameIndex + 1) % moshFrames.length;
        }, 50);

        setTimeout(() => {
            clearInterval(moshInterval);
            element.innerHTML = originalContent;
        }, 500);
    },

    // Shader-based chromatic aberration (for when shaders are loaded)
    applyChromaticAberration(strength = 0.01) {
        if (PortalSystem.portalMaterial && PortalSystem.portalMaterial.uniforms) {
            gsap.to(PortalSystem.portalMaterial.uniforms.aberrationStrength, {
                value: strength,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        }
    },

    // Matrix-style digital rain effect
    createDigitalRain() {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'fixed inset-0 pointer-events-none z-35';
        rainContainer.style.overflow = 'hidden';
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.left = Math.random() * 100 + '%';
            column.style.color = '#00ff00';
            column.style.fontSize = '14px';
            column.style.fontFamily = 'monospace';
            column.style.animation = `matrix-rain ${2 + Math.random() * 3}s linear infinite`;
            column.style.animationDelay = Math.random() * 2 + 's';
            
            let columnText = '';
            for (let j = 0; j < 20; j++) {
                columnText += characters[Math.floor(Math.random() * characters.length)] + '<br>';
            }
            column.innerHTML = columnText;
            
            rainContainer.appendChild(column);
        }

        // Add matrix rain animation
        if (!document.getElementById('matrix-styles')) {
            const style = document.createElement('style');
            style.id = 'matrix-styles';
            style.textContent = `
                @keyframes matrix-rain {
                    0% { transform: translateY(-100vh); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(rainContainer);

        // Remove after animation
        setTimeout(() => {
            if (rainContainer.parentNode) {
                document.body.removeChild(rainContainer);
            }
        }, 5000);
    }
};
