import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { soundFX } from '../utils/soundFX';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    {
      id: 'fulltime',
      label: '[FULL-TIME / INTERNSHIP ROLE]',
      template: "Hi Amardeep, we have an exciting engineering opportunity and would love to review your background and discuss how your skills align with our team."
    },
    {
      id: 'project',
      label: '[PROJECT / AI COLLABORATION]',
      template: "Hi Amardeep, I saw your projects (BudgetBuddy / COFE) and would love to collaborate on a software engineering / AI project with you."
    },
    {
      id: 'coffee',
      label: '[TECH CONNECT / CASUAL CHAT]',
      template: "Hey Amardeep! Loved checking out your portfolio. Would love to connect for a casual virtual chat and discuss modern tech stacks."
    }
  ];

  const handleSelectTopic = (t) => {
    soundFX.playClick();
    setSelectedTopic(t.id);
    setFormData((prev) => ({
      ...prev,
      message: t.template
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '077dc3a8-1478-4d92-be80-492b739836f9';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending.' });
      return;
    }

    soundFX.playClick();
    setIsSubmitting(true);
    setStatus(null);

    // If a Web3Forms Access Key is provided in environment variables
    if (accessKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            subject: `Portfolio Inquiry from ${formData.name.trim()}`,
            from_name: `${formData.name.trim()} (Portfolio Contact)`
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          soundFX.playWarp();
          setStatus({
            type: 'success',
            message: 'MESSAGE DELIVERED: Thank you for reaching out! Your note has been delivered directly to Amardeep. I usually respond within 24 hours.'
          });
          setFormData({ name: '', email: '', message: '' });
          setSelectedTopic(null);
          setTimeout(() => setStatus(null), 8000);
        } else {
          setStatus({
            type: 'error',
            message: result.message || 'Transmission failed. You can also send directly via your mail client below.',
            showMailto: true
          });
        }
      } catch (err) {
        setStatus({
          type: 'error',
          message: 'Network connection issue. Please use the direct mail button below.',
          showMailto: true
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // If accessKey is not set yet in .env, launch default mail client with prefilled details
      const subject = encodeURIComponent(`Portfolio Inquiry: ${selectedTopic ? selectedTopic.toUpperCase() : 'Engineering Discussion'}`);
      const body = encodeURIComponent(`Hi Amardeep,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`);
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'MAIL CLIENT LAUNCHED: Your message is prefilled in your default email client. (Note: Add VITE_WEB3FORMS_ACCESS_KEY in .env for direct silent background delivery).',
        showMailto: true
      });
      setTimeout(() => setStatus(null), 9000);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-header-center">
          <div className="hero-badge-container">
            <span className="hero-subtitle">
              // OPEN DIALOGUE &bull; DIRECT CONNECTION
            </span>
          </div>
          <h2 className="section-title">
            Let's Start a <span>Conversation</span>
          </h2>
          <p className="section-subtitle-desc">
            Whether you have a software engineering role, a hackathon idea, or just want to say hi—my inbox is always open.
          </p>
        </div>

        <div className="contact-wrapper">
          {/* Contact Details Column */}
          <div className="glass-card contact-info-card">
            <span className="contact-card-tag">[CHANNELS // DIRECT DISPATCH]</span>
            <h3>Let's Build Something Great</h3>
            <p>
              I value clear communication, continuous collaboration, and building meaningful tech. Drop a note here or connect through any of my verified channels.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="contact-channel-badge">[EMAIL]</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PRIMARY INBOX</div>
                  <a href={`mailto:${personalInfo.email}`} onClick={() => soundFX.playClick()} data-cursor="EMAIL">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-channel-badge">[TEL]</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MOBILE NUMBER</div>
                  <a href={`tel:${personalInfo.phone}`} onClick={() => soundFX.playClick()} data-cursor="CALL">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="contact-channel-badge">[LOC]</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>LOCATION BASE</div>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="contact-response-promise">
              <span className="promise-dot"></span> Guaranteed response within 24 business hours.
            </div>

            {/* Verified Direct Profiles */}
            <div className="contact-social-bar" style={{ marginTop: '1.75rem' }}>
              <span className="contact-social-label">// VERIFIED CHANNELS:</span>
              <div className="contact-social-buttons">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn github"
                  title="Open GitHub Profile (Amar1604)"
                  aria-label="GitHub Profile"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="GITHUB"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                  <span className="contact-social-handle">@Amar1604</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn linkedin"
                  title="Open LinkedIn Profile (amar-deep1604)"
                  aria-label="LinkedIn Profile"
                  onClick={() => soundFX.playClick()}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="LINKEDIN"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.62 1.62 0 0 0 1.63 1.62 1.62 1.62 0 0 0 1.63-1.62 1.62 1.62 0 0 0-1.63-1.63z"/>
                  </svg>
                  <span>LinkedIn</span>
                  <span className="contact-social-handle">/amar-deep1604</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-card">
            {/* Quick Conversation Starter Pills */}
            <div className="contact-topic-starter">
              <span className="topic-starter-label">// CONVERSATION STARTERS:</span>
              <div className="topic-pills-row">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`topic-pill-btn ${selectedTopic === t.id ? 'active' : ''}`}
                    onClick={() => handleSelectTopic(t)}
                    onMouseEnter={() => soundFX.playHover()}
                    data-cursor="FILL"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">NAME // IDENTIFIER</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="e.g. Alex Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL // RETURN ADDRESS</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">MESSAGE // INQUIRY DETAILS</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Tell me about your project, team opportunity, or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary shine-effect btn-3d-hover"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center' }}
                onMouseEnter={() => soundFX.playHover()}
                data-cursor="TRANSMIT"
              >
                {isSubmitting ? (
                  <span>[TRANSMITTING PACKET...]</span>
                ) : (
                  <span>[TRANSMIT MESSAGE -&gt;]</span>
                )}
              </button>

              {status && (
                <div className={`form-status ${status.type}`}>
                  <span>{status.message}</span>
                  {status.showMailto && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <a
                        href={`mailto:${personalInfo.email}?subject=${encodeURIComponent('Portfolio Inquiry: ' + (formData.name || 'Direct Contact'))}&body=${encodeURIComponent(formData.message || 'Hi Amardeep,')}`}
                        className="btn btn-secondary btn-3d-hover"
                        style={{ display: 'inline-block', fontSize: '0.82rem', padding: '0.45rem 0.9rem', width: '100%', textAlign: 'center' }}
                        onClick={() => soundFX.playClick()}
                        data-cursor="EMAIL"
                      >
                        [OPEN PRE-FILLED EMAIL IN APP -&gt;]
                      </a>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
