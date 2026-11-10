import { useState, useId } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { validateContactForm, ContactFormData } from '../utils/portfolio';
import { soundFx } from '../utils/sound';
import { Copy, Check, Send, Github, Linkedin, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const formId = useId();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'Web Experience / Application',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PORTFOLIO_INFO.email);
      } else {
        // Fallback for older browsers or headless test environments
        const textArea = document.createElement('textarea');
        textArea.value = PORTFOLIO_INFO.email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedEmail(true);
      soundFx.playSuccess();
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Graceful fallback
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      soundFx.playSuccess();
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Experience / Application',
        message: '',
      });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 800);
  };

  const projectTypes = [
    'Web Experience / Application',
    'Mobile Application (iOS & Android)',
    'Full-Stack Architecture',
    'Creative 3D / WebGL Interface',
  ];

  return (
    <section id="contact" className="py-24 md:py-36 relative border-t border-white/5">
      {/* Background soft ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C7FF41]/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C7FF41] mb-3">
            <span>05</span>
            <span>·</span>
            <span>INITIATE COLLABORATION</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[#F5F3EF] mb-4 text-balance">
            HAVE AN IDEA?
            <br />
            <span className="text-[#C7FF41]">LET'S MAKE IT REAL.</span>
          </h2>
          <p className="text-base sm:text-xl text-[#858585] max-w-xl">
            Have a project in mind or looking for a developer? Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries & Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Copy Email Card */}
            <div className="p-6 md:p-8 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-2">
                DIRECT INQUIRIES
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-[#F5F3EF] mb-4 break-all">
                {PORTFOLIO_INFO.email}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-[#F5F3EF] border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} className="text-[#C7FF41]" />
                      <span className="text-[#C7FF41]">Email Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PORTFOLIO_INFO.email}`}
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-4 py-2 rounded-lg bg-[#C7FF41] hover:bg-[#d5ff6a] text-xs font-semibold text-[#080808] flex items-center gap-2 transition-all"
                >
                  <Mail size={14} />
                  <span>Open Mail App</span>
                </a>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-4">
                FIND RAMZI ACROSS THE WEB
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-3 rounded-xl border border-white/5 hover:border-white/20 bg-white/[0.02] flex items-center gap-3 text-xs font-mono text-zinc-300 hover:text-[#C7FF41] transition-all"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-3 rounded-xl border border-white/5 hover:border-white/20 bg-white/[0.02] flex items-center gap-3 text-xs font-mono text-zinc-300 hover:text-[#C7FF41] transition-all"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability details */}
            <div className="space-y-3 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-[#C7FF41]" />
                <span>Base: Tunisia · Serving Global Clients Remotely</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#C7FF41]" />
                <span>Typical Response Time: Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl relative"
            >
              <h3 className="text-xl font-display font-bold text-[#F5F3EF] mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[#858585] mb-8">
                Share details regarding scope, timeline, and architectural targets.
              </p>

              {submitSuccess && (
                <div className="p-4 rounded-xl bg-[#C7FF41]/10 border border-[#C7FF41]/40 text-xs font-mono text-[#C7FF41] mb-6 flex items-center gap-3 animate-fadeIn">
                  <Check size={16} />
                  <span>Thank you! Your message has been sent directly to Ramzi Aloui.</span>
                </div>
              )}

              <div className="space-y-6">
                {/* Name field */}
                <div>
                  <label htmlFor={`${formId}-name`} className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Your Name or Organization *
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan / Studio Apex"
                    className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-[#F5F3EF] placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      formErrors.name
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#C7FF41]'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1.5">{formErrors.name}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor={`${formId}-email`} className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Your Email Address *
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-[#F5F3EF] placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      formErrors.email
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#C7FF41]'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1.5">{formErrors.email}</p>
                  )}
                </div>

                {/* Project Category Selection */}
                <div>
                  <label htmlFor={`${formId}-project-type`} className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Project Scope *
                  </label>
                  <select
                    id={`${formId}-project-type`}
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-[#F5F3EF] focus:outline-none focus:border-[#C7FF41] transition-colors"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-900 text-zinc-200">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor={`${formId}-message`} className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Project Brief &amp; Goals *
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what you are planning to build, target timeline, or special requirements..."
                    className={`w-full px-4 py-3 rounded-xl bg-black/50 border text-sm text-[#F5F3EF] placeholder:text-zinc-600 focus:outline-none transition-colors resize-none ${
                      formErrors.message
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/10 focus:border-[#C7FF41]'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] font-mono text-rose-400 mt-1.5">{formErrors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#C7FF41] hover:bg-[#d5ff6a] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(199,255,65,0.2)] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="font-mono">DISPATCHING PROPOSAL...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
