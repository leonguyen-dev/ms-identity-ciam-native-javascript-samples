import { useState } from "react";
import { styles } from "../styles/styles";
import type { SmsCodeStepProps } from "../types/formProperties";
import { ErrorSummary, FieldError, type FormError } from "@/app/shared/components/FormErrors";

const FIELD_ID = "signup-sms-code";

export function SmsCodeStep({
    onSubmit,
    code,
    setCode,
    loading,
    onCancel,
    serverError,
    expectedCodeLength,
}: SmsCodeStepProps) {
    const [submitted, setSubmitted] = useState(false);

    const trimmed = code.trim();
    const requiredLength = expectedCodeLength && expectedCodeLength > 0 ? expectedCodeLength : 6;
    const isValid = trimmed.length === requiredLength && /^\d+$/.test(trimmed);
    const clientErrorMessage = !trimmed
        ? "Please enter the SMS verification code."
        : "Please enter a valid SMS verification code.";

    const showClientError = submitted && !isValid;
    const activeFieldMessage = showClientError ? clientErrorMessage : serverError ?? "";
    const showFieldError = Boolean(activeFieldMessage);

    const errors: FormError[] = showClientError
        ? [
              { id: FIELD_ID, message: clientErrorMessage },
              { message: "One or more fields are filled out incorrectly. Please check your entries and try again." },
          ]
        : serverError
          ? [{ id: FIELD_ID, message: serverError }]
          : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <h2 style={styles.stepHeading}>Enter SMS verification code</h2>

            <ErrorSummary errors={errors} />

            <label htmlFor={FIELD_ID} style={styles.label}>
                Code
            </label>
            <input
                id={FIELD_ID}
                type="text"
                inputMode="numeric"
                placeholder="Verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.input}
                autoFocus
                aria-invalid={showFieldError}
                aria-describedby={showFieldError ? `${FIELD_ID}-error` : undefined}
            />
            {showFieldError && <FieldError id={`${FIELD_ID}-error`} message={activeFieldMessage} />}

            <div style={styles.actionsRow}>
                <button type="submit" style={loading ? styles.buttonDisabled : styles.button} disabled={loading}>
                    {loading ? "Verifying..." : "Verify code"}
                </button>
                <button type="button" className="st-cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
