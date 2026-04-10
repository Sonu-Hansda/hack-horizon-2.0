def build_context_report(report_data: dict) -> str:
    lines = []

    # Patient
    if report_data.get("patient_name"):
        lines.append(f"Patient: {report_data['patient_name']}")

    # Lab Results
    for lab in report_data.get("lab_results", []):
        test = lab.get("test")
        value = lab.get("value")
        unit = lab.get("unit")
        status = lab.get("status")

        if test and value:
            line = f"{test}: {value} {unit} ({status})"
            lines.append(line)

    # Alerts
    alerts = report_data.get("critical_alerts", [])
    if alerts:
        lines.append("Critical Alerts:")
        for alert in alerts:
            lines.append(f"- {alert}")

    return "\n".join(lines)


def build_context_prescription(report_data: dict) -> str:
    lines = []

    # Doctor
    if report_data.get("doctor_name"):
        lines.append(f"Doctor: {report_data['doctor_name']}")

    # Medications
    medications = report_data.get("medications", [])
    if medications:
        lines.append("Medications:")
        for med in medications:
            name = med.get("name", "Unknown")
            dosage = med.get("dosage")
            frequency = med.get("frequency")
            duration = med.get("duration")
            instructions = med.get("instructions")

            med_line = f"- {name}"

            details = []
            if dosage:
                details.append(dosage)
            if frequency:
                details.append(frequency)
            if duration:
                details.append(duration)

            if details:
                med_line += f" ({', '.join(details)})"

            lines.append(med_line)

            # Add instructions separately (important for clarity)
            if instructions:
                lines.append(f"  Instructions: {instructions}")

    # Tests Recommended
    tests = report_data.get("tests_recommended", [])
    if tests:
        lines.append("Tests Recommended:")
        for test in tests:
            lines.append(f"- {test}")

    # Notes
    if report_data.get("notes"):
        lines.append(f"Notes: {report_data['notes']}")

    return "\n".join(lines)