// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson7 = {
    vocabulary: [
    {
        "en": "for",
        "es": "para, por",
            "example": "This book is for you."
    },
    {
        "en": "going to",
        "es": "ir a",
        "example": "I am going to study."
    },
    {
        "en": "tomorrow",
        "es": "mañana",
            "example": "I am going to work tomorrow."
        },
        {
            "en": "later",
            "es": "más tarde",
            "example": "I will see you later."
        },
        {
            "en": "next",
            "es": "próximo/a, siguiente",
            "example": "Next week I am going to travel."
        },
        {
            "en": "soon",
            "es": "pronto",
            "example": "I am going to eat soon."
        },
        {
            "en": "tonight",
            "es": "esta noche",
            "example": "We are going to study tonight."
        },
        {
            "en": "weekend",
            "es": "fin de semana",
            "example": "What are you going to do this weekend?"
        },
        {
            "en": "month",
            "es": "mes",
            "example": "Next month I am going to visit my family."
        },
        {
            "en": "year",
            "es": "año",
            "example": "Next year I am going to learn French."
    }
    ],

    forPrepositionExercises: [
        { q: "Este libro es para ti →", a: "This book is for you" },
        { q: "La carta es para Juan →", a: "The letter is for Juan" },
        { q: "El regalo es para ella →", a: "The present is for her" },
        { q: "Esto es para nosotros →", a: "This is for us" },
        { q: "Los libros son para ellos →", a: "The books are for them" },
        { q: "El mensaje es para María →", a: "The message is for Maria" }
    ],

    futureExercises: [
        { q: "Voy a estudiar →", a: "I am going to study" },
        { q: "Él va a trabajar →", a: "He is going to work" },
        { q: "Ella va a leer →", a: "She is going to read" },
        { q: "Vamos a escribir →", a: "We are going to write" },
        { q: "Van a comer →", a: "They are going to eat" },
        { q: "Va a dormir →", a: "He/She is going to sleep" }
    ],

    timeExpressionExercises: [
        { q: "mañana →", a: "tomorrow" },
        { q: "más tarde →", a: "later" },
        { q: "la próxima semana →", a: "next week" },
        { q: "pronto →", a: "soon" },
        { q: "esta noche →", a: "tonight" },
        { q: "el próximo mes →", a: "next month" }
    ],

    combinedExercises: [
        { q: "Voy a estudiar mañana →", a: "I am going to study tomorrow" },
        { q: "Él va a trabajar más tarde →", a: "He is going to work later" },
        { q: "Ella va a leer esta noche →", a: "She is going to read tonight" },
        { q: "Vamos a escribir pronto →", a: "We are going to write soon" },
        { q: "Van a comer el próximo mes →", a: "They are going to eat next month" },
        { q: "Va a dormir la próxima semana →", a: "He/She is going to sleep next week" }
    ],

    translationExercises: [
        { q: "¿Qué vas a hacer? →", a: "What are you going to do?" },
        { q: "Voy a ir a casa →", a: "I am going to go home" },
        { q: "¿Va ella a estudiar? →", a: "Is she going to study?" },
        { q: "No vamos a trabajar →", a: "We are not going to work" },
        { q: "¿Van ellos a venir? →", a: "Are they going to come?" },
        { q: "No voy a dormir →", a: "I am not going to sleep" }
],

    // Initialize the lesson
    initialize: function(container) {
        // Initialize flashcards
        flashcardModule.initializeFlashcards(container, this.vocabulary);
        
        // Add other lesson content and exercises here
    }
};

// Register the lesson module
window.lessonModules.lesson7 = lesson7;