import { useState } from "react";
import { styles } from "../styles/styles";
import type { EmailStepProps } from "../types/formProperties";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailStep({ onSubmit, email, setEmail, loading, onCancel }: EmailStepProps) {
    const [submitted, setSubmitted] = useState(false);
    const isValid = EMAIL_REGEX.test(email);
    const showError = submitted && !isValid;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isValid) return;
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <h2 style={styles.stepHeading}>Enter your email address (1/3)</h2>

            <label htmlFor="signup-email" style={styles.label}>
                Email address
            </label>
            <input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                autoFocus
            />
            {showError && <div style={styles.error}>Please enter a valid email address.</div>}

            <div style={styles.guideBox}>
                <div style={styles.guideTitle}>Email address guide</div>
                <ul style={styles.guideList}>
                    <li>Enter the email address you will use to sign in to your myServiceTas account.</li>
                    <li>We will email you a code which you will have to enter on the next screen.</li>
                    <li>
                        You cannot use a school email address or one you share with someone else. An email address can
                        only be used for one account.
                    </li>
                </ul>
            </div>

            <div style={styles.actionsRow}>
                <button
                    type="submit"
                    style={loading ? styles.buttonDisabled : styles.button}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send verification code"}
                </button>
                <button type="button" className="st-cancel-button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
