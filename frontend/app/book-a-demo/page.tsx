"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaTimes,
  FaInfoCircle,
} from "react-icons/fa";
import "./page.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  interest: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  consent?: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  consent: false,
};

interface NeuInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
  required?: boolean;
}

function NeuInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
  required,
}: NeuInputProps) {
  return (
    <div className="neu-form-group">
      <label className="neu-label" htmlFor={id}>
        {label}
        {required && <span className="neu-star"> *</span>}
      </label>

      <div className={`neu-input-wrap${error ? " neu-input-wrap--error" : ""}`}>
        <span className="neu-input-icon">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="neu-control"
          autoComplete="off"
        />
      </div>

      {error && <p className="neu-error">{error}</p>}
    </div>
  );
}

interface NeuTextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  error?: string;
  icon: React.ReactNode;
  required?: boolean;
}

function NeuTextarea({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  icon,
  required,
}: NeuTextareaProps) {
  return (
    <div className="neu-form-group">
      <label className="neu-label" htmlFor={id}>
        {label}
        {required && <span className="neu-star"> *</span>}
      </label>

      <div
        className={`neu-input-wrap neu-input-wrap--textarea${
          error ? " neu-input-wrap--error" : ""
        }`}
      >
        <span className="neu-input-icon neu-input-icon--top">{icon}</span>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="neu-control neu-control--textarea"
          rows={4}
          maxLength={300}
        />
      </div>

      {error && <p className="neu-error">{error}</p>}
    </div>
  );
}

interface BookDemoModalProps {
  onClose?: () => void;
}

export default function BookDemoModal({ onClose }: BookDemoModalProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    router.back();
  };

  const set = (field: keyof FormState, val: string | boolean) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!form.name.trim()) e.name = "Full name is required.";

    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) e.phone = "Mobile number is required.";
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid number.";
    }

    if (!form.interest.trim()) {
      e.interest = "Please tell us your area of interest.";
    }

    if (!form.consent) e.consent = "Your consent is required to proceed.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
        const response = await fetch(`${backendUrl}/demo-requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            interest: form.interest,
            consent: form.consent
          }),
        });

        if (response.ok) {
          setSubmitted(true);
          setForm(initialForm);
          setTimeout(() => setSubmitted(false), 3200);
        } else {
          console.error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  return (
    <div className="neu-backdrop">
      <div
        className="neu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="neu-modal-header">
          <div className="neu-header-accent" />

          <h2 id="modal-title" className="neu-modal-title">
            Book a Demo
          </h2>

          <button
            type="button"
            className="neu-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <FaTimes size={15} />
          </button>
        </div>

        <div className="neu-modal-body">
          <div className="neu-notice">
            <FaInfoCircle size={14} className="neu-notice-icon" />
            <span>
              Fields marked with <strong>*</strong> are mandatory.
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="neu-row-2">
              <NeuInput
                label="Full Name"
                id="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your full name"
                error={errors.name}
                icon={<FaUser size={15} />}
                required
              />

              <NeuInput
                label="Email ID"
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="Your email address"
                error={errors.email}
                icon={<FaEnvelope size={15} />}
                required
              />
            </div>

            <NeuInput
              label="Mobile Number"
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="Your mobile number"
              error={errors.phone}
              icon={<FaPhone size={15} />}
              required
            />

            <NeuTextarea
              label="Area of Interest"
              id="interest"
              value={form.interest}
              onChange={(e) => set("interest", e.target.value)}
              placeholder="Tell us what you're interested in…"
              error={errors.interest}
              icon={<FaCommentDots size={15} />}
              required
            />

            <div className="neu-form-group">
              <label className="neu-checkbox-label" htmlFor="consent">
                <input
                  type="checkbox"
                  id="consent"
                  className="neu-checkbox-native"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                />

                <span className="neu-checkbox-box" aria-hidden="true" />

                <span className="neu-checkbox-text">
                  I consent to be contacted by a PRGEEQ expert
                  <span className="neu-star"> *</span>
                </span>
              </label>

              {errors.consent && <p className="neu-error">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className={`neu-submit-btn${
                submitted ? " neu-submit-btn--done" : ""
              }`}
              disabled={submitted}
            >
              {submitted ? "✓  Request Submitted!" : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}