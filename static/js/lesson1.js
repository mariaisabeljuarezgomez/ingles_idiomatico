// static/js/lesson1.js
(function() {
    if (!window.lessonModules) {
        window.lessonModules = {};
    }

    const lessonIdInternal = 'L1'; // For internal use, e.g., logging

    const lesson1Data = {
        vocabulary: [
            // IMPORTANT: Verify these audio paths are EXACTLY correct for your file structure
            // They should start with /static/ if your audio folder is directly under static
            { en: "I", es: "yo", example: "I am a student.", audio: "/static/audio/lesson1/i.mp3" },
            { en: "you", es: "tú", example: "You are my friend.", audio: "/static/audio/lesson1/you.mp3" },
            { en: "you", es: "Ud.", example: "You are the teacher.", audio: "/static/audio/lesson1/L1_youUds_audio.mp3" }, // Example: if filename is L1_youUds_audio.mp3
            { en: "he", es: "él", example: "He is my brother.", audio: "/static/audio/lesson1/he.mp3" },
            { en: "she", es: "ella", example: "She is my sister.", audio: "/static/audio/lesson1/she.mp3" },
            { en: "it", es: "(cosa)", example: "It is a book.", audio: "/static/audio/lesson1/it.mp3" },
            { en: "we", es: "nosotros", example: "We are students.", audio: "/static/audio/lesson1/we.mp3" },
            // { en: "you", es: "Uds.", example: "You are teachers.", audio: "/static/audio/lesson1/youUds.mp3" }, // Duplicated 'you Ud.'?
            { en: "they", es: "ellos", example: "They are my friends.", audio: "/static/audio/lesson1/theyM.mp3" },
            { en: "they", es: "ellas", example: "They are my sisters.", audio: "/static/audio/lesson1/theyF.mp3" },
            { en: "they", es: "(cosas)", example: "They are books.", audio: "/static/audio/lesson1/theyThings.mp3" },
            { en: "no", es: "no", example: "No, I am not.", audio: "/static/audio/lesson1/no.mp3" },
            { en: "to be", es: "ser, estar", example: "To be or not to be.", audio: "/static/audio/lesson1/toBe.mp3" },
            // From your original lesson1.html data-attributes
            { en: "Student", es: "Estudiante", audio: "/static/audio/lesson1/student.mp3", example: "This is a student." },
            { en: "Teacher", es: "Profesor/a", audio: "/static/audio/lesson1/teacher.mp3", example: "The teacher is here." },
            { en: "Happy", es: "Feliz", audio: "/static/audio/lesson1/happy.mp3", example: "I am happy." },
            { en: "Sad", es: "Triste", audio: "/static/audio/lesson1/sad.mp3", example: "He is sad." },
            { en: "Home", es: "Casa", audio: "/static/audio/lesson1/home.mp3", example: "She is at home." },
            { en: "School", es: "Escuela", audio: "/static/audio/lesson1/school.mp3", example: "They are at school." }
        ],
        // Add your exercise data here if you have it structured
        // exercise1Data: [ { q: "I ___ a student.", a: "am" }, ... ],
        // exercise2Data: [ { q: "Yo estoy en casa.", a: "I am at home." }, ... ],
    };

    window.lessonModules.lesson1 = { // Register this lesson's module
        initialize: function() {
            console.log(`LESSON 1 (${lessonIdInternal}): Custom initialize function called.`);
            
            // Initialize Vocabulary Flashcards for the specific section in lesson1.html
            if (window.lessonModules.flashcards && typeof window.lessonModules.flashcards.init === 'function') {
                // The 'flashcard-section-1' is the ID of the div that contains this set of flashcards
                // in your static/lessons_html/lesson1.html file.
                window.lessonModules.flashcards.init(lessonIdInternal, lesson1Data.vocabulary, 'flashcard-section-1');
            } else {
                console.error("LESSON 1: Flashcard module or its init function not found!");
            }

            // Initialize Exercises for Lesson 1
            // This assumes you have a global window.exerciseModule.initializeExercise function
            // if (window.exerciseModule && typeof window.exerciseModule.initializeExercise === 'function') {
            //     const ex1Container = document.querySelector('#lesson-content-display #exercise1-L1');
            //     if (ex1Container && lesson1Data.exercise1Data) {
            //         window.exerciseModule.initializeExercise(ex1Container, lesson1Data.exercise1Data, 'fill-in-the-blank', lessonIdInternal, 'ex1');
            //     }
            //     // ... initialize other exercises for Lesson 1 ...
            // } else {
            //     console.warn("LESSON 1: exerciseModule not found, skipping exercise initialization.");
            // }
            console.log(`LESSON 1 (${lessonIdInternal}): Initialization finished.`);
        },
        cleanup: function() {
            console.log(`LESSON 1 (${lessonIdInternal}): Cleanup called.`);
            if (window.lessonModules.flashcards && typeof window.lessonModules.flashcards.cleanup === 'function') {
                window.lessonModules.flashcards.cleanup();
            }
            // Add cleanup for exercises if needed
        }
    };
})();