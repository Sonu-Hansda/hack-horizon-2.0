import google.generativeai as genai
import json
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

PROMPT = """
You are a medical AI assistant.

Extract prescription details from this image.

Return STRICT JSON:

{
  "type": "prescription",
  "doctor_name": "",
  "medications": [
    {
      "name": "",
      "dosage": "",
      "frequency": "",
      "duration": "",
      "instructions": ""
    }
  ],
  "tests_recommended": [],
  "notes": ""
}

Rules:
- Extract even if handwriting is messy
- Do NOT hallucinate missing data
- Return ONLY JSON
"""

def extract_from_image(file_path: str):
    with open(file_path, "rb") as f:
        image_bytes = f.read()

    response = model.generate_content([
        PROMPT,
        {
            "mime_type": "image/png",
            "data": image_bytes
        }
    ])

    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)
    except Exception:
        return {
            "error": "json_parse_error",
            "raw_output": text
        }