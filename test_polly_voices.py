import boto3
import os
from dotenv import load_dotenv

def test_polly_voices():
    print("Testing different AWS Polly voices...")
    
    load_dotenv()
    
    access_key = os.getenv('AWS_POLLY_ACCESS_KEY_ID', '')
    secret_key = os.getenv('AWS_POLLY_SECRET_ACCESS_KEY', '')
    region = os.getenv('AWS_POLLY_REGION', 'us-east-1')
    
    try:
        polly = boto3.client(
            'polly',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name=region
        )
        
        # Test text with natural phrasing
        test_text = """
        Hello! I'm excited to help you learn English in a more natural way. 
        Let me tell you about my day.
        I went for a walk in the park, met some friends, and had a lovely conversation.
        It was absolutely wonderful!
        """
        
        # List of voices to test (focusing on natural-sounding voices)
        voices = [
            ("Joanna", "neural"),    # American female
            ("Matthew", "neural"),    # American male
            ("Emma", "neural"),       # British female
            ("Brian", "neural"),      # British male
            ("Amy", "neural"),        # British female
            ("Stephen", "neural"),    # British male
        ]
        
        print("\nGenerating samples with different voices...")
        
        for voice_id, engine in voices:
            try:
                response = polly.synthesize_speech(
                    Text=test_text,
                    OutputFormat="mp3",
                    VoiceId=voice_id,
                    Engine=engine
                )
                
                if "AudioStream" in response:
                    filename = f"test_audio_{voice_id.lower()}.mp3"
                    with open(filename, "wb") as file:
                        file.write(response["AudioStream"].read())
                    print(f"✅ Generated {filename} using {voice_id} voice")
                    
            except Exception as e:
                print(f"❌ Error with {voice_id}: {str(e)}")
                
        print("\nDone! Check the generated audio files to compare different voices.")
        print("The neural voices should sound more natural and less robotic.")
        
    except Exception as e:
        print("❌ AWS Polly configuration error:", str(e))

if __name__ == '__main__':
    test_polly_voices() 