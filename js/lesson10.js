// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson10 = {
    vocabulary: [
    {
        "en": "have",
        "es": "tener",
        "example": "I have a book."
    },
    {
        "en": "has",
        "es": "tiene",
        "example": "She has a book."
    },
    {
        "en": "had",
        "es": "tenía, tuvo",
        "example": "I had a book."
        },
        {
            "en": "will have",
            "es": "tendrá",
            "example": "They will have time tomorrow."
        },
        {
            "en": "having",
            "es": "teniendo",
            "example": "I am having lunch."
        },
        {
            "en": "to have",
            "es": "tener",
            "example": "To have friends is important."
        },
        {
            "en": "don't have",
            "es": "no tengo",
            "example": "I don't have money."
        },
        {
            "en": "doesn't have",
            "es": "no tiene",
            "example": "He doesn't have time."
        },
        {
            "en": "didn't have",
            "es": "no tenía",
            "example": "They didn't have class yesterday."
    }
],

    presentTenseExercises: [
        { q: "Yo ___ un libro (have)", a: "have" },
        { q: "Ella ___ tiempo (has)", a: "has" },
        { q: "Ellos ___ dinero (have)", a: "have" },
        { q: "Él ___ un carro (has)", a: "has" },
        { q: "Nosotros ___ una casa (have)", a: "have" },
        { q: "El perro ___ hambre (has)", a: "has" },
        { q: "Tú ___ amigos (have)", a: "have" },
        { q: "La gata ___ sed (has)", a: "has" }
    ],

    negativeExercises: [
        { q: "No tengo dinero", a: "I don't have money" },
        { q: "Ella no tiene tiempo", a: "She doesn't have time" },
        { q: "No tenemos clase", a: "We don't have class" },
        { q: "Él no tiene trabajo", a: "He doesn't have work" },
        { q: "No tienen hambre", a: "They don't have hunger" },
        { q: "Tú no tienes libros", a: "You don't have books" },
        { q: "El gato no tiene sed", a: "The cat doesn't have thirst" },
        { q: "No tengo prisa", a: "I don't have hurry" }
    ],

    pastTenseExercises: [
        { q: "Yo tenía un perro", a: "I had a dog" },
        { q: "Ellos tenían dinero", a: "They had money" },
        { q: "No tenía tiempo", a: "I didn't have time" },
        { q: "Ella tenía trabajo", a: "She had work" },
        { q: "Teníamos una casa", a: "We had a house" },
        { q: "No tenían hambre", a: "They didn't have hunger" },
        { q: "Tú tenías libros", a: "You had books" },
        { q: "El niño tenía sed", a: "The boy had thirst" }
    ],

    questionExercises: [
        { q: "¿Tienes dinero?", a: "Do you have money?" },
        { q: "¿Tiene ella tiempo?", a: "Does she have time?" },
        { q: "¿Tenemos clase hoy?", a: "Do we have class today?" },
        { q: "¿Tienen ellos trabajo?", a: "Do they have work?" },
        { q: "¿Tenías un perro?", a: "Did you have a dog?" },
        { q: "¿Tenía él una casa?", a: "Did he have a house?" },
        { q: "¿Tendrás tiempo mañana?", a: "Will you have time tomorrow?" },
        { q: "¿Tienen hambre?", a: "Are they hungry?" }
    ],

    initialize: async function() {
        try {
            console.log('Starting Lesson 10 initialization...');
            
            // Get the lesson container
            const lessonContainer = document.getElementById('lesson-content');
            if (!lessonContainer) {
                throw new Error('Lesson container not found');
            }

            // Set up the lesson content
            lessonContainer.innerHTML = `
                <div class="lesson-wrapper">
                    <h2 class="lesson-title">Lección 10: El Verbo HAVE</h2>
                    
                    <section class="vocabulary-section">
                        <h3>Vocabulario</h3>
                        <div id="flashcards-L10" class="flashcard-section"></div>
                    </section>

                    <section class="exercises-section">
                        <!-- Present Tense -->
                        <div id="present-tense-L10" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Present Tense of "Have"</h3>
                            <p>Fill in the correct form of "have" in the present tense:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Negative Form -->
                        <div id="negative-form-L10" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Negative Forms with "Have"</h3>
                            <p>Translate these negative sentences:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Past Tense -->
                        <div id="past-tense-L10" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Past Tense with "Have"</h3>
                            <p>Translate these sentences in the past tense:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Questions -->
                        <div id="questions-L10" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Questions with "Have"</h3>
                            <p>Translate these questions:</p>
                            <div class="exercise-list"></div>
                        </div>
                    </section>
                </div>
            `;

        // Initialize flashcards
            const flashcardsContainer = document.getElementById('flashcards-L10');
            if (flashcardsContainer) {
                flashcardModule.initializeFlashcards(flashcardsContainer, this.vocabulary);
            }

            // Initialize exercises
            const presentTenseContainer = document.getElementById('present-tense-L10');
            if (presentTenseContainer) {
                exerciseModule.initializeExercise(presentTenseContainer, this.presentTenseExercises, 'fillIn');
            }

            const negativeFormContainer = document.getElementById('negative-form-L10');
            if (negativeFormContainer) {
                exerciseModule.initializeExercise(negativeFormContainer, this.negativeExercises, 'translation');
            }

            const pastTenseContainer = document.getElementById('past-tense-L10');
            if (pastTenseContainer) {
                exerciseModule.initializeExercise(pastTenseContainer, this.pastTenseExercises, 'translation');
            }

            const questionsContainer = document.getElementById('questions-L10');
            if (questionsContainer) {
                exerciseModule.initializeExercise(questionsContainer, this.questionExercises, 'translation');
            }

            console.log('Lesson 10 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 10 initialization:', error);
            throw error;
        }
    }
};

// Export the lesson module
window.lessonModules.lesson10 = lesson10;