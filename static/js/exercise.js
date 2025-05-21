// Exercise functionality module
const exerciseModule = {
    // Initialize an exercise section
    initializeExercise: function(container, exercises, type, options = {}) {
        if (!container || !exercises || !Array.isArray(exercises)) {
            console.error('Invalid exercise initialization parameters');
            return;
        }

        console.log(`Initializing ${type} exercise with ${exercises.length} items`);

        // Clear existing content
        container.innerHTML = '';

        // Create exercise items
        exercises.forEach((exercise, index) => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.className = 'exercise-item mb-4 p-4 border rounded-lg bg-white shadow-sm';

            let exerciseContent = '';
            switch (type) {
                case 'translation':
                    exerciseContent = this.createTranslationExercise(exercise, index);
                    break;
                case 'fillIn':
                    exerciseContent = this.createFillInExercise(exercise, index);
                    break;
                case 'multiForm':
                    exerciseContent = this.createMultiFormExercise(exercise, index, options);
                    break;
                case 'conversation':
                    exerciseContent = this.createConversationExercise(exercise, index, options);
                    break;
                case 'dictation':
                    exerciseContent = this.createDictationExercise(exercise, index);
                    break;
                case 'preposition':
                    exerciseContent = this.createPrepositionExercise(exercise, index);
                    break;
                case 'thereIs':
                    exerciseContent = this.createThereIsExercise(exercise, index);
                    break;
                case 'thisThese':
                    exerciseContent = this.createThisTheseExercise(exercise, index);
                    break;
                default:
                    console.error('Unknown exercise type:', type);
                    return;
            }

            exerciseDiv.innerHTML = exerciseContent;
            container.appendChild(exerciseDiv);

            // Add event listeners for inputs in this exercise item
            const inputs = exerciseDiv.querySelectorAll('.interactive-input');
            inputs.forEach(input => {
                // Remove the input event listener
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        this.checkAnswer(input);
                    }
                });
                
                // Check answer when moving to next question
                input.addEventListener('blur', () => {
                    if (input.value.trim().length > 0) {
                        this.checkAnswer(input);
                    }
                });
            });
        });

        console.log(`Exercise initialization complete. Added ${exercises.length} items.`);
    },

    // Create a fill-in-the-blank exercise
    createFillInExercise: function(exercise, index) {
        // Create audio button if audio property exists
        const audioButton = exercise.audio ? `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace('_______', '').replace(/'/g, "\\'")}'))"
                    title="Escuchar pronunciación">
                <i class="fas fa-volume-up"></i>
            </button>` : '';

        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <div class="exercise-header flex items-center gap-2 mb-2">
                        ${audioButton}
                        <p class="exercise-text">${exercise.q}</p>
                    </div>
                    <div class="exercise-input-container">
                        <input type="text" 
                               class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                               data-correct="${exercise.a}"
                               placeholder="Escribe tu respuesta aquí...">
                        <div class="feedback mt-2"></div>
                        <p class="text-sm text-gray-600 mt-1">${exercise.translation || ''}</p>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a translation exercise
    createTranslationExercise: function(exercise, index) {
        console.log('Creating translation exercise:', exercise);
        
        // Only create audio button if audio property exists AND the question is in English
        // Simple check: if the question contains Spanish-specific characters like ¿ or á, it's Spanish
        const isSpanish = /[¿¡áéíóúñÁÉÍÓÚÑ]/.test(exercise.q);
        const audioButton = (exercise.audio && !isSpanish) ? `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace(/'/g, "\\'")}'))"
                    title="Escuchar pronunciación">
                <i class="fas fa-volume-up"></i>
            </button>` : '';

        const translationAnswer = exercise.a || exercise.translation; // Support both a and translation properties
        console.log('Translation answer:', translationAnswer);

        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <div class="exercise-header flex items-center gap-2 mb-2">
                        ${audioButton}
                        <p class="exercise-text">${exercise.q}</p>
                    </div>
                    <div class="exercise-input-container">
                        <input type="text" 
                               class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                               data-correct="${translationAnswer}"
                               placeholder="Traduce esta oración...">
                        <div class="feedback mt-2"></div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a multiple choice exercise
    createMultipleChoiceExercise: function(exercise, index) {
        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <p class="mb-2">${exercise.q}</p>
                    <div class="options-container">
                        ${exercise.options.map((option, optIndex) => `
                            <label class="block mb-2">
                                <input type="radio" 
                                       name="exercise-${index}" 
                                       value="${option}"
                                       class="interactive-input mr-2"
                                       data-correct="${exercise.a}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <div class="feedback mt-2 hidden"></div>
                </div>
            </div>
        `;
    },

    // Create a this/these exercise
    createThisTheseExercise: function(exercise, index) {
        // Create audio button for the complete English sentence
        const audioButton = `
            <button class="audio-btn" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.audio.replace(/'/g, "\\'")}'))"
                    title="Listen to pronunciation">
                <i class="fas fa-volume-up"></i>
            </button>`;

        // Check if the answer contains a comma, indicating multiple answers needed
        const needsMultipleInputs = exercise.a.includes(',');
        
        const inputBoxes = needsMultipleInputs ? `
            <div class="flex gap-4 mb-2">
                <input type="text" 
                       class="interactive-input w-48 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                       data-correct="${exercise.a.split(',')[0]}"
                       placeholder="First this/these/this one...">
                <input type="text" 
                       class="interactive-input w-48 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                       data-correct="${exercise.a.split(',')[1]}"
                       placeholder="Second this/these/this one...">
            </div>` : `
            <div class="flex gap-4 mb-2">
                <input type="text" 
                       class="interactive-input w-48 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                       data-correct="${exercise.a}"
                       placeholder="This/These/This one...">
            </div>`;

        return `
            <div class="exercise-item mb-4 p-4 border rounded-lg bg-white shadow-sm">
                <div class="flex items-start gap-4">
                    <span class="font-semibold text-sky-700">${index + 1}.</span>
                    <div class="flex-1">
                        <div class="exercise-header flex items-center gap-2 mb-3">
                            ${audioButton}
                            <p class="font-medium">${exercise.q}</p>
                        </div>
                        <div class="exercise-input-container">
                            ${inputBoxes}
                            <input type="text" 
                                   class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.translation}"
                                   placeholder="Traducción completa...">
                            <div class="feedback mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a basic exercise
    createBasicExercise: function(exercise, index) {
        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <p class="mb-2">${exercise.q}</p>
                    <input type="text" 
                           class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                           data-correct="${exercise.a}"
                           placeholder="Write your answer...">
                    <div class="feedback mt-2 hidden"></div>
                </div>
            </div>
        `;
    },

    // Create a multi-form exercise
    createMultiFormExercise: function(exercise, index, options) {
        const { formTypes = [], labels = [] } = options;
        
        // Create audio button for the original English sentence
        const audioButton = `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace(/'/g, "\\'")}'))"
                    title="Listen to pronunciation">
                <i class="fas fa-volume-up"></i>
            </button>`;

        const inputFields = formTypes.map((formType, i) => {
            // Only create audio buttons for English forms (not the first form which is Spanish)
            const formAudioButton = (i > 0) ? `
                <button class="audio-button" 
                        onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.forms[formType].replace(/'/g, "\\'")}'))"
                        title="Listen to pronunciation">
                    <i class="fas fa-volume-up"></i>
                </button>` : '';

            return `
                <div class="mb-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">${labels[i] || formType}</label>
                    <div class="exercise-input-container">
                        <div class="flex items-center gap-2">
                            ${formAudioButton}
                            <input type="text" 
                                   class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.forms[formType]}"
                                   data-form-type="${formType}"
                                   placeholder="${i === 0 ? 'Escribe la traducción en español...' : 'Write the English form...'}">
                        </div>
                        <div class="feedback mt-2"></div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="exercise-item mb-4 p-4 border rounded-lg bg-white shadow-sm">
                <div class="flex items-start gap-4">
                    <span class="font-semibold text-sky-700">${index + 1}.</span>
                    <div class="flex-1">
                        <div class="exercise-header flex items-center gap-2 mb-3">
                            ${audioButton}
                            <p class="font-medium">${exercise.q}</p>
                        </div>
                        <div class="multi-form-inputs">
                            ${inputFields}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a conversation exercise with affirmative and negative responses
    createConversationExercise: function(exercise, index, options = {}) {
        const { labels = {} } = options;
        
        // Create audio button for the question
        const audioButton = exercise.audio ? `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace(/'/g, "\\'")}'))"
                    title="Escuchar pronunciación">
                <i class="fas fa-volume-up"></i>
            </button>` : '';

        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <div class="exercise-header flex items-center gap-2 mb-3">
                        ${audioButton}
                        <p class="font-medium">${exercise.q}</p>
                    </div>
                    <div class="conversation-inputs space-y-3">
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                ${labels.affirmative || 'Respuesta Afirmativa:'}
                            </label>
                            <input type="text" 
                                   class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.affirmative}"
                                   placeholder="Escribe la respuesta afirmativa...">
                            <div class="feedback mt-2"></div>
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                ${labels.negative || 'Respuesta Negativa:'}
                            </label>
                            <input type="text" 
                                   class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.negative}"
                                   placeholder="Escribe la respuesta negativa...">
                            <div class="feedback mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a dictation exercise
    createDictationExercise: function(exercise, index) {
        return `
            <div class="dictation-item mb-6 p-4 border rounded-lg bg-white shadow-sm">
                <div class="flex items-center gap-4">
                    <p class="font-medium text-lg">${index + 1}. ${exercise.text}</p>
                    <div class="flex gap-3">
                        <button class="audio-btn reference-audio px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg" 
                                onclick="window.lessonModules.lesson3.playAudio('${exercise.audio}')" 
                                title="Listen to correct pronunciation">
                            <i class="fas fa-volume-up text-blue-600"></i>
                        </button>
                        <button class="record-btn px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg" 
                                onclick="window.lessonModules.lesson3.startRecording('${exercise.audio}')" 
                                title="Record your voice">
                            <i class="fas fa-microphone text-red-600"></i>
                        </button>
                        <button class="play-recording-btn px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg" 
                                onclick="window.lessonModules.lesson3.playRecording('${exercise.audio}')" 
                                title="Play your recording" disabled>
                            <i class="fas fa-play text-green-600"></i>
                        </button>
                    </div>
                </div>
                <div class="recording-status mt-2 text-sm text-gray-600"></div>
            </div>
        `;
    },

    // Create a preposition exercise
    createPrepositionExercise: function(exercise, index) {
        const audioButton = exercise.audio ? `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace(/'/g, "\\'")}'))"
                    title="Escuchar pronunciación">
                <i class="fas fa-volume-up"></i>
            </button>` : '';

        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <div class="exercise-header flex items-center gap-2 mb-2">
                        ${audioButton}
                        <p class="exercise-text">${exercise.q}</p>
                    </div>
                    <div class="exercise-input-container">
                        <div class="flex gap-4 mb-2">
                            <input type="text" 
                                   class="interactive-input w-32 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.prep}"
                                   placeholder="Preposición...">
                            <input type="text" 
                                   class="interactive-input flex-1 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                   data-correct="${exercise.a}"
                                   placeholder="Traducción completa...">
                        </div>
                        <div class="feedback mt-2"></div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a transformation exercise
    createTransformationExercise: function(exercise, index) {
        const audioButton = exercise.audio ? `
            <button class="audio-button" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.q.replace(/'/g, "\\'")}'))"
                    title="Escuchar pronunciación">
                <i class="fas fa-volume-up"></i>
            </button>` : '';

        return `
            <div class="flex items-start gap-4">
                <span class="font-semibold text-sky-700">${index + 1}.</span>
                <div class="flex-1">
                    <div class="exercise-header flex items-center gap-2 mb-2">
                        ${audioButton}
                        <p class="exercise-text">${exercise.q}</p>
                    </div>
                    <div class="exercise-input-container">
                        <div class="grid grid-cols-1 gap-2">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Traducción normal:</label>
                                <input type="text" 
                                       class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.forms.normal}"
                                       placeholder="Traducción normal...">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Forma negativa:</label>
                                <input type="text" 
                                       class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.forms.negative}"
                                       placeholder="Forma negativa...">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Forma interrogativa:</label>
                                <input type="text" 
                                       class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.forms.interrogative}"
                                       placeholder="Forma interrogativa...">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Forma interrogativa negativa:</label>
                                <input type="text" 
                                       class="interactive-input w-full p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.forms.interrogativeNegative}"
                                       placeholder="Forma interrogativa negativa...">
                            </div>
                        </div>
                        <div class="feedback mt-2"></div>
                    </div>
                </div>
            </div>
        `;
    },

    // Create a there is/there are exercise
    createThereIsExercise: function(exercise, index) {
        // Create audio button for the complete English sentence
        const audioButton = `
            <button class="audio-btn" 
                    onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${exercise.audio.replace(/'/g, "\\'")}'))"
                    title="Listen to pronunciation">
                <i class="fas fa-volume-up"></i>
            </button>`;

        return `
            <div class="exercise-item mb-4 p-4 border rounded-lg bg-white shadow-sm">
                <div class="flex items-start gap-4">
                    <span class="font-semibold text-sky-700">${index + 1}.</span>
                    <div class="flex-1">
                        <div class="exercise-header flex items-center gap-2 mb-3">
                            ${audioButton}
                            <p class="font-medium">${exercise.q}</p>
                        </div>
                        <div class="exercise-input-container">
                            <div class="flex gap-4 mb-2">
                                <input type="text" 
                                       class="interactive-input w-48 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.a}"
                                       placeholder="There is/are...">
                                <input type="text" 
                                       class="interactive-input flex-1 p-2 border rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500" 
                                       data-correct="${exercise.translation}"
                                       placeholder="Traducción completa...">
                            </div>
                            <div class="feedback mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // Check an answer
    checkAnswer: function(input) {
        console.log('Checking answer:', input.value);
        
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.correct.toLowerCase();
        const feedbackDiv = input.parentElement.querySelector('.feedback') || input.closest('.exercise-input-container').querySelector('.feedback');

        if (!feedbackDiv) {
            console.error('Feedback div not found');
            return;
        }

        // Clear any previous feedback
        input.classList.remove('border-green-500', 'border-red-500');
        
        // For thisThese exercises with multiple inputs, check if all inputs are correct
        const exerciseContainer = input.closest('.exercise-input-container');
        if (exerciseContainer) {
            const allInputs = exerciseContainer.querySelectorAll('.interactive-input');
            if (allInputs.length > 2) { // Multiple this/these inputs plus translation
                let allCorrect = true;
                allInputs.forEach(input => {
                    const answer = input.value.trim().toLowerCase();
                    const correct = input.dataset.correct.toLowerCase();
                    if (answer !== correct) {
                        allCorrect = false;
                        input.classList.add('border-red-500');
                    } else {
                        input.classList.add('border-green-500');
                    }
                });

                feedbackDiv.style.display = 'block';
                if (allCorrect) {
                    feedbackDiv.textContent = '¡Correcto!';
                    feedbackDiv.classList.remove('text-red-600');
                    feedbackDiv.classList.add('text-green-600');
                } else {
                    feedbackDiv.textContent = 'Incorrecto. Revisa tus respuestas.';
                    feedbackDiv.classList.remove('text-green-600');
                    feedbackDiv.classList.add('text-red-600');
                }
                return;
            }
        }

        // For single input exercises
        feedbackDiv.style.display = 'block';
        if (userAnswer === correctAnswer) {
            console.log('Correct answer!');
            feedbackDiv.textContent = '¡Correcto!';
            feedbackDiv.classList.remove('text-red-600');
            feedbackDiv.classList.add('text-green-600');
            input.classList.add('border-green-500');
        } else {
            console.log('Incorrect answer');
            feedbackDiv.textContent = `Incorrecto. La respuesta correcta es: ${input.dataset.correct}`;
            feedbackDiv.classList.remove('text-green-600');
            feedbackDiv.classList.add('text-red-600');
            input.classList.add('border-red-500');
        }
    }
};

// Export the module
window.exerciseModule = exerciseModule; 