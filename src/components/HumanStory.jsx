import React, { useState } from 'react';
import { soundFX } from '../utils/soundFX';

export const HumanStory = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const tabs = [
    { id: 'journey', label: '01 // MY JOURNEY', tag: 'ORIGIN' },
    { id: 'principles', label: '02 // ENGINEERING VALUES', tag: 'ETHOS' },
    { id: 'beyond', label: '03 // BEYOND THE SCREEN', tag: 'INSPIRATION' }
  ];

  const handleTabChange = (tabId) => {
    soundFX.playClick();
    setActiveTab(tabId);
  };

  return (
    <div className="human-story-container glass-card">
      <div className="human-story-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`human-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            onMouseEnter={() => soundFX.playHover()}
            data-cursor="TAB"
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="human-story-content">
        {activeTab === 'journey' && (
          <div className="story-tab-pane animate-fade-in">
            <div className="story-pane-header">
              <span className="story-index-tag">[LOG_01 // THE TRAJECTORY]</span>
              <h4 className="story-heading">From "Hello World" to Building Production Systems</h4>
            </div>
            <p>
              My journey into software engineering started with simple curiosity: how do lines of code turn into platforms that millions of people rely on every day? That curiosity quickly evolved into a passion for building decoupled full-stack architectures, high-performance web systems, and fluid cross-platform mobile apps.
            </p>
            <p>
              During my <strong>Infosys Springboard Virtual Internship</strong>, I took ownership of engineering <em>BudgetBuddy</em> from the ground up—optimizing database queries by 70%, establishing asynchronous notification pipelines, and writing complete Playwright &amp; Pytest test suites.
            </p>
            <p>
              I thrive in fast-paced collaborative environments. Winning <strong>1st Place at Hacknovate 7.0</strong> and reaching the <strong>Grand Finals at HACK IITK 2026</strong> taught me how to architect under pressure, communicate effectively with teammates, and translate complex requirements into intuitive products.
            </p>
          </div>
        )}

        {activeTab === 'principles' && (
          <div className="story-tab-pane animate-fade-in">
            <div className="story-pane-header">
              <span className="story-index-tag">[LOG_02 // SYSTEM PRINCIPLES]</span>
              <h4 className="story-heading">How I Think, Architect &amp; Collaborate</h4>
            </div>
            <div className="principles-grid">
              <div className="principle-card" data-cursor="VALUE">
                <div className="principle-num">01</div>
                <h5>Build for Humans First</h5>
                <p>Code is written for machines to execute, but systems are built for humans to use. I treat UX, accessibility, and performance as foundational pillars rather than afterthoughts.</p>
              </div>

              <div className="principle-card" data-cursor="VALUE">
                <div className="principle-num">02</div>
                <h5>Clarity &amp; Ownership</h5>
                <p>I take pride in clear documentation, maintainable clean code, proactive team communication, and taking end-to-end ownership of features from design to deployment.</p>
              </div>

              <div className="principle-card" data-cursor="VALUE">
                <div className="principle-num">03</div>
                <h5>Ego-Free Problem Solving</h5>
                <p>The best architecture wins through peer reviews, testing, and evidence. I actively seek constructive code reviews and love learning from others.</p>
              </div>

              <div className="principle-card" data-cursor="VALUE">
                <div className="principle-num">04</div>
                <h5>Always In Beta</h5>
                <p>Technology evolves constantly. Whether it's experimenting with local LLMs (Ollama/Gemma3), Flutter state management, or Three.js shaders, I'm always eager to expand my engineering horizons.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'beyond' && (
          <div className="story-tab-pane animate-fade-in">
            <div className="story-pane-header">
              <span className="story-index-tag">[LOG_03 // PASSIONS]</span>
              <h4 className="story-heading">What Keeps My Curiosity Fueled</h4>
            </div>
            <p>
              When I'm not writing code or debugging API responses, you'll usually find me exploring new tech articles, contributing to discussions in developer communities, or sketching out user flows for hackathon ideas.
            </p>
            <div className="beyond-tags-list">
              <span className="beyond-pill">[FOCUS] Problem Solving &amp; Algorithms</span>
              <span className="beyond-pill">[AI] Local LLMs &amp; Privacy-First AI</span>
              <span className="beyond-pill">[MOBILE] Flutter UI/UX Design</span>
              <span className="beyond-pill">[SPRINT] Hackathon Prototyping</span>
              <span className="beyond-pill">[READING] System Design &amp; Architecture</span>
              <span className="beyond-pill">[PEER] Developer Community Collaboration</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanStory;
