class LearningPath {
    constructor() {
        this.skills = {
            grammar: 0,
            vocabulary: 0,
            pronunciation: 0,
            idioms: 0
        };
        this.fetchProgress();
    }

    async fetchProgress() {
        try {
            const response = await fetch('/api/student/stats');
            const data = await response.json();
            
            // Update skill progress based on stats
            this.skills.grammar = data.grammar_score || 0;
            this.skills.vocabulary = data.vocabulary_score || 0;
            this.skills.pronunciation = data.pronunciation_score || 0;
            this.skills.idioms = data.idioms_score || 0;
            
            this.updateUI();
            this.generateRecommendations();
            this.generateStudyTips();
        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    }

    updateUI() {
        // Update skill bars
        Object.keys(this.skills).forEach(skill => {
            const progressBar = document.getElementById(`${skill}-progress`);
            if (progressBar) {
                progressBar.style.width = `${this.skills[skill]}%`;
            }
        });
    }

    generateRecommendations() {
        const recommendationsContainer = document.getElementById('lesson-recommendations');
        if (!recommendationsContainer) return;

        // Clear existing recommendations
        recommendationsContainer.innerHTML = '';

        // Find weakest skills
        const sortedSkills = Object.entries(this.skills)
            .sort(([,a], [,b]) => a - b)
            .map(([skill]) => skill);

        // Generate recommendations based on weakest skills
        const recommendations = this.getRecommendationsForSkills(sortedSkills.slice(0, 2));
        
        recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-card';
            recElement.innerHTML = `
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <div class="readiness-indicator ${rec.status}">${rec.statusText}</div>
                <a href="${rec.link}" class="btn btn-primary">Comenzar</a>
            `;
            recommendationsContainer.appendChild(recElement);
        });
    }

    generateStudyTips() {
        const tipsContainer = document.getElementById('study-tips-list');
        if (!tipsContainer) return;

        // Clear existing tips
        tipsContainer.innerHTML = '';

        // Generate tips based on current progress
        const tips = this.getStudyTipsForProgress();
        
        tips.forEach(tip => {
            const tipElement = document.createElement('li');
            tipElement.innerHTML = `<i class="fas fa-check-circle"></i> ${tip}`;
            tipsContainer.appendChild(tipElement);
        });
    }

    getRecommendationsForSkills(weakestSkills) {
        const recommendations = [];
        
        weakestSkills.forEach(skill => {
            switch(skill) {
                case 'grammar':
                    recommendations.push({
                        title: 'Práctica de Gramática',
                        description: 'Refuerza tus bases gramaticales con ejercicios específicos.',
                        status: 'ready',
                        statusText: 'Listo para comenzar',
                        link: '/lecciones#grammar'
                    });
                    break;
                case 'vocabulary':
                    recommendations.push({
                        title: 'Expansión de Vocabulario',
                        description: 'Amplía tu vocabulario con palabras y frases nuevas.',
                        status: 'ready',
                        statusText: 'Listo para comenzar',
                        link: '/lecciones#vocabulary'
                    });
                    break;
                case 'pronunciation':
                    recommendations.push({
                        title: 'Mejora tu Pronunciación',
                        description: 'Practica la pronunciación con ejercicios de audio.',
                        status: 'ready',
                        statusText: 'Listo para comenzar',
                        link: '/lecciones#pronunciation'
                    });
                    break;
                case 'idioms':
                    recommendations.push({
                        title: 'Expresiones Idiomáticas',
                        description: 'Aprende expresiones comunes del inglés.',
                        status: 'ready',
                        statusText: 'Listo para comenzar',
                        link: '/lecciones#idioms'
                    });
                    break;
            }
        });

        return recommendations;
    }

    getStudyTipsForProgress() {
        const tips = [];
        const lowestSkill = Object.entries(this.skills)
            .sort(([,a], [,b]) => a - b)[0][0];

        // General tips
        tips.push('Dedica al menos 30 minutos diarios al estudio');
        tips.push('Repasa las lecciones anteriores regularmente');

        // Skill-specific tips
        switch(lowestSkill) {
            case 'grammar':
                tips.push('Practica formando oraciones completas');
                tips.push('Revisa las conjugaciones de verbos regulares e irregulares');
                break;
            case 'vocabulary':
                tips.push('Usa flashcards para memorizar palabras nuevas');
                tips.push('Intenta usar el vocabulario nuevo en contexto');
                break;
            case 'pronunciation':
                tips.push('Escucha y repite los ejercicios de audio');
                tips.push('Grábate hablando para identificar áreas de mejora');
                break;
            case 'idioms':
                tips.push('Practica las expresiones en conversaciones');
                tips.push('Relaciona las expresiones con situaciones cotidianas');
                break;
        }

        return tips;
    }
}

// Initialize learning path when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.learningPath = new LearningPath();
}); 