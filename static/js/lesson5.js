// Lesson 5 Module
window.lessonModules = window.lessonModules || {};

const lesson5 = {
    vocabulary: [
        {
            "en": "to live",
            "es": "vivir",
            "example": "I live in the city.",
            "audio": "L5_live_audio"
        },
        {
            "en": "to eat",
            "es": "comer",
            "example": "We eat dinner at home.",
            "audio": "L5_eat_audio"
        },
        {
            "en": "to help",
            "es": "ayudar",
            "example": "I help my friends.",
            "audio": "L5_help_audio"
        },
        {
            "en": "to bring",
            "es": "traer",
            "example": "Please bring your book.",
            "audio": "L5_bring_audio"
        },
        {
            "en": "to like",
            "es": "gustar; simpatizar",
            "example": "I like to read.",
            "audio": "L5_like_audio"
        },
        {
            "en": "can",
            "es": "poder",
            "example": "I can help you.",
            "audio": "L5_can_audio"
        },
        {
            "en": "candy",
            "es": "dulces",
            "example": "I like candy.",
            "audio": "L5_candy_audio"
        },
        {
            "en": "of",
            "es": "de",
            "example": "The book of my friend.",
            "audio": "L5_of_audio"
        },
        {
            "en": "very",
            "es": "muy",
            "example": "It's very good.",
            "audio": "L5_very_audio"
        },
        {
            "en": "many",
            "es": "muchos",
            "example": "There are many books.",
            "audio": "L5_many_audio"
        },
        {
            "en": "some",
            "es": "alguno(s)",
            "example": "Some students are here.",
            "audio": "L5_some_audio"
        },
        {
            "en": "everything",
            "es": "todo, todas las cosas",
            "example": "Everything is ready.",
            "audio": "L5_everything_audio"
        },
        {
            "en": "that",
            "es": "ese, esa; aquel, aquella, aquello",
            "example": "That book is mine.",
            "audio": "L5_that_audio"
        },
        {
            "en": "that one",
            "es": "ése, ésa; aquél, aquélla",
            "example": "That one is blue.",
            "audio": "L5_thatone_audio"
        },
        {
            "en": "those",
            "es": "esos, esas; aquellos, aquellas; ésos, ésas; aquéllos, aquéllas",
            "example": "Those books are new.",
            "audio": "L5_those_audio"
        },
        {
            "en": "the United States",
            "es": "(los) Estados Unidos",
            "example": "I live in the United States.",
            "audio": "L5_us_audio"
        },
        {
            "en": "street",
            "es": "calle",
            "example": "I live on this street.",
            "audio": "L5_street_audio"
        },
        {
            "en": "city",
            "es": "ciudad",
            "example": "This is a big city.",
            "audio": "L5_city_audio"
        },
        {
            "en": "park",
            "es": "parque; jardín",
            "example": "The park is beautiful.",
            "audio": "L5_park_audio"
        },
        {
            "en": "dinner",
            "es": "la comida principal",
            "example": "Dinner is ready.",
            "audio": "L5_dinner_audio"
        },
        {
            "en": "six",
            "es": "6",
            "example": "I have six books.",
            "audio": "L5_six_audio"
        },
        {
            "en": "seven",
            "es": "7",
            "example": "There are seven days in a week.",
            "audio": "L5_seven_audio"
        },
        {
            "en": "eight",
            "es": "8",
            "example": "I have eight pencils.",
            "audio": "L5_eight_audio"
        },
        {
            "en": "nine",
            "es": "9",
            "example": "There are nine students.",
            "audio": "L5_nine_audio"
        },
        {
            "en": "ten",
            "es": "10",
            "example": "I have ten books.",
            "audio": "L5_ten_audio"
        }
    ],

    // Teaching concepts for Lesson 5
    teachingConcepts: {
        title: "MODISMOS",
        explanation: "Los siguientes modismos son expresiones comunes en inglés.",
        commonPhrases: [
            { en: "Here it is.", es: "Aquí está." },
            { en: "It's very big.", es: "Es muy grande." },
            { en: "It's very little.", es: "Es muy chico." },
            { en: "There's room.", es: "Hay lugar." },
            { en: "There's no room.", es: "No hay lugar." },
            { en: "He's very nice.", es: "El es muy simpático (agradable)." },
            { en: "The car is very nice.", es: "El coche es muy bonito." },
            { en: "He can read, write, etc.", es: "Él sabe leer, escribir, etc." },
            { en: "all the boys, girls, books, etc.", es: "todos los muchachos, muchachas, libros, etc." }
        ]
    },

    // Exercise arrays
    translationExercise1: [
        { q: "I live in the city.", a: "Yo vivo en la ciudad.", audio: "L5_ex1_1" },
        { q: "We eat dinner at home.", a: "Nosotros comemos la cena en casa.", audio: "L5_ex1_2" },
        { q: "Can you help me?", a: "¿Puede ayudarme?", audio: "L5_ex1_3" },
        { q: "Please bring your book.", a: "Por favor traiga su libro.", audio: "L5_ex1_4" },
        { q: "I like candy.", a: "Me gustan los dulces.", audio: "L5_ex1_5" }
    ],

    translationExercise2: [
        { q: "This street is very long.", a: "Esta calle es muy larga.", audio: "L5_ex2_1" },
        { q: "Those books are from the United States.", a: "Esos libros son de los Estados Unidos.", audio: "L5_ex2_2" },
        { q: "There are many parks in the city.", a: "Hay muchos parques en la ciudad.", audio: "L5_ex2_3" },
        { q: "Some students live here.", a: "Algunos estudiantes viven aquí.", audio: "L5_ex2_4" },
        { q: "Everything is very nice.", a: "Todo es muy bonito.", audio: "L5_ex2_5" }
    ],

    translationExercise3: [
        { q: "I don't live in the city.", a: "No vivo en la ciudad.", audio: "L5_ex3_1" },
        { q: "We don't eat dinner at home.", a: "No comemos la cena en casa.", audio: "L5_ex3_2" },
        { q: "He can't help you.", a: "Él no puede ayudarte.", audio: "L5_ex3_3" },
        { q: "I don't like that book.", a: "No me gusta ese libro.", audio: "L5_ex3_4" },
        { q: "They don't bring candy.", a: "Ellos no traen dulces.", audio: "L5_ex3_5" }
    ],

    translationExercise4: [
        {
            q: "I live in the city",
            forms: {
                affirmative: "I live in the city",
                negative: "I don't live in the city",
                interrogative: "Do I live in the city?",
                negativeInterrogative: "Don't I live in the city?"
            },
            audio: "L5_ex4_1"
        },
        {
            q: "He can help",
            forms: {
                affirmative: "He can help",
                negative: "He can't help",
                interrogative: "Can he help?",
                negativeInterrogative: "Can't he help?"
            },
            audio: "L5_ex4_2"
        },
        {
            q: "They bring books",
            forms: {
                affirmative: "They bring books",
                negative: "They don't bring books",
                interrogative: "Do they bring books?",
                negativeInterrogative: "Don't they bring books?"
            },
            audio: "L5_ex4_3"
        }
    ],

    fillInExercise5: [
        { q: "I ___ (live) in the United States.", a: "live" },
        { q: "She ___ (eat) dinner at six.", a: "eats" },
        { q: "They ___ (help) their friends.", a: "help" },
        { q: "He ___ (bring) candy to school.", a: "brings" },
        { q: "We ___ (like) this city.", a: "like" }
    ],

    translationExercise6: [
        { q: "Do you live here?", a: "¿Vives aquí?", audio: "L5_ex6_1" },
        { q: "Can she help?", a: "¿Puede ella ayudar?", audio: "L5_ex6_2" },
        { q: "Don't they eat dinner?", a: "¿No comen ellos la cena?", audio: "L5_ex6_3" },
        { q: "Can't he bring it?", a: "¿No puede él traerlo?", audio: "L5_ex6_4" },
        { q: "Do you like the city?", a: "¿Te gusta la ciudad?", audio: "L5_ex6_5" }
    ],

    translationExercise7: [
        { q: "I live and work in the city.", a: "Vivo y trabajo en la ciudad.", audio: "L5_ex7_1" },
        { q: "She eats candy and likes it.", a: "Ella come dulces y le gustan.", audio: "L5_ex7_2" },
        { q: "They help and bring books.", a: "Ellos ayudan y traen libros.", audio: "L5_ex7_3" },
        { q: "This street is very long and nice.", a: "Esta calle es muy larga y bonita.", audio: "L5_ex7_4" },
        { q: "The park is big and beautiful.", a: "El parque es grande y hermoso.", audio: "L5_ex7_5" }
    ],

    translationExercise8: [
        { q: "I can help you with everything.", a: "Puedo ayudarte con todo.", audio: "L5_ex8_1" },
        { q: "She lives in that big city.", a: "Ella vive en esa gran ciudad.", audio: "L5_ex8_2" },
        { q: "They bring many books to school.", a: "Ellos traen muchos libros a la escuela.", audio: "L5_ex8_3" },
        { q: "We like those parks very much.", a: "Nos gustan mucho esos parques.", audio: "L5_ex8_4" },
        { q: "He can read and write very well.", a: "Él puede leer y escribir muy bien.", audio: "L5_ex8_5" }
    ],

    // Initialize the lesson
    initialize: async function() {
        console.log('Starting Lesson 5 initialization...');
        
        // Initialize lesson state with vocabulary
        window.lessonStates = window.lessonStates || {};
        window.lessonStates['lesson5'] = {
            currentFlashcardIndex: 0,
            isFlipped: false,
            vocabulary: this.vocabulary,
            initialized: true
        };

        try {
            // Initialize flashcards
            await window.flashcardModule.initializeFlashcards(this.vocabulary);

            // Initialize all exercises
            const exercise1Container = document.getElementById('exercise1-L5');
            if (exercise1Container) {
                window.exerciseModule.initializeExercise(exercise1Container, this.translationExercise1, 'translation');
            }

            const exercise2Container = document.getElementById('exercise2-L5');
            if (exercise2Container) {
                window.exerciseModule.initializeExercise(exercise2Container, this.translationExercise2, 'translation');
            }

            const exercise3Container = document.getElementById('exercise3-L5');
            if (exercise3Container) {
                window.exerciseModule.initializeExercise(exercise3Container, this.translationExercise3, 'translation');
            }

            const exercise4Container = document.getElementById('exercise4-L5');
            if (exercise4Container) {
                window.exerciseModule.initializeExercise(exercise4Container, this.translationExercise4, 'multiForm', {
                    formTypes: ['negative', 'interrogative', 'negativeInterrogative'],
                    labels: ['Forma Negativa', 'Forma Interrogativa', 'Forma Interrogativa Negativa']
                });
            }

            const exercise5Container = document.getElementById('exercise5-L5');
            if (exercise5Container) {
                window.exerciseModule.initializeExercise(exercise5Container, this.fillInExercise5, 'fillIn');
            }

            const exercise6Container = document.getElementById('exercise6-L5');
            if (exercise6Container) {
                window.exerciseModule.initializeExercise(exercise6Container, this.translationExercise6, 'translation');
            }

            const exercise7Container = document.getElementById('exercise7-L5');
            if (exercise7Container) {
                window.exerciseModule.initializeExercise(exercise7Container, this.translationExercise7, 'translation');
            }

            const exercise8Container = document.getElementById('exercise8-L5');
            if (exercise8Container) {
                window.exerciseModule.initializeExercise(exercise8Container, this.translationExercise8, 'translation');
            }

            console.log('Lesson 5 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 5 initialization:', error);
            throw error;
        }
    }
};

// Add the lesson to the global lessons object
window.lessonModules.lesson5 = lesson5; 