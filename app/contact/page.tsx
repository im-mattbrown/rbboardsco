"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const INTEREST_OPTIONS = [
  "Cutting Board",
  "Pizza Board",
  "Custom Order",
  "Something Else",
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState(false);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  // Activate the Send button once the required fields have input.
  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const val = (name: string) =>
      (
        form.elements.namedItem(name) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | null
      )?.value.trim() ?? "";
    setReady(Boolean(val("name") && val("email") && val("message")));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey ?? "");
    formData.append("subject", "New enquiry from the Rb Boards website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Get in Touch</h1>

        {status === "success" ? (
          <div className={styles.success}>
            <h2>Thanks — your message is on its way.</h2>
            <p>We&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onChange={handleChange}
          >
            {/* Honeypot spam trap */}
            <input
              type="checkbox"
              name="botcheck"
              className={styles.hidden}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="name">Your Name*</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Your Email*</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className={styles.field}>
                <label htmlFor="interest">What Are You Interested In?</label>
                <div className={styles.selectWrap}>
                  <select id="interest" name="interest" defaultValue="">
                    <option value="" disabled>
                      Select an option
                    </option>
                    {INTEREST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg
                    className={styles.chevron}
                    width="24"
                    height="12"
                    viewBox="0 0 24 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 2l10 8 10-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="budget">Budget</label>
                <input id="budget" name="budget" type="text" />
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="message">Message*</label>
                <textarea id="message" name="message" required />
              </div>
            </div>

            {status === "error" && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.sendBtn} ${
                  ready ? styles.sendBtnActive : ""
                }`}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "SENDING…" : "SEND"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Decorative topographic curve (matches Figma) */}
      <svg
        className={styles.curve}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M-40 400 C 300 120, 1140 120, 1480 400"
          fill="none"
          stroke="#ddb892"
          strokeWidth="2"
        />
      </svg>
    </main>
  );
}
