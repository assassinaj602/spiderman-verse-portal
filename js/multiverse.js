// Multiverse Generator System
class MultiverseGenerator {
    constructor() {
        this.universeCount = 0;
        this.activeRifts = [];
        this.maxRifts = 3;
    }

    init() {
        console.log('Initializing Multiverse Generator...');
        this.createGeneratorButton();
        this.setupEventListeners();
    }

    createGeneratorButton() {
        const button = document.createElement('button');
        button.id = 'multiverse-generator';
        button.className = 'multiverse-generator';
        button.innerHTML = '🌌 Generate Rift';
        document.body.appendChild(button);
    }

    setupEventListeners() {
        const button = document.getElementById('multiverse-generator');
        if (button) {
            button.addEventListener('click', () => this.generateRift());
        }
    }

    async generateRift() {
        if (this.activeRifts.length >= this.maxRifts) {
            this.clearOldestRift();
        }

        const rift = this.createRift();
        this.activeRifts.push(rift);
        this.universeCount++;

        // Add animation
        this.animateRiftAppearance(rift);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            this.removeRift(rift);
        }, 10000);
    }

    createRift() {
        const rift = document.createElement('div');
        rift.className = 'multiverse-rift';
        
        // Random position
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 200) + 100;
        
        rift.style.left = `${x}px`;
        rift.style.top = `${y}px`;

        // Random universe data
        const universeData = this.generateUniverseData();
        
        rift.innerHTML = `
            <div class="rift-content">
                <div class="rift-id">Universe-${this.universeCount + 1000}</div>
                <div class="rift-type">${universeData.type}</div>
                <div class="rift-description">${universeData.description}</div>
                <div class="rift-close">×</div>
            </div>
        `;

        // Add close functionality
        rift.querySelector('.rift-close').addEventListener('click', () => {
            this.removeRift(rift);
        });

        document.body.appendChild(rift);
        return rift;
    }

    generateUniverseData() {
        const types = [
            'Noir Universe', 'Cyberpunk Reality', 'Medieval Dimension',
            'Post-Apocalyptic Earth', 'Cartoon Reality', 'Mirror Universe',
            'Steampunk Dimension', 'Zombie Universe', 'Robot Reality',
            'Magic Realm', 'Underwater Earth', 'Sky Cities',
            'Time-Frozen Reality', 'Giant World', 'Miniature Earth'
        ];

        const descriptions = [
            'Where shadows hide secrets',
            'Technology rules all',
            'Knights and magic reign',
            'Survival is everything',
            'Physics bend to humor',
            'Everything is reversed',
            'Steam powers the world',
            'The undead roam free',
            'Machines have consciousness',
            'Spells replace science',
            'Life thrives beneath waves',
            'Cities float in clouds',
            'Moments last forever',
            'Everything is enormous',
            'Tiny worlds, big adventures'
        ];

        const typeIndex = Math.floor(Math.random() * types.length);
        
        return {
            type: types[typeIndex],
            description: descriptions[typeIndex]
        };
    }

    animateRiftAppearance(rift) {
        // Initial state
        rift.style.transform = 'scale(0) rotate(180deg)';
        rift.style.opacity = '0';

        // Animate in
        setTimeout(() => {
            rift.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            rift.style.transform = 'scale(1) rotate(0deg)';
            rift.style.opacity = '1';
        }, 100);

        // Add floating animation
        setTimeout(() => {
            rift.style.animation = 'float 3s ease-in-out infinite';
        }, 900);
    }

    removeRift(rift) {
        const index = this.activeRifts.indexOf(rift);
        if (index > -1) {
            this.activeRifts.splice(index, 1);
        }

        // Animate out
        rift.style.transition = 'all 0.5s ease-in';
        rift.style.transform = 'scale(0) rotate(-180deg)';
        rift.style.opacity = '0';

        setTimeout(() => {
            if (rift.parentNode) {
                rift.parentNode.removeChild(rift);
            }
        }, 500);
    }

    clearOldestRift() {
        if (this.activeRifts.length > 0) {
            this.removeRift(this.activeRifts[0]);
        }
    }

    // Method to create themed rifts based on selected character
    createThemedRift(character) {
        const themedData = {
            'miles': {
                type: 'Brooklyn Reality',
                description: 'Street art comes alive'
            },
            'gwen': {
                type: 'Rock Universe',
                description: 'Music has power'
            },
            'noir': {
                type: 'Shadow Dimension',
                description: 'Darkness speaks truth'
            },
            'amazing': {
                type: 'Classic Reality',
                description: 'Responsibility defines heroes'
            },
            '2099': {
                type: 'Future Shock',
                description: 'Tomorrow needs heroes'
            }
        };

        if (this.activeRifts.length >= this.maxRifts) {
            this.clearOldestRift();
        }

        const rift = this.createThemedRiftElement(character, themedData[character] || themedData['amazing']);
        this.activeRifts.push(rift);
        this.animateRiftAppearance(rift);

        setTimeout(() => {
            this.removeRift(rift);
        }, 8000);
    }

    createThemedRiftElement(character, data) {
        const rift = document.createElement('div');
        rift.className = `multiverse-rift themed-rift ${character}-themed`;
        
        // Position near character card
        const characterCard = document.querySelector(`[data-character="${character}"]`);
        let x = Math.random() * (window.innerWidth - 200);
        let y = Math.random() * (window.innerHeight - 200) + 100;
        
        if (characterCard) {
            const rect = characterCard.getBoundingClientRect();
            x = rect.left + Math.random() * 100 - 50;
            y = rect.top - 150 + Math.random() * 100;
            
            // Keep in bounds
            x = Math.max(0, Math.min(x, window.innerWidth - 200));
            y = Math.max(50, Math.min(y, window.innerHeight - 200));
        }
        
        rift.style.left = `${x}px`;
        rift.style.top = `${y}px`;

        rift.innerHTML = `
            <div class="rift-content">
                <div class="rift-id">${character.toUpperCase()}-${Math.floor(Math.random() * 1000)}</div>
                <div class="rift-type">${data.type}</div>
                <div class="rift-description">${data.description}</div>
                <div class="rift-close">×</div>
            </div>
        `;

        rift.querySelector('.rift-close').addEventListener('click', () => {
            this.removeRift(rift);
        });

        document.body.appendChild(rift);
        return rift;
    }
}

// Initialize globally
window.MultiverseGenerator = new MultiverseGenerator();
