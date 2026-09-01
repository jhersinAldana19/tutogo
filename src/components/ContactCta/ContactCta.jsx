import { useEffect, useId, useRef, useState } from "react";
import { contactCta } from "../../content/site";
import {
  contactInfo,
  hasAnyContact,
  hasContactValue,
} from "../../content/contact";
import { useGsapContext } from "../../hooks/useGsapContext";
import Button from "../Button/Button.jsx";
import TikTokMark from "../TikTokMark/TikTokMark.jsx";
import styles from "./ContactCta.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

function ContactDetails() {
  if (!hasAnyContact()) return null;

  return (
    <ul className={styles.details}>
      {hasContactValue(contactInfo.name) ? (
        <li>
          <span>Nombre de contacto</span>
          {contactInfo.name}
        </li>
      ) : null}
      {hasContactValue(contactInfo.email) ? (
        <li>
          <span>Correo electrónico</span>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </li>
      ) : null}
      {hasContactValue(contactInfo.phone) ? (
        <li>
          <span>Teléfono / WhatsApp</span>
          <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
        </li>
      ) : null}
      {hasContactValue(contactInfo.tiktok) ? (
        <li>
          <span>
            <TikTokMark />
          </span>
          {contactInfo.tiktok}
        </li>
      ) : null}
      {hasContactValue(contactInfo.instagram) ? (
        <li>
          <span>Instagram</span>
          {contactInfo.instagram}
        </li>
      ) : null}
    </ul>
  );
}

function ChoiceGroup({ label, options, value, onChange, disabled = false }) {
  const labelId = useId();

  function onKeyDown(event) {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowDown" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowUp"
    ) {
      return;
    }

    event.preventDefault();
    const current = Math.max(0, options.indexOf(value));
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = options[(current + delta + options.length) % options.length];
    onChange(next);
    const button = event.currentTarget.querySelector(
      `[data-choice="${next}"]`,
    );
    button?.focus();
  }

  return (
    <div
      className={styles.group}
      role="group"
      aria-labelledby={labelId}
      aria-disabled={disabled || undefined}
      onKeyDown={disabled ? undefined : onKeyDown}
      data-campana-choice
    >
      <p id={labelId} className={styles.groupLabel}>
        {label}
      </p>
      <div className={styles.chips}>
        {options.map((option) => {
          const pressed = value === option;

          return (
            <button
              key={option}
              type="button"
              data-choice={option}
              className={`${styles.chip} ${pressed ? styles.chipOn : ""}`}
              aria-pressed={pressed}
              disabled={disabled}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function validate(form) {
  const errors = {};
  const { form: copy } = contactCta;

  if (!form.name.trim()) errors.name = copy.required;
  if (!form.company.trim()) errors.company = copy.required;
  if (!form.email.trim()) errors.email = copy.required;
  else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = copy.emailInvalid;
  }
  if (!form.message.trim()) errors.message = copy.required;

  return errors;
}

export default function ContactCta() {
  const root = useRef(null);
  const [format, setFormat] = useState("");
  const [reach, setReach] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const sentRef = useRef(null);
  const sendTimer = useRef(null);

  useGsapContext(root, (gsap, ScrollTrigger) => {
    const scope = root.current;
    if (scope.getBoundingClientRect().top < window.innerHeight * 0.92) {
      return;
    }

    gsap.from("[data-campana-copy]", {
      y: 20,
      autoAlpha: 0,
      duration: 0.55,
      ease: "power2.out",
      scrollTrigger: { trigger: scope, start: "top 80%" },
    });

    gsap.from("[data-campana-choice]", {
      y: 16,
      autoAlpha: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: scope, start: "top 74%" },
    });

    gsap.from("[data-campana-form]", {
      y: 18,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: { trigger: scope, start: "top 72%" },
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (status !== "sent") return undefined;
    sentRef.current?.focus();
    return undefined;
  }, [status]);

  useEffect(() => {
    return () => window.clearTimeout(sendTimer.current);
  }, []);

  function onFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const order = ["name", "company", "email", "message"];
      const first = order.find((key) => nextErrors[key]);
      root.current?.querySelector(`#campana-${first}`)?.focus();
      return;
    }

    const payload = {
      format,
      reach,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      country: form.country.trim(),
      message: form.message.trim(),
    };

    // TODO: reemplazar esta simulación por el envío real cuando exista backend.
    setStatus("sending");
    window.clearTimeout(sendTimer.current);
    sendTimer.current = window.setTimeout(() => {
      void payload;
      setStatus("sent");
    }, 550);
  }

  function startAgain() {
    setStatus("idle");
    setForm(emptyForm);
    setFormat("");
    setReach("");
    setErrors({});
  }

  const copy = contactCta.form;

  return (
    <section
      id="campana"
      className={`section ${styles.section}`}
      ref={root}
      aria-labelledby="campana-title"
    >
      <div className={`wrap ${styles.layout}`}>
        <div className={styles.intro}>
          <div data-campana-copy>
            <h2 id="campana-title" className={styles.title}>
              {contactCta.title}
            </h2>
            <p className={styles.lead}>{contactCta.lead}</p>
            <p className={styles.body}>{contactCta.body}</p>
          </div>

          <ChoiceGroup
            label={contactCta.formatLabel}
            options={contactCta.formats}
            value={format}
            onChange={setFormat}
            disabled={status !== "idle"}
          />
          <ChoiceGroup
            label={contactCta.reachLabel}
            options={contactCta.reach}
            value={reach}
            onChange={setReach}
            disabled={status !== "idle"}
          />
        </div>

        {status === "sent" ? (
          <div
            className={styles.done}
            data-campana-form
            role="status"
            aria-live="polite"
          >
            <p className={styles.doneKicker}>{copy.successKicker}</p>
            <h3
              id="campana-sent"
              className={styles.doneTitle}
              tabIndex={-1}
              ref={sentRef}
            >
              {copy.successTitle}
            </h3>
            <p className={styles.doneBody}>
              {form.name.trim()
                ? copy.successThanks.replace("{name}", form.name.trim())
                : copy.successBody}
            </p>
            {format || reach || form.company.trim() ? (
              <p className={styles.doneMeta}>
                {[form.company.trim(), format, reach]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
            <button
              type="button"
              className={styles.again}
              onClick={startAgain}
            >
              {copy.successAgain}
            </button>
          </div>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            data-campana-form
          >
            <fieldset className={styles.fields} disabled={status === "sending"}>
              <input type="hidden" name="format" value={format} />
              <input type="hidden" name="reach" value={reach} />
          <Field
            id="campana-name"
            name="name"
            label={copy.name}
            value={form.name}
            onChange={onFieldChange}
            error={errors.name}
            required
          />
          <Field
            id="campana-company"
            name="company"
            label={copy.company}
            value={form.company}
            onChange={onFieldChange}
            error={errors.company}
            required
          />
          <Field
            id="campana-email"
            name="email"
            type="email"
            label={copy.email}
            value={form.email}
            onChange={onFieldChange}
            error={errors.email}
            autoComplete="email"
            required
          />
          <Field
            id="campana-phone"
            name="phone"
            type="tel"
            label={copy.phone}
            value={form.phone}
            onChange={onFieldChange}
            autoComplete="tel"
          />
          <Field
            id="campana-country"
            name="country"
            label={copy.country}
            value={form.country}
            onChange={onFieldChange}
            autoComplete="country-name"
          />
          <Field
            id="campana-message"
            name="message"
            label={copy.message}
            value={form.message}
            onChange={onFieldChange}
            error={errors.message}
            multiline
            required
          />

              <Button
                type="submit"
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? copy.sending : copy.submit}
              </Button>
            </fieldset>
          </form>
        )}

        <ContactDetails />
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  multiline = false,
  autoComplete,
}) {
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const Control = multiline ? "textarea" : "input";

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <Control
        id={id}
        name={name}
        className={`${multiline ? styles.textarea : styles.input} ${
          error ? styles.invalid : ""
        }`}
        value={value}
        onChange={onChange}
        type={multiline ? undefined : type}
        rows={multiline ? 4 : undefined}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
