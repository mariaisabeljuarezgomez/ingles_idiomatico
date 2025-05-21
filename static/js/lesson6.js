// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson6 = {
    vocabulary: [
    {
        "en": "home",
        "es": "casa, hogar",
        "example": "I am at home."
    },
    {
        "en": "going",
        "es": "yendo, ir",
        "example": "I am going home."
    },
    {
            "en": "coming",
            "es": "viniendo, venir",
            "example": "He is coming home."
        },
        {
            "en": "studying",
            "es": "estudiando",
            "example": "She is studying English."
        },
        {
            "en": "working",
            "es": "trabajando",
            "example": "They are working hard."
        },
        {
            "en": "reading",
            "es": "leyendo",
            "example": "I am reading a book."
        },
        {
            "en": "writing",
            "es": "escribiendo",
            "example": "He is writing a letter."
        },
        {
            "en": "eating",
            "es": "comiendo",
            "example": "We are eating lunch."
        },
        {
            "en": "drinking",
            "es": "bebiendo",
            "example": "She is drinking water."
        },
        {
            "en": "sleeping",
            "es": "durmiendo",
            "example": "The baby is sleeping."
        }
    ],

    homeExercises: [
        { q: "Estoy en casa →", a: "I am at home" },
        { q: "Voy a casa →", a: "I am going home" },
        { q: "Él viene a casa →", a: "He is coming home" },
        { q: "Ellos están en casa →", a: "They are at home" },
        { q: "Ella va a casa →", a: "She is going home" },
        { q: "Nosotros venimos a casa →", a: "We are coming home" }
],

    gerundExercises: [
        { q: "Estoy estudiando →", a: "I am studying" },
        { q: "Él está trabajando →", a: "He is working" },
        { q: "Ella está leyendo →", a: "She is reading" },
        { q: "Estamos escribiendo →", a: "We are writing" },
        { q: "Están comiendo →", a: "They are eating" },
        { q: "Está bebiendo →", a: "He/She is drinking" }
    ],

    combinedExercises: [
        { q: "Estoy estudiando en casa →", a: "I am studying at home" },
        { q: "Él está trabajando en casa →", a: "He is working at home" },
        { q: "Ella está leyendo en casa →", a: "She is reading at home" },
        { q: "Estamos escribiendo en casa →", a: "We are writing at home" },
        { q: "Están comiendo en casa →", a: "They are eating at home" },
        { q: "Está bebiendo en casa →", a: "He/She is drinking at home" }
    ],

    translationExercises: [
        { q: "¿Qué estás haciendo? →", a: "What are you doing?" },
        { q: "Estoy yendo a casa →", a: "I am going home" },
        { q: "¿Está ella estudiando? →", a: "Is she studying?" },
        { q: "No estamos trabajando →", a: "We are not working" },
        { q: "¿Están ellos en casa? →", a: "Are they at home?" },
        { q: "No estoy durmiendo →", a: "I am not sleeping" }
    ],

    // Initialize lesson
    initialize: async function() {
        try {
            console.log('Starting Lesson 6 initialization...');
            
            // Get the lesson container
            const lessonContainer = document.getElementById('lesson-content');
            if (!lessonContainer) {
                throw new Error('Lesson container not found');
            }

            // Set up the lesson content
            lessonContainer.innerHTML = `
                <div class="lesson-wrapper">
                    <h2 class="lesson-title">Lección 6: La Palabra HOME y El Gerundio</h2>
                    
                    <section class="vocabulary-section">
                        <h3>Vocabulario</h3>
                        <div id="flashcards-L6" class="flashcard-section"></div>
                    </section>

                    <section class="exercises-section">
                        <!-- Home Practice -->
                        <div id="home-practice-L6" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Home Practice</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Gerund Practice -->
                        <div id="gerund-practice-L6" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Gerund Practice</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Combined Practice -->
                        <div id="combined-practice-L6" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Combined Practice</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Translation Practice -->
                        <div id="translation-practice-L6" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Translation Practice</h3>
                            <div class="exercise-list"></div>
                        </div>
                    </section>
                </div>
            `;

        // Initialize flashcards
            const flashcardsContainer = document.getElementById('flashcards-L6');
            if (flashcardsContainer) {
                flashcardModule.initializeFlashcards(flashcardsContainer, this.vocabulary);
            }

            // Initialize exercises
            const homeContainer = document.getElementById('home-practice-L6');
            if (homeContainer) {
                exerciseModule.initializeExercise(homeContainer, this.homeExercises, 'translation');
            }

            const gerundContainer = document.getElementById('gerund-practice-L6');
            if (gerundContainer) {
                exerciseModule.initializeExercise(gerundContainer, this.gerundExercises, 'translation');
            }

            const combinedContainer = document.getElementById('combined-practice-L6');
            if (combinedContainer) {
                exerciseModule.initializeExercise(combinedContainer, this.combinedExercises, 'translation');
            }

            const translationContainer = document.getElementById('translation-practice-L6');
            if (translationContainer) {
                exerciseModule.initializeExercise(translationContainer, this.translationExercises, 'translation');
            }

            console.log('Lesson 6 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 6 initialization:', error);
            throw error;
        }
    }
};

// Register the lesson module
window.lessonModules.lesson6 = lesson6;