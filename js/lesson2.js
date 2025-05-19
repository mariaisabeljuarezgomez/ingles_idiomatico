// Lesson 2 Module
window.lessonModules = window.lessonModules || {};

const lesson2 = {
    vocabulary: [
    {
        "en": "the",
        "es": "el, la, los, las",
            "example": "The car is red.",
            "audio": "L2_the_audio"
    },
    {
        "en": "yes",
        "es": "sí",
            "example": "Yes, I understand.",
            "audio": "L2_yes_audio"
    },
    {
        "en": "boy",
        "es": "muchacho, niño",
            "example": "The boy is playing.",
            "audio": "L2_boy_audio"
        },
        {
            "en": "girl",
            "es": "muchacha, niña",
            "example": "The girl is reading.",
            "audio": "L2_girl_audio"
        },
        {
            "en": "man",
            "es": "hombre, señor",
            "example": "The man is walking.",
            "audio": "L2_man_audio"
        },
        {
            "en": "woman",
            "es": "mujer, señorita, señora",
            "example": "The woman is teaching.",
            "audio": "L2_woman_audio"
        },
        {
            "en": "house",
            "es": "casa",
            "example": "The house is big.",
            "audio": "L2_house_audio"
        },
        {
            "en": "car",
            "es": "coche, carro",
            "example": "The car is new.",
            "audio": "L2_car_audio"
        },
        {
            "en": "big",
            "es": "grande, alto",
            "example": "The house is big.",
            "audio": "L2_big_audio"
        },
        { en: "little", es: "pequeño, chico", example: "The little dog." },
        { en: "small", es: "pequeño, chico", example: "A small book." },
        { en: "old", es: "viejo, grande (edad)", example: "The old car." },
        { en: "young", es: "joven", example: "A young student." },
        { en: "new", es: "nuevo", example: "A new computer." },
        { en: "red", es: "rojo", example: "The red apple." },
        { en: "green", es: "verde", example: "The green tree." },
        { en: "American", es: "americano", example: "An American student." },
        { en: "Mexican", es: "mexicano", example: "Mexican food." },
        { en: "where", es: "dónde", example: "Where is the book?" },
        { en: "apple", es: "manzana", example: "A red apple." },
        { en: "sweet", es: "dulce", example: "The sweet candy." },
        { en: "desk", es: "escritorio", example: "The book is on the desk." },
        { en: "brown", es: "color café", example: "The brown table." }
    ],

    // Teaching concepts for Lesson 2
    teachingConcepts: {
        title: "MODISMOS COMUNES",
        explanation: "Los siguientes modismos son expresiones comunes en inglés para saludos y descripciones de personas.",
        commonPhrases: [
            { en: "hello", es: "hola" },
            { en: "good-bye", es: "adiós" },
            { en: "good morning", es: "buenos días" },
            { en: "good afternoon", es: "buenas tardes" },
            { en: "good evening", es: "buenas noches (para saludar)" },
            { en: "good night", es: "buenas noches (para despedirse)" },
            { en: "the young man (boy)", es: "el joven" },
            { en: "the young woman (girl)", es: "la joven" },
            { en: "the old man", es: "el anciano" },
            { en: "the old woman", es: "la anciana" }
        ]
    },

    // Exercise arrays
    translationExercise1: [
        { q: "I am Mexican.", a: "Yo soy mexicano.", audio: "L2_ex1_1" },
        { q: "You are American.", a: "Tú eres americano.", audio: "L2_ex1_2" },
        { q: "He is old.", a: "Él es viejo.", audio: "L2_ex1_3" },
        { q: "She is young.", a: "Ella es joven.", audio: "L2_ex1_4" },
        { q: "It is new.", a: "Es nuevo.", audio: "L2_ex1_5" },
        { q: "We are Mexican.", a: "Nosotros somos mexicanos.", audio: "L2_ex1_6" },
        { q: "They are American.", a: "Ellos son americanos.", audio: "L2_ex1_7" },
        { q: "I'm not Mexican.", a: "Yo no soy mexicano.", audio: "L2_ex1_8" },
        { q: "You aren't American.", a: "Tú no eres americano.", audio: "L2_ex1_9" },
        { q: "He isn't old.", a: "Él no es viejo.", audio: "L2_ex1_10" },
        { q: "She isn't young.", a: "Ella no es joven.", audio: "L2_ex1_11" },
        { q: "It isn't new.", a: "No es nuevo.", audio: "L2_ex1_12" },
        { q: "We aren't Mexican.", a: "Nosotros no somos mexicanos.", audio: "L2_ex1_13" },
        { q: "They aren't American.", a: "Ellos no son americanos.", audio: "L2_ex1_14" },
        { q: "Where are they?", a: "¿Dónde están ellos?", audio: "L2_ex1_15" },
        { q: "Where is he?", a: "¿Dónde está él?", audio: "L2_ex1_16" },
        { q: "Are you Mexican?", a: "¿Eres mexicano?", audio: "L2_ex1_17" },
        { q: "Aren't you American?", a: "¿No eres americano?", audio: "L2_ex1_18" },
        { q: "Isn't he young?", a: "¿No es él joven?", audio: "L2_ex1_19" },
        { q: "Are they old?", a: "¿Son viejos?", audio: "L2_ex1_20" },
        { q: "Are you American?", a: "¿Eres americano?", audio: "L2_ex1_21" },
        { q: "Where are they?", a: "¿Dónde están ellos?", audio: "L2_ex1_22" },
        { q: "They are red.", a: "Son rojos.", audio: "L2_ex1_23" },
        { q: "Aren't they sweet?", a: "¿No son dulces?", audio: "L2_ex1_24" }
    ],

    translationExercise2: [
        { q: "el anciano", a: "the old man" },
        { q: "la manzana grande", a: "the big apple" },
        { q: "los escritorios nuevos", a: "the new desks" },
        { q: "el joven", a: "the young man" },
        { q: "el coche pequeño", a: "the little car" },
        { q: "el coche viejo", a: "the old car" },
        { q: "la joven", a: "the young woman" },
        { q: "el señor", a: "the man" },
        { q: "la señorita", a: "the young woman" }
    ],

    translationExercise3: [
        { q: "The new car is red.", a: "El coche nuevo es rojo.", audio: "L2_ex4_1" },
        { q: "The old car is green.", a: "El coche viejo es verde.", audio: "L2_ex4_2" },
        { q: "Where are the little girls?", a: "¿Dónde están las muchachas pequeñas?", audio: "L2_ex4_3" },
        { q: "The apple is sweet.", a: "La manzana es dulce.", audio: "L2_ex4_4" },
        { q: "Where is the young woman?", a: "¿Dónde está la joven?", audio: "L2_ex4_5" },
        { q: "Where are the small cars?", a: "¿Dónde están los coches pequeños?", audio: "L2_ex4_6" }
    ],

    translationExercise4: [
        { 
            q: "The young man is big.",
            forms: {
                affirmative: "The young man is big.",
                negative: "The young man isn't big.",
                interrogative: "Is the young man big?",
                negativeInterrogative: "Isn't the young man big?"
            }
        },
        { 
            q: "The new cars are red.",
            forms: {
                affirmative: "The new cars are red.",
                negative: "The new cars aren't red.",
                interrogative: "Are the new cars red?",
                negativeInterrogative: "Aren't the new cars red?"
            }
        },
        { 
            q: "The little house is green.",
            forms: {
                affirmative: "The little house is green.",
                negative: "The little house isn't green.",
                interrogative: "Is the little house green?",
                negativeInterrogative: "Isn't the little house green?"
            }
        },
        { 
            q: "The Mexican boy is big.",
            forms: {
                affirmative: "The Mexican boy is big.",
                negative: "The Mexican boy isn't big.",
                interrogative: "Is the Mexican boy big?",
                negativeInterrogative: "Isn't the Mexican boy big?"
            }
        },
        { 
            q: "The American girl is little.",
            forms: {
                affirmative: "The American girl is little.",
                negative: "The American girl isn't little.",
                interrogative: "Is the American girl little?",
                negativeInterrogative: "Isn't the American girl little?"
            }
        },
        { 
            q: "The small houses are old.",
            forms: {
                affirmative: "The small houses are old.",
                negative: "The small houses aren't old.",
                interrogative: "Are the small houses old?",
                negativeInterrogative: "Aren't the small houses old?"
            }
        }
    ],

    fillInExercise5: [
        { q: "The apples _______ small.", a: "are", translation: "Las manzanas son pequeñas.", audio: "L2_ex6_1" },
        { q: "The girls _______ Mexican.", a: "are", translation: "Las muchachas son mexicanas.", audio: "L2_ex6_2" },
        { q: "He _______ young.", a: "is", translation: "Él es joven.", audio: "L2_ex6_3" },
        { q: "The new cars _______ green.", a: "are", translation: "Los coches nuevos son verdes.", audio: "L2_ex6_4" },
        { q: "We _______ American boys.", a: "are", translation: "Somos muchachos americanos.", audio: "L2_ex6_5" },
        { q: "The girls _______ little.", a: "are", translation: "Las muchachas son pequeñas.", audio: "L2_ex6_6" },
        { q: "It _______ red.", a: "is", translation: "Es rojo.", audio: "L2_ex6_7" },
        { q: "They _______ young girls.", a: "are", translation: "Son muchachas jóvenes.", audio: "L2_ex6_8" },
        { q: "The big cars _______ old.", a: "are", translation: "Los coches grandes son viejos.", audio: "L2_ex6_9" },
        { q: "The Mexican man _______ old.", a: "is", translation: "El hombre mexicano es viejo.", audio: "L2_ex6_10" }
    ],

    translationExercise6: [
        { q: "The boy is little.", a: "El muchacho es pequeño.", audio: "L2_ex7_1" },
        { q: "The boy isn't little.", a: "El muchacho no es pequeño.", audio: "L2_ex7_2" },
        { q: "Is the boy little?", a: "¿Es el muchacho pequeño?", audio: "L2_ex7_3" },
        { q: "Isn't the boy little?", a: "¿No es el muchacho pequeño?", audio: "L2_ex7_4" },
        { q: "Where's the boy?", a: "¿Dónde está el muchacho?", audio: "L2_ex7_5" },
        { q: "The boys are young.", a: "Los muchachos son jóvenes.", audio: "L2_ex7_6" },
        { q: "The boys aren't young.", a: "Los muchachos no son jóvenes.", audio: "L2_ex7_7" },
        { q: "Are the boys young?", a: "¿Son los muchachos jóvenes?", audio: "L2_ex7_8" },
        { q: "Aren't the boys young?", a: "¿No son los muchachos jóvenes?", audio: "L2_ex7_9" },
        { q: "The man is American.", a: "El hombre es americano.", audio: "L2_ex7_10" },
        { q: "The man isn't American.", a: "El hombre no es americano.", audio: "L2_ex7_11" },
        { q: "Is the man American?", a: "¿Es el hombre americano?", audio: "L2_ex7_12" },
        { q: "Isn't the man American?", a: "¿No es el hombre americano?", audio: "L2_ex7_13" },
        { q: "Where's the man?", a: "¿Dónde está el hombre?", audio: "L2_ex7_14" },
        { q: "The big house is new.", a: "La casa grande es nueva.", audio: "L2_ex7_15" },
        { q: "The big house isn't new.", a: "La casa grande no es nueva.", audio: "L2_ex7_16" },
        { q: "Is the big house new?", a: "¿Es nueva la casa grande?", audio: "L2_ex7_17" },
        { q: "Isn't the big house new?", a: "¿No es nueva la casa grande?", audio: "L2_ex7_18" },
        { q: "It's brown.", a: "Es café.", audio: "L2_ex7_19" },
        { q: "It isn't brown.", a: "No es café.", audio: "L2_ex7_20" },
        { q: "Is it brown?", a: "¿Es café?", audio: "L2_ex7_21" },
        { q: "Isn't it brown?", a: "¿No es café?", audio: "L2_ex7_22" }
    ],

    translationExercise7: [
        { q: "The brown desk is new.", a: "El escritorio café es nuevo.", audio: "L2_ex8_1" },
        { q: "The American girls aren't little.", a: "Las muchachas americanas no son pequeñas.", audio: "L2_ex8_2" },
        { q: "Is the new car red?", a: "¿Es rojo el coche nuevo?", audio: "L2_ex8_3" },
        { q: "No, the new car isn't red. It's green.", a: "No, el coche nuevo no es rojo. Es verde.", audio: "L2_ex8_4" },
        { q: "Where is the little boy?", a: "¿Dónde está el muchacho pequeño?", audio: "L2_ex8_5" },
        { q: "Isn't the young woman Mexican?", a: "¿No es mexicana la joven?", audio: "L2_ex8_6" },
        { q: "Are the houses big? Yes, they're big.", a: "¿Son grandes las casas? Sí, son grandes.", audio: "L2_ex8_7" },
        { q: "They aren't little boys. They're young girls.", a: "No son muchachos pequeños. Son muchachas jóvenes.", audio: "L2_ex8_8" },
        { q: "Where are the American girls?", a: "¿Dónde están las muchachas americanas?", audio: "L2_ex8_9" },
        { q: "Aren't the apples sweet?", a: "¿No son dulces las manzanas?", audio: "L2_ex8_10" }
    ],

    translationExercise8: [
        { q: "¿Es Ud. mexicano?", a: "Are you Mexican?" },
        { q: "No, no soy mexicano. Soy americano.", a: "No, I'm not Mexican. I'm American." },
        { q: "Los muchachos son jóvenes.", a: "The boys are young." },
        { q: "Las muchachas grandes no son mexicanas.", a: "The big girls aren't Mexican." },
        { q: "Las casas son rojas.", a: "The houses are red." },
        { q: "¿Dónde está el muchacho pequeño?", a: "Where is the little boy?" },
        { q: "¿No es rojo el coche nuevo?", a: "Isn't the new car red?" },
        { q: "Sí, el coche nuevo es rojo.", a: "Yes, the new car is red." },
        { q: "¿Dónde están las muchachas americanas?", a: "Where are the American girls?" },
        { q: "El no es viejo. Es joven.", a: "He isn't old. He's young." }
    ],

    // Initialize the lesson
    initialize: async function() {
        console.log('Starting Lesson 2 initialization...');
        
        // Initialize lesson state with vocabulary
        window.lessonStates['L2'] = {
            currentFlashcardIndex: 0,
            isFlipped: false,
            vocabulary: lesson2.vocabulary,
            initialized: true
        };

        try {
            // Display initial flashcard
            window.displayFlashcard('L2');
            
            // Initialize exercises
            await this.initializeExercises();
            
            console.log('Lesson 2 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 2 initialization:', error);
            throw error;
        }
    },

    initializeExercises: async function() {
        // Initialize exercises
        const exercise1Container = document.getElementById('exercise1-L2');
        if (exercise1Container) {
            window.exerciseModule.initializeExercise(exercise1Container, this.translationExercise1, 'translation');
        }

        const exercise2Container = document.getElementById('exercise2-L2');
        if (exercise2Container) {
            window.exerciseModule.initializeExercise(exercise2Container, this.translationExercise2, 'translation');
        }

        const exercise3Container = document.getElementById('exercise3-L2');
        if (exercise3Container) {
            window.exerciseModule.initializeExercise(exercise3Container, this.translationExercise3, 'translation');
        }

        const exercise4Container = document.getElementById('exercise4-L2');
        if (exercise4Container) {
            window.exerciseModule.initializeExercise(exercise4Container, this.translationExercise4, 'multiForm', {
                formTypes: ['negative', 'interrogative', 'negativeInterrogative'],
                labels: ['Forma Negativa', 'Forma Interrogativa', 'Forma Interrogativa Negativa']
            });
        }

        const exercise5Container = document.getElementById('exercise5-L2');
        if (exercise5Container) {
            window.exerciseModule.initializeExercise(exercise5Container, this.fillInExercise5, 'fillIn');
        }

        const exercise6Container = document.getElementById('exercise6-L2');
        if (exercise6Container) {
            window.exerciseModule.initializeExercise(exercise6Container, this.translationExercise6, 'translation');
        }

        const exercise7Container = document.getElementById('exercise7-L2');
        if (exercise7Container) {
            window.exerciseModule.initializeExercise(exercise7Container, this.translationExercise7, 'translation');
        }

        const exercise8Container = document.getElementById('exercise8-L2');
        if (exercise8Container) {
            window.exerciseModule.initializeExercise(exercise8Container, this.translationExercise8, 'translation');
        }
    }
};

// Register the lesson module
window.lessonModules.lesson2 = lesson2;