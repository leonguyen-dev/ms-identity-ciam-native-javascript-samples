import { useState } from "react";
import { styles } from "../styles/styles";
import type { EmailStepProps } from "../types/formProperties";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailStep({ onSubmit, email, setEmail, loading }: EmailStepProps) {
    const [touched, setTouched] = useState(false);
    const isValid = EMAIL_REGEX.test(email);
    const showError = touched && email.length > 0 && !isValid;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        if (!isValid) return;
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Enter your email address</label>
            <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                style={styles.input}
                autoFocus
                required
            />
            {showError && <div style={styles.error}>Please enter a valid email address.</div>}
            <button
                type="submit"
                style={loading || !isValid ? styles.buttonDisabled : styles.button}
                disabled={loading || !isValid}
            >
                {loading ? "Sending..." : "Send verification code"}
            </button>
        </form>
    );
}
