import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, Phone, Send, Loader2, CheckCircle, Database, ArrowLeft } from "lucide-react";
import { portfolioConfig } from "../config";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  sentViaResend: boolean;
}

export default function Contact({ setActivePage }: { setActivePage?: (page: string) => void } = {}) {
  const { email, whatsappNumber } = portfolioConfig.personalInfo;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
    sentViaResend: boolean;
  } | null>(null);

  // Inbound submissions review (from backend)
  const [submissionsList, setSubmissionsList] = useState<Submission[]>([]);
  const [showSubmissions, setShowSubmissions] = useState(false);

  // Fetch local submissions to verify integration
  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissionsList(data.submissions || []);
      }
    } catch (err) {
      console.error("Failed to fetch submissions list:", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusMsg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const sentViaResend = !!data.submission?.sentViaResend;
        setLastSubmission({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          sentViaResend
        });
        setStatusMsg({
          type: "success",
          text: sentViaResend
            ? "Your message has been automatically sent to the artist's mailbox! I'll get back to you soon."
            : "Message saved on server database! Please click below to complete delivery to the artist's mailbox instantly."
        });
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatusMsg({
          type: "error",
          text: data.message || "Failed to submit form. Please try again."
        });
      }
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: "Could not connect to the backend server. Please verify the port is active."
      });
    } finally {
      setLoading(false);
    }
  };

  // Pre-compiled mailto and whatsapp link
 // src/components/Contact.tsx
const mailtoLink =
  "mailto:greenfilm0606@gmail.com?subject=Project%20Inquiry&body=Hello%20Yogesh%20Gowda%20S%20R%20(Green)%2C%20I%20would%20like%20to%20work%20with%20you.";

const whatsappLink =
  "https://wa.me/7204130306?text=Hello%2C%20I%20would%20like%20to%20work%20with%20you.";
  return (
    <div id="contact-page-section" className="min-h-[85vh] py-12 px-4 md:px-8 max-w-5xl mx-auto relative">
      {/* Elegant Go Back Button at the top left */}
      {setActivePage && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex justify-start"
        >
          <button
            id="btn-back-to-menu-contact"
            onClick={() => setActivePage("welcome")}
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:text-[#7ED957] dark:hover:text-[#7ED957] transition-all cursor-pointer group bg-zinc-100/50 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80 px-4 py-2 rounded-full border border-gray-200/50 dark:border-zinc-800"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Go Back to Menu</span>
          </button>
        </motion.div>
      )}

      {/* Background radial spotlights */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#7ED957]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Header */}
      <div className="text-center mb-12">
        <span className="text-[#7ED957] text-xs font-mono font-bold tracking-widest uppercase"></span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-1">
          Let's Collaborate
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 max-w-md mx-auto text-sm">
          Tell me about your vision, and let's make it happen.
        </p>
      </div>

      {/* Grid Layout: Left Quick Links, Right Contact Form */}
      <div id="contact-content-grid" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
        
        {/* LEFT COLUMN: QUICK REACH BUTTONS */}
        <div className="md:col-span-5 flex flex-col justify-between gap-6">
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            
            {/* Direct Email Card */}
            <motion.a
              id="btn-direct-email"
              href={greenfilm0606@gmail.com}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center gap-5 p-6 frosted-panel shadow-sm hover:shadow-md hover:border-[#7ED957]/30 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-[#7ED957]/10 text-[#7ED957] rounded-xl group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider font-mono text-gray-400">Email</span>
                <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#7ED957] transition-colors">{greemfilm0606@gmail.com}</span>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Get in touch</p>
              </div>
            </motion.a>

            {/* WhatsApp Chat Card */}
            <motion.a
              id="btn-direct-whatsapp"
              href={https://wa.me/917204130306}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center gap-5 p-6 frosted-panel shadow-sm hover:shadow-md hover:border-[#7ED957]/30 transition-all cursor-pointer group"
            >
              <div className="p-3 bg-[#7ED957]/10 text-[#7ED957] rounded-xl group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider font-mono text-gray-400">WhatsApp</span>
                <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#7ED957] transition-colors">+{917204130306}</span>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Let's connect on Whatsapp</p>
              </div>
            </motion.a>

          </div>

          {/* Quick Stats or Subtitle */}
          <div className="p-5 frosted-panel flex items-center gap-4">
            <Phone className="h-5 w-5 text-[#7ED957]" />
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Tell me about your photography needs...
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM */}
        <div className="md:col-span-7">
          <motion.div
            id="form-card-container"
            className="p-8 frosted-panel shadow-md relative"
          >
            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {statusMsg && (
                <motion.div
                  id="submission-status-box"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-5 rounded-xl mb-6 text-sm flex items-start gap-3.5 border ${
                    statusMsg.type === "success"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                  }`}
                >
                  {statusMsg.type === "success" && (
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{statusMsg.text}</p>
                    {statusMsg.type === "success" && lastSubmission && !lastSubmission.sentViaResend && (
                      <div className="mt-3 pt-3 border-t border-emerald-500/15">
                        <p className="text-xs text-emerald-700/80 dark:text-emerald-350/80 leading-relaxed mb-3">
                          Since the Resend background email delivery service is awaiting configuration in the workspace secrets, you can instantly dispatch these details directly to the artist's mailbox (<strong>{email}</strong>) with one click below:
                        </p>
                        <a
                          id="btn-complete-mailto"
                          href=mailto:greenfilm0606@gmail.com?subject=New Inquiry from ${encodeURIComponent(lastSubmission.name)}&body=${encodeURIComponent(
                            `Name: ${lastSubmission.name}\nEmail: ${lastSubmission.email}\nPhone: ${lastSubmission.phone || "Not provided"}\n\nMessage:\n${lastSubmission.message}`
                          )}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 hover:text-white text-xs font-black rounded-lg shadow-sm transition-all"
                        >
                          <Send className="h-3 w-3" />
                          <span>Dispatch via Mail App (greenfilm0606@gmail.com)</span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-1.5 font-mono">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-gray-250 dark:border-zinc-800 text-gray-850 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#7ED957] focus:ring-1 focus:ring-[#7ED957] transition-all text-sm"
                />
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Field */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-1.5 font-mono">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-gray-250 dark:border-zinc-800 text-gray-850 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#7ED957] focus:ring-1 focus:ring-[#7ED957] transition-all text-sm"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-1.5 font-mono">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-gray-250 dark:border-zinc-800 text-gray-850 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#7ED957] focus:ring-1 focus:ring-[#7ED957] transition-all text-sm"
                  />
                </div>

              </div>

              {/* Message Field */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-1.5 font-mono">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project, timeline, and shoot ideas..."
                  required
                  className="px-4 py-3 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-gray-250 dark:border-zinc-800 text-gray-850 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#7ED957] focus:ring-1 focus:ring-[#7ED957] transition-all text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                id="btn-submit-form"
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 bg-[#7ED957] hover:bg-[#6ec248] text-zinc-950 font-bold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>
        </div>

      </div>

      {/* FOOTER: REAL-TIME SUBMISSION SANDBOX VIEW */}
      {submissionsList.length > 0 && (
        <div id="submissions-sandbox-panel" className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <button
              id="toggle-submissions"
              onClick={() => setShowSubmissions(!showSubmissions)}
              className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-500 dark:text-zinc-400 hover:text-[#7ED957] cursor-pointer"
            >
              <Database className="h-4 w-4 text-[#7ED957]" />
              <span>
                {showSubmissions ? "Hide" : "Show"} Active Server Submissions ({submissionsList.length})
              </span>
            </button>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono font-bold">
              Express Backend Online
            </span>
          </div>

          <AnimatePresence>
            {showSubmissions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 max-h-60 overflow-y-auto pr-2"
              >
                {submissionsList.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-950/40 border border-gray-200 dark:border-zinc-850/60 text-xs text-left"
                  >
                    <div className="flex justify-between items-center gap-2 mb-2 font-mono text-[10px] text-gray-400">
                      <span>ID: {sub.id}</span>
                      <span>{new Date(sub.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b border-gray-150 dark:border-zinc-800/60 pb-2 mb-2">
                      <p>
                        <strong className="text-gray-400">From:</strong>{" "}
                        <span className="text-gray-800 dark:text-zinc-200 font-bold">{sub.name}</span>
                      </p>
                      <p>
                        <strong className="text-gray-400">Email:</strong>{" "}
                        <span className="text-gray-800 dark:text-zinc-200">{sub.email}</span>
                      </p>
                      {sub.phone && (
                        <p>
                          <strong className="text-gray-400">Phone:</strong>{" "}
                          <span className="text-gray-800 dark:text-zinc-200">{sub.phone}</span>
                        </p>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-zinc-300 italic whitespace-pre-wrap">{sub.message}</p>
                    {sub.sentViaResend && (
                      <div className="mt-2 text-[10px] text-emerald-500 font-semibold uppercase tracking-wider font-mono">
                        ✓ Dispatched via Resend API
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
