import boto3
import os
from dotenv import load_dotenv
from contextlib import closing

def test_voices():
    print("\n=== AWS Polly Voice Test ===")
    
    # Load environment variables
    load_dotenv()
    
    # Print AWS credentials (partially masked)
    access_key = os.getenv('AWS_POLLY_ACCESS_KEY_ID', '')
    secret_key = os.getenv('AWS_POLLY_SECRET_ACCESS_KEY', '')
    region = os.getenv('AWS_POLLY_REGION', 'us-east-1')
    
    print(f"\nAWS Configuration:")
    print(f"Access Key ID: {access_key[:4]}...{access_key[-4:] if access_key else 'Not Set'}")
    print(f"Secret Key: {'*' * 8}{secret_key[-4:] if secret_key else 'Not Set'}")
    print(f"Region: {region}")
    
    try:
        # Initialize Polly client
        polly = boto3.client(
            'polly',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name=region
        )
        
        # List available voices
        voices = polly.describe_voices()
        print("\nAvailable Neural Voices:")
        neural_voices = [v for v in voices['Voices'] if v['SupportedEngines'] == ['neural']]
        for voice in neural_voices:
            print(f"- {voice['Id']} ({voice['LanguageCode']})")

        # Test text
        test_text = "This is a test of the Matthew voice. Can you hear the difference between standard and neural?"
        
        # Generate with standard Matthew
        print("\nGenerating test files...")
        response = polly.synthesize_speech(
            Text=test_text,
            OutputFormat="mp3",
            VoiceId="Matthew",
            Engine="standard"
        )
        
        if "AudioStream" in response:
            with closing(response["AudioStream"]) as stream:
                with open("test_matthew_standard.mp3", "wb") as file:
                    file.write(stream.read())
            print("✅ Generated test_matthew_standard.mp3")
            
        # Generate with neural Matthew
        response = polly.synthesize_speech(
            Text=test_text,
            OutputFormat="mp3",
            VoiceId="Matthew",
            Engine="neural"
        )
        
        if "AudioStream" in response:
            with closing(response["AudioStream"]) as stream:
                with open("test_matthew_neural.mp3", "wb") as file:
                    file.write(stream.read())
            print("✅ Generated test_matthew_neural.mp3")
            
        print("\nTest files generated successfully!")
        print("Please compare test_matthew_standard.mp3 and test_matthew_neural.mp3")
        print("The neural version should sound more natural and less robotic.")
        
    except Exception as e:
        print("\n❌ Error:", str(e))
        print("\nPlease check your AWS credentials and permissions.")

if __name__ == '__main__':
    test_voices() 