from app.services.diagnostic_extractor import extract_from_image as extract_diagnostic
from app.services.prescription_extractor import extract_from_image as extract_prescription

def process_report(file_path: str, document_type: str):

    if document_type == "diagnostic":
        data = extract_diagnostic(file_path)

    elif document_type == "prescription":
        data = extract_prescription(file_path)

    else:
        return {"error": "Invalid document type"}

    return {
        "document_type": document_type,
        "extracted_data": data
    }