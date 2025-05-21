// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson8 = {
    vocabulary: [
    {
            "en": "water",
            "es": "agua",
            "example": "I drink water every day."
        },
        {
            "en": "bread",
            "es": "pan",
            "example": "She eats bread for breakfast."
        },
        {
            "en": "milk",
            "es": "leche",
            "example": "The baby drinks milk."
        },
        {
            "en": "fruit",
            "es": "fruta",
            "example": "I like fresh fruit."
        },
        {
            "en": "meat",
            "es": "carne",
            "example": "They cook meat for dinner."
        },
        {
            "en": "vegetable",
            "es": "verdura",
            "example": "Eat your vegetables."
    },
    {
            "en": "juice",
            "es": "jugo",
            "example": "I drink orange juice."
        },
        {
            "en": "coffee",
            "es": "café",
            "example": "He drinks coffee in the morning."
        },
        {
            "en": "tea",
            "es": "té",
            "example": "She likes green tea."
        },
        {
            "en": "soup",
            "es": "sopa",
            "example": "The soup is hot."
        },
        {
            "en": "rice",
            "es": "arroz",
            "example": "We eat rice with vegetables."
        },
        {
            "en": "fish",
            "es": "pescado",
            "example": "I love fresh fish."
        }
    ],

    foodTranslationExercises: [
        { q: "Yo bebo agua", a: "I drink water" },
        { q: "Ella come pan", a: "She eats bread" },
        { q: "Ellos beben leche", a: "They drink milk" },
        { q: "Nosotros comemos fruta", a: "We eat fruit" },
        { q: "Él cocina carne", a: "He cooks meat" },
        { q: "Tú comes verduras", a: "You eat vegetables" },
        { q: "Yo bebo jugo", a: "I drink juice" },
        { q: "Ella bebe café", a: "She drinks coffee" }
    ],

    countableUncountableExercises: [
        { q: "_____ water (some)", a: "some water" },
        { q: "_____ apples (three)", a: "three apples" },
        { q: "_____ rice (some)", a: "some rice" },
        { q: "_____ bananas (two)", a: "two bananas" },
        { q: "_____ milk (some)", a: "some milk" },
        { q: "_____ vegetables (many)", a: "many vegetables" },
        { q: "_____ coffee (some)", a: "some coffee" },
        { q: "_____ oranges (five)", a: "five oranges" }
    ],

    likeDislikeExercises: [
        { q: "Me gusta el café", a: "I like coffee" },
        { q: "No me gusta la sopa", a: "I don't like soup" },
        { q: "A ella le gusta el té", a: "She likes tea" },
        { q: "A ellos no les gusta el pescado", a: "They don't like fish" },
        { q: "¿Te gusta la fruta?", a: "Do you like fruit?" },
        { q: "¿Le gusta la carne?", a: "Does he like meat?" },
        { q: "Nos gusta el arroz", a: "We like rice" },
        { q: "No me gustan las verduras", a: "I don't like vegetables" }
    ],

    mealTimeExercises: [
        { q: "desayuno", a: "breakfast" },
        { q: "almuerzo", a: "lunch" },
        { q: "cena", a: "dinner" },
        { q: "Yo desayuno a las 7", a: "I have breakfast at 7" },
        { q: "Ella almuerza a las 12", a: "She has lunch at 12" },
        { q: "Ellos cenan a las 8", a: "They have dinner at 8" },
        { q: "¿A qué hora desayunas?", a: "What time do you have breakfast?" },
        { q: "¿A qué hora almuerza él?", a: "What time does he have lunch?" }
],

    initialize: async function() {
        try {
            console.log('Starting Lesson 8 initialization...');
            
            // Get the lesson container
            const lessonContainer = document.getElementById('lesson-content');
            if (!lessonContainer) {
                throw new Error('Lesson container not found');
            }

            // Set up the lesson content
            lessonContainer.innerHTML = `
                <div class="lesson-wrapper">
                    <h2 class="lesson-title">Lección 8: Comidas y Bebidas</h2>
                    
                    <section class="vocabulary-section">
                        <h3>Vocabulario</h3>
                        <div id="flashcards-L8" class="flashcard-section"></div>
                    </section>

                    <section class="exercises-section">
                        <!-- Food Translation -->
                        <div id="food-translation-L8" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Food Translation Practice</h3>
                            <p>Translate the following sentences about food and drinks:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Countable/Uncountable -->
                        <div id="countable-uncountable-L8" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Countable and Uncountable Foods</h3>
                            <p>Complete the phrases with the correct quantity words:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Like/Dislike -->
                        <div id="like-dislike-L8" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Expressing Likes and Dislikes</h3>
                            <p>Translate these expressions about food preferences:</p>
                            <div class="exercise-list"></div>
                        </div>

                        <!-- Meal Time -->
                        <div id="meal-time-L8" class="exercise-section mb-8">
                            <h3 class="text-xl font-semibold mb-4">Meal Times</h3>
                            <p>Practice vocabulary and expressions related to meal times:</p>
                            <div class="exercise-list"></div>
                        </div>
                    </section>
                </div>
            `;

        // Initialize flashcards
            const flashcardsContainer = document.getElementById('flashcards-L8');
            if (flashcardsContainer) {
                flashcardModule.initializeFlashcards(flashcardsContainer, this.vocabulary);
            }

            // Initialize exercises
            const foodTranslationContainer = document.getElementById('food-translation-L8');
            if (foodTranslationContainer) {
                exerciseModule.initializeExercise(foodTranslationContainer, this.foodTranslationExercises, 'translation');
            }

            const countableUncountableContainer = document.getElementById('countable-uncountable-L8');
            if (countableUncountableContainer) {
                exerciseModule.initializeExercise(countableUncountableContainer, this.countableUncountableExercises, 'fillIn');
            }

            const likeDislikeContainer = document.getElementById('like-dislike-L8');
            if (likeDislikeContainer) {
                exerciseModule.initializeExercise(likeDislikeContainer, this.likeDislikeExercises, 'translation');
            }

            const mealTimeContainer = document.getElementById('meal-time-L8');
            if (mealTimeContainer) {
                exerciseModule.initializeExercise(mealTimeContainer, this.mealTimeExercises, 'translation');
            }

            console.log('Lesson 8 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 8 initialization:', error);
            throw error;
        }
    }
};

// Export the lesson module
window.lessonModules.lesson8 = lesson8;