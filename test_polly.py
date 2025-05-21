import boto3
import os
from dotenv import load_dotenv

def test_polly():
    print("Testing AWS Polly configuration...")
    
    # Load environment variables
    load_dotenv()
    
    # Print AWS credentials (partially masked)
    access_key = os.getenv('AWS_POLLY_ACCESS_KEY_ID', '')
    secret_key = os.getenv('AWS_POLLY_SECRET_ACCESS_KEY', '')
    region = os.getenv('AWS_POLLY_REGION', 'us-east-1')
    
    print(f"Access Key ID: {access_key[:4]}...{access_key[-4:] if access_key else 'Not Set'}")
    print(f"Secret Key: {'*' * 8}{secret_key[-4:] if secret_key else 'Not Set'}")
    print(f"Region: {region}")
    
    try:
        polly = boto3.client(
            'polly',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            region_name=region
        )
        
        response = polly.synthesize_speech(
            Text="This is a test message.",
            OutputFormat="mp3",
            VoiceId="Matthew"
        )
        
        # Save the audio to test file
        if "AudioStream" in response:
            with open("test_audio.mp3", "wb") as file:
                file.write(response["AudioStream"].read())
            print("✅ AWS Polly test successful! Audio file saved as test_audio.mp3")
        else:
            print("❌ AWS Polly response doesn't contain AudioStream")
            
    except Exception as e:
        print("❌ AWS Polly configuration error:", str(e))

if __name__ == '__main__':
    test_polly() 