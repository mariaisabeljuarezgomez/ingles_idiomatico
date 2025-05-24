// Improved speech synthesis function
function speakText(text) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a good English voice in this order:
    // 1. Microsoft natural voices
    // 2. Google natural voices
    // 3. Any English voice
    const preferredVoice = voices.find(voice => 
        voice.name.includes('Microsoft') && voice.name.includes('Natural') && voice.lang.startsWith('en')
    ) || voices.find(voice => 
        voice.name.includes('Google') && voice.lang.startsWith('en')
    ) || voices.find(voice => 
        voice.lang.startsWith('en')
    );

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    // Optimize speech parameters
    utterance.rate = 0.9;  // Slightly slower than default
    utterance.pitch = 1;   // Natural pitch
    utterance.volume = 1;  // Full volume

    // Add event listeners for better error handling
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
    };

    // Speak the text
    window.speechSynthesis.speak(utterance);
}

// Function to play audio with fallback to speech synthesis
function playAudio(audioId) {
    if (!audioId) {
        console.error('No audio ID provided');
        return;
    }

    // Extract lesson number from audio ID (e.g., "L2_ex1_1" -> "2")
    const lessonMatch = audioId.match(/L(\d+)/);
    const lessonNumber = lessonMatch ? lessonMatch[1] : '1';

    const audio = new Audio(`/static/audio/lesson${lessonNumber}/${audioId}.mp3`); // Corrected path
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        // Fallback to speech synthesis if audio file fails to play
        if (error.name === 'NotSupportedError' || error.name === 'NotFoundError') {
            const text = audioId.split('_')[2] || audioId.split('_')[1]; // Extract the word from the audio ID
            speakText(text);
        }
    });
}

// Initialize voices when they are available
if (window.speechSynthesis) {
    // Chrome loads voices asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

// --- NEW FUNCTIONALITY FOR COVER PAGE AND START BUTTON ---
document.addEventListener('DOMContentLoaded', () => {
    const startCourseBtn = document.getElementById('start-course-btn');
    const coverPage = document.getElementById('cover-page');
    const mainContentArea = document.getElementById('main-content-area');
    const lessonDisplayContainer = document.getElementById('lesson-display-container');
    const lessonDefaultContent = document.getElementById('lesson-default-content');
    const lessonContent = document.getElementById('lesson-content');
    const lessonToc = document.getElementById('lesson-toc'); // Table of Contents for lessons
    const testButton = document.getElementById('test-button'); 

    if (startCourseBtn && coverPage && mainContentArea) {
        startCourseBtn.addEventListener('click', () => {
            console.log("Comenzar Curso button clicked!"); 

            // Start fading out cover page
            coverPage.style.opacity = '0';
            // Important: Set display to flex *before* the transition of mainContentArea starts
            // This is done via a small timeout to ensure browser registers the display change
            mainContentArea.style.display = 'flex'; 

            // After cover page finishes fading out, hide it completely
            coverPage.addEventListener('transitionend', function handler() {
                coverPage.style.display = 'none';
                coverPage.removeEventListener('transitionend', handler);
                // Now that cover page is hidden, fade in main content
                setTimeout(() => {
                    mainContentArea.style.opacity = '1';
                }, 10); // Small delay to ensure display:flex is rendered
            }, { once: true }); 
            
            // Disable pointer events on cover page immediately
            coverPage.style.pointerEvents = 'none'; 
        });
    } else {
        console.error("Required elements for start button functionality not found.");
    }

    // Listener for the Test Button
    if (testButton) {
        testButton.addEventListener('click', () => {
            console.log("Test button clicked!");
            alert("Test button clicked!"); 
        });
    } else {
        console.error("Test button not found.");
    }

    // --- Dynamic Lesson Loading (Placeholder for now) ---
    if (lessonToc && lessonDisplayContainer && lessonContent && lessonDefaultContent) {
        lessonToc.addEventListener('click', (event) => {
            const target = event.target;
            if (target.tagName === 'A' && target.closest('#lesson-toc')) {
                event.preventDefault(); 
                const lessonId = target.getAttribute('href').substring(1); 
                console.log(`Clicked on ${lessonId}`);

                lessonDefaultContent.style.display = 'none';
                lessonContent.innerHTML = '';
                
                lessonContent.innerHTML = `<h2>Cargando ${target.textContent}...</h2>`;

                // This is where you would load the specific lesson's HTML and JS
                // Example: loadLesson(lessonId); // This function needs to be created
            }
        });
    }
});
