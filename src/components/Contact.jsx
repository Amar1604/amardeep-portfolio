import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields before sending.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Thank you for reaching out! Your message has been received. I will get back to you shortly.'
      });
      setFormData({ name: '', email: '', message: '' });

      // Auto-clear message
      setTimeout(() => {
        setStatus(null);
      }, 6000);
    }, 1200);
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>

        <div className="contact-wrapper">
          {/* Contact Details Column */}
          <div className="glass-card contact-info-card">
            <h3>Let's Collaborate &amp; Build</h3>
            <p>
              Whether you have a full-stack web project, an internship/placement opportunity, or just want to discuss software engineering and AI architectures, feel free to connect!
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <Mail />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email</div>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <Phone />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone</div>
                  <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <MapPin />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Location</div>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="social-links-row">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="glass-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Tell me about your project, idea, or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary shine-effect"
                disabled={isSubmitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="float-anim" style={{ animation: 'spin 1s linear infinite' }} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>

              {status && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={18} /> {status.message}
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={18} /> {status.message}
                    </span>
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
