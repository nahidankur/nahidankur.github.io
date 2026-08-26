"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  AlertCircle,
  MessageSquare,
  RefreshCw,
  Download,
} from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export default function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = async (field: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.subject.trim() ||
      !formState.message.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "", _gotcha: "" });
    } catch (err: any) {
      setErrorMessage(
        err.message || "An error occurred while dispatching the message."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b dark:border-slate-800 border-stone-200 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono-code text-claude-700 dark:text-cyan-400 uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Comms &amp; Inquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-stone-900 tracking-tight mt-1">
              Get In Touch
            </h2>
          </div>
          <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500">
            Available for high-impact backend &amp; full-stack roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl glass-card border dark:border-slate-800 border-stone-200/90 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold dark:text-white text-stone-900 font-mono-code">
                  Contact Channels
                </h3>
                <a
                  href="/Nahid_Karim_Ankur_CV.pdf"
                  download="Nahid_Karim_Ankur_CV.pdf"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code dark:text-cyan-300 text-claude-700 dark:bg-cyan-500/10 bg-claude-500/15 border dark:border-cyan-500/30 border-claude-500/40 hover:bg-claude-500/25 dark:hover:bg-cyan-500/20 transition-colors font-medium shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl dark:bg-slate-900/60 bg-stone-50 border dark:border-slate-800/80 border-stone-200 flex items-center justify-between group hover:border-claude-500/40 dark:hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg dark:bg-cyan-500/10 bg-claude-500/10 text-claude-700 dark:text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-mono-code dark:text-slate-500 text-stone-500 uppercase">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-mono-code dark:text-slate-200 text-stone-800 hover:text-claude-700 dark:hover:text-cyan-400 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy("email", PERSONAL_INFO.email)}
                  className="p-2 rounded-lg dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:bg-slate-800/80 bg-stone-200 dark:hover:bg-slate-700/80 hover:bg-stone-300 shrink-0 ml-2"
                  title="Copy email"
                >
                  {copiedField === "email" ? (
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl dark:bg-slate-900/60 bg-stone-50 border dark:border-slate-800/80 border-stone-200 flex items-center justify-between group hover:border-claude-500/40 dark:hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-mono-code dark:text-slate-500 text-stone-500 uppercase">
                      Phone Number
                    </p>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-mono-code dark:text-slate-200 text-stone-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy("phone", PERSONAL_INFO.phone)}
                  className="p-2 rounded-lg dark:text-slate-400 text-stone-600 hover:text-stone-900 dark:hover:text-white dark:bg-slate-800/80 bg-stone-200 dark:hover:bg-slate-700/80 hover:bg-stone-300 shrink-0 ml-2"
                  title="Copy phone"
                >
                  {copiedField === "phone" ? (
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl dark:bg-slate-900/60 bg-stone-50 border dark:border-slate-800/80 border-stone-200 flex items-center space-x-3">
                <div className="p-2.5 rounded-lg dark:bg-indigo-500/10 bg-claude-500/10 dark:text-indigo-400 text-claude-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono-code dark:text-slate-500 text-stone-500 uppercase">
                    Location
                  </p>
                  <p className="text-xs sm:text-sm font-mono-code dark:text-slate-200 text-stone-800">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t dark:border-slate-800/80 border-stone-200">
                <p className="text-xs font-mono-code dark:text-slate-400 text-stone-500 uppercase mb-3">
                  Online Profiles
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-xl dark:bg-slate-900 bg-stone-50 border dark:border-slate-800 border-stone-200 hover:border-claude-500/40 text-xs font-mono-code dark:text-slate-300 text-stone-700 hover:text-claude-700 dark:hover:text-cyan-300 transition-all"
                  >
                    <Linkedin className="w-4 h-4 dark:text-cyan-400 text-claude-600" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 p-3 rounded-xl dark:bg-slate-900 bg-stone-50 border dark:border-slate-800 border-stone-200 hover:border-stone-400 text-xs font-mono-code dark:text-slate-300 text-stone-700 hover:text-stone-900 dark:hover:text-white transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border dark:border-slate-800 border-stone-200/90 relative">
              <h3 className="text-lg font-bold dark:text-white text-stone-900 font-mono-code mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs dark:text-slate-400 text-stone-600 mb-6 font-sans">
                Have an engineering inquiry, collaborative project, or opportunity? Messages are securely routed to my personal inbox.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl animate-fadeIn">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-mono-code dark:text-white text-stone-900">
                      Message Dispatched to Inbox!
                    </h4>
                    <p className="text-xs dark:text-slate-300 text-stone-700 max-w-md mx-auto">
                      Thank you for getting in touch. Your email has been delivered to Nahid Karim Ankur, and I will review and reply shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono-code text-emerald-700 dark:text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Note</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formState._gotcha}
                    onChange={(e) =>
                      setFormState({ ...formState, _gotcha: e.target.value })
                    }
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-600 dark:text-rose-300 text-xs">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold font-mono-code">Delivery Notice</p>
                        <p className="dark:text-slate-300 text-stone-700">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code dark:text-slate-400 text-stone-600 mb-1">
                        Your Name <span className="text-claude-600 dark:text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-stone-300 text-sm font-sans dark:text-white text-stone-900 placeholder:text-stone-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-claude-500 dark:focus:border-cyan-500 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code dark:text-slate-400 text-stone-600 mb-1">
                        Your Email <span className="text-claude-600 dark:text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={100}
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-stone-300 text-sm font-sans dark:text-white text-stone-900 placeholder:text-stone-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-claude-500 dark:focus:border-cyan-500 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code dark:text-slate-400 text-stone-600 mb-1">
                      Subject <span className="text-claude-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={150}
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      placeholder="Engineering Role / Project Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-stone-300 text-sm font-sans dark:text-white text-stone-900 placeholder:text-stone-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-claude-500 dark:focus:border-cyan-500 transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-mono-code dark:text-slate-400 text-stone-600">
                        Message <span className="text-claude-600 dark:text-cyan-400">*</span>
                      </label>
                      <span className="text-[10px] font-mono-code dark:text-slate-500 text-stone-500">
                        {formState.message.length}/5000
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      required
                      maxLength={5000}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Write your message here..."
                      className="w-full px-4 py-2.5 rounded-xl dark:bg-slate-900/90 bg-white border dark:border-slate-800 border-stone-300 text-sm font-sans dark:text-white text-stone-900 placeholder:text-stone-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-claude-500 dark:focus:border-cyan-500 transition-colors resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-mono-code text-sm font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Dispatching payload via SMTP...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message via Email</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
