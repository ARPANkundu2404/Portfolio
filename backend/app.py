from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure CORS to allow requests from React frontend
CORS(
    app,
    resources={
        r"/send-email": {
            "origins": [
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000",
                "https://arpankundu24.onrender.com/",
                VITE_BACKEND_URL := os.getenv("VITE_API_BASE_URL", "http://localhost:5000"),
            ],
            "methods": ["POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": False,
        }
    },
)

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("EMAIL_PASSWORD")

@app.route("/send-email", methods=["POST"])
def send_email():
    # Handle CORS preflight requests
    # if request.method == "OPTIONS":
    #     return "", 204

    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        # Validate required fields
        if not all([name, email, subject, message]):
            return jsonify({"error": "All fields are required"}), 400
        # 1️⃣ Send to YOU
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

        # 2️⃣ Auto reply to USER
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