import os
import json
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing
import re
import ast
from dotenv import load_dotenv

class AudioGenerator:
    def __init__(self, base_dir='.'):
        self.base_dir = base_dir
        self.ensure_directories()
        load_dotenv()  # Load environment variables from .env file
        
        # Initialize Amazon Polly client using environment variables
        self.polly = boto3.client('polly',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name='us-east-1'
        )

    def ensure_directories(self):
        """Ensure all necessary audio directories exist"""
        for lesson_num in range(1, 6):
            os.makedirs(os.path.join(self.base_dir, 'audio', f'lesson{lesson_num}'), exist_ok=True)

    def generate_audio(self, text, filepath):
        """Generate an audio file from text using Amazon Polly."""
        try:
            # Request speech synthesis
            response = self.polly.synthesize_speech(
                Text=text,
                OutputFormat='mp3',
                VoiceId='Matthew',  # A natural-sounding male voice
                Engine='neural',    # Use the neural engine for better quality
                TextType='text'
            )

            # Save the audio file
            if "AudioStream" in response:
                with closing(response["AudioStream"]) as stream:
                    os.makedirs(os.path.dirname(filepath), exist_ok=True)
                    with open(filepath, "wb") as file:
                        file.write(stream.read())
                print(f"Generated audio file: {filepath}")
            
        except (BotoCoreError, ClientError) as error:
            print(f"Error generating audio for {text}: {str(error)}")
        except Exception as e:
            print(f"Error generating audio for {text}: {str(e)}")

    def clean_text(self, text):
        """Clean text before generating audio"""
        # Amazon Polly handles contractions well, just clean up any problematic characters
        text = text.strip()
        return text

    def generate_vocabulary_audio_lesson1(self):
        """Generate audio files for lesson 1 vocabulary"""
        vocabulary = {
            'L1_I_audio': "I",
            'L1_you_audio': "you",
            'L1_youUd_audio': "you",
            'L1_he_audio': "he",
            'L1_she_audio': "she",
            'L1_it_audio': "it",
            'L1_we_audio': "we",
            'L1_youUds_audio': "you",
            'L1_theyM_audio': "they",
            'L1_theyF_audio': "they",
            'L1_theyThings_audio': "they",
            'L1_no_audio': "no",
            'L1_toBe_audio': "to be"
        }
        
        for audio_id, text in vocabulary.items():
            self.generate_audio(text, f'audio/lesson1/{audio_id}.mp3')

    def generate_vocabulary_audio_lesson2(self):
        """Generate audio files for lesson 2 vocabulary"""
        vocabulary = {
            'L2_hello_audio': "hello",
            'L2_goodbye_audio': "goodbye",
            'L2_goodmorning_audio': "good morning",
            'L2_goodafternoon_audio': "good afternoon",
            'L2_goodevening_audio': "good evening",
            'L2_goodnight_audio': "good night",
            'L2_youngman_audio': "the young man",
            'L2_youngwoman_audio': "the young woman",
            'L2_oldman_audio': "the old man",
            'L2_oldwoman_audio': "the old woman"
        }
        
        for audio_id, text in vocabulary.items():
            filepath = os.path.join(self.base_dir, 'audio', 'lesson2', f'{audio_id}.mp3')
            self.generate_audio(text, filepath)

    def generate_verbal_practice_audio_lesson3(self):
        """Generate audio files for lesson 3 verbal practice"""
        exercises = {
            'L3_vp1_audio': "I go to school.",
            'L3_vp2_audio': "You go to school.",
            'L3_vp3_audio': "He goes to school.",
            'L3_vp4_audio': "She goes to school.",
            'L3_vp5_audio': "John goes to school.",
            'L3_vp6_audio': "We go to school.",
            'L3_vp7_audio': "You go to school.",
            'L3_vp8_audio': "They go to school.",
            'L3_vp9_audio': "Robert goes to school.",
            'L3_vp10_audio': "My sister goes to school.",
            'L3_vp11_audio': "Mr. Hunt goes to school.",
            'L3_vp12_audio': "Miss Hunt goes to school.",
            'L3_vp13_audio': "John and I go to school.",
            'L3_vp14_audio': "Mrs. Hunt and I go to school.",
            'L3_vp15_audio': "John and Mary go to school.",
            'L3_vp16_audio': "The boys go to school.",
            'L3_vp17_audio': "The girls go to school too.",
            'L3_vp18_audio': "My brothers go to school too."
        }
        
        for audio_id, text in exercises.items():
            filepath = os.path.join(self.base_dir, 'audio', 'lesson3', f'{audio_id}.mp3')
            self.generate_audio(text, filepath)

    def generate_conversation_audio_lesson3(self):
        """Generate audio files for lesson 3 conversation questions"""
        conversations = {
            'L3_conv1_audio': "Are you Mexican?",
            'L3_conv2_audio': "Isn't the little boy here?",
            'L3_conv3_audio': "Are the girls in the house?",
            'L3_conv4_audio': "Aren't the boys brothers?",
            'L3_conv5_audio': "Is the boy little?",
            'L3_conv6_audio': "Is Robert an American?",
            'L3_conv7_audio': "Are the boys in the car?",
            'L3_conv8_audio': "Isn't the little boy Mexican?",
            'L3_conv9_audio': "Aren't the girls with John?",
            'L3_conv10_audio': "Are they sisters?",
            'L3_conv11_audio': "Are they brothers?",
            'L3_conv12_audio': "Is the man American?",
            'L3_conv13_audio': "Isn't Robert with Mr. Hunt?",
            'L3_conv14_audio': "Is Mary with Miss Hunt?",
            'L3_conv15_audio': "Is John a big boy?"
        }
        
        for audio_id, text in conversations.items():
            filepath = os.path.join(self.base_dir, 'audio', 'lesson3', f'{audio_id}.mp3')
            self.generate_audio(text, filepath)

    def generate_exercise_audio_lesson5(self):
        """Generate audio files for lesson 5 exercises"""
        exercises = {
            'L5_ex1_1': "There's a girl here.",
            'L5_ex1_2': "There isn't a boy here.",
            'L5_ex1_3': "Are there many cars?",
            'L5_ex1_4': "How many cars are there?",
            'L5_ex1_5': "Is there a telephone here?",
            'L5_ex1_6': "No, there isn't.",
            'L5_ex1_7': "Aren't there ten letters?",
            'L5_ex1_8': "No, there are eight.",
            'L5_ex1_9': "How many notebooks are there?",
            'L5_ex1_10': "There are five.",
            'L5_ex1_11': "You write many letters."
        }
        
        for audio_id, text in exercises.items():
            filepath = os.path.join(self.base_dir, 'audio', 'lesson5', f'{audio_id}.mp3')
            self.generate_audio(text, filepath)

    def generate_vocabulary_audio_lesson4(self):
        """Generate audio files for lesson 4 vocabulary and exercises"""
        # Basic vocabulary
        vocabulary = {
            'L4_read_audio': "to read",
            'L4_say_audio': "to say",
            'L4_write_audio': "to write",
            'L4_use_audio': "to use",
            'L4_take_audio': "to take",
            'L4_on_audio': "on",
            'L4_at_audio': "at",
            'L4_from_audio': "from",
            'L4_this_audio': "this",
            'L4_thisone_audio': "this one",
            'L4_these_audio': "these",
            'L4_how_audio': "how",
            'L4_howmany_audio': "how many",
            'L4_good_audio': "good",
            'L4_well_audio': "well"
        }

        # Exercise 6 sentences
        exercise6 = {
            'L4_ex6_1_audio': "There's a boy here",
            'L4_ex6_2_audio': "There are three books",
            'L4_ex6_3_audio': "Is there a pencil",
            'L4_ex6_4_audio': "Are there any pens"
        }

        # Exercise 8 sentences
        exercise8 = {
            'L4_ex8_1_audio': "This book is good",
            'L4_ex8_2_audio': "These pens are blue",
            'L4_ex8_3_audio': "I like this one",
            'L4_ex8_4_audio': "How many books are there"
        }

        # Exercise 9 sentences
        exercise9 = {
            'L4_ex9_1_audio': "The book is on the table",
            'L4_ex9_2_audio': "He's at home",
            'L4_ex9_3_audio': "They come from school",
            'L4_ex9_4_audio': "The picture is on the wall",
            'L4_ex9_5_audio': "She's at the office",
            'L4_ex9_6_audio': "I am from Spain",
            'L4_ex9_7_audio': "The pen is on the desk",
            'L4_ex9_8_audio': "We are at school",
            'L4_ex9_9_audio': "This book is good",
            'L4_ex9_10_audio': "These are my books"
        }

        # Exercise 11 sentences
        exercise11 = {
            'L4_ex11_1_audio': "I read books",
            'L4_ex11_2_audio': "She writes letters",
            'L4_ex11_3_audio': "What do you say"
        }

        # Preposition practice sentences
        prepositions = {
            'L4_prep_on_1_audio': "The book is on the table",
            'L4_prep_on_2_audio': "The pen is on the desk",
            'L4_prep_on_3_audio': "The store is on Reforma",
            'L4_prep_at_1_audio': "We are at the movies",
            'L4_prep_at_2_audio': "I am at home",
            'L4_prep_at_3_audio': "She is at school",
            'L4_prep_at_4_audio': "The store is at 5 Reforma",
            'L4_prep_from_1_audio': "I am from the office",
            'L4_prep_from_2_audio': "They are from home",
            'L4_prep_from_3_audio': "We are from school",
            'L4_prep_from_4_audio': "They are from the movies"
        }

        # Generate all audio files
        for filename, text in {**vocabulary, **exercise6, **exercise8, **exercise9, **exercise11, **prepositions}.items():
            self.generate_audio(text, f'audio/lesson4/{filename}.mp3')

    def process_lesson(self, lesson_num):
        """Process a specific lesson number"""
        if lesson_num == 1:
            self.generate_vocabulary_audio_lesson1()
        elif lesson_num == 2:
            self.generate_vocabulary_audio_lesson2()
        elif lesson_num == 3:
            self.generate_verbal_practice_audio_lesson3()
            self.generate_conversation_audio_lesson3()
        elif lesson_num == 4:
            self.generate_vocabulary_audio_lesson4()
        elif lesson_num == 5:
            self.generate_exercise_audio_lesson5()

def main():
    generator = AudioGenerator()
    for lesson_num in range(1, 6):
        generator.process_lesson(lesson_num)

if __name__ == "__main__":
    main() 