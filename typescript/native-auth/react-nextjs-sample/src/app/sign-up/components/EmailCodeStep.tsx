import { useState } from "react";
import { styles } from "../styles/styles";
import type { EmailCodeStepProps } from "../types/formProperties";
import { ErrorSummary, FieldError, type FormError } from "@/app/shared/components/FormErrors";

const FIELD_ID = "signup-email-code";

export function EmailCodeStep({ onSubmit, code, setCode, loading, email, onCancel, onResend }: EmailCodeStepProps) {
    const [submitted, setSubmitted] = useState(false);

    const trimmed = code.trim();
    const isValid = trimmed.length >= 6 && /^\d+$/.test(trimmed);
    const showError = submitted && !isValid;

    const fieldErrorMessage = !trimmed
        ? "Please enter the verification code."
        : "Please enter a valid verification code.";

    const errors: FormError[] = showError
        ? [
              { id: FIELD_ID, message: fieldErrorMessage },
              { message: "One or more fields are filled out incorrectly. Please check your entries and try again." },
          ]
        : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <h2 style={styles.stepHeading}>Enter the code (1/3)</h2>

            <ErrorSummary errors={errors} />

            <div style={styles.sentBanner}>
                We sent an email to <strong>{email}</strong>
            </div>

            <label htmlFor={FIELD_ID} style={styles.label}>
                Code
            </label>
            <input
                id={FIELD_ID}
                type="text"
                inputMode="numeric"
                placeholder="Enter your code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.input}
                autoFocus
                aria-invalid={showError}
                aria-describedby={showError ? `${FIELD_ID}-error` : undefined}
            />
            {showError && <FieldError id={`${FIELD_ID}-error`} message={fieldErrorMessage} />}

            <div style={styles.actionsRow}>
                <button type="submit" style={loading ? styles.buttonDisabled : styles.button} disabled={loading}>
                    {loading ? "Working..." : "Next"}
                </button>
                <button type="button" className="st-cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>

            <div style={styles.resendLine}>
                Haven&apos;t got an email from us?{" "}
                <button
                    type="button"
                    className="st-text-button"
                    style={styles.resendButton}
                    onClick={onResend}
                    disabled={loading}
                >
                    Resend the code
                </button>
            </div>
        </form>
    );
}
