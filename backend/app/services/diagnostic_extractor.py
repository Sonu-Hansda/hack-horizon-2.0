import google.generativeai as genai
import json
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

PROMPT = """
You are a clinical AI system.

Extract structured diagnostic lab report data from this image.

Return STRICT JSON:

{
  "type": "diagnostic",
  "patient_name": "",
  "lab_results": [
    {
      "test": "",
      "value": number,
      "unit": "",
      "reference_range": "",
      "status": "low/high/normal"
    }
  ],
  "critical_alerts": []
}

Rules:
- Detect abnormal values using reference ranges
- Add serious abnormalities to critical_alerts
- Return ONLY JSON (no explanation)
"""

def extract_from_image(file_path: str):
    with open(file_path, "rb") as f:
        image_bytes = f.read()

    response = model.generate_content([
        PROMPT,
        {
            "mime_type": "image/png",  # safe default
            "data": image_bytes
        }
    ])

    text = response.text.strip()

    # Clean Gemini output
    text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)
    except Exception as e:
        return {
            "error": "json_parse_error",
            "raw_output": text
        }