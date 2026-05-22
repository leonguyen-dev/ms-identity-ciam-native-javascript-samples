import { styles } from "../styles/styles";
import type { EmailCodeStepProps } from "../types/formProperties";

export function EmailCodeStep({ onSubmit, code, setCode, loading, email, onCancel, onResend }: EmailCodeStepProps) {
    return (
        <form onSubmit={onSubmit} style={styles.form}>
            <h2 style={styles.stepHeading}>Enter the code (1/3)</h2>

            <div style={styles.sentBanner}>
                We sent an email to <strong>{email}</strong>
            </div>

            <label htmlFor="signup-email-code" style={styles.label}>
                Code
            </label>
            <input
                id="signup-email-code"
                type="text"
                inputMode="numeric"
                placeholder="Enter your code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.input}
                autoFocus
                required
            />

            <div style={styles.actionsRow}>
                <button
                    type="submit"
                    style={loading || !code ? styles.buttonDisabled : styles.button}
                    disabled={loading || !code}
                >
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
