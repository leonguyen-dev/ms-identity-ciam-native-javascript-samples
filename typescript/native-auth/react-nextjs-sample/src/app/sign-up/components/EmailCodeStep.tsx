import { styles } from "../styles/styles";
import type { EmailCodeStepProps } from "../types/formProperties";

export function EmailCodeStep({ onSubmit, code, setCode, loading }: EmailCodeStepProps) {
    return (
        <form onSubmit={onSubmit} style={styles.form}>
            <label style={styles.label}>Enter email verification code</label>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={styles.input}
                autoFocus
                required
            />
            <button
                type="submit"
                style={loading || !code ? styles.buttonDisabled : styles.button}
                disabled={loading || !code}
            >
                {loading ? "Working..." : "Next"}
            </button>
        </form>
    );
}
