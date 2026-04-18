from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import smtplib
from email.mime.text import MIMEText
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# ============================================
# CORS Configuration (Simple & Stable)
# ============================================
ALLOWED_ORIGINS = [
    "https://arpankundu24.onrender.com",
    "http://localhost:5173"
]

CORS(
    app,
    origins=ALLOWED_ORIGINS,
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=False
)

# Global CORS fallback headers for extra protection
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

# ============================================
# Rate Limiting (Anti-Spam)
# ============================================
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=[]
)

# ============================================
# reCAPTCHA Verification
# ============================================
RECAPTCHA_SECRET_KEY = os.getenv("RECAPTCHA_SECRET_KEY")

def verify_captcha(token):
    """Verify Google reCAPTCHA token."""
    if not RECAPTCHA_SECRET_KEY:
        print("Warning: RECAPTCHA_SECRET_KEY not set")
        return False
    
    try:
        response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": token
            },
            timeout=5
        )
        result = response.json()
        return result.get("success", False) and result.get("score", 0) > 0.5
    except Exception as e:
        print(f"reCAPTCHA verification error: {e}")
        return False

# ============================================
# Environment Variables
# ============================================
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("EMAIL_PASSWORD")

@app.route("/send-email", methods=["POST"])
@limiter.limit("5 per minute")
def send_email():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Verify reCAPTCHA
        captcha_token = data.get("captcha")
        if not captcha_token:
            return jsonify({"error": "reCAPTCHA token missing"}), 400

        if not verify_captcha(captcha_token):
            return jsonify({"error": "reCAPTCHA verification failed"}), 400

        # Validate form fields
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        if not all([name, email, subject, message]):
            return jsonify({"error": "All fields are required"}), 400

        # Send email to admin
        msg = MIMEText(f"""
New message from portfolio 🚀

Name: {name}
Email: {email}

Message:
{message}
""")

        msg["Subject"] = subject
        msg["From"] = EMAIL
        msg["To"] = EMAIL
        msg["Reply-To"] = email

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL, PASSWORD)
        server.send_message(msg)

        # Send auto-reply to user
        auto_msg = MIMEText(f"""
Hi {name},

Thanks for reaching out! 🙌

I’ve received your message and will get back to you soon.

Best regards,  
Arpan Kundu
""")

        auto_msg["Subject"] = "Thanks for reaching out 🚀"
        auto_msg["From"] = EMAIL
        auto_msg["To"] = email

        server.send_message(auto_msg)

        server.quit()

        return jsonify({"success": True, "message": "Email sent successfully"}), 200

    except smtplib.SMTPAuthenticationError:
        print("SMTP Authentication Error: Invalid email or password")
        return jsonify({"error": "Email service authentication failed"}), 500
    except smtplib.SMTPException as e:
        print(f"SMTP Error: {e}")
        return jsonify({"error": "Failed to send email"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Failed to process request"}), 500


if __name__ == "__main__":
    app.run(debug=True)