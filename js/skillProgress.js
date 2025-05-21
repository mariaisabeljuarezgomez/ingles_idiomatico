// Skill Progress Tracking System
const SkillProgress = {
    // Detailed skill categories
    categories: {
        grammar: {
            name: 'Gramática',
            subskills: {
                verbConjugation: { name: 'Conjugación de Verbos', weight: 0.3 },
                sentenceStructure: { name: 'Estructura de Oraciones', weight: 0.3 },
                tenses: { name: 'Tiempos Verbales', weight: 0.2 },
                articles: { name: 'Artículos y Determinantes', weight: 0.2 }
            }
        },
        vocabulary: {
            name: 'Vocabulario',
            subskills: {
                everyday: { name: 'Vocabulario Cotidiano', weight: 0.3 },
                academic: { name: 'Vocabulario Académico', weight: 0.2 },
                idiomatic: { name: 'Expresiones Comunes', weight: 0.3 },
                contextual: { name: 'Uso Contextual', weight: 0.2 }
            }
        },
        pronunciation: {
            name: 'Pronunciación',
            subskills: {
                phonetics: { name: 'Fonética', weight: 0.3 },
                intonation: { name: 'Entonación', weight: 0.3 },
                rhythm: { name: 'Ritmo', weight: 0.2 },
                stress: { name: 'Acentuación', weight: 0.2 }
            }
        },
        idioms: {
            name: 'Expresiones Idiomáticas',
            subskills: {
                commonPhrases: { name: 'Frases Comunes', weight: 0.3 },
                culturalContext: { name: 'Contexto Cultural', weight: 0.3 },
                usage: { name: 'Uso Práctico', weight: 0.2 },
                variations: { name: 'Variaciones Regionales', weight: 0.2 }
            }
        }
    },

    // Store progress for each subskill
    progress: {},

    // Initialize progress tracking
    initialize() {
        // Load saved progress or set defaults
        const saved = localStorage.getItem('skillProgress');
        if (saved) {
            this.progress = JSON.parse(saved);
        } else {
            // Initialize empty progress for all subskills
            Object.entries(this.categories).forEach(([category, data]) => {
                this.progress[category] = {};
                Object.keys(data.subskills).forEach(subskill => {
                    this.progress[category][subskill] = 0;
                });
            });
            this.saveProgress();
        }
    },

    // Update progress for a specific subskill
    updateSubskill(category, subskill, score) {
        if (!this.progress[category]) {
            this.progress[category] = {};
        }
        this.progress[category][subskill] = Math.min(100, Math.max(0, score));
        this.saveProgress();
        this.updateLearningPath();
    },

    // Calculate overall progress for a category
    calculateCategoryProgress(category) {
        if (!this.progress[category]) return 0;
        
        const subskills = this.categories[category].subskills;
        let totalProgress = 0;
        let totalWeight = 0;

        Object.entries(subskills).forEach(([subskill, data]) => {
            totalProgress += (this.progress[category][subskill] || 0) * data.weight;
            totalWeight += data.weight;
        });

        return totalWeight > 0 ? Math.round(totalProgress / totalWeight) : 0;
    },

    // Get detailed progress report
    getProgressReport() {
        const report = {};
        
        Object.entries(this.categories).forEach(([category, data]) => {
            report[category] = {
                overall: this.calculateCategoryProgress(category),
                name: data.name,
                subskills: {}
            };

            Object.entries(data.subskills).forEach(([subskill, subskillData]) => {
                report[category].subskills[subskill] = {
                    name: subskillData.name,
                    progress: this.progress[category]?.[subskill] || 0
                };
            });
        });

        return report;
    },

    // Get learning recommendations based on progress
    getRecommendations() {
        const recommendations = [];
        const report = this.getProgressReport();

        Object.entries(report).forEach(([category, data]) => {
            const weakestSubskill = Object.entries(data.subskills)
                .reduce((min, [key, val]) => 
                    val.progress < min.progress ? { key, progress: val.progress } : min,
                    { progress: 100 }
                );

            if (weakestSubskill.progress < 70) {
                recommendations.push({
                    category: data.name,
                    subskill: this.categories[category].subskills[weakestSubskill.key].name,
                    currentProgress: weakestSubskill.progress,
                    suggestion: this.getStudySuggestion(category, weakestSubskill.key)
                });
            }
        });

        return recommendations.sort((a, b) => a.currentProgress - b.currentProgress);
    },

    // Get specific study suggestion for a subskill
    getStudySuggestion(category, subskill) {
        const suggestions = {
            grammar: {
                verbConjugation: 'Practica conjugando verbos en diferentes tiempos',
                sentenceStructure: 'Construye oraciones siguiendo patrones básicos',
                tenses: 'Revisa los diferentes tiempos verbales y sus usos',
                articles: 'Practica el uso de artículos en diferentes contextos'
            },
            vocabulary: {
                everyday: 'Aprende vocabulario común usado en situaciones diarias',
                academic: 'Estudia términos académicos y profesionales',
                idiomatic: 'Practica expresiones comunes en inglés',
                contextual: 'Aprende a usar palabras en diferentes contextos'
            },
            pronunciation: {
                phonetics: 'Practica los sonidos básicos del inglés',
                intonation: 'Trabaja en la entonación de preguntas y afirmaciones',
                rhythm: 'Practica el ritmo natural del habla en inglés',
                stress: 'Aprende a acentuar correctamente las palabras'
            },
            idioms: {
                commonPhrases: 'Memoriza y practica frases idiomáticas comunes',
                culturalContext: 'Estudia el contexto cultural de las expresiones',
                usage: 'Practica usando expresiones en conversaciones',
                variations: 'Aprende diferentes variantes de las expresiones'
            }
        };

        return suggestions[category]?.[subskill] || 'Continúa practicando este aspecto';
    },

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('skillProgress', JSON.stringify(this.progress));
    },

    // Update the learning path based on progress
    updateLearningPath() {
        if (window.LearningPath) {
            Object.entries(this.categories).forEach(([category, _]) => {
                const progress = this.calculateCategoryProgress(category);
                window.LearningPath.skillMastery[category] = progress;
            });
            window.LearningPath.saveProgress();
        }
    }
};

// Initialize when the module loads
document.addEventListener('DOMContentLoaded', () => {
    SkillProgress.initialize();
}); 