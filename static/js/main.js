// Global state
window.lessonStates = window.lessonStates || {};

// Base URL for all server requests
const BASE_URL = 'https://ingles-idiomatico-new.onrender.com';

// DOM Elements
const coverPage = document.getElementById('cover-page');
const mainContentArea = document.getElementById('main-content-area');
const startCourseBtn = document.getElementById('start-course-btn');
const lessonTocElement = document.getElementById('lesson-toc');
const lessonDisplayContainer = document.getElementById('lesson-display-container');
const lessonContent = document.getElementById('lesson-content');
const defaultContent = document.getElementById('lesson-default-content');

// Global flashcard functions
window.prevFlashcard = function(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) {
        console.error('No lesson state or vocabulary found for:', lessonId);
        return;
    }
    
    state.currentFlashcardIndex = (state.currentFlashcardIndex - 1 + state.vocabulary.length) % state.vocabulary.length;
    state.isFlipped = false;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    displayFlashcard(lessonId);
};

window.nextFlashcard = function(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) {
        console.error('No lesson state or vocabulary found for:', lessonId);
        return;
    }
    
    state.currentFlashcardIndex = (state.currentFlashcardIndex + 1) % state.vocabulary.length;
    state.isFlipped = false;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    displayFlashcard(lessonId);
};

window.flipFlashcard = function(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state) {
        console.error('No lesson state found for:', lessonId);
        return;
    }
    
    state.isFlipped = !state.isFlipped;
    
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
        flashcard.classList.toggle('flipped');
    }
};

window.displayFlashcard = function(lessonId) {
    const state = window.lessonStates[lessonId];
    if (!state || !state.vocabulary) {
        console.error('No lesson state or vocabulary found for:', lessonId);
        return;
    }
    
    const currentWord = state.vocabulary[state.currentFlashcardIndex];
    if (!currentWord) {
        console.error('No word found at index:', state.currentFlashcardIndex);
        return;
    }
    
    const wordElement = document.querySelector('.flashcard-word');
    const exampleElement = document.querySelector('.flashcard-example');
    const translationElement = document.querySelector('.flashcard-translation');
    const audioBtn = document.querySelector('.audio-btn');
    const flashcard = document.querySelector('.flashcard');
    
    // Update content
    if (wordElement) wordElement.textContent = currentWord.en;
    if (exampleElement) exampleElement.textContent = currentWord.example;
    if (translationElement) translationElement.textContent = currentWord.es;
    if (audioBtn) audioBtn.onclick = () => window.flashcardModule.speak(currentWord.en);
    
    // Update flip state
    if (flashcard) {
        if (state.isFlipped) {
            flashcard.classList.add('flipped');
        } else {
            flashcard.classList.remove('flipped');
        }
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Verify all required elements exist
    if (!coverPage || !mainContentArea || !startCourseBtn || !lessonTocElement || 
        !lessonDisplayContainer || !lessonContent || !defaultContent) {
        console.error('Required DOM elements not found during initialization');
        return;
    }

    // Ensure main content area is hidden initially
    mainContentArea.style.display = 'none';
    coverPage.style.display = 'flex';

    // Start button listener
    startCourseBtn.addEventListener('click', () => {
        console.log('Start button clicked');
        coverPage.style.display = 'none';
        mainContentArea.style.display = 'block';
        mainContentArea.classList.add('visible');
        defaultContent.style.display = 'block';
        lessonContent.style.display = 'none';
        
        // Force layout recalculation
        window.dispatchEvent(new Event('resize'));
    });

    // Add click listeners to all lesson links
    const lessonLinks = document.querySelectorAll('#lesson-toc a');
    console.log('Found lesson links:', lessonLinks.length);
    
    lessonLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Lesson link clicked:', link.getAttribute('href'));
            const lessonNumber = parseInt(link.getAttribute('href').replace('#lesson-', ''));
            if (!isNaN(lessonNumber)) {
                console.log('Loading lesson:', lessonNumber);
                showLesson(lessonNumber, link);
            } else {
                console.error('Invalid lesson number from href:', link.getAttribute('href'));
            }
        });
    });

    // Get current lesson number from URL or hash
    const hash = window.location.hash;
    const lessonMatch = hash.match(/lesson-(\d+)/);
    
    if (lessonMatch) {
        const lessonNumber = lessonMatch[1];
        const lessonModule = window.lessonModules[`lesson${lessonNumber}`];
        
        if (lessonModule) {
            // Initialize the lesson
            lessonModule.initialize();
            
            // Show lesson indicator
            const indicator = document.querySelector('.current-lesson-indicator');
            if (indicator) {
                indicator.textContent = `Lección ${lessonNumber}`;
                indicator.classList.add('visible');
            }
        }
    }
});

// Show Lesson
async function showLesson(lessonNumber, clickedLink = null) {
    console.log(`Starting to show lesson ${lessonNumber}`);
    
    try {
        // Validate DOM elements
        if (!lessonContent || !defaultContent) {
            throw new Error('Required lesson DOM elements not found');
        }

        // Update active states in navigation
        document.querySelectorAll('#lesson-toc a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#lesson-${lessonNumber}`) {
                link.classList.add('active');
            }
        });

        // Update or create lesson indicator
        let indicator = document.querySelector('.current-lesson-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'current-lesson-indicator';
            document.body.appendChild(indicator);
        }
        
        if (lessonNumber === 0) {
            indicator.classList.remove('visible');
            defaultContent.style.display = 'block';
            lessonContent.style.display = 'none';
            return;
        }

        // Update and show indicator
        indicator.textContent = `Lección ${lessonNumber}`;
        indicator.classList.add('visible');

        // Hide default content
        defaultContent.style.display = 'none';

        try {
            // Load lesson HTML content
            const response = await fetch(`lessons/lesson${lessonNumber}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load lesson ${lessonNumber} HTML`);
            }
            const html = await response.text();
            
            // Create a temporary div to parse the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Find the lesson content
            const newLessonContent = tempDiv.querySelector('#lesson-content');
            if (!newLessonContent) {
                throw new Error('Lesson content not found in HTML');
            }
            
            // Show lesson content container and update content
            lessonContent.style.display = 'block';
            lessonContent.innerHTML = newLessonContent.innerHTML;

            // Initialize lesson state
            window.lessonStates[`L${lessonNumber}`] = {
                currentFlashcardIndex: 0,
                isFlipped: false,
                initialized: false,
                currentAudioId: null
            };

            // Load lesson module
            const lessonModule = window.lessonModules[`lesson${lessonNumber}`];
            if (!lessonModule) {
                throw new Error(`Lesson ${lessonNumber} module not found`);
            }

            // Initialize the lesson
            await lessonModule.initialize();
            
            // Initialize flashcard display if available
            if (window.lessonStates[`L${lessonNumber}`] && window.lessonStates[`L${lessonNumber}`].vocabulary) {
                displayFlashcard(`L${lessonNumber}`);
            }
            
        } catch (error) {
            console.error('Error loading lesson:', error);
            lessonContent.innerHTML = `
                <div class="error-message">
                    <p>Error loading lesson content. Please try again later.</p>
                    <p>Error details: ${error.message}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error in showLesson:', error);
        if (lessonContent) {
            lessonContent.innerHTML = `
                <div class="error-message">
                    <p>An error occurred while loading the lesson.</p>
                    <p>Error details: ${error.message}</p>
                </div>
            `;
        }
    }
}

async function loadAndInitializeLesson(lessonNumber) {
    try {
        // Wait for the lesson module to be available
        let attempts = 0;
        const maxAttempts = 10;
        while (!window.lessonModules?.[`lesson${lessonNumber}`] && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        // Check if module is available
        const lessonModule = window.lessonModules?.[`lesson${lessonNumber}`];
        if (!lessonModule) {
            console.error(`Lesson ${lessonNumber} module not found in:`, window.lessonModules);
            throw new Error(`Lesson ${lessonNumber} module not found`);
        }

        // Initialize lesson state
        const lessonId = `L${lessonNumber}`;
        if (!window.lessonStates) {
            window.lessonStates = {};
        }
        
        // Initialize state with vocabulary
        if (!window.lessonStates[lessonId]) {
            window.lessonStates[lessonId] = {
                currentFlashcardIndex: 0,
                vocabulary: lessonModule.vocabulary,
                initialized: false
            };
        }

        // Initialize the lesson module
        await lessonModule.initialize();

        console.log(`Lesson ${lessonNumber} loaded and initialized successfully`);
    } catch (error) {
        console.error(`Error loading lesson ${lessonNumber}:`, error);
        throw error;
    }
}

// Helper function to get exercise titles
function getExerciseTitle(exerciseType) {
    const titles = {
        beVerbExercises: 'Práctica del Verbo BE',
        beVerbNegativeExercises: 'Práctica de Formas Negativas',
        changeToNegativeExercises: 'Cambio a Forma Negativa',
        interrogativeExercises: 'Formas Interrogativas',
        negativeInterrogativeExercises: 'Formas Interrogativas Negativas',
        allFormsExercises: 'Práctica de Todas las Formas'
    };
    return titles[exerciseType] || 'Ejercicios';
}

// Exercise Functions
function checkAnswer(inputElement) {
    const correctAnswer = inputElement.getAttribute('data-correct');
    const userAnswer = inputElement.value.trim().toLowerCase();
    
    // Remove any previous classes
    inputElement.classList.remove('correct', 'incorrect');
    
    // Find feedback div
    const feedbackDiv = inputElement.nextElementSibling;
    if (!feedbackDiv) return;
    
    // Remove any previous classes
    feedbackDiv.classList.remove('correct', 'incorrect');
    
    // Check answer and provide feedback
    if (userAnswer === correctAnswer.toLowerCase()) {
        // Correct answer
        inputElement.classList.add('correct');
        feedbackDiv.textContent = '¡Correcto! 🎉';
        feedbackDiv.classList.add('correct');
        
        // Add success animation
        inputElement.style.animation = 'none';
        inputElement.offsetHeight; // Trigger reflow
        inputElement.style.animation = 'successPulse 0.5s ease';
    } else {
        // Incorrect answer
        inputElement.classList.add('incorrect');
        feedbackDiv.textContent = `Incorrecto. La respuesta correcta es: "${correctAnswer}"`;
        feedbackDiv.classList.add('incorrect');
        
        // Add error animation
        inputElement.style.animation = 'none';
        inputElement.offsetHeight; // Trigger reflow
        inputElement.style.animation = 'errorShake 0.5s ease';
    }
    
    // Show feedback with animation
    feedbackDiv.style.display = 'block';
    feedbackDiv.style.opacity = '0';
    feedbackDiv.style.transform = 'translateY(-10px)';
    
    // Trigger animation
    setTimeout(() => {
        feedbackDiv.style.opacity = '1';
        feedbackDiv.style.transform = 'translateY(0)';
    }, 10);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Recording Functions
let mediaRecorder = null;
let audioChunks = [];
let recordingTimeout = null;

async function startRecording(index, lessonId) {
    try {
        // Stop any existing recording first
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopRecording(index, lessonId);
        }

        // Update UI to show recording state
        const recordBtn = document.querySelector(`#${lessonId}-conversation .conversation-item:nth-child(${index + 1}) .record-btn`);
        if (recordBtn) {
            recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
            recordBtn.classList.add('recording');
            recordBtn.onclick = () => stopRecording(index, lessonId);
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create or update audio element
            const audioId = `recording-${lessonId}-${index}`;
            let audio = document.getElementById(audioId);
            if (!audio) {
                audio = document.createElement('audio');
                audio.id = audioId;
                document.body.appendChild(audio);
            }
            audio.src = audioUrl;

            // Show play button
            const playBtn = document.querySelector(`#${lessonId}-conversation .conversation-item:nth-child(${index + 1}) .play-btn`);
            if (playBtn) {
                playBtn.classList.remove('hidden');
            }

            // Reset record button
            const recordBtn = document.querySelector(`#${lessonId}-conversation .conversation-item:nth-child(${index + 1}) .record-btn`);
            if (recordBtn) {
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
                recordBtn.classList.remove('recording');
                recordBtn.onclick = () => startRecording(index, lessonId);
            }
        };

        mediaRecorder.start();
        
        // Stop recording after 30 seconds
        clearTimeout(recordingTimeout);
        recordingTimeout = setTimeout(() => stopRecording(index, lessonId), 30000);
        
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('No se pudo acceder al micrófono. Por favor, asegúrate de que tienes un micrófono conectado y has dado permiso para usarlo.');
        
        // Reset UI
        const recordBtn = document.querySelector(`#${lessonId}-conversation .conversation-item:nth-child(${index + 1}) .record-btn`);
        if (recordBtn) {
            recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
            recordBtn.classList.remove('recording');
            recordBtn.onclick = () => startRecording(index, lessonId);
        }
    }
}

function stopRecording(index, lessonId) {
    clearTimeout(recordingTimeout);
    
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        // Reset record button (in case onstop doesn't fire)
        const recordBtn = document.querySelector(`#${lessonId}-conversation .conversation-item:nth-child(${index + 1}) .record-btn`);
        if (recordBtn) {
            recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record';
            recordBtn.classList.remove('recording');
            recordBtn.onclick = () => startRecording(index, lessonId);
        }
    }
}

function playRecording(index, lessonId) {
    const audioId = `recording-${lessonId}-${index}`;
    const audio = document.getElementById(audioId);
    if (audio) {
        // Stop any currently playing audio first
        document.querySelectorAll('audio').forEach(a => {
            if (a !== audio && !a.paused) {
                a.pause();
                a.currentTime = 0;
            }
        });
        
        audio.play().catch(error => {
            console.error('Error playing recording:', error);
            alert('Error al reproducir la grabación.');
        });
    } else {
        alert('No hay grabación para reproducir. Por favor, graba tu respuesta primero.');
    }
}

// Show Error Message
function showError(message) {
    console.error(message);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message p-4 bg-red-100 text-red-700 rounded-lg';
    errorDiv.textContent = message;
    
    // Find a suitable container to show the error
    const container = document.querySelector('.lesson-content-area') || document.body;
    container.insertBefore(errorDiv, container.firstChild);
}

// Handle initial URL hash
const hash = window.location.hash;
if (hash) {
    const lessonNumber = parseInt(hash.replace('#lesson-', ''));
    if (!isNaN(lessonNumber)) {
        coverPage.style.display = 'none';
        mainContentArea.style.display = 'flex';
        showLesson(lessonNumber);
        
        // Set active state for the initial lesson
        document.querySelectorAll('#lesson-toc a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
}

// Add audio playback function
function playAudio(audioId) {
    if (!audioId) {
        console.error('No audio ID provided');
        return;
    }

    // Extract lesson number from audio ID (e.g., "L2_ex1_1" -> "2")
    const lessonMatch = audioId.match(/L(\d+)/);
    const lessonNumber = lessonMatch ? lessonMatch[1] : '1';

    const audio = new Audio(`../audio/lesson${lessonNumber}/${audioId}.mp3`);
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        // Fallback to speech synthesis if audio file fails to play
        if (error.name === 'NotSupportedError' || error.name === 'NotFoundError') {
            const text = audioId.split('_')[2] || audioId.split('_')[1]; // Extract the word from the audio ID
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    });
} 