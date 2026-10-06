"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                setError("Incorrect password. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-auth shell">
            <section className="admin-auth__panel" aria-labelledby="admin-login-title">
                <p className="eyebrow">GT / Admin / Authentication</p>
                <div className="admin-auth__icon" aria-hidden="true"><Lock size={18} /></div>
                <h1 id="admin-login-title" className="admin-auth__title">Sign in to the journal.</h1>
                <p className="mt-3 text-sm text-fg-muted">Enter your password to manage published writing.</p>

                <form onSubmit={handleSubmit} className="admin-auth__form">
                    <div className="admin-auth__field">
                        <label htmlFor="admin-password" className="mono">Password</label>
                        <div className="admin-auth__input-wrap">
                            <input
                                id="admin-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="admin-auth__reveal"
                            >
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="admin-auth__error" role="alert">{error}</p>}

                    <button type="submit" disabled={loading || !password} className="btn btn--primary admin-auth__submit">
                        {loading ? "Authenticating..." : <>Enter admin <ArrowRight size={16} aria-hidden="true" /></>}
                    </button>
                </form>
            </section>
        </main>
    );
}
