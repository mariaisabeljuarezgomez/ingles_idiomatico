// Script to update all lesson files
const fs = require('fs');
const path = require('path');

// Template for lesson file
const lessonTemplate = (lessonNum, vocabulary) => `// Initialize lesson module
window.lessonModules = window.lessonModules || {};

const lesson${lessonNum} = {
    vocabulary: ${JSON.stringify(vocabulary, null, 4)},

    // Initialize the lesson
    initialize: function(container) {
        // Initialize flashcards
        flashcardModule.initializeFlashcards(container, this.vocabulary);
        
        // Add other lesson content and exercises here
    }
};

// Register the lesson module
window.lessonModules.lesson${lessonNum} = lesson${lessonNum};`;

// Example vocabulary for each lesson (you should customize this)
const lessonsVocabulary = {
    2: [
        { en: "the", es: "el, la, los, las", example: "The car is red." },
        { en: "yes", es: "sí", example: "Yes, I am." },
        { en: "boy", es: "muchacho, niño", example: "The boy is young." },
        // ... add more vocabulary
    ],
    3: [
        { en: "in", es: "en", example: "The book is in the bag." },
        { en: "on", es: "sobre, encima de", example: "The book is on the table." },
        { en: "one", es: "uno", example: "I have one book." },
        // ... add more vocabulary
    ],
    4: [
        { en: "there is", es: "hay (singular)", example: "There is a book on the table." },
        { en: "there are", es: "hay (plural)", example: "There are books on the table." },
        { en: "this", es: "este, esta", example: "This is a book." },
        // ... add more vocabulary
    ],
    5: [
        { en: "of", es: "de", example: "The book of the teacher." },
        { en: "my", es: "mi", example: "This is my book." },
        { en: "your", es: "tu, su", example: "This is your book." },
        // ... add more vocabulary
    ],
    6: [
        { en: "home", es: "casa, hogar", example: "I am at home." },
        { en: "going", es: "yendo, ir", example: "I am going home." },
        { en: "walking", es: "caminando", example: "He is walking to school." },
        // ... add more vocabulary
    ],
    7: [
        { en: "for", es: "para, por", example: "This is for you." },
        { en: "going to", es: "ir a", example: "I am going to study." },
        { en: "tomorrow", es: "mañana", example: "I will study tomorrow." },
        // ... add more vocabulary
    ],
    8: [
        { en: "Monday", es: "lunes", example: "I study on Monday." },
        { en: "Tuesday", es: "martes", example: "The class is on Tuesday." },
        { en: "'s", es: "de (posesivo)", example: "John's book." },
        // ... add more vocabulary
    ],
    9: [
        { en: "do", es: "hacer", example: "Do you study English?" },
        { en: "does", es: "hace", example: "Does he study English?" },
        { en: "study", es: "estudiar", example: "Study English!" },
        // ... add more vocabulary
    ],
    10: [
        { en: "have", es: "tener", example: "I have a book." },
        { en: "has", es: "tiene", example: "She has a book." },
        { en: "had", es: "tenía, tuvo", example: "I had a book." },
        // ... add more vocabulary
    ]
};

// Update each lesson file
for (let i = 2; i <= 10; i++) {
    const lessonContent = lessonTemplate(i, lessonsVocabulary[i]);
    fs.writeFileSync(path.join(__dirname, `lesson${i}.js`), lessonContent);
}

console.log('All lesson files have been updated!'); 