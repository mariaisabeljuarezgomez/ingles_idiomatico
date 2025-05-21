window.lessonModules = window.lessonModules || {};

const lesson1 = {
    vocabulary: [
        {
            "en": "I",
            "es": "yo",
            "example": "I am a student.",
            "audio": "L1_I_audio"
        },
        {
            "en": "you",
            "es": "tú",
            "example": "You are my friend.",
            "audio": "L1_you_audio"
        },
        {
            "en": "you",
            "es": "Ud.",
            "example": "You are the teacher.",
            "audio": "L1_youUd_audio"
        },
        {
            "en": "he",
            "es": "él",
            "example": "He is my brother.",
            "audio": "L1_he_audio"
        },
        {
            "en": "she",
            "es": "ella",
            "example": "She is my sister.",
            "audio": "L1_she_audio"
        },
        {
            "en": "it",
            "es": "(cosa)",
            "example": "It is a book.",
            "audio": "L1_it_audio"
        },
        {
            "en": "we",
            "es": "nosotros",
            "example": "We are students.",
            "audio": "L1_we_audio"
        },
        {
            "en": "you",
            "es": "Uds.",
            "example": "You are teachers.",
            "audio": "L1_youUds_audio"
        },
        {
            "en": "they",
            "es": "ellos",
            "example": "They are my friends.",
            "audio": "L1_theyM_audio"
        },
        {
            "en": "they",
            "es": "ellas",
            "example": "They are my sisters.",
            "audio": "L1_theyF_audio"
        },
        {
            "en": "they",
            "es": "(cosas)",
            "example": "They are books.",
            "audio": "L1_theyThings_audio"
        },
        {
            "en": "no",
            "es": "no",
            "example": "No, I am not.",
            "audio": "L1_no_audio"
        },
        {
            "en": "to be",
            "es": "ser, estar",
            "example": "To be or not to be.",
            "audio": "L1_toBe_audio"
        }
    ],

    // Teaching concepts for Lesson 1
    teachingConcepts: {
        title: "EL TIEMPO PRESENTE DEL VERBO BE",
        explanation: "Los infinitivos en inglés se forman colocando la partícula to antes del verbo. Así, to be forma un infinitivo con la partícula to antes del verbo be. Los infinitivos en castellano se forman con las terminaciones ar, er, ir. To be equivale a ser (terminación er) o estar (terminación ar). En inglés no se puede sobreentender el pronombre como en castellano. Siempre hay que expresarlo.",
        beAffirmative: [
            { en: "I am", es: "(yo) soy, estoy" },
            { en: "you are", es: "(tú) eres, estás" },
            { en: "you are", es: "(Ud.) es, está" },
            { en: "he is", es: "(él) es, está" },
            { en: "she is", es: "(ella) es, está" },
            { en: "it is", es: "(cosa) es, está" },
            { en: "we are", es: "(nosotros) somos, estamos" },
            { en: "you are", es: "(Uds.) son, están" },
            { en: "they are", es: "(ellos) son, están" },
            { en: "they are", es: "(ellas) son, están" },
            { en: "they are", es: "(cosas) son, están" }
        ]
    },

    beVerbExercises: [
        { q: "yo soy → ", a: "I am" },
        { q: "ella está → ", a: "she is" },
        { q: "ellos son → ", a: "they are" },
        { q: "nosotros estamos → ", a: "we are" },
        { q: "tú eres → ", a: "you are" },
        { q: "Ud. está → ", a: "you are" },
        { q: "él es → ", a: "he is" },
        { q: "es (cosa) → ", a: "it is" },
        { q: "Uds. son → ", a: "you are" },
        { q: "ellas están → ", a: "they are" }
    ],

    beVerbNegativeExercises: [
        { q: "no soy", a: "I'm not" },
        { q: "tú no eres", a: "you aren't" },
        { q: "Ud. no es", a: "you aren't" },
        { q: "él no es", a: "he isn't" },
        { q: "ella no es", a: "she isn't" },
        { q: "no es (cosa)", a: "it isn't" },
        { q: "no somos", a: "we aren't" },
        { q: "Uds. no son", a: "you aren't" },
        { q: "ellos no son", a: "they aren't" },
        { q: "ellas no son", a: "they aren't" },
        { q: "yo no estoy", a: "I'm not" },
        { q: "tú no estás", a: "you aren't" },
        { q: "Ud. no está", a: "you aren't" },
        { q: "él no está", a: "he isn't" },
        { q: "ella no está", a: "she isn't" },
        { q: "no está (cosa)", a: "it isn't" },
        { q: "nosotros no estamos", a: "we aren't" },
        { q: "Uds. no están", a: "you aren't" },
        { q: "ellos no están", a: "they aren't" },
        { q: "ellas no están", a: "they aren't" }
    ],

    changeToNegativeExercises: [
        { q: "he is", a: "he isn't" },
        { q: "we are", a: "we aren't" },
        { q: "they are", a: "they aren't" },
        { q: "I am", a: "I'm not" },
        { q: "she is", a: "she isn't" },
        { q: "you are", a: "you aren't" },
        { q: "I am", a: "I'm not" },
        { q: "it is", a: "it isn't" },
        { q: "you are", a: "you aren't" },
        { q: "we are", a: "we aren't" },
        { q: "he is", a: "he isn't" },
        { q: "they are", a: "they aren't" },
        { q: "she is", a: "she isn't" },
        { q: "I am", a: "I'm not" },
        { q: "it is", a: "it isn't" },
        { q: "we are", a: "we aren't" }
    ],

    interrogativeExercises: [
        { q: "¿soy?", a: "am I?" },
        { q: "¿eres?", a: "are you?" },
        { q: "¿es Ud.?", a: "are you?" },
        { q: "¿es él?", a: "is he?" },
        { q: "¿es ella?", a: "is she?" },
        { q: "¿es? (cosa)", a: "is it?" },
        { q: "¿somos?", a: "are we?" },
        { q: "¿son Uds.?", a: "are you?" },
        { q: "¿son ellos?", a: "are they?" },
        { q: "¿son ellas?", a: "are they?" },
        { q: "¿estoy?", a: "am I?" },
        { q: "¿estás?", a: "are you?" },
        { q: "¿está Ud.?", a: "are you?" },
        { q: "¿está él?", a: "is he?" },
        { q: "¿está ella?", a: "is she?" },
        { q: "¿está? (cosa)", a: "is it?" }
    ],

    negativeInterrogativeExercises: [
        { q: "¿no soy yo?", a: "am I not?" },
        { q: "¿no eres tú?", a: "aren't you?" },
        { q: "¿no es Ud.?", a: "aren't you?" },
        { q: "¿no es él?", a: "isn't he?" },
        { q: "¿no es ella?", a: "isn't she?" },
        { q: "¿no es? (cosa)", a: "isn't it?" },
        { q: "¿no somos nosotros?", a: "aren't we?" },
        { q: "¿no son Uds.?", a: "aren't you?" },
        { q: "¿no son ellos?", a: "aren't they?" },
        { q: "¿no son ellas?", a: "aren't they?" },
        { q: "¿no estoy yo?", a: "am I not?" },
        { q: "¿no estás tú?", a: "aren't you?" },
        { q: "¿no está Ud.?", a: "aren't you?" },
        { q: "¿no está él?", a: "isn't he?" },
        { q: "¿no está ella?", a: "isn't she?" },
        { q: "¿no está? (cosa)", a: "isn't it?" },
        { q: "¿no estamos nosotros?", a: "aren't we?" },
        { q: "¿no están Uds.?", a: "aren't you?" },
        { q: "¿no están ellos?", a: "aren't they?" },
        { q: "¿no están ellas?", a: "aren't they?" }
    ],

    allFormsExercises: [
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?",
                negativeInterrogative: "aren't we?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?",
                negativeInterrogative: "aren't they?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?",
                negativeInterrogative: "isn't she?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?",
                negativeInterrogative: "aren't you?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?",
                negativeInterrogative: "isn't it?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?",
                negativeInterrogative: "aren't you?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?",
                negativeInterrogative: "aren't we?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?",
                negativeInterrogative: "aren't they?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?",
                negativeInterrogative: "isn't she?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?",
                negativeInterrogative: "isn't it?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        }
    ],

    mixedTranslationExercises: [
        { q: "él es", a: "he is" },
        { q: "él no es", a: "he isn't" },
        { q: "¿es él?", a: "is he?" },
        { q: "¿no es él?", a: "isn't he?" },
        { q: "tú estás", a: "you are" },
        { q: "tú no estás", a: "you aren't" },
        { q: "¿estás tú?", a: "are you?" },
        { q: "¿no estás?", a: "aren't you?" },
        { q: "somos", a: "we are" },
        { q: "nosotros no somos", a: "we aren't" }
    ],

    pronounExercises: [
        { q: "___ am a teacher. (yo)", a: "I" },
        { q: "___ is from Spain. (ella)", a: "She" },
        { q: "___ are students. (ellos)", a: "They" },
        { q: "___ is a book. (ello)", a: "It" },
        { q: "___ are happy. (nosotros)", a: "We" }
    ],

    dictationSentences: [
        { text: "I am a student.", audio: "L1_dict1_audio" },
        { text: "She is not here.", audio: "L1_dict2_audio" },
        { text: "They are teachers.", audio: "L1_dict3_audio" },
        { text: "We aren't at home.", audio: "L1_dict4_audio" }
    ],

    conversationQuestions: [
        { q: "Are you a student?", audio: "L1_conv1_audio" },
        { q: "Is she your teacher?", audio: "L1_conv2_audio" },
        { q: "Are they in class?", audio: "L1_conv3_audio" },
        { q: "Is the book here?", audio: "L1_conv4_audio" }
    ],

    // Adding new translation exercise
    translationExercise1: [
        { q: "yo soy", a: "I am" },
        { q: "tú eres", a: "you are" },
        { q: "Ud. es", a: "you are" },
        { q: "él es", a: "he is" },
        { q: "ella es", a: "she is" },
        { q: "es (cosa)", a: "it is" },
        { q: "nosotros somos", a: "we are" },
        { q: "Uds. son", a: "you are" },
        { q: "ellos son", a: "they are" },
        { q: "ellas son", a: "they are" },
        { q: "yo estoy", a: "I am" },
        { q: "tú estás", a: "you are" },
        { q: "Ud. está", a: "you are" },
        { q: "él está", a: "he is" },
        { q: "ella está", a: "she is" },
        { q: "estamos", a: "we are" },
        { q: "Uds. están", a: "you are" },
        { q: "ellos están", a: "they are" },
        { q: "ellas están", a: "they are" },
        { q: "eres", a: "you are" },
        { q: "él está", a: "he is" },
        { q: "soy", a: "I am" },
        { q: "ellos son", a: "they are" },
        { q: "ella está", a: "she is" },
        { q: "nosotros estamos", a: "we are" },
        { q: "es (cosa)", a: "it is" },
        { q: "tú estás", a: "you are" },
        { q: "nosotros somos", a: "we are" },
        { q: "Uds. están", a: "you are" },
        { q: "están (cosas)", a: "they are" }
    ],

    // Adding teaching concept about 'not'
    notTeachingConcept: {
        title: "EL USO DE LA PARTÍCULA NOT",
        explanation: "La palabra not se usa en inglés para negar con verbos. En general se coloca inmediatamente después del verbo. En las siguientes frases I am not, he is not, they are not, we are not, nótese que el verbo y la partícula not se escriben como dos palabras separadas. Esto es muy común en el inglés escrito. En conversación, sin embargo, el verbo y la partícula not se juntan para formar una contracción, la que se usa con gran frecuencia y casi sin excepción. En la primera persona del singular la contracción es I'm not. La contracción de is not es la palabra isn't y de are not es la palabra aren't.",
        beNegative: [
            { en: "I'm not", es: "(yo) no soy, no estoy" },
            { en: "you aren't", es: "(tú) no eres, no estás" },
            { en: "you aren't", es: "(Ud.) no es, no está" },
            { en: "he isn't", es: "(él) no es, no está" },
            { en: "she isn't", es: "(ella) no es, no está" },
            { en: "it isn't", es: "(cosa) no es, no está" },
            { en: "we aren't", es: "(nosotros) no somos, no estamos" },
            { en: "you aren't", es: "(Uds.) no son, no están" },
            { en: "they aren't", es: "(ellos) no son, no están" },
            { en: "they aren't", es: "(ellas) no son, no están" },
            { en: "they aren't", es: "(cosas) no son, no están" }
        ]
    },

    // Adding Exercise 2 - Translation of negative sentences
    translationExercise2: [
        { q: "no soy", a: "I'm not" },
        { q: "tú no eres", a: "you aren't" },
        { q: "Ud. no es", a: "you aren't" },
        { q: "él no es", a: "he isn't" },
        { q: "ella no es", a: "she isn't" },
        { q: "no es (cosa)", a: "it isn't" },
        { q: "no somos", a: "we aren't" },
        { q: "Uds, no son", a: "you aren't" },
        { q: "ellos no son", a: "they aren't" },
        { q: "ellas no son", a: "they aren't" },
        { q: "yo no estoy", a: "I'm not" },
        { q: "tú no estás", a: "you aren't" },
        { q: "Ud. no está", a: "you aren't" },
        { q: "él no está", a: "he isn't" },
        { q: "ella no está", a: "she isn't" },
        { q: "no está (cosa)", a: "it isn't" },
        { q: "nosotros no estamos", a: "we aren't" },
        { q: "Uds. no están", a: "you aren't" },
        { q: "ellos no están", a: "they aren't" },
        { q: "ellas no están", a: "they aren't" },
        { q: "tú no eres", a: "you aren't" },
        { q: "él no es", a: "he isn't" },
        { q: "ellas no están", a: "they aren't" },
        { q: "yo no estoy", a: "I'm not" },
        { q: "Uds. no están", a: "you aren't" },
        { q: "ella no es", a: "she isn't" },
        { q: "yo no estoy", a: "I'm not" },
        { q: "Ud. no está", a: "you aren't" },
        { q: "tú no estás", a: "you aren't" },
        { q: "él no está", a: "he isn't" }
    ],

    // Adding Exercise 4 - Translation of interrogative sentences
    translationExercise4: [
        { q: "¿soy?", a: "am I?" },
        { q: "¿eres?", a: "are you?" },
        { q: "¿es Ud.?", a: "are you?" },
        { q: "¿es él?", a: "is he?" },
        { q: "¿es ella?", a: "is she?" },
        { q: "¿es? (cosa)", a: "is it?" },
        { q: "¿somos?", a: "are we?" },
        { q: "¿son Uds.?", a: "are you?" },
        { q: "¿son ellos?", a: "are they?" },
        { q: "¿son ellas?", a: "are they?" },
        { q: "¿estoy?", a: "am I?" },
        { q: "¿estás?", a: "are you?" },
        { q: "¿está Ud.?", a: "are you?" },
        { q: "¿está él?", a: "is he?" },
        { q: "¿está ella?", a: "is she?" },
        { q: "¿está? (cosa)", a: "is it?" },
        { q: "¿estamos?", a: "are we?" },
        { q: "¿están Uds.?", a: "are you?" },
        { q: "¿están ellos?", a: "are they?" },
        { q: "¿están ellas?", a: "are they?" },
        { q: "¿eres?", a: "are you?" },
        { q: "¿está él?", a: "is he?" },
        { q: "¿son ellos?", a: "are they?" },
        { q: "¿ella está?", a: "is she?" },
        { q: "¿nosotros estamos?", a: "are we?" },
        { q: "¿es (cosa)?", a: "is it?" },
        { q: "¿tú estás?", a: "are you?" },
        { q: "¿nosotros somos?", a: "are we?" },
        { q: "¿Uds. están?", a: "are you?" },
        { q: "¿están (cosas)?", a: "are they?" }
    ],

    // Adding teaching concept about interrogative form of be
    beInterrogativeConcept: {
        title: "Be Interrogativo",
        explanation: "La forma interrogativa del verbo be se forma colocando el verbo antes del sustantivo o pronombre.",
        beInterrogative: [
            { en: "am I?", es: "¿soy yo? ¿estoy yo?" },
            { en: "are you?", es: "¿eres tú? ¿estás tú?" },
            { en: "are you?", es: "¿es Ud.? ¿está Ud.?" },
            { en: "is he?", es: "¿es él? ¿está él?" },
            { en: "is she?", es: "¿es ella? ¿está ella?" },
            { en: "is it?", es: "¿es? (cosa) ¿está? (cosa)" },
            { en: "are we?", es: "¿somos nosotros? ¿estamos nosotros?" },
            { en: "are you?", es: "¿son Uds.? ¿están Uds.?" },
            { en: "are they?", es: "¿son ellos? ¿están ellos?" },
            { en: "are they?", es: "¿son ellas? ¿están ellas?" },
            { en: "are they?", es: "¿son? (cosas) ¿están? (cosas)" }
        ]
    },

    // Exercise 5 - Change to negative and interrogative
    allFormsExercise5: [
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?"
            }
        }
    ],

    // Adding teaching concept about negative interrogative form of be
    beNegativeInterrogativeConcept: {
        title: "Be Interrogativo Negativo",
        explanation: "La forma interrogativa negativa del verbo be se forma colocando la contracción del negativo antes del sustantivo o pronombre. Fíjese que en la primera persona singular no es posible ninguna contracción con am y not.",
        beNegativeInterrogative: [
            { en: "am I not?", es: "¿no soy yo? ¿no estoy yo?" },
            { en: "aren't you?", es: "¿no eres tú? ¿no estás tú?" },
            { en: "aren't you?", es: "¿no es Ud.? ¿no está Ud.?" },
            { en: "isn't he?", es: "¿no es él? ¿no está el?" },
            { en: "isn't she?", es: "¿no es ella? ¿no está ella?" },
            { en: "isn't it?", es: "¿no es? (cosa) ¿no está? (cosa)" },
            { en: "aren't we?", es: "¿no somos nosotros? ¿no estamos nosotros?" },
            { en: "aren't you?", es: "¿no son Uds.? ¿no están Uds.?" },
            { en: "aren't they?", es: "¿no son ellos? ¿no están ellos?" },
            { en: "aren't they?", es: "¿no son ellas? ¿no están ellas?" },
            { en: "aren't they?", es: "¿no son? (cosas) ¿no están? (cosas)" }
        ]
    },

    // Exercise 6 - Mixed translation exercises
    mixedTranslationExercise6: [
        { q: "¿no soy yo?", a: "am I not?" },
        { q: "¿no eres tú?", a: "aren't you?" },
        { q: "¿no es Ud.?", a: "aren't you?" },
        { q: "¿no es él?", a: "isn't he?" },
        { q: "¿no es ella?", a: "isn't she?" },
        { q: "¿no es? (cosa)", a: "isn't it?" },
        { q: "¿no somos nosotros?", a: "aren't we?" },
        { q: "¿no son Uds.?", a: "aren't you?" },
        { q: "¿no son ellos?", a: "aren't they?" },
        { q: "¿no son ellas?", a: "aren't they?" },
        { q: "¿no estoy yo?", a: "am I not?" },
        { q: "¿no estás tú?", a: "aren't you?" },
        { q: "¿no está Ud.?", a: "aren't you?" },
        { q: "¿no está él?", a: "isn't he?" },
        { q: "¿no está ella?", a: "isn't she?" },
        { q: "¿no está? (cosa)", a: "isn't it?" },
        { q: "¿no estamos nosotros?", a: "aren't we?" },
        { q: "¿no están Uds.?", a: "aren't you?" },
        { q: "¿no están ellos?", a: "aren't they?" },
        { q: "¿no están ellas?", a: "aren't they?" },
        { q: "¿no está él?", a: "isn't he?" },
        { q: "es (cosa)", a: "it is" },
        { q: "¿es? (cosa)", a: "is it?" },
        { q: "¿no es? (cosa)", a: "isn't it?" },
        { q: "ella está", a: "she is" },
        { q: "ella no está", a: "she isn't" },
        { q: "¿está ella?", a: "is she?" },
        { q: "¿no está ella?", a: "isn't she?" },
        { q: "son (cosas)", a: "they are" },
        { q: "no son (cosas)", a: "they aren't" },
        { q: "¿son? (cosas)", a: "are they?" },
        { q: "¿no son? (cosas)", a: "aren't they?" }
    ],

    // Exercise 7 - All forms transformation
    allFormsExercise7: [
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?",
                negativeInterrogative: "aren't we?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?",
                negativeInterrogative: "aren't they?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?",
                negativeInterrogative: "isn't she?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?",
                negativeInterrogative: "aren't you?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?",
                negativeInterrogative: "isn't it?"
            }
        },
        { 
            q: "you are",
            forms: {
                negative: "you aren't",
                interrogative: "are you?",
                negativeInterrogative: "aren't you?"
            }
        },
        { 
            q: "we are",
            forms: {
                negative: "we aren't",
                interrogative: "are we?",
                negativeInterrogative: "aren't we?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        },
        { 
            q: "they are",
            forms: {
                negative: "they aren't",
                interrogative: "are they?",
                negativeInterrogative: "aren't they?"
            }
        },
        { 
            q: "she is",
            forms: {
                negative: "she isn't",
                interrogative: "is she?",
                negativeInterrogative: "isn't she?"
            }
        },
        { 
            q: "I am",
            forms: {
                negative: "I'm not",
                interrogative: "am I?",
                negativeInterrogative: "am I not?"
            }
        },
        { 
            q: "it is",
            forms: {
                negative: "it isn't",
                interrogative: "is it?",
                negativeInterrogative: "isn't it?"
            }
        },
        { 
            q: "he is",
            forms: {
                negative: "he isn't",
                interrogative: "is he?",
                negativeInterrogative: "isn't he?"
            }
        }
    ],

    // Exercise 8 - Final mixed translation exercise
    mixedTranslationExercise8: [
        { q: "él es", a: "he is" },
        { q: "él no es", a: "he isn't" },
        { q: "¿es él?", a: "is he?" },
        { q: "¿no es él?", a: "isn't he?" },
        { q: "tú estás", a: "you are" },
        { q: "tú no estás", a: "you aren't" },
        { q: "¿estás tú?", a: "are you?" },
        { q: "¿no estás?", a: "aren't you?" },
        { q: "somos", a: "we are" },
        { q: "nosotros no somos", a: "we aren't" }
    ],

    initialize: async function() {
        console.log('Starting Lesson 1 initialization...');
        
        // Initialize lesson state
        window.lessonStates['L1'] = {
            currentFlashcardIndex: 0,
            isFlipped: false,
            vocabulary: lesson1.vocabulary,
            initialized: true
        };

        try {
            // Display initial flashcard
            window.displayFlashcard('L1');
            
            // Initialize exercises
            await this.initializeExercises();
            
            console.log('Lesson 1 initialization completed successfully');
        } catch (error) {
            console.error('Error during Lesson 1 initialization:', error);
            throw error;
        }
    },

    initializeExercises: async function() {
        // Initialize exercises
        const exercise1Container = document.getElementById('exercise1-L1');
        if (exercise1Container) {
            window.exerciseModule.initializeExercise(exercise1Container, this.beVerbExercises, 'translation');
        }

        const exercise2Container = document.getElementById('exercise2-L1');
        if (exercise2Container) {
            window.exerciseModule.initializeExercise(exercise2Container, this.translationExercise2, 'translation');
        }

        const exercise3Container = document.getElementById('exercise3-L1');
        if (exercise3Container) {
            window.exerciseModule.initializeExercise(exercise3Container, this.changeToNegativeExercises, 'translation');
        }

        const exercise4Container = document.getElementById('exercise4-L1');
        if (exercise4Container) {
            window.exerciseModule.initializeExercise(exercise4Container, this.translationExercise4, 'translation');
        }

        const exercise5Container = document.getElementById('exercise5-L1');
        if (exercise5Container) {
            window.exerciseModule.initializeExercise(exercise5Container, this.allFormsExercise5, 'multiForm', {
                formTypes: ['negative', 'interrogative'],
                labels: ['Negativo:', 'Interrogativo:']
            });
        }

        const exercise6Container = document.getElementById('exercise6-L1');
        if (exercise6Container) {
            window.exerciseModule.initializeExercise(exercise6Container, this.mixedTranslationExercise6, 'translation');
        }

        const exercise7Container = document.getElementById('exercise7-L1');
        if (exercise7Container) {
            window.exerciseModule.initializeExercise(exercise7Container, this.allFormsExercise7, 'multiForm', {
                formTypes: ['negative', 'interrogative', 'negativeInterrogative'],
                labels: ['Negativo:', 'Interrogativo:', 'Interrogativo Negativo:']
            });
        }

        const exercise8Container = document.getElementById('exercise8-L1');
        if (exercise8Container) {
            window.exerciseModule.initializeExercise(exercise8Container, this.mixedTranslationExercise8, 'translation');
        }
    }
};

// Register the lesson module
window.lessonModules.lesson1 = lesson1;

// Export initialize function to global scope
window.initializeLesson1 = lesson1.initialize;

// Flashcard navigation functions
function prevFlashcard(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) return;
    
    state.currentFlashcardIndex = (state.currentFlashcardIndex - 1 + state.vocabulary.length) % state.vocabulary.length;
    state.isFlipped = false;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    displayFlashcard(lessonId);
}

function nextFlashcard(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) return;
    
    state.currentFlashcardIndex = (state.currentFlashcardIndex + 1) % state.vocabulary.length;
    state.isFlipped = false;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    displayFlashcard(lessonId);
}

function flipFlashcard(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state) return;
    
    state.isFlipped = !state.isFlipped;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.toggle('flipped');
    }
}

function displayFlashcard(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) return;
    
    const currentWord = state.vocabulary[state.currentFlashcardIndex];
    if (!currentWord) return;
    
    const wordElement = document.querySelector('.flashcard-word');
    const exampleElement = document.querySelector('.flashcard-example');
    const translationElement = document.querySelector('.flashcard-translation');
    
    if (wordElement) wordElement.textContent = currentWord.en;
    if (exampleElement) exampleElement.textContent = currentWord.example;
    if (translationElement) translationElement.textContent = currentWord.es;
} 