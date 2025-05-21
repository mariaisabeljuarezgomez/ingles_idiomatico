// Audio Recording Utilities
class AudioRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.stream = null;
    }

    async startRecording() {
        try {
            this.audioChunks = [];
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.start();
            this.isRecording = true;
        } catch (error) {
            console.error('Error starting recording:', error);
            throw error;
        }
    }

    async stopRecording() {
        return new Promise((resolve, reject) => {
            try {
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    this.isRecording = false;
                    this.stream.getTracks().forEach(track => track.stop());
                    resolve(audioUrl);
                };

                this.mediaRecorder.stop();
            } catch (error) {
                console.error('Error stopping recording:', error);
                reject(error);
            }
        });
    }
}

// Global recorder instance
window.audioRecorder = new AudioRecorder();

// Recording control functions
async function startRecording(buttonElement, recordingId) {
    try {
        await window.audioRecorder.startRecording();
        buttonElement.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
        buttonElement.classList.add('recording');
    } catch (error) {
        console.error('Failed to start recording:', error);
        alert('Could not access microphone. Please ensure you have granted microphone permissions.');
    }
}

async function stopRecording(buttonElement, recordingId) {
    try {
        const audioUrl = await window.audioRecorder.stopRecording();
        buttonElement.innerHTML = '<i class="fas fa-microphone"></i> Record';
        buttonElement.classList.remove('recording');

        // Update the playback button
        const playbackButton = document.getElementById(`playback-${recordingId}`);
        if (playbackButton) {
            playbackButton.disabled = false;
            
            // Create or update audio element
            let audioElement = document.getElementById(`recording-${recordingId}`);
            if (!audioElement) {
                audioElement = document.createElement('audio');
                audioElement.id = `recording-${recordingId}`;
                document.body.appendChild(audioElement);
            }
            audioElement.src = audioUrl;
        }
    } catch (error) {
        console.error('Failed to stop recording:', error);
        alert('Error stopping recording. Please try again.');
    }
}

function toggleRecording(buttonElement, recordingId) {
    if (window.audioRecorder.isRecording) {
        stopRecording(buttonElement, recordingId);
    } else {
        startRecording(buttonElement, recordingId);
    }
}

function playRecording(recordingId) {
    const audioElement = document.getElementById(`recording-${recordingId}`);
    if (audioElement && audioElement.src) {
        audioElement.play();
    }
} 