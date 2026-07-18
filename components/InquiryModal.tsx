"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InquiryModal.module.css";
import type { Product } from "./ProductCard";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryModal({
  open,
  product,
  onClose,
}: {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setError("");

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey ?? "");
    formData.append("subject", `Board inquiry from the Rb Boards website`);
    formData.append(
      "board",
      product ? `Board ${product.id} — ${product.title}` : ""
    );

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
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <h2 id="inquiry-title" className={styles.modalTitle}>
              Thanks — we&apos;ll follow up soon.
            </h2>
            <button
              type="button"
              className={styles.sendBtn}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 id="inquiry-title" className={styles.modalTitle}>
              Send us your contact info and we will follow up
            </h2>

            {/* Honeypot spam trap */}
            <input
              type="checkbox"
              name="botcheck"
              className={styles.hidden}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className={styles.field}>
              <label htmlFor="inq-name">Name</label>
              <input id="inq-name" name="name" type="text" required ref={nameRef} />
            </div>

            <div className={styles.field}>
              <label htmlFor="inq-email">Email</label>
              <input id="inq-email" name="email" type="email" required />
            </div>

            {status === "error" && <p className={styles.errorMsg}>{error}</p>}

            <button
              type="submit"
              className={styles.sendBtn}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
