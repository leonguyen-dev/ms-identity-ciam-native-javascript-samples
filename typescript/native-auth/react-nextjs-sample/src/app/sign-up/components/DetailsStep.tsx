import { useState } from "react";
import { styles } from "../styles/styles";
import type { DetailsStepProps } from "../types/formProperties";

export function DetailsStep({
    onSubmit,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    givenName,
    setGivenName,
    familyName,
    setFamilyName,
    dateOfBirth,
    setDateOfBirth,
    termsAccepted,
    setTermsAccepted,
    loading,
}: DetailsStepProps) {
    const [submitted, setSubmitted] = useState(false);

    const passwordsMatch = password.length > 0 && password === confirmPassword;
    const allFieldsFilled =
        password.length > 0 &&
        confirmPassword.length > 0 &&
        givenName.trim().length > 0 &&
        familyName.trim().length > 0 &&
        dateOfBirth.length > 0;
    const canSubmit = allFieldsFilled && passwordsMatch && termsAccepted;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!canSubmit) return;
        onSubmit(e);
    };

    const passwordMismatchError =
        submitted && confirmPassword.length > 0 && !passwordsMatch ? "Passwords do not match." : null;

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Enter your details</label>

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
            />
            {passwordMismatchError && <div style={styles.error}>{passwordMismatchError}</div>}

            <input
                type="text"
                placeholder="Given name"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                style={styles.input}
                required
            />
            <input
                type="text"
                placeholder="Family name"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                style={styles.input}
                required
            />

            <label style={styles.fieldLabel}>Date of birth (DD/MM/YYYY)</label>
            <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={styles.input}
                required
            />

            <label style={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span>I agree to the terms and conditions</span>
            </label>

            <button
                type="submit"
                style={loading || !canSubmit ? styles.buttonDisabled : styles.button}
                disabled={loading || !canSubmit}
            >
                {loading ? "Working..." : "Next"}
            </button>
        </form>
    );
}
