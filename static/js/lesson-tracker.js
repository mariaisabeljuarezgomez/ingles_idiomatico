// Lesson Progress Tracker
class LessonTracker {
    constructor(lessonId) {
        this.lessonId = lessonId;
        this.startTime = Date.now();
        this.lastUpdateTime = this.startTime;
        this.progress = 0;
        this.timeSpent = 0;
        
        // Start tracking
        this.initializeTracking();
    }

    initializeTracking() {
        // Update time spent every minute
        setInterval(() => this.updateTimeSpent(), 60000);
        
        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.updateProgress();
            }
        });

        // Track before page unload
        window.addEventListener('beforeunload', () => {
            this.updateProgress();
        });

        // Track scroll progress
        window.addEventListener('scroll', () => {
            this.calculateScrollProgress();
        });
    }

    calculateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        const newProgress = Math.min(Math.round((scrolled / documentHeight) * 100), 100);
        if (newProgress > this.progress) {
            this.progress = newProgress;
            this.updateProgress();
        }
    }

    updateTimeSpent() {
        const now = Date.now();
        const timeDiff = Math.round((now - this.lastUpdateTime) / 1000); // Convert to seconds
        this.timeSpent += timeDiff;
        this.lastUpdateTime = now;
        
        this.sendUpdate();
    }

    updateProgress() {
        this.sendUpdate();
    }

    sendUpdate() {
        fetch('/api/lesson/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lesson_id: this.lessonId,
                progress: this.progress,
                time_spent: Math.round(this.timeSpent / 60) // Convert to minutes
            })
        }).catch(error => console.error('Error updating progress:', error));
    }
}

// Initialize tracker when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Extract lesson ID from URL or data attribute
    const urlParts = window.location.pathname.split('/');
    const lessonId = parseInt(urlParts[urlParts.indexOf('lesson') + 1]) || 
                     document.body.getAttribute('data-lesson-id');
    
    if (lessonId) {
        window.lessonTracker = new LessonTracker(lessonId);
    }
}); 