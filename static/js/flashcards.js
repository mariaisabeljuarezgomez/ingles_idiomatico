// static/js/flashcards.js
(function() {
    window.lessonModules = window.lessonModules || {};

    window.lessonModules.flashcards = {
        currentCardIndex: 0,
        flashcardsData: [],
        activeFlashcardSectionId: null, // To store the ID of the current flashcard section

        // DOM element references for the currently active flashcard section
        elements: {
            sectionContainer: null,
            flashcardContainerEl: null,
            flashcardEl: null, // The main .flashcard div
            flashcardInnerEl: null,
            wordEl: null,
            exampleEl: null,
            translationEl: null,
            audioBtnEl: null, // Button on the card
            prevBtnEl: null,
            flipBtnEl: null,
            nextBtnEl: null,
            playAllBtnEl: null, // New
            statusEl: null      // New
        },

        init: function(lessonId, vocabularyData, sectionId) {
            console.log(`FLASHCARDS: Initializing for lesson ${lessonId}, section: ${sectionId}`);
            this.cleanup(); // Clean up any previous instance's listeners/state

            if (!vocabularyData || !Array.isArray(vocabularyData) || vocabularyData.length === 0) {
                console.error(`FLASHCARDS: Invalid or empty vocabulary data for section ${sectionId}.`);
                return;
            }
            this.flashcardsData = vocabularyData;
            this.currentCardIndex = 0;
            this.activeFlashcardSectionId = sectionId;

            const contentHost = document.getElementById('lesson-content-display');
            if (!contentHost) {
                console.error("FLASHCARDS: Parent container #lesson-content-display not found!");
                return;
            }

            this.elements.sectionContainer = contentHost.querySelector(`#${sectionId}`);
            if (!this.elements.sectionContainer) {
                console.error(`FLASHCARDS: Section container #${sectionId} not found!`);
                return;
            }

            this.elements.flashcardContainerEl = this.elements.sectionContainer.querySelector('.flashcard-container');
            if (!this.elements.flashcardContainerEl) {
                console.error(`FLASHCARDS: .flashcard-container not found in #${sectionId}!`);
                return;
            }
            
            // Assuming there's ONE .flashcard div which we update
            this.elements.flashcardEl = this.elements.flashcardContainerEl.querySelector('.flashcard');
            if (!this.elements.flashcardEl) {
                console.error(`FLASHCARDS: .flashcard div not found in #${sectionId}!`);
                return;
            }

            this.elements.flashcardInnerEl = this.elements.flashcardEl.querySelector('.flashcard-inner');
            this.elements.wordEl = this.elements.flashcardEl.querySelector('.flashcard-word');
            this.elements.exampleEl = this.elements.flashcardEl.querySelector('.flashcard-example');
            this.elements.translationEl = this.elements.flashcardEl.querySelector('.flashcard-translation');
            this.elements.audioBtnEl = this.elements.flashcardEl.querySelector('.audio-btn');

            const controlsContainer = this.elements.sectionContainer.querySelector('.flashcard-controls');
            if (!controlsContainer) {
                console.error(`FLASHCARDS: .flashcard-controls not found in #${sectionId}!`);
                return;
            }
            this.elements.prevBtnEl = controlsContainer.querySelector('.prev, .nav-btn:nth-child(1)'); // More robust selector
            this.elements.flipBtnEl = controlsContainer.querySelector('.flip, .nav-btn:nth-child(2)'); // Assuming flip is second
            this.elements.nextBtnEl = controlsContainer.querySelector('.next, .nav-btn:nth-child(3)'); // Assuming next is third

            this.elements.playAllBtnEl = this.elements.sectionContainer.querySelector('.flashcard-play-all');
            this.elements.statusEl = this.elements.sectionContainer.querySelector('.flashcard-status');

            if (!this.elements.flashcardInnerEl || !this.elements.wordEl || !this.elements.translationEl || !this.elements.prevBtnEl || !this.elements.nextBtnEl) {
                 console.error(`FLASHCARDS: One or more essential UI elements not found in #${sectionId}.`);
                 return;
            }
            // Flip button is optional
            if (!this.elements.flipBtnEl) console.warn(`FLASHCARDS: Flip button not found in #${sectionId}.`);


            // --- Attach Event Listeners ---
            this.elements.prevBtnEl.onclick = () => this.prevCard();
            if(this.elements.flipBtnEl) this.elements.flipBtnEl.onclick = () => this.flipCard();
            this.elements.nextBtnEl.onclick = () => this.nextCard();
            
            if (this.elements.audioBtnEl) {
                this.elements.audioBtnEl.onclick = (event) => {
                    event.stopPropagation();
                    this.speakCurrentCard();
                };
            }
            
            // If the .flashcard div itself is meant to flip on click
            this.elements.flashcardEl.onclick = () => this.flipCard();

            if (this.elements.playAllBtnEl) {
                this.elements.playAllBtnEl.onclick = () => this.playAll();
            }

            this.updateCardDisplay();
            console.log(`FLASHCARDS: Initialized for section ${sectionId}.`);
        },

        updateCardDisplay: function() {
            if (!this.flashcardsData || this.flashcardsData.length === 0 || !this.elements.flashcardEl) {
                if (this.elements.wordEl) this.elements.wordEl.textContent = 'No hay tarjetas.';
                return;
            }
            const card = this.flashcardsData[this.currentCardIndex];
            if (!card) {
                console.error("FLASHCARDS: Current card data is undefined.");
                return;
            }

            if (this.elements.wordEl) this.elements.wordEl.textContent = card.en || card.word || '';
            if (this.elements.exampleEl) this.elements.exampleEl.textContent = card.example || '';
            if (this.elements.translationEl) this.elements.translationEl.textContent = card.es || card.translation || '';
            
            if (this.elements.flashcardInnerEl) {
                this.elements.flashcardInnerEl.classList.remove('is-flipped');
            }
             if (this.elements.statusEl) {
                this.elements.statusEl.textContent = `Tarjeta ${this.currentCardIndex + 1} de ${this.flashcardsData.length}`;
            }
        },

        flipCard: function() {
            if (this.elements.flashcardInnerEl) {
                this.elements.flashcardInnerEl.classList.toggle('is-flipped');
            }
        },

        nextCard: function() {
            if (!this.flashcardsData || this.flashcardsData.length === 0) return;
            this.currentCardIndex = (this.currentCardIndex + 1) % this.flashcardsData.length;
            this.updateCardDisplay();
        },

        prevCard: function() {
            if (!this.flashcardsData || this.flashcardsData.length === 0) return;
            this.currentCardIndex = (this.currentCardIndex - 1 + this.flashcardsData.length) % this.flashcardsData.length;
            this.updateCardDisplay();
        },

        speakCurrentCard: function() {
            if (!this.flashcardsData || this.flashcardsData.length === 0) return;
            const card = this.flashcardsData[this.currentCardIndex];
            if (card && card.audio) {
                this.speak(card.en, card.audio); // Pass text for reference, and actual audio path
            } else if (card) {
                this.speak(card.en, null); // Speak text if no audio path
            }
        },
        
        speak: function(text, audioPath) { // Modified to accept audioPath
            if (audioPath) {
                console.log("FLASHCARDS: Playing audio from path: " + audioPath);
                const audio = new Audio(audioPath); // audioPath should be like /static/audio/lesson1/i.mp3
                audio.play().catch(e => {
                    console.error("FLASHCARDS: Error playing audio file:", e);
                    // Fallback to TTS if audio file fails
                    if (text) this.speakTTS(text);
                });
            } else if (text) {
                this.speakTTS(text);
            } else {
                console.warn("FLASHCARDS: No text or audio path to speak.");
            }
        },

        speakTTS: function(text) { // Text-to-speech fallback
            console.log("FLASHCARDS: Speaking (TTS):", text);
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        },

        playAll: async function() {
            if (!this.flashcardsData || this.flashcardsData.length === 0 || !this.elements.playAllBtnEl) return;
            this.elements.playAllBtnEl.disabled = true;
            if (this.elements.statusEl) this.elements.statusEl.textContent = "Reproduciendo todo...";

            for (let i = 0; i < this.flashcardsData.length; i++) {
                this.currentCardIndex = i;
                this.updateCardDisplay();
                const card = this.flashcardsData[i];
                if (card.audio) {
                    await new Promise(resolve => {
                        const audio = new Audio(card.audio);
                        audio.onended = resolve;
                        audio.onerror = () => { console.error(`Error playing ${card.audio}`); resolve(); }; // continue on error
                        audio.play();
                    });
                } else if (card.en) { // Fallback to TTS if no audio file
                     await new Promise(resolve => {
                        const utterance = new SpeechSynthesisUtterance(card.en);
                        utterance.lang = 'en-US';
                        utterance.rate = 0.9;
                        utterance.onend = resolve;
                        utterance.onerror = () => { console.error(`Error with TTS for ${card.en}`); resolve(); };
                        window.speechSynthesis.speak(utterance);
                    });
                }
                await new Promise(resolve => setTimeout(resolve, 500)); // Pause between cards
            }
            this.elements.playAllBtnEl.disabled = false;
            if (this.elements.statusEl) this.elements.statusEl.textContent = `Tarjeta ${this.currentCardIndex + 1} de ${this.flashcardsData.length}`;
        },

        cleanup: function() {
            console.log(`FLASHCARDS: Cleaning up section ${this.activeFlashcardSectionId}.`);
            if (this.elements.prevBtnEl) this.elements.prevBtnEl.onclick = null;
            if (this.elements.flipBtnEl) this.elements.flipBtnEl.onclick = null;
            if (this.elements.nextBtnEl) this.elements.nextBtnEl.onclick = null;
            if (this.elements.audioBtnEl) this.elements.audioBtnEl.onclick = null;
            if (this.elements.flashcardEl) this.elements.flashcardEl.onclick = null;
            if (this.elements.playAllBtnEl) this.elements.playAllBtnEl.onclick = null;

            // Clear references
            Object.keys(this.elements).forEach(key => this.elements[key] = null);
            this.flashcardsData = [];
            this.currentCardIndex = 0;
            this.activeFlashcardSectionId = null;
        }
    };
})();