import { styles } from "../styles/styles";
import type { MobileStepProps } from "../types/formProperties";

export function MobileStep({ onSubmit, mobileNumber, setMobileNumber, loading }: MobileStepProps) {
    return (
        <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>Add your mobile number</label>
            <input
                type="tel"
                placeholder="+1234567890"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={styles.input}
                autoFocus
                required
            />
            <button
                type="submit"
                style={loading || !mobileNumber ? styles.buttonDisabled : styles.button}
                disabled={loading || !mobileNumber}
            >
                {loading ? "Sending..." : "Send verification code"}
            </button>
        </form>
    );
}
