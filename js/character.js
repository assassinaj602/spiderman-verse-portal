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
                color: "#FF0000",
                image: "assets/images/amazing.png",
                powers: ["Web-slinging", "Spider-sense", "Wall-crawling", "Super strength"]
            },
            {
                id: "2099",
                name: "Spider-Man 2099",
                universe: "Earth-928",
                description: "Miguel O'Hara from the year 2099. A brilliant geneticist who gained spider powers through genetic manipulation.",
                color: "#00AAFF",
                image: "assets/images/2099.png",
                powers: ["Organic webbing", "Talons", "Fangs", "Enhanced vision"]
            },
            {
                id: "noir",
                name: "Spider-Man Noir",
                universe: "Earth-90214",
                description: "A dark, gritty version from the 1930s. Peter Parker fights crime in black and white New York.",
                color: "#666666",
                image: "assets/images/noir.png",
                powers: ["Stealth", "Detective skills", "Web-shooters", "Combat training"]
            },
            {
                id: "gwen",
                name: "Spider-Gwen",
                universe: "Earth-65",
                description: "Gwen Stacy got the spider bite instead of Peter Parker. She's the drummer for the Mary Janes.",
                color: "#FF69B4",
                image: "assets/images/gwen.png",
                powers: ["Ballet training", "Web-slinging", "Spider-sense", "Acrobatics"]
            },
            {
                id: "miles",
                name: "Miles Morales",
                universe: "Earth-1610",
                description: "The new Spider-Man from Brooklyn. Miles has unique powers that set him apart from other Spider-people.",
                color: "#FFD700",
                image: "assets/images/miles.png",
                powers: ["Invisibility", "Venom blast", "Web-slinging", "Spider-sense"]
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
            console.error('Character container not found');
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

        // Update portal color
        const portalColor = new THREE.Color(character.color);
        PortalSystem.changePortalColor(portalColor);

        // Update info panel
        this.updateInfoPanel(character);

        // Simple selection animation
        gsap.timeline()
            .to(currentCard, { scale: 1.2, duration: 0.2 })
            .to(currentCard, { scale: 1.1, duration: 0.3 });

        // Play selection sound
        Utils.playAudio('whoosh-sound', 0.3);

        // Trigger portal pulse
        PortalSystem.pulsePortal();

        console.log(`Selected character: ${character.name} from ${character.universe}`);
    },

    // Simplified methods - remove complex animations that were causing issues
    createSelectionEffect(card) {
        return;
    },

    createCharacterParticles(character, card) {
        return;
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

        this.updateInfoPanel(character);

        // Gentle hover animation
        const card = document.querySelector(`[data-character-id="${characterId}"]`);
        gsap.to(card, {
            y: -10,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    },

    unhoverCharacter() {
        // Return to selected character info or default
        if (this.selectedCharacter) {
            this.updateInfoPanel(this.selectedCharacter);
        } else {
            this.updateInfoPanel(null);
        }

        // Reset hover animations
        gsap.to('.character-card:not(.selected)', {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
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
