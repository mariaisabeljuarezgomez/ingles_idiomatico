import os
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class AudioGenerator:
    def __init__(self, base_dir='.'):
        self.base_dir = base_dir
        self.ensure_directories()
        # Initialize Amazon Polly client using environment variables
        self.polly = boto3.client(
            'polly',
            aws_access_key_id=os.getenv('AWS_POLLY_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_POLLY_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_POLLY_REGION', 'us-east-1')
        )

    def ensure_directories(self):
        # Ensure the audio directories exist
        for lesson_num in range(1, 6):
            audio_path = os.path.join(self.base_dir, 'static', 'audio', f'lesson{lesson_num}')
            os.makedirs(audio_path, exist_ok=True)

    def generate_audio(self, text, lesson_number, audio_id):
        """Generate audio file using Amazon Polly"""
        filename = f"{audio_id}.mp3"
        filepath = os.path.join(self.base_dir, 'static', 'audio', f'lesson{lesson_number}', filename)

        try:
            # For single words and simple phrases, don't use SSML
            # Use Amazon Polly to synthesize speech
            response = self.polly.synthesize_speech(
                Text=text,
                OutputFormat="mp3",
                VoiceId="Matthew",
                Engine="neural"
            )

            # Save the audio stream
            if "AudioStream" in response:
                with closing(response["AudioStream"]) as stream:
                    with open(filepath, "wb") as file:
                        file.write(stream.read())
                print(f"Generated audio file: {filepath}")
                return f"/static/audio/lesson{lesson_number}/{filename}"
            else:
                print(f"Error: No AudioStream in response for text: {text}")
                return None

        except (BotoCoreError, ClientError) as error:
            print(f"Error generating audio for text '{text}': {error}")
            return None

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
            self.generate_audio(text, 1, audio_id)

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
            self.generate_audio(text, 2, audio_id)

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
            self.generate_audio(text, 3, audio_id)

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

        # Generate all audio files
        for audio_id, text in {**vocabulary, **exercise6, **exercise8, **exercise9, **exercise11}.items():
            self.generate_audio(text, 4, audio_id)

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
            self.generate_audio(text, 5, audio_id)

    def process_lesson(self, lesson_num):
        """Process a specific lesson number"""
        print(f"\nProcessing Lesson {lesson_num}...")
        if lesson_num == 1:
            self.generate_vocabulary_audio_lesson1()
        elif lesson_num == 2:
            self.generate_vocabulary_audio_lesson2()
        elif lesson_num == 3:
            self.generate_verbal_practice_audio_lesson3()
        elif lesson_num == 4:
            self.generate_vocabulary_audio_lesson4()
        elif lesson_num == 5:
            self.generate_exercise_audio_lesson5()
        print(f"Finished processing Lesson {lesson_num}")

def main():
    print("Starting audio generation with AWS Polly...")
    generator = AudioGenerator()
    for lesson_num in range(1, 6):
        generator.process_lesson(lesson_num)
    print("\nAudio generation complete!")

if __name__ == '__main__':
    main() 