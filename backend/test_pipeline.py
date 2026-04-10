"""
Test script to run the report processing pipeline with a sample file
"""

from app.services.test_runner import test_process_report

if __name__ == "__main__":
    file_path = r"C:\Users\adity\Downloads\Report\Screenshot 2026-04-10 133245.png"

    # change to "prescription" to test other flow
    document_type = "diagnostic"

    result = test_process_report(file_path, document_type)