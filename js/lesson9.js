// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson9 = {
    vocabulary: [
    {
            "en": "house",
            "es": "casa",
            "example": "I live in a big house."
        },
        {
            "en": "school",
            "es": "escuela",
            "example": "The children go to school."
        },
        {
            "en": "park",
            "es": "parque",
            "example": "We play in the park."
        },
        {
            "en": "store",
            "es": "tienda",
            "example": "She works at the store."
        },
        {
            "en": "hospital",
            "es": "hospital",
            "example": "The doctor works in the hospital."
        },
        {
            "en": "restaurant",
            "es": "restaurante",
            "example": "We eat at the restaurant."
        },
        {
            "en": "library",
            "es": "biblioteca",
            "example": "I study at the library."
        },
        {
            "en": "beach",
            "es": "playa",
            "example": "They swim at the beach."
        },
        {
            "en": "bank",
            "es": "banco",
            "example": "I need to go to the bank."
    },
    {
            "en": "supermarket",
            "es": "supermercado",
            "example": "We buy food at the supermarket."
        },
        {
            "en": "airport",
            "es": "aeropuerto",
            "example": "The plane arrives at the airport."
        },
        {
            "en": "mall",
            "es": "centro comercial",
            "example": "They shop at the mall."
        }
    ],

    prepositionExercises: [
        { q: "Vivo ___ una casa (in)", a: "in" },
        { q: "Trabajo ___ el hospital (at)", a: "at" },
        { q: "Vamos ___ la escuela (to)", a: "to" },
        { q: "Estudio ___ la biblioteca (at)", a: "at" },
        { q: "Juegan ___ el parque (in)", a: "in" },
        { q: "Compro ___ la tienda (at)", a: "at" },
        { q: "Nadan ___ la playa (at)", a: "at" },
        { q: "Viajamos ___ el aeropuerto (to)", a: "to" }
    ],

    locationTranslationExercises: [
        { q: "Voy a la escuela", a: "I go to school" },
        { q: "Ella trabaja en el hospital", a: "She works in the hospital" },
        { q: "Ellos estudian en la biblioteca", a: "They study at the library" },
        { q: "Nosotros comemos en el restaurante", a: "We eat at the restaurant" },
        { q: "¿Dónde está el banco?", a: "Where is the bank?" },
        { q: "El supermercado está cerca", a: "The supermarket is nearby" },
        { q: "Vamos al centro comercial", a: "We go to the mall" },
        { q: "El avión está en el aeropuerto", a: "The plane is at the airport" }
    ],

    directionsExercises: [
        { q: "gira a la derecha", a: "turn right" },
        { q: "gira a la izquierda", a: "turn left" },
        { q: "sigue derecho", a: "go straight" },
        { q: "cerca de", a: "near" },
        { q: "lejos de", a: "far from" },
        { q: "al lado de", a: "next to" },
        { q: "enfrente de", a: "in front of" },
        { q: "detrás de", a: "behind" }
    ],

    whereIsExercises: [
        { q: "¿Dónde está el hospital?", a: "Where is the hospital?" },
        { q: "El banco está cerca de la escuela", a: "The bank is near the school" },
        { q: "La biblioteca está lejos del parque", a: "The library is far from the park" },
        { q: "El restaurante está al lado de la tienda", a: "The restaurant is next to the store" },
        { q: "La escuela está enfrente del parque", a: "The school is in front of the park" },
        { q: "El supermercado está detrás del banco", a: "The supermarket is behind the bank" },
        { q: "¿Está cerca el aeropuerto?", a: "Is the airport nearby?" },
        { q: "El centro comercial está lejos", a: "The mall is far away" }
],

    initialize: async function() {
        try {
            console.log('Starting Lesson 9 initialization...');
            
            // Get the lesson container
            const lessonContainer = document.getElementById('lesson-content');
            if (!lessonContainer) {
                throw new Error('Lesson container not found');
            }

            // Set up the lesson content
            lessonContainer.innerHTML = `
                <div class="lesson-wrapper">
                    <h2 class="lesson-title">Lección 9: El Verbo DO y El Imperativo</h2>
                    
                    <section class="vocabulary-section">
                        <h3>Vocabulario</h3>
                        <div id="flashcards-L9" class="flashcard-section"></div>
                    </section>

                    <section class="exercises-section">
                        <!-- Preposition Practice -->
                        <div id="preposition-practice-L9" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Preposition Practice</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Location Translation -->
                        <div id="location-translation-L9" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Location Translation</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Directions -->
                        <div id="directions-L9" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Directions</h3>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Where Is -->
                        <div id="where-is-L9" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Where Is</h3>
                            <div class="exercise-list"></div>
                        </div>
                    </section>
                </div>
            `;

        // Initialize flashcards
            const flashcardsContainer = document.getElementById('flashcards-L9');
            if (flashcardsContainer) {
                flashcardModule.initializeFlashcards(flashcardsContainer, this.vocabulary);
            }

            // Initialize exercises
            const prepositionContainer = document.getElementById('preposition-practice-L9');
            if (prepositionContainer) {
                exerciseModule.initializeExercise(prepositionContainer, this.prepositionExercises, 'fillIn');
            }

            const locationContainer = document.getElementById('location-translation-L9');
            if (locationContainer) {
                exerciseModule.initializeExercise(locationContainer, this.locationTranslationExercises, 'translation');
            }

            const directionsContainer = document.getElementById('directions-L9');
            if (directionsContainer) {
                exerciseModule.initializeExercise(directionsContainer, this.directionsExercises, 'translation');
            }

            const whereIsContainer = document.getElementById('where-is-L9');
            if (whereIsContainer) {
                exerciseModule.initializeExercise(whereIsContainer, this.whereIsExercises, 'translation');
            }

            console.log('Lesson 9 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 9 initialization:', error);
            throw error;
        }
    }
};

// Export the lesson module
window.lessonModules.lesson9 = lesson9;