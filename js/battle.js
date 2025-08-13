// Spider-Man Battle Simulator System
const BattleSystem = {
    battleInProgress: false,
    selectedCharacters: [],
    battleModeActive: false,

    init() {
        console.log('BattleSystem: Initializing...');
        this.setupBattleControls();
        console.log('BattleSystem: Initialized');
    },

    setupBattleControls() {
        // Setup battle toggle button
        const battleToggle = document.getElementById('battle-toggle');
        if (battleToggle) {
            battleToggle.onclick = () => this.toggleBattleMode();
        }

        // Setup battle arena close button
        const battleClose = document.querySelector('.battle-close');
        if (battleClose) {
            battleClose.onclick = () => this.closeBattleMode();
        }

        // Setup battle controls
        const startBattle = document.getElementById('start-battle');
        if (startBattle) {
            startBattle.onclick = () => this.startBattle();
        }

        const clearFighters = document.getElementById('clear-fighters');
        if (clearFighters) {
            clearFighters.onclick = () => this.clearFighters();
        }

        // Setup character selection for battle mode
        this.setupCharacterSelection();
    },

    setupCharacterSelection() {
        // Override character selection in battle mode
        this.originalSelectCharacter = CharacterSystem.selectCharacter;
    },

    toggleBattleMode() {
        const arena = document.getElementById('battle-arena');
        if (arena.classList.contains('hidden')) {
            this.showBattleArena();
        } else {
            this.closeBattleMode();
        }
    },

    showBattleArena() {
        const arena = document.getElementById('battle-arena');
        arena.classList.remove('hidden');
        
        // Enable battle mode
        this.battleModeActive = true;
        this.enableBattleSelection();

        gsap.fromTo(arena, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    },

    closeBattleMode() {
        const arena = document.getElementById('battle-arena');
        
        gsap.to(arena, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                arena.classList.add('hidden');
                this.battleModeActive = false;
                this.disableBattleSelection();
                this.clearFighters();
            }
        });
    },

    enableBattleSelection() {
        // Change character selection behavior
        CharacterSystem.selectCharacter = (characterId) => {
            if (this.selectedCharacters.length < 2) {
                const character = CharacterSystem.characters.find(c => c.id === characterId);
                if (character && !this.selectedCharacters.find(c => c.id === characterId)) {
                    this.addFighter(character);
                }
            }
        };
    },

    disableBattleSelection() {
        // Restore original character selection
        CharacterSystem.selectCharacter = this.originalSelectCharacter;
    },

    addFighter(character) {
        this.selectedCharacters.push(character);
        const slotIndex = this.selectedCharacters.length;
        const slot = document.getElementById(`fighter-${slotIndex}-slot`);
        
        if (slot) {
            slot.innerHTML = `
                <div class="fighter-card" style="border-color: ${character.color};">
                    <img src="${character.image}" alt="${character.name}" class="fighter-image" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="fighter-fallback" style="display: none; color: ${character.color};">🕷️</div>
                    <h5 style="color: ${character.color};">${character.name}</h5>
                    <p class="fighter-universe">${character.universe}</p>
                    <button class="remove-fighter" onclick="BattleSystem.removeFighter(${slotIndex - 1})">Remove</button>
                </div>
            `;
        }

        // Add glow effect to selected character card
        const characterCard = document.querySelector(`[data-character-id="${character.id}"]`);
        if (characterCard) {
            characterCard.style.border = `3px solid ${character.color}`;
            characterCard.style.boxShadow = `0 0 20px ${character.color}`;
        }

        // Enable start battle button if 2 fighters selected
        if (this.selectedCharacters.length === 2) {
            const startButton = document.getElementById('start-battle');
            if (startButton) {
                startButton.disabled = false;
            }
        }
    },

    removeFighter(index) {
        const character = this.selectedCharacters[index];
        this.selectedCharacters.splice(index, 1);
        
        // Remove glow from character card
        const characterCard = document.querySelector(`[data-character-id="${character.id}"]`);
        if (characterCard) {
            characterCard.style.border = '';
            characterCard.style.boxShadow = '';
        }

        // Reset fighter slots
        this.resetFighterDisplay();
        
        // Re-add remaining fighters
        const remainingFighters = [...this.selectedCharacters];
        this.selectedCharacters = [];
        remainingFighters.forEach(fighter => this.addFighter(fighter));
        
        // Disable start battle button
        const startButton = document.getElementById('start-battle');
        if (startButton) {
            startButton.disabled = true;
        }
    },

    resetFighterDisplay() {
        // Reset fighter slots to placeholder
        const slot1 = document.getElementById('fighter-1-slot');
        const slot2 = document.getElementById('fighter-2-slot');
        
        if (slot1) {
            slot1.innerHTML = '<div class="slot-placeholder">Click a character card to select Fighter 1</div>';
        }
        if (slot2) {
            slot2.innerHTML = '<div class="slot-placeholder">Click a character card to select Fighter 2</div>';
        }
    },

    clearFighters() {
        // Remove glow from all character cards
        this.selectedCharacters.forEach(character => {
            const characterCard = document.querySelector(`[data-character-id="${character.id}"]`);
            if (characterCard) {
                characterCard.style.border = '';
                characterCard.style.boxShadow = '';
            }
        });

        // Clear selected characters
        this.selectedCharacters = [];
        
        // Reset display
        this.resetFighterDisplay();
        
        // Disable start battle button
        const startButton = document.getElementById('start-battle');
        if (startButton) {
            startButton.disabled = true;
        }

        // Hide battle animation and winner sections
        const battleAnimation = document.getElementById('battle-animation');
        const battleWinner = document.getElementById('battle-winner');
        if (battleAnimation) battleAnimation.classList.add('hidden');
        if (battleWinner) battleWinner.classList.add('hidden');
    },

    startBattle() {
        if (this.selectedCharacters.length !== 2) return;

        const [fighter1, fighter2] = this.selectedCharacters;
        
        // Hide selection panel and show battle animation
        const battleSelection = document.querySelector('.battle-selection');
        const battleAnimation = document.getElementById('battle-animation');
        const battleWinner = document.getElementById('battle-winner');
        
        if (battleSelection) battleSelection.style.display = 'none';
        if (battleAnimation) battleAnimation.classList.remove('hidden');
        if (battleWinner) battleWinner.classList.add('hidden');
        
        // Update battle fighters display
        const battleFighter1 = document.getElementById('battle-fighter-1');
        const battleFighter2 = document.getElementById('battle-fighter-2');
        
        if (battleFighter1) {
            battleFighter1.innerHTML = `
                <div class="fighter-icon" style="color: ${fighter1.color};">🕷️</div>
                <div style="color: ${fighter1.color};">${fighter1.name}</div>
            `;
        }
        
        if (battleFighter2) {
            battleFighter2.innerHTML = `
                <div class="fighter-icon" style="color: ${fighter2.color};">🕷️</div>
                <div style="color: ${fighter2.color};">${fighter2.name}</div>
            `;
        }

        // Animate battle progress
        this.animateBattleProgress(fighter1, fighter2);
    },

    animateBattleProgress(fighter1, fighter2) {
        const battleFill = document.getElementById('battle-fill');
        
        if (battleFill) {
            // Animate progress bar
            gsap.to(battleFill, {
                width: '100%',
                duration: 3,
                ease: "power2.inOut",
                onComplete: () => {
                    // Calculate winner
                    const winner = this.calculateWinner(fighter1, fighter2);
                    this.showBattleResult(winner, fighter1, fighter2);
                }
            });
        }
    },

    calculateWinner(fighter1, fighter2) {
        // Get stats for both fighters if available
        let power1 = 100, power2 = 100;
        
        try {
            if (window.StatsSystem) {
                const stats1 = StatsSystem.getCharacterStats(fighter1);
                const stats2 = StatsSystem.getCharacterStats(fighter2);
                
                if (stats1 && stats2) {
                    power1 = stats1.reduce((sum, stat) => sum + stat.value, 0);
                    power2 = stats2.reduce((sum, stat) => sum + stat.value, 0);
                }
            }
        } catch (error) {
            console.warn('Could not get character stats, using default values');
        }
        
        // Add some randomness for excitement
        const random1 = Math.random() * 50;
        const random2 = Math.random() * 50;
        
        const final1 = power1 + random1;
        const final2 = power2 + random2;
        
        return final1 > final2 ? fighter1 : fighter2;
    },

    showBattleResult(winner, fighter1, fighter2) {
        const battleAnimation = document.getElementById('battle-animation');
        const battleWinner = document.getElementById('battle-winner');
        const loser = winner.id === fighter1.id ? fighter2 : fighter1;
        
        // Hide battle animation
        if (battleAnimation) battleAnimation.classList.add('hidden');
        
        // Show winner
        if (battleWinner) {
            battleWinner.classList.remove('hidden');
            battleWinner.innerHTML = `
                <div class="winner-card" style="border-color: ${winner.color};">
                    <img src="${winner.image}" alt="${winner.name}" class="fighter-image" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="fighter-fallback" style="display: none; color: ${winner.color};">🕷️</div>
                    <h3 style="color: ${winner.color};">🏆 ${winner.name} Wins!</h3>
                    <div class="victory-reason">${this.getVictoryReason(winner, loser)}</div>
                    <button class="battle-btn" onclick="BattleSystem.resetBattleView()">Battle Again</button>
                </div>
            `;
        }

        // Create victory effects
        this.createVictoryEffect(winner);
    },

    getVictoryReason(winner, loser) {
        const reasons = [
            `${winner.name}'s superior web-slinging skills proved decisive!`,
            `${winner.name} outmaneuvered ${loser.name} in the final moments!`,
            `${winner.name}'s experience in their universe gave them the edge!`,
            `${winner.name}'s spider-sense was sharper than ${loser.name}'s!`,
            `${winner.name} used their unique abilities to claim victory!`
        ];
        return reasons[Math.floor(Math.random() * reasons.length)];
    },

    resetBattleView() {
        const battleSelection = document.querySelector('.battle-selection');
        const battleAnimation = document.getElementById('battle-animation');
        const battleWinner = document.getElementById('battle-winner');
        const battleFill = document.getElementById('battle-fill');
        
        // Show selection panel
        if (battleSelection) battleSelection.style.display = 'block';
        
        // Hide other panels
        if (battleAnimation) battleAnimation.classList.add('hidden');
        if (battleWinner) battleWinner.classList.add('hidden');
        
        // Reset progress bar
        if (battleFill) battleFill.style.width = '0%';
        
        // Clear fighters but keep battle mode active
        this.clearFighters();
    },

    createVictoryEffect(winner) {
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.backgroundColor = winner.color;
                confetti.style.zIndex = '10000';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                gsap.to(confetti, {
                    y: window.innerHeight + 20,
                    rotation: 360,
                    duration: 3,
                    ease: "power2.out",
                    onComplete: () => {
                        if (confetti.parentNode) {
                            confetti.parentNode.removeChild(confetti);
                        }
                    }
                });
            }, i * 50);
        }
    }
};
