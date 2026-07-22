"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, Sparkles, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const PRESET_REQUIREMENTS = [
  "⚡ Zero to MVP (10–14 Days Development)",
  "💻 Full Custom Web Platform / Web App",
  "🎨 Modern Website Redesign & UI/UX System",
  "⚙️ Workflow Automation & Third-Party API Integration",
  "📊 Business Dashboard & Multi-user Portal",
  "🚀 SEO & Conversion Funnel Optimization",
  "🛡️ System Architecture Review & Code Audit",
  "🔄 Growth & Technical Maintenance Retainer"
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [requirements, setRequirements] = useState("");
  
  // Autocomplete dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  
  // Submission state
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for pre-filled requirement from URL parameter
  useEffect(() => {
    const reqParam = searchParams.get("requirement") || searchParams.get("package") || searchParams.get("service");
    if (reqParam) {
      const matchingPreset = PRESET_REQUIREMENTS.find(
        (p) => p.toLowerCase().includes(reqParam.toLowerCase())
      );
      if (matchingPreset) {
        setSelectedChips((prev) => (prev.includes(matchingPreset) ? prev : [...prev, matchingPreset]));
      } else {
        setRequirements(reqParam);
      }
    }
  }, [searchParams]);

  // Close autocomplete on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on input text
  const filteredSuggestions = PRESET_REQUIREMENTS.filter((item) =>
    item.toLowerCase().includes(requirements.toLowerCase()) && !selectedChips.includes(item)
  );

  function toggleChip(chipText: string) {
    if (selectedChips.includes(chipText)) {
      setSelectedChips(selectedChips.filter((c) => c !== chipText));
    } else {
      setSelectedChips([...selectedChips, chipText]);
    }
    setIsOpen(false);
  }

  function handleSelectSuggestion(suggestion: string) {
    if (!selectedChips.includes(suggestion)) {
      setSelectedChips([...selectedChips, suggestion]);
    }
    setRequirements("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || filteredSuggestions.length === 0) {
      if (e.key === "ArrowDown" && filteredSuggestions.length > 0) {
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(filteredSuggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  // Combine chips and typed text for final requirement payload
  const combinedRequirements = [
    ...selectedChips,
    requirements.trim() ? requirements.trim() : ""
  ].filter(Boolean).join(" | ");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !contact) return;

    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("_subject", "Nodewise - New Consultation Request");
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("name", name);
    formData.append("contact", contact);
    formData.append("requirements", combinedRequirements || "General Consultation Request");

    try {
      const response = await fetch("https://formsubmit.co/ajax/rulesmashpros@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setContact("");
        setRequirements("");
        setSelectedChips([]);
      } else {
        throw new Error("Failed to submit form. Please try again.");
      }
    } catch (err: any) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("There was an issue sending your request. Please try again or contact us via WhatsApp.");
    }
  }

  return (
    <div className="contact-form-container">
      {status === "success" ? (
        <div className="form-success-message">
          <CheckCircle className="success-icon" size={48} />
          <h3>Consultation Requested!</h3>
          <p>
            Thank you, <strong>{name || "there"}</strong>. Our engineering team will review your project details and reach out within 1 business day.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setStatus("idle")}
            style={{ marginTop: "1.5rem" }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form
          id="contact-consult-form"
          className="contact-form"
          onSubmit={handleSubmit}
          autoComplete="on"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="Nodewise - New Consultation Request" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="form-name">Full Name *</label>
            <input
              type="text"
              id="form-name"
              name="name"
              placeholder="Enter your name"
              spellCheck="false"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Contact (Email or Phone) */}
          <div className="form-group">
            <label htmlFor="form-contact">Contact (Email or Phone) *</label>
            <input
              type="text"
              id="form-contact"
              name="contact"
              placeholder="Enter your email or phone number"
              spellCheck="false"
              autoComplete="email tel"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          {/* Project Requirements (with Autocomplete & Suggestions) */}
          <div className="form-group autocomplete-container" ref={containerRef}>
            <label htmlFor="form-requirements" className="flex-between">
              <span>Project Requirements / Scope</span>
              <span className="label-hint"><Sparkles size={12} className="inline-icon" /> Select or type custom</span>
            </label>

            {/* Selected Chips / Badges */}
            {selectedChips.length > 0 && (
              <div className="selected-chips-wrapper">
                {selectedChips.map((chip, idx) => (
                  <span key={idx} className="selected-chip">
                    {chip}
                    <button
                      type="button"
                      className="chip-remove"
                      onClick={() => toggleChip(chip)}
                      title="Remove requirement"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Autocomplete Input */}
            <div className="input-with-autocomplete">
              <input
                ref={inputRef}
                type="text"
                id="form-requirements"
                name="requirements"
                placeholder={selectedChips.length > 0 ? "Add additional requirements..." : "e.g. Zero to MVP, Web App, Automation..."}
                spellCheck="false"
                autoComplete="off"
                value={requirements}
                onChange={(e) => {
                  setRequirements(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Interactive Autocomplete Suggestions Dropdown */}
            {isOpen && filteredSuggestions.length > 0 && (
              <ul className="autocomplete-suggestions-list" role="listbox">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    className={`autocomplete-suggestion-item ${
                      index === highlightedIndex ? "highlighted" : ""
                    }`}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Quick Select Presets / Tag Cloud */}
            <div className="quick-presets-section">
              <span className="presets-label">Popular Requirements:</span>
              <div className="preset-chips-cloud">
                {PRESET_REQUIREMENTS.map((preset, idx) => {
                  const isSelected = selectedChips.includes(preset);
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-chip-btn ${isSelected ? "active" : ""}`}
                      onClick={() => toggleChip(preset)}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hidden Input field to ensure standard form serialization */}
            <input type="hidden" name="full_requirements" value={combinedRequirements} />
          </div>

          {status === "error" && (
            <div className="form-error-alert" style={{ color: "#ff4d4d", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            id="btn-submit-consult"
            disabled={status === "submitting"}
          >
            <span>{status === "submitting" ? "Sending Request..." : "Send Consultation Request"}</span>
            <Send className="btn-icon" />
          </button>
        </form>
      )}
    </div>
  );
}
