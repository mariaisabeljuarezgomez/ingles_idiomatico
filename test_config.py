from dotenv import load_dotenv
import os
import boto3
from flask import Flask
from flask_mail import Mail, Message
import time

def test_configurations():
    print("Starting configuration tests...")
    
    # Load environment variables
    load_dotenv()
    
    # Test AWS Polly Configuration
    print("\nTesting AWS Polly configuration...")
    try:
        polly = boto3.client(
            'polly',
            aws_access_key_id=os.getenv('AWS_POLLY_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_POLLY_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_POLLY_REGION', 'us-east-1')
        )
        
        response = polly.synthesize_speech(
            Text="This is a test message.",
            OutputFormat="mp3",
            VoiceId="Matthew"
        )
        
        if "AudioStream" in response:
            print("✅ AWS Polly configuration is working correctly!")
        else:
            print("❌ AWS Polly response doesn't contain AudioStream")
            
    except Exception as e:
        print("❌ AWS Polly configuration error:", str(e))
    
    # Test Email Configuration
    print("\nTesting email configuration...")
    try:
        app = Flask(__name__)
        app.config.update(
            MAIL_SERVER=os.getenv('MAIL_SERVER'),
            MAIL_PORT=int(os.getenv('MAIL_PORT', 587)),
            MAIL_USE_TLS=os.getenv('MAIL_USE_TLS', 'true').lower() == 'true',
            MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
            MAIL_PASSWORD=os.getenv('MAIL_PASSWORD')
        )
        
        mail = Mail(app)
        
        print("Email configuration loaded:")
        print(f"Server: {app.config['MAIL_SERVER']}")
        print(f"Port: {app.config['MAIL_PORT']}")
        print(f"Username: {app.config['MAIL_USERNAME']}")
        print(f"TLS Enabled: {app.config['MAIL_USE_TLS']}")
        print(f"Password set: {bool(app.config['MAIL_PASSWORD'])}")
        
        # Don't actually send an email, just verify the configuration
        if all([
            app.config['MAIL_SERVER'],
            app.config['MAIL_PORT'],
            app.config['MAIL_USERNAME'],
            app.config['MAIL_PASSWORD']
        ]):
            print("✅ Email configuration appears to be set correctly!")
        else:
            print("❌ Some email configuration values are missing")
            
    except Exception as e:
        print("❌ Email configuration error:", str(e))

if __name__ == '__main__':
    test_configurations() 