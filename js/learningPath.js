// Learning Path Management System
const LearningPath = {
    // Track mastery levels for different skills
    skillMastery: {
        grammar: 0,
        vocabulary: 0,
        pronunciation: 0,
        idioms: 0
    },

    // Lesson prerequisites and dependencies
    lessonDependencies: {
        1: { required: [], skills: { grammar: 10, vocabulary: 5 } },
        2: { required: [1], skills: { grammar: 15, vocabulary: 10 } },
        3: { required: [2], skills: { grammar: 20, vocabulary: 15, pronunciation: 5 } },
        4: { required: [3], skills: { grammar: 25, vocabulary: 20, pronunciation: 10 } },
        5: { required: [4], skills: { grammar: 30, vocabulary: 25, pronunciation: 15 } },
        6: { required: [5], skills: { grammar: 35, vocabulary: 30, pronunciation: 20, idioms: 5 } },
        7: { required: [6], skills: { grammar: 40, vocabulary: 35, pronunciation: 25, idioms: 10 } },
        8: { required: [7], skills: { grammar: 45, vocabulary: 40, pronunciation: 30, idioms: 15 } },
        9: { required: [8], skills: { grammar: 50, vocabulary: 45, pronunciation: 35, idioms: 20 } },
        10: { required: [9], skills: { grammar: 55, vocabulary: 50, pronunciation: 40, idioms: 25 } }
    },

    // Calculate recommended next lessons based on current progress
    getRecommendedLessons() {
        const completedLessons = this.getCompletedLessons();
        const recommendations = [];

        for (let lessonNum = 1; lessonNum <= 10; lessonNum++) {
            if (!completedLessons.includes(lessonNum)) {
                const deps = this.lessonDependencies[lessonNum].required;
                if (deps.every(dep => completedLessons.includes(dep))) {
                    recommendations.push({
                        lesson: lessonNum,
                        readiness: this.calculateReadiness(lessonNum)
                    });
                }
            }
        }

        return recommendations.sort((a, b) => b.readiness - a.readiness);
    },

    // Calculate student's readiness for a specific lesson (0-100%)
    calculateReadiness(lessonNum) {
        const requirements = this.lessonDependencies[lessonNum].skills;
        let totalReadiness = 0;
        let totalWeight = 0;

        for (const [skill, required] of Object.entries(requirements)) {
            totalReadiness += (this.skillMastery[skill] / required) * 100;
            totalWeight++;
        }

        return Math.min(100, totalReadiness / totalWeight);
    },

    // Update skill mastery based on exercise performance
    updateSkillMastery(exerciseResults) {
        const { grammar, vocabulary, pronunciation, idioms } = exerciseResults;
        
        if (grammar) this.skillMastery.grammar = Math.min(100, this.skillMastery.grammar + grammar);
        if (vocabulary) this.skillMastery.vocabulary = Math.min(100, this.skillMastery.vocabulary + vocabulary);
        if (pronunciation) this.skillMastery.pronunciation = Math.min(100, this.skillMastery.pronunciation + pronunciation);
        if (idioms) this.skillMastery.idioms = Math.min(100, this.skillMastery.idioms + idioms);

        this.saveProgress();
    },

    // Get personalized study tips based on current progress
    getStudyTips() {
        const tips = [];
        const weakestSkill = Object.entries(this.skillMastery)
            .reduce((a, b) => (a[1] < b[1] ? a : b))[0];

        switch (weakestSkill) {
            case 'grammar':
                tips.push('Practice more sentence construction exercises');
                tips.push('Review verb conjugation patterns');
                break;
            case 'vocabulary':
                tips.push('Use flashcards more frequently');
                tips.push('Try writing sentences with new words');
                break;
            case 'pronunciation':
                tips.push('Listen to more audio examples');
                tips.push('Practice speaking exercises daily');
                break;
            case 'idioms':
                tips.push('Focus on context-based learning');
                tips.push('Study common English expressions');
                break;
        }

        return tips;
    },

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('skillMastery', JSON.stringify(this.skillMastery));
    },

    // Load progress from localStorage
    loadProgress() {
        const saved = localStorage.getItem('skillMastery');
        if (saved) {
            this.skillMastery = JSON.parse(saved);
        }
    },

    // Get completed lessons based on skill mastery
    getCompletedLessons() {
        return Object.entries(this.lessonDependencies)
            .filter(([_, deps]) => this.calculateReadiness(parseInt(_)) >= 100)
            .map(([lesson, _]) => parseInt(lesson));
    }
};

// Initialize when the module loads
document.addEventListener('DOMContentLoaded', () => {
    LearningPath.loadProgress();
}); 