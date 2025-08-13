// Character Stats and Comparison System
const StatsSystem = {
    init() {
        console.log('StatsSystem: Initializing...');
        this.createStatsPanel();
        this.setupStatsButton();
        console.log('StatsSystem: Initialized');
    },

    createStatsPanel() {
        // Create a floating stats comparison panel
        const statsPanel = document.createElement('div');
        statsPanel.id = 'stats-panel';
        statsPanel.className = 'stats-panel hidden';
        statsPanel.innerHTML = `
            <div class="stats-header">
                <h3>Spider-Verse Stats</h3>
                <button class="stats-close">×</button>
            </div>
            <div class="stats-content">
                <div class="stats-radar" id="stats-radar"></div>
                <div class="stats-comparison" id="stats-comparison"></div>
            </div>
        `;
        document.body.appendChild(statsPanel);

        // Setup close button
        statsPanel.querySelector('.stats-close').addEventListener('click', () => {
            this.hideStatsPanel();
        });
    },

    setupStatsButton() {
        // Add stats button to info panel after it's been created
        setTimeout(() => {
            const infoPanel = document.getElementById('info-panel');
            if (infoPanel && !document.querySelector('.stats-button')) {
                const statsButton = document.createElement('button');
                statsButton.className = 'stats-button';
                statsButton.innerHTML = '📊 Compare Stats';
                statsButton.onclick = () => this.showStatsComparison();
                infoPanel.appendChild(statsButton);
                console.log('Stats button added to info panel');
            }
        }, 1500);
    },

    showStatsComparison() {
        const selectedCharacter = CharacterSystem.selectedCharacter;
        if (!selectedCharacter) {
            alert('Please select a character first!');
            return;
        }

        const statsPanel = document.getElementById('stats-panel');
        statsPanel.classList.remove('hidden');

        // Create radar chart-style visualization
        this.createRadarChart(selectedCharacter);
        this.createComparisonTable();

        gsap.fromTo(statsPanel, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    },

    createRadarChart(character) {
        const radarContainer = document.getElementById('stats-radar');
        const stats = this.getCharacterStats(character);
        
        radarContainer.innerHTML = `
            <h4 style="color: ${character.color}; text-align: center; margin-bottom: 20px;">
                ${character.name} - Power Analysis
            </h4>
            <div class="radar-chart">
                ${stats.map((stat, index) => `
                    <div class="stat-bar" style="--stat-color: ${character.color};">
                        <label>${stat.name}</label>
                        <div class="stat-progress">
                            <div class="stat-fill" style="width: ${stat.value}%; background: ${character.color};"></div>
                        </div>
                        <span class="stat-value">${stat.value}%</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Animate stat bars
        setTimeout(() => {
            radarContainer.querySelectorAll('.stat-fill').forEach((bar, index) => {
                gsap.fromTo(bar, 
                    { width: '0%' },
                    { width: `${stats[index].value}%`, duration: 1, delay: index * 0.1, ease: "power2.out" }
                );
            });
        }, 100);
    },

    getCharacterStats(character) {
        // Generate realistic stats based on character
        const baseStats = {
            'amazing': { strength: 85, speed: 80, agility: 90, intelligence: 95, durability: 75, web: 85 },
            '2099': { strength: 90, speed: 95, agility: 85, intelligence: 98, durability: 80, web: 95 },
            'noir': { strength: 75, speed: 70, agility: 85, intelligence: 90, durability: 85, web: 75 },
            'gwen': { strength: 80, speed: 90, agility: 95, intelligence: 85, durability: 70, web: 80 },
            'miles': { strength: 80, speed: 85, agility: 90, intelligence: 80, durability: 75, web: 85 }
        };

        const stats = baseStats[character.id] || baseStats['amazing'];
        
        return [
            { name: 'Strength', value: stats.strength },
            { name: 'Speed', value: stats.speed },
            { name: 'Agility', value: stats.agility },
            { name: 'Intelligence', value: stats.intelligence },
            { name: 'Durability', value: stats.durability },
            { name: 'Web Power', value: stats.web }
        ];
    },

    createComparisonTable() {
        const comparisonContainer = document.getElementById('stats-comparison');
        const allCharacters = CharacterSystem.characters;
        
        comparisonContainer.innerHTML = `
            <h4>Multiverse Comparison</h4>
            <div class="comparison-grid">
                ${allCharacters.map(char => {
                    const stats = this.getCharacterStats(char);
                    const totalPower = stats.reduce((sum, stat) => sum + stat.value, 0) / stats.length;
                    const isSelected = CharacterSystem.selectedCharacter && CharacterSystem.selectedCharacter.id === char.id;
                    return `
                        <div class="comparison-card ${isSelected ? 'selected' : ''}" style="border-color: ${char.color};">
                            <h5 style="color: ${char.color};">${char.name}</h5>
                            <div class="power-level">
                                <div class="power-circle" style="border-color: ${char.color};">
                                    <span style="color: ${char.color};">${Math.round(totalPower)}</span>
                                </div>
                            </div>
                            <p class="universe-label">${char.universe}</p>
                            ${isSelected ? '<div class="selected-indicator">ACTIVE</div>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },

    hideStatsPanel() {
        const statsPanel = document.getElementById('stats-panel');
        gsap.to(statsPanel, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => statsPanel.classList.add('hidden')
        });
    }
};
