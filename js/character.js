// Character System for Spider-Verse variants
const CharacterSystem = {
    selectedCharacter: null,
    characters: [],

    init() {
        console.log('CharacterSystem: Initializing...');
        this.setupCharacters();
        this.renderCharacters();
        this.setupInteractions();
        console.log('CharacterSystem: Initialized with', this.characters.length, 'characters');
    },

    setupCharacters() {
        this.characters = [
            {
                id: "amazing",
                name: "Amazing Spider-Man",
                universe: "Earth-616",
                description: "The original web-slinger from Queens, New York. Peter Parker gained his powers from a radioactive spider bite.",
                detailedDescription: "Peter Benjamin Parker was bitten by a radioactive spider during a school field trip to Oscorp. With great power comes great responsibility - a lesson learned from his beloved Uncle Ben. As the Amazing Spider-Man, Peter protects New York City while balancing his life as a photographer and student.",
                color: "#FF0000",
                image: "assets/images/amazing.png",
                detailedImage: "assets/images/amazing2.png",
                powers: ["Web-slinging", "Spider-sense", "Wall-crawling", "Super strength"],
                abilities: ["Proportional strength of a spider", "Enhanced agility and reflexes", "Precognitive spider-sense", "Ability to cling to surfaces", "Genius-level intellect"],
                origin: "Radioactive spider bite at Oscorp Industries",
                firstAppearance: "Amazing Fantasy #15 (1962)"
            },
            {
                id: "2099",
                name: "Spider-Man 2099",
                universe: "Earth-928",
                description: "Miguel O'Hara from the year 2099. A brilliant geneticist who gained spider powers through genetic manipulation.",
                detailedDescription: "Miguel O'Hara is a geneticist working for Alchemax in the year 2099. After being tricked into taking a highly addictive drug, he attempts to cure himself using a genetic procedure that gives him spider-like abilities. His suit is made from unstable molecules and his powers are more advanced than the original Spider-Man.",
                color: "#00AAFF",
                image: "assets/images/2099.png",
                detailedImage: "assets/images/20992.png",
                powers: ["Organic webbing", "Talons", "Fangs", "Enhanced vision"],
                abilities: ["Organic web spinnerets", "Retractable talons", "Venomous fangs", "Enhanced eyesight", "Accelerated healing factor"],
                origin: "Genetic experiment gone wrong at Alchemax Corporation",
                firstAppearance: "Spider-Man 2099 #1 (1992)"
            },
            {
                id: "noir",
                name: "Spider-Man Noir",
                universe: "Earth-90214",
                description: "A dark, gritty version from the 1930s. Peter Parker fights crime in black and white New York.",
                detailedDescription: "In the dark, Depression-era New York of 1933, Peter Parker is bitten by a spider hiding in a stolen artifact. This Spider-Man operates in the shadows, using stealth and detective skills to fight the crime families that rule his city. His world is one of moral ambiguity where justice comes at a price.",
                color: "#666666",
                image: "assets/images/noir.png",
                detailedImage: "assets/images/noir2.png",
                powers: ["Stealth", "Detective skills", "Web-shooters", "Combat training"],
                abilities: ["Expert detective", "Enhanced stealth capabilities", "Mechanical web-shooters", "Hand-to-hand combat expertise", "Investigative skills"],
                origin: "Spider bite during artifact theft investigation",
                firstAppearance: "Spider-Man Noir #1 (2008)"
            },
            {
                id: "gwen",
                name: "Spider-Gwen",
                universe: "Earth-65",
                description: "Gwen Stacy got the spider bite instead of Peter Parker. She's the drummer for the Mary Janes.",
                detailedDescription: "In Earth-65, Gwen Stacy was bitten by the radioactive spider instead of Peter Parker. As Spider-Woman, she struggles with the guilt of being unable to save her best friend Peter, who became the Lizard and died in their final battle. She balances her superhero duties with her passion for drumming in the band 'The Mary Janes'.",
                color: "#FF69B4",
                image: "assets/images/gwen.png",
                detailedImage: "assets/images/gwen2.png",
                powers: ["Ballet training", "Web-slinging", "Spider-sense", "Acrobatics"],
                abilities: ["Enhanced agility from ballet training", "Spider-sense precognition", "Web-slinging abilities", "Acrobatic combat style", "Musical talent"],
                origin: "Radioactive spider bite at a school science demonstration",
                firstAppearance: "Edge of Spider-Verse #2 (2014)"
            },
            {
                id: "miles",
                name: "Miles Morales",
                universe: "Earth-1610",
                description: "The new Spider-Man from Brooklyn. Miles has unique powers that set him apart from other Spider-people.",
                detailedDescription: "Miles Morales is a teenager from Brooklyn who gained spider powers after being bitten by a spider stolen by his uncle Aaron. After the death of his universe's Peter Parker, Miles reluctantly takes up the mantle of Spider-Man. His unique powers include invisibility and bio-electric venom blasts, making him a formidable hero in his own right.",
                color: "#FFD700",
                image: "assets/images/miles.png",
                detailedImage: "assets/images/miles2.png",
                powers: ["Invisibility", "Venom blast", "Web-slinging", "Spider-sense"],
                abilities: ["Camouflage/invisibility", "Bio-electric venom blast", "Enhanced spider abilities", "Multilingual skills", "Street-smart intuition"],
                origin: "Bitten by genetically-modified spider from Oscorp",
                firstAppearance: "Ultimate Fallout #4 (2011)"
            }
        ];
    },

    renderCharacters() {
        console.log('Attempting to render characters...');
        const containerParent = document.querySelector('#character-container');
        console.log('Container parent found:', containerParent);
        
        let container = document.querySelector('#character-container .flex');
        console.log('Container found:', container);
        
        if (!container) {
            console.log('Character container not found, will retry when DOM is ready');
            // Try to create the container if it doesn't exist
            if (containerParent) {
                const flexDiv = document.createElement('div');
                flexDiv.className = 'flex justify-center space-x-4';
                containerParent.appendChild(flexDiv);
                container = flexDiv; // Use the created container instead of recursive call
            } else {
                return;
            }
        }
        
        // Only clear if we have characters to render
        if (this.characters.length > 0) {
            container.innerHTML = '';
        }

        this.characters.forEach((character, index) => {
            console.log(`Creating card for ${character.name}...`);
            const characterCard = this.createCharacterCard(character);
            container.appendChild(characterCard);
            console.log(`Added card for ${character.name}`);

            // Set initial state without animation to prevent fading
            gsap.set(characterCard, {
                opacity: 1,
                y: 0,
                scale: 1
            });
        });

        console.log(`Rendered ${this.characters.length} characters`);
    },

    createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.style.setProperty('--character-color', character.color);
        card.dataset.characterId = character.id;

        card.innerHTML = `
            <div class="character-image-container">
                <div class="image-loader">
                    <div class="loading-spinner"></div>
                </div>
                <img src="${character.image}" 
                     alt="${character.name}" 
                     class="character-image" 
                     onload="this.parentElement.querySelector('.image-loader').style.display='none'; this.style.opacity='1';"
                     onerror="this.style.display='none'; this.parentElement.querySelector('.image-fallback').style.display='flex';">
                <div class="image-fallback" style="display: none;">
                    <div class="fallback-content">
                        <div class="fallback-icon" style="color: ${character.color};">🕷️</div>
                        <div class="fallback-text" style="color: ${character.color};">${character.name}</div>
                    </div>
                </div>
            </div>
            <h3 class="text-lg font-bold text-center mb-2" style="color: ${character.color}">${character.name}</h3>
            <p class="text-sm text-gray-400 text-center mb-2">${character.universe}</p>
            <div class="character-powers text-xs text-center">
                ${character.powers.slice(0, 2).map(power => 
                    `<span class="inline-block bg-gray-800 px-2 py-1 rounded mr-1 mb-1">${power}</span>`
                ).join('')}
            </div>
        `;

        return card;
    },

    addWebAnimation(card) {
        // Simple hover effect
        return;
    },

    getCharacterImage(character) {
        // Check if image exists, otherwise use placeholder
        return character.image;
    },

    createPlaceholderImage(character) {
        // Create a base64 SVG placeholder
        const svg = `
            <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="120" fill="${character.color}" opacity="0.3"/>
                <text x="60" y="60" text-anchor="middle" dy="0.3em" fill="${character.color}" font-family="Arial" font-size="14" font-weight="bold">
                    ${character.name.split(' ').map(word => word[0]).join('')}
                </text>
                <circle cx="60" cy="40" r="20" fill="none" stroke="${character.color}" stroke-width="2" opacity="0.7"/>
                <path d="M40 80 Q60 70 80 80" fill="none" stroke="${character.color}" stroke-width="2" opacity="0.7"/>
            </svg>
        `;
        return btoa(svg);
    },

    setupInteractions() {
        const container = document.querySelector('#character-container');
        
        container.addEventListener('click', (event) => {
            const card = event.target.closest('.character-card');
            if (card) {
                const characterId = card.dataset.characterId;
                this.selectCharacter(characterId);
                
                // Create themed rift when character is selected
                if (window.MultiverseGenerator) {
                    MultiverseGenerator.createThemedRift(characterId);
                }
            }
        });

        container.addEventListener('mouseenter', (event) => {
            const card = event.target.closest('.character-card');
            if (card) {
                const characterId = card.dataset.characterId;
                this.hoverCharacter(characterId);
            }
        }, true);

        container.addEventListener('mouseleave', (event) => {
            const card = event.target.closest('.character-card');
            if (card) {
                this.unhoverCharacter();
            }
        }, true);
    },

    selectCharacter(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        // Remove previous selection
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to current card
        const currentCard = document.querySelector(`[data-character-id="${characterId}"]`);
        currentCard.classList.add('selected');

        this.selectedCharacter = character;

        // Enhanced click animation
        gsap.timeline()
            .to(currentCard, { 
                scale: 1.3, 
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            })
            .to(currentCard, { 
                scale: 1.1, 
                rotation: 0,
                duration: 0.4,
                ease: "back.out(2)"
            });

        // Create and show expanded content panel
        this.showExpandedContent(character);

        // Update portal color
        const portalColor = new THREE.Color(character.color);
        PortalSystem.changePortalColor(portalColor);

        // Trigger multiverse transition effect
        MainApp.triggerMultiverseTransition(character.color);

        // Play selection sound
        Utils.playAudio('whoosh-sound', 0.3);

        // Trigger portal pulse
        PortalSystem.pulsePortal();

        // Add particle effect around selected card
        this.createSelectionParticles(currentCard, character);

        // Add web-shooting effect
        this.createWebShootingEffect(currentCard, character);

        console.log(`Selected character: ${character.name} from ${character.universe}`);
    },

    // Simplified methods - remove complex animations that were causing issues
    createSelectionEffect(card) {
        return;
    },

    createCharacterParticles(character, card) {
        return;
    },

    createSelectionParticles(card, character) {
        // Create floating particles around the selected card
        const rect = card.getBoundingClientRect();
        const particleContainer = document.createElement('div');
        particleContainer.className = 'selection-particles';
        particleContainer.style.position = 'fixed';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1000';
        document.body.appendChild(particleContainer);

        // Create multiple particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${character.color};
                border-radius: 50%;
                box-shadow: 0 0 10px ${character.color};
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;
            particleContainer.appendChild(particle);

            // Animate particle
            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: i * 0.05
            });
        }

        // Remove particle container after animation
        setTimeout(() => {
            document.body.removeChild(particleContainer);
        }, 2000);
    },

    createWebShootingEffect(card, character) {
        // Create web lines shooting out from the character card
        const rect = card.getBoundingClientRect();
        const webContainer = document.createElement('div');
        webContainer.className = 'web-effect';
        webContainer.style.position = 'fixed';
        webContainer.style.pointerEvents = 'none';
        webContainer.style.zIndex = '999';
        webContainer.style.top = '0';
        webContainer.style.left = '0';
        webContainer.style.width = '100%';
        webContainer.style.height = '100%';
        document.body.appendChild(webContainer);

        // Create multiple web lines
        const webLines = 8;
        for (let i = 0; i < webLines; i++) {
            const webLine = document.createElement('div');
            webLine.style.cssText = `
                position: absolute;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: 2px;
                height: 0px;
                background: linear-gradient(to bottom, ${character.color}, transparent);
                transform-origin: top;
                transform: rotate(${(360 / webLines) * i}deg);
                box-shadow: 0 0 5px ${character.color};
            `;
            webContainer.appendChild(webLine);

            // Animate web shooting
            gsap.to(webLine, {
                height: Math.random() * 300 + 200,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.05
            });

            // Fade out
            gsap.to(webLine, {
                opacity: 0,
                duration: 0.5,
                delay: 0.8 + (i * 0.05)
            });
        }

        // Remove web container after animation
        setTimeout(() => {
            document.body.removeChild(webContainer);
        }, 2500);
    },

    showExpandedContent(character) {
        // Remove any existing expanded content
        const existingPanel = document.querySelector('.expanded-character-panel');
        if (existingPanel) {
            gsap.to(existingPanel, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => existingPanel.remove()
            });
        }

        // Check if mobile/tablet for responsive layout
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

        // Create expanded content panel
        const panel = document.createElement('div');
        panel.className = 'expanded-character-panel';
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            width: ${isMobile ? '95%' : isTablet ? '90%' : '90%'};
            max-width: ${isMobile ? 'none' : isTablet ? '650px' : '800px'};
            max-height: ${isMobile ? '90vh' : '85vh'};
            background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 40, 40, 0.95));
            border: 2px solid ${character.color};
            border-radius: ${isMobile ? '15px' : '20px'};
            padding: ${isMobile ? '15px' : isTablet ? '20px' : '30px'};
            z-index: 10000;
            opacity: 0;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 50px ${character.color}40;
            overflow-y: auto;
        `;

        const gridCols = isMobile ? '1fr' : '1fr 1fr';
        const gridGap = isMobile ? '20px' : '30px';
        const imageHeight = isMobile ? '250px' : isTablet ? '300px' : '400px';
        const titleSize = isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem';

        panel.innerHTML = `
            <button class="close-panel" style="
                position: absolute;
                top: ${isMobile ? '10px' : '15px'};
                right: ${isMobile ? '10px' : '15px'};
                background: none;
                border: none;
                color: ${character.color};
                font-size: ${isMobile ? '20px' : '24px'};
                cursor: pointer;
                width: ${isMobile ? '25px' : '30px'};
                height: ${isMobile ? '25px' : '30px'};
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
                z-index: 10001;
            " onmouseover="this.style.background='${character.color}20'" onmouseout="this.style.background='none'">×</button>
            
            <div style="display: grid; grid-template-columns: ${gridCols}; gap: ${gridGap}; align-items: start;">
                <div class="character-details">
                    <h2 style="color: ${character.color}; margin-bottom: 10px; font-size: ${titleSize}; text-shadow: 0 0 10px ${character.color}50; ${isMobile ? 'text-align: center;' : ''}">${character.name}</h2>
                    <p style="color: #888; margin-bottom: 20px; font-size: ${isMobile ? '1rem' : '1.1rem'}; ${isMobile ? 'text-align: center;' : ''}">${character.universe}</p>
                    
                    <div class="character-story" style="margin-bottom: 25px;">
                        <h3 style="color: ${character.color}; margin-bottom: 15px; font-size: ${isMobile ? '1.2rem' : '1.3rem'};">Origin Story</h3>
                        <p style="color: #ccc; line-height: 1.6; font-size: ${isMobile ? '0.9rem' : '1rem'};">${character.detailedDescription}</p>
                    </div>

                    <div class="character-origin" style="margin-bottom: 20px;">
                        <h4 style="color: ${character.color}; margin-bottom: 10px; font-size: ${isMobile ? '1rem' : '1.1rem'};">Origin:</h4>
                        <p style="color: #aaa; font-size: ${isMobile ? '0.85rem' : '0.95rem'};">${character.origin}</p>
                    </div>

                    <div class="character-first-appearance" style="margin-bottom: 25px;">
                        <h4 style="color: ${character.color}; margin-bottom: 10px; font-size: ${isMobile ? '1rem' : '1.1rem'};">First Appearance:</h4>
                        <p style="color: #aaa; font-size: ${isMobile ? '0.85rem' : '0.95rem'};">${character.firstAppearance}</p>
                    </div>

                    <div class="character-abilities">
                        <h3 style="color: ${character.color}; margin-bottom: 15px; font-size: ${isMobile ? '1.2rem' : '1.3rem'};">Abilities & Powers</h3>
                        <div style="display: grid; grid-template-columns: ${isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))'}; gap: ${isMobile ? '6px' : '10px'};">
                            ${character.abilities.map(ability => `
                                <div style="
                                    background: ${character.color}15;
                                    border: 1px solid ${character.color}40;
                                    padding: ${isMobile ? '6px 10px' : '8px 12px'};
                                    border-radius: 8px;
                                    color: #fff;
                                    font-size: ${isMobile ? '0.8rem' : '0.9rem'};
                                    text-align: center;
                                ">${ability}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="character-visual">
                    <div class="detailed-image-container" style="
                        position: relative;
                        width: 100%;
                        height: ${imageHeight};
                        border-radius: 15px;
                        overflow: hidden;
                        border: 2px solid ${character.color};
                        box-shadow: 0 0 30px ${character.color}40;
                        margin-bottom: 20px;
                    ">
                        <div class="detailed-image-loader" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: rgba(0, 0, 0, 0.8);
                            z-index: 1;
                        ">
                            <div style="
                                width: ${isMobile ? '30px' : '40px'};
                                height: ${isMobile ? '30px' : '40px'};
                                border: 4px solid rgba(255, 255, 255, 0.3);
                                border-top: 4px solid ${character.color};
                                border-radius: 50%;
                                animation: spin 1s linear infinite;
                            "></div>
                        </div>
                        <img src="${character.detailedImage}" 
                             alt="${character.name} detailed" 
                             style="
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                opacity: 0;
                                transition: opacity 0.5s ease;
                             "
                             onload="this.parentElement.querySelector('.detailed-image-loader').style.display='none'; this.style.opacity='1';"
                             onerror="this.style.display='none'; this.parentElement.querySelector('.detailed-image-fallback').style.display='flex';">
                        <div class="detailed-image-fallback" style="
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: none;
                            align-items: center;
                            justify-content: center;
                            background: linear-gradient(135deg, rgba(60, 0, 0, 0.9), ${character.color}20);
                            z-index: 2;
                        ">
                            <div style="text-align: center;">
                                <div style="font-size: ${isMobile ? '40px' : '60px'}; margin-bottom: 10px; color: ${character.color};">🕷️</div>
                                <div style="color: ${character.color}; font-weight: bold; font-size: ${isMobile ? '0.9rem' : '1rem'};">${character.name}</div>
                            </div>
                        </div>
                    </div>

                    <div class="power-stats" style="
                        background: rgba(0, 0, 0, 0.6);
                        border-radius: 10px;
                        padding: ${isMobile ? '15px' : '20px'};
                        border: 1px solid ${character.color}40;
                    ">
                        <h4 style="color: ${character.color}; margin-bottom: 15px; text-align: center; font-size: ${isMobile ? '1rem' : '1.1rem'};">Core Powers</h4>
                        ${character.powers.map((power, index) => `
                            <div style="margin-bottom: 12px;">
                                <div style="
                                    display: flex;
                                    justify-content: space-between;
                                    margin-bottom: 5px;
                                    color: #ccc;
                                    font-size: ${isMobile ? '0.8rem' : '0.9rem'};
                                ">
                                    <span>${power}</span>
                                    <span>${85 + Math.floor(Math.random() * 15)}%</span>
                                </div>
                                <div style="
                                    width: 100%;
                                    height: 6px;
                                    background: rgba(255, 255, 255, 0.1);
                                    border-radius: 3px;
                                    overflow: hidden;
                                ">
                                    <div class="power-bar" style="
                                        height: 100%;
                                        background: linear-gradient(90deg, ${character.color}, ${character.color}80);
                                        width: 0%;
                                        border-radius: 3px;
                                        transition: width 1s ease;
                                        transition-delay: ${index * 0.2}s;
                                    "></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Prevent background scrolling on mobile
        if (isMobile) {
            document.body.style.overflow = 'hidden';
        }

        // Animate panel entrance
        gsap.to(panel, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)"
        });

        // Animate power bars
        setTimeout(() => {
            panel.querySelectorAll('.power-bar').forEach((bar, index) => {
                const percentage = 85 + Math.floor(Math.random() * 15);
                setTimeout(() => {
                    bar.style.width = `${percentage}%`;
                }, index * 200);
            });
        }, 500);

        // Close panel functionality
        const closePanel = () => {
            // Restore background scrolling
            document.body.style.overflow = '';
            
            gsap.to(panel, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => panel.remove()
            });
        };

        panel.querySelector('.close-panel').addEventListener('click', closePanel);

        // Close on background click (not on mobile for better UX)
        if (!isMobile) {
            panel.addEventListener('click', (e) => {
                if (e.target === panel) {
                    closePanel();
                }
            });
        }

        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePanel();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Handle orientation change on mobile
        const handleOrientationChange = () => {
            if (isMobile) {
                panel.style.maxHeight = '90vh';
                panel.style.width = '95%';
            }
        };
        window.addEventListener('orientationchange', handleOrientationChange);
    },

    applySpringAnimation(element) {
        return;
    },

    applyComicJitter(element) {
        return;
    },

    hoverCharacter(characterId) {
        const character = this.characters.find(c => c.id === characterId);
        if (!character) return;

        // Only update info panel if no character is selected or if hovering different character
        if (!this.selectedCharacter || this.selectedCharacter.id !== characterId) {
            this.updateInfoPanel(character);
        }

        // Enhanced hover animation
        const card = document.querySelector(`[data-character-id="${characterId}"]`);
        if (!card.classList.contains('selected')) {
            gsap.to(card, {
                y: -15,
                scale: 1.08,
                rotation: 2,
                duration: 0.4,
                ease: "power2.out"
            });

            // Add subtle glow effect
            card.style.boxShadow = `
                0 0 25px ${character.color}60,
                inset 0 0 15px rgba(255, 255, 255, 0.1),
                0 10px 30px rgba(0, 0, 0, 0.4)
            `;

            // Create hover tooltip above the card
            this.createHoverTooltip(card, character);
        }
    },

    createHoverTooltip(card, character) {
        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.hover-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Get card position
        const rect = card.getBoundingClientRect();
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'hover-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top - 10}px;
            transform: translateX(-50%) translateY(-100%);
            background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 40, 40, 0.95));
            border: 2px solid ${character.color};
            border-radius: 12px;
            padding: 15px;
            z-index: 10001;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px ${character.color}40;
            pointer-events: none;
            opacity: 0;
            min-width: 200px;
            max-width: 300px;
        `;

        tooltip.innerHTML = `
            <div style="text-align: center;">
                <h4 style="color: ${character.color}; margin: 0 0 8px 0; font-size: 1.1rem;">${character.name}</h4>
                <p style="color: #888; margin: 0 0 12px 0; font-size: 0.9rem;">${character.universe}</p>
                <p style="color: #ccc; margin: 0 0 12px 0; font-size: 0.85rem; line-height: 1.4;">${character.description}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
                    ${character.powers.slice(0, 3).map(power => `
                        <span style="
                            background: ${character.color}20;
                            border: 1px solid ${character.color}40;
                            padding: 2px 8px;
                            border-radius: 12px;
                            color: ${character.color};
                            font-size: 0.7rem;
                        ">${power}</span>
                    `).join('')}
                </div>
                <div style="margin-top: 10px; font-size: 0.7rem; color: #999;">Click to view details</div>
            </div>
        `;

        document.body.appendChild(tooltip);

        // Animate tooltip appearance
        gsap.to(tooltip, {
            opacity: 1,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
        });
    },

    unhoverCharacter() {
        // Remove hover tooltip
        const tooltip = document.querySelector('.hover-tooltip');
        if (tooltip) {
            gsap.to(tooltip, {
                opacity: 0,
                y: 5,
                duration: 0.2,
                onComplete: () => tooltip.remove()
            });
        }

        // Return to selected character info or default
        if (this.selectedCharacter) {
            this.updateInfoPanel(this.selectedCharacter);
        } else {
            this.updateInfoPanel(null);
        }

        // Reset hover animations for non-selected cards
        gsap.to('.character-card:not(.selected)', {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
        });

        // Reset box shadows for non-selected cards
        document.querySelectorAll('.character-card:not(.selected)').forEach(card => {
            card.style.boxShadow = '';
        });
    },

    updateInfoPanel(character) {
        const nameElement = document.getElementById('character-name');
        const descriptionElement = document.getElementById('character-description');
        const universeElement = document.getElementById('universe-id');
        const panel = document.getElementById('info-panel');

        if (!character) {
            nameElement.textContent = 'Select a Spider-Hero';
            descriptionElement.textContent = 'Hover over a character to learn more about them.';
            universeElement.textContent = '---';
            gsap.to(panel, { opacity: 0, duration: 0.3 });
            return;
        }

        nameElement.textContent = character.name;
        descriptionElement.textContent = character.description;
        universeElement.textContent = character.universe;

        // Animate panel entrance
        gsap.to(panel, { opacity: 1, duration: 0.5 });

        // Apply character color theme
        nameElement.style.color = character.color;
        panel.style.borderColor = character.color;
        panel.style.boxShadow = `0 0 20px ${character.color}40`;

        // Ensure stats button exists
        if (!panel.querySelector('.stats-button')) {
            const statsButton = document.createElement('button');
            statsButton.className = 'stats-button';
            statsButton.innerHTML = '📊 Compare Stats';
            statsButton.onclick = () => {
                if (typeof StatsSystem !== 'undefined') {
                    StatsSystem.showStatsComparison();
                }
            };
            panel.appendChild(statsButton);
        }
    },

    updatePowersDisplay(character, panel) {
        // Simplified - no complex animations
        return;
    },

    typeText(element, text) {
        // Simplified - no typing effect
        element.textContent = text;
    },

    applySpringAnimation(element) {
        // Use Popmotion for spring effect
        if (typeof popmotion !== 'undefined') {
            const { spring, styler } = popmotion;
            const elementStyler = styler(element);

            spring({
                from: { scale: 1 },
                to: { scale: 1.1 },
                stiffness: 300,
                damping: 20
            }).start(elementStyler.set);

            setTimeout(() => {
                spring({
                    from: { scale: 1.1 },
                    to: { scale: 1 },
                    stiffness: 300,
                    damping: 20
                }).start(elementStyler.set);
            }, 200);
        } else {
            // Fallback to GSAP
            gsap.timeline()
                .to(element, { scale: 1.1, duration: 0.2, ease: "power2.out" })
                .to(element, { scale: 1, duration: 0.3, ease: "back.out(4)" });
        }
    },

    applyComicJitter(element) {
        // Disabled to prevent fading issues
        return;
    },

    getSelectedCharacter() {
        return this.selectedCharacter;
    },

    // Method to add custom characters dynamically
    addCharacter(character) {
        this.characters.push(character);
        this.renderCharacters();
    }
};
