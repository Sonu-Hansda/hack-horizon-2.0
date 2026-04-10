"""
Test runner for report processing
"""

from app.services.report_pipeline import process_report

def test_process_report(file_path: str, document_type: str):
    print("=== TEST START ===")
    print(f"File: {file_path}")
    print(f"Type: {document_type}")

    result = process_report(file_path, document_type)

    print("\n=== RESULT ===")
    print(result)

    return result