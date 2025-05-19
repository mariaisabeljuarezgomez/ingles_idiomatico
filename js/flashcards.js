// Flashcard functionality module
const flashcardModule = {
    // Speech synthesis for pronunciation
    speak: function(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    },

    // Create flashcard HTML
    createFlashcardHTML: function(word) {
        return `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <div class="flashcard-word">${word.en}</div>
                        <div class="flashcard-example">${word.example}</div>
                        <button class="audio-btn" onclick="flashcardModule.speak('${word.en}')">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="flashcard-back">
                        <div class="flashcard-translation">${word.es}</div>
                    </div>
                </div>
            </div>`;
    },

    // Initialize flashcards for a lesson
    initializeFlashcards: function(container, vocabulary) {
        console.log('Initializing flashcards with vocabulary:', vocabulary);
        
        if (!vocabulary || !Array.isArray(vocabulary) || vocabulary.length === 0) {
            console.error('Invalid vocabulary data:', vocabulary);
            return;
        }

        if (!container || !(container instanceof Element)) {
            console.error('Invalid container element:', container);
            return;
        }

        // Get flashcard container
        let flashcardContainer = container.querySelector('.flashcard-container');
        if (!flashcardContainer) {
            console.error('Flashcard container not found in:', container);
            return;
        }

        // Get the first flashcard
        const firstWord = vocabulary[0];
        if (!firstWord) {
            console.error('No vocabulary words available');
            return;
        }

        // Set up the initial flashcard
        const flashcard = flashcardContainer.querySelector('.flashcard');
        if (flashcard) {
            const wordElement = flashcard.querySelector('.flashcard-word');
            const exampleElement = flashcard.querySelector('.flashcard-example');
            const translationElement = flashcard.querySelector('.flashcard-translation');
            const audioBtn = flashcard.querySelector('.audio-btn');

            if (wordElement) wordElement.textContent = firstWord.en;
            if (exampleElement) exampleElement.textContent = firstWord.example;
            if (translationElement) translationElement.textContent = firstWord.es;
            if (audioBtn) audioBtn.onclick = () => this.speak(firstWord.en);
        }

        // Set up navigation buttons
        const buttonContainer = container.querySelector('.flashcard-controls');
        if (buttonContainer) {
            const prevBtn = buttonContainer.querySelector('button:first-child');
            const flipBtn = buttonContainer.querySelector('button:nth-child(2)');
            const nextBtn = buttonContainer.querySelector('button:last-child');

            if (prevBtn && flipBtn && nextBtn) {
                // Buttons are already set up correctly
                console.log('Flashcard navigation buttons initialized');
            } else {
                console.error('Missing flashcard navigation buttons');
            }
        } else {
            console.error('Flashcard controls container not found');
        }

        console.log('Flashcard initialization complete');
    },

    // Initialize flashcards for modismos
    initializeModismos: function(modismos) {
        console.log('Initializing modismos flashcards:', modismos);
        
        if (!modismos || !Array.isArray(modismos) || modismos.length === 0) {
            console.error('Invalid modismos data:', modismos);
            return;
        }

        // Get modismos container
        const container = document.querySelector('section:has(#modismos-flashcards)');
        if (!container) {
            console.error('Modismos section not found');
            return;
        }

        let flashcardContainer = container.querySelector('.flashcard-container');
        if (!flashcardContainer) {
            console.error('Flashcard container not found in modismos section');
            return;
        }

        // Initialize with first modismo
        const flashcard = flashcardContainer.querySelector('.flashcard');
        if (flashcard) {
            const wordElement = flashcard.querySelector('.flashcard-word');
            const exampleElement = flashcard.querySelector('.flashcard-example');
            const translationElement = flashcard.querySelector('.flashcard-translation');
            const audioBtn = flashcard.querySelector('.audio-btn');

            if (wordElement) wordElement.textContent = modismos[0].en;
            if (exampleElement) exampleElement.textContent = modismos[0].example;
            if (translationElement) translationElement.textContent = modismos[0].es;
            if (audioBtn) audioBtn.onclick = () => this.speak(modismos[0].en);
        }

        // Set up navigation
        let currentIndex = 0;
        let isFlipped = false;

        const buttonContainer = container.querySelector('.flashcard-controls');
        if (buttonContainer) {
            const prevBtn = buttonContainer.querySelector('button:first-child');
            const flipBtn = buttonContainer.querySelector('button:nth-child(2)');
            const nextBtn = buttonContainer.querySelector('button:last-child');

            if (prevBtn) {
                prevBtn.onclick = () => {
                    currentIndex = (currentIndex - 1 + modismos.length) % modismos.length;
                    isFlipped = false;
                    flashcard.classList.remove('flipped');
                    const word = modismos[currentIndex];
                    if (wordElement) wordElement.textContent = word.en;
                    if (exampleElement) exampleElement.textContent = word.example;
                    if (translationElement) translationElement.textContent = word.es;
                    if (audioBtn) audioBtn.onclick = () => this.speak(word.en);
                };
            }

            if (flipBtn) {
                flipBtn.onclick = () => {
                    isFlipped = !isFlipped;
                    flashcard.classList.toggle('flipped');
                };
            }

            if (nextBtn) {
                nextBtn.onclick = () => {
                    currentIndex = (currentIndex + 1) % modismos.length;
                    isFlipped = false;
                    flashcard.classList.remove('flipped');
                    const word = modismos[currentIndex];
                    if (wordElement) wordElement.textContent = word.en;
                    if (exampleElement) exampleElement.textContent = word.example;
                    if (translationElement) translationElement.textContent = word.es;
                    if (audioBtn) audioBtn.onclick = () => this.speak(word.en);
                };
            }
        }
    },

    // Update flashcard content
    updateFlashcard: function(container, word) {
        const flashcard = container.querySelector('.flashcard');
        if (flashcard) {
            const wordElement = flashcard.querySelector('.flashcard-word');
            const exampleElement = flashcard.querySelector('.flashcard-example');
            const translationElement = flashcard.querySelector('.flashcard-translation');
            const audioBtn = flashcard.querySelector('.audio-btn');

            if (wordElement) wordElement.textContent = word.en;
            if (exampleElement) exampleElement.textContent = word.example;
            if (translationElement) translationElement.textContent = word.es;
            if (audioBtn) audioBtn.onclick = () => this.speak(word.en);
        }
    },

    // Set up navigation buttons
    setupNavigation: function(container, items, type) {
        let currentIndex = 0;
        let isFlipped = false;

        const buttonContainer = container.querySelector('.flashcard-controls');
        if (!buttonContainer) {
            console.error('Button container not found');
            return;
        }

        const flashcardContainer = container.querySelector('.flashcard-container');
        const flashcard = flashcardContainer.querySelector('.flashcard');

        // Previous button
        const prevBtn = buttonContainer.querySelector('button:first-child');
        if (prevBtn) {
            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                isFlipped = false;
                flashcard.classList.remove('flipped');
                this.updateFlashcard(flashcardContainer, items[currentIndex]);
            };
        }

        // Flip button
        const flipBtn = buttonContainer.querySelector('button:nth-child(2)');
        if (flipBtn) {
            flipBtn.onclick = () => {
                isFlipped = !isFlipped;
                flashcard.classList.toggle('flipped');
            };
        }

        // Next button
        const nextBtn = buttonContainer.querySelector('button:last-child');
        if (nextBtn) {
            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % items.length;
                isFlipped = false;
                flashcard.classList.remove('flipped');
                this.updateFlashcard(flashcardContainer, items[currentIndex]);
            };
        }
    }
};

// Export the module
window.flashcardModule = flashcardModule; 