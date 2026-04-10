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

def summarize_report(report_type: str, report_data: dict):

    if report_type == "diagnostic":
        context = build_context_report(report_data)

        prompt = f"""
You are a helpful medical assistant.

Summarize the following diagnostic report in simple, easy-to-understand language for a normal person.

Report Data:
{context}

Instructions:
- Keep it short (3–5 lines max)
- Highlight important findings (especially abnormal values)
- Explain what the results generally indicate in simple terms
- Avoid medical jargon or explain it briefly if used
- If everything is normal, clearly mention that

Write the summary as a small paragraph.
"""

    elif report_type == "prescription":
        context = build_context_prescription(report_data)

        prompt = f"""
You are a helpful medical assistant.

Summarize the following prescription in a clear and simple way for a patient.

Prescription Data:
{context}

Instructions:
- Keep it short (3–5 lines max)
- Clearly mention:
  - What medicines are prescribed and their purpose (if obvious)
  - Any important instructions
  - Any tests recommended
- Use a conversational and easy tone
- Avoid complex medical terms

Write the summary as a small paragraph.
"""

    else:
        raise ValueError("Invalid report type")

    response = model.generate_content(prompt)

    return response.text.strip()