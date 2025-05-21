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

    const audio = new Audio(`../audio/lesson${lessonNumber}/${audioId}.mp3`);
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