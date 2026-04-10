import google.generativeai as genai
from app.services.context_builder import build_context_report, build_context_prescription
from app.core.config import settings
import json

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

PROMPT_TEMPLATE = """
You are a helpful and friendly medical assistant.

You are having a conversation with a patient. Answer in a natural, human-like tone.

Report Summary:
{report_data}

Instructions:
- Answer ONLY based on the report data above
- Do NOT hallucinate or assume anything not present
- If the answer is not available, say:
  "I couldn't find that information in your report."
- Keep the response clear, simple, and conversational
- If something is abnormal, gently explain what it means
- Avoid overly technical jargon unless necessary

User Question:
{question}

Answer:
"""

def chat_with_report(report_type: str, report_data: dict, question: str):

    if report_type == "diagnostic":
        context = build_context_report(report_data)
    elif report_type == "prescription":
        context = build_context_prescription(report_data)
    else:
        raise ValueError("Invalid report type")

    prompt = PROMPT_TEMPLATE.format(
        report_data=context,
        question=question
    )

    response = model.generate_content(prompt)

    return response.text.strip()