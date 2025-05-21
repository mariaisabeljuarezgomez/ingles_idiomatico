import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from models import User, StudentStats, ExerciseAttempt, PronunciationRecording, Analytics
from sqlalchemy import func

class StudentAnalytics:
    def __init__(self, user_id):
        self.user_id = user_id
        self.user = User.query.get(user_id)
        self.stats = StudentStats.query.filter_by(user_id=user_id).first()

    def calculate_daily_stats(self, start_date=None, end_date=None):
        if not start_date:
            start_date = datetime.utcnow() - timedelta(days=30)
        if not end_date:
            end_date = datetime.utcnow()

        daily_stats = Analytics.query.filter(
            Analytics.user_id == self.user_id,
            Analytics.date.between(start_date.date(), end_date.date())
        ).all()

        return [{
            'date': stat.date.strftime('%Y-%m-%d'),
            'study_time': stat.study_time,
            'exercises_completed': stat.exercises_completed,
            'correct_answers': stat.correct_answers,
            'recordings_made': stat.recordings_made
        } for stat in daily_stats]

    def get_performance_trends(self):
        exercises = ExerciseAttempt.query.filter_by(user_id=self.user_id).all()
        df = pd.DataFrame([{
            'date': ex.attempt_date.date(),
            'is_correct': ex.is_correct,
            'time_taken': ex.time_taken,
            'exercise_type': ex.exercise_type,
            'difficulty_level': ex.difficulty_level
        } for ex in exercises])

        if df.empty:
            return {}

        return {
            'accuracy_trend': df.groupby('date')['is_correct'].mean().to_dict(),
            'speed_trend': df.groupby('date')['time_taken'].mean().to_dict(),
            'difficulty_performance': df.groupby('difficulty_level')['is_correct'].mean().to_dict(),
            'type_performance': df.groupby('exercise_type')['is_correct'].mean().to_dict()
        }

    def get_pronunciation_analysis(self):
        recordings = PronunciationRecording.query.filter_by(user_id=self.user_id).all()
        df = pd.DataFrame([{
            'date': rec.recorded_at.date(),
            'score': rec.score,
            'confidence': rec.confidence_score,
            'accent': rec.accent_rating,
            'clarity': rec.clarity_rating
        } for rec in recordings])

        if df.empty:
            return {}

        return {
            'score_trend': df.groupby('date')['score'].mean().to_dict(),
            'confidence_trend': df.groupby('date')['confidence'].mean().to_dict(),
            'average_accent': float(df['accent'].mean()),
            'average_clarity': float(df['clarity'].mean()),
            'improvement_rate': self._calculate_improvement_rate(df)
        }

    def get_study_patterns(self):
        exercises = ExerciseAttempt.query.filter_by(user_id=self.user_id).all()
        times = [ex.time_of_day.hour for ex in exercises if ex.time_of_day]
        
        if not times:
            return {}

        performance_by_hour = {}
        for ex in exercises:
            if ex.time_of_day:
                hour = ex.time_of_day.hour
                if hour not in performance_by_hour:
                    performance_by_hour[hour] = {'correct': 0, 'total': 0}
                performance_by_hour[hour]['total'] += 1
                if ex.is_correct:
                    performance_by_hour[hour]['correct'] += 1

        best_hour = max(performance_by_hour.items(), 
                       key=lambda x: x[1]['correct']/x[1]['total'] if x[1]['total'] > 0 else 0)[0]

        return {
            'peak_activity_hours': self._get_peak_hours(times),
            'best_performance_hour': best_hour,
            'session_length_avg': self._calculate_avg_session_length(),
            'consistency_score': self._calculate_consistency_score()
        }

    def _calculate_improvement_rate(self, df):
        if len(df) < 2:
            return 0
        
        df = df.sort_values('date')
        first_week = df.head(min(7, len(df)))['score'].mean()
        last_week = df.tail(min(7, len(df)))['score'].mean()
        
        return ((last_week - first_week) / first_week * 100) if first_week > 0 else 0

    def _get_peak_hours(self, times):
        if not times:
            return []
        
        hours_count = pd.Series(times).value_counts()
        peak_hours = hours_count[hours_count > hours_count.mean()].index.tolist()
        return sorted(peak_hours)

    def _calculate_avg_session_length(self):
        sessions = ExerciseAttempt.query.filter_by(user_id=self.user_id)\
            .with_entities(ExerciseAttempt.session_id, 
                         func.sum(ExerciseAttempt.time_taken))\
            .group_by(ExerciseAttempt.session_id).all()
        
        if not sessions:
            return 0
            
        return sum(duration for _, duration in sessions) / len(sessions) if sessions else 0

    def _calculate_consistency_score(self):
        """Calculate a 0-100 score based on study regularity"""
        today = datetime.utcnow().date()
        thirty_days_ago = today - timedelta(days=30)
        
        daily_activity = Analytics.query.filter(
            Analytics.user_id == self.user_id,
            Analytics.date.between(thirty_days_ago, today)
        ).count()
        
        return (daily_activity / 30) * 100

    def generate_teacher_report(self):
        """Generate a comprehensive report for teachers"""
        performance = self.get_performance_trends()
        pronunciation = self.get_pronunciation_analysis()
        patterns = self.get_study_patterns()
        
        return {
            'student_info': {
                'name': self.user.name,
                'email': self.user.email,
                'current_lesson': self.user.current_lesson,
                'total_study_time': self.user.total_study_time
            },
            'performance_metrics': {
                'overall_accuracy': self.stats.accuracy_rate,
                'exercise_completion_rate': self.stats.completion_rate,
                'current_streak': self.stats.current_streak,
                'pronunciation_score': self.stats.pronunciation_score
            },
            'detailed_analysis': {
                'performance_trends': performance,
                'pronunciation_analysis': pronunciation,
                'study_patterns': patterns,
                'challenging_topics': self.stats.challenging_topics,
                'strong_topics': self.stats.strong_topics
            },
            'recommendations': self._generate_recommendations(
                performance, pronunciation, patterns
            )
        }

    def _generate_recommendations(self, performance, pronunciation, patterns):
        recommendations = []
        
        # Analyze performance trends
        if performance.get('accuracy_trend'):
            recent_accuracy = list(performance['accuracy_trend'].values())[-1]
            if recent_accuracy < 0.7:
                recommendations.append(
                    "Consider reviewing recent topics as accuracy has dropped below 70%"
                )

        # Check study patterns
        if patterns.get('consistency_score', 0) < 60:
            recommendations.append(
                "Encourage more regular study sessions to improve retention"
            )

        # Analyze pronunciation
        if pronunciation.get('improvement_rate', 0) < 5:
            recommendations.append(
                "Focus on pronunciation exercises as improvement rate is below target"
            )

        return recommendations 