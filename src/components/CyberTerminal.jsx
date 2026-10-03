import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, recruiterStats, skillsData, educationData } from '../data/portfolioData';
import { projectsData } from '../data/projectsData';
import { soundFX } from '../utils/soundFX';

export const CyberTerminal = ({ isOpen, onClose, onToggleTheme, theme }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Amardeep Developer Console • Interactive Navigation' },
    { type: 'system', text: 'Type "help" to view commands, or click any chip below to run.' }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      soundFX.playModalOpen();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const rawCmd = input.trim();
      soundFX.playClick();

      if (!rawCmd) return;

      const newHistory = [...history, { type: 'user', text: `$ ${rawCmd}` }];
      setCmdHistory((prev) => [rawCmd, ...prev]);
      setHistoryIndex(-1);

      const parts = rawCmd.split(' ');
      const command = parts[0].toLowerCase();
      const arg = parts[1]?.toLowerCase();

      switch (command) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: [
              'AVAILABLE COMMANDS:',
              '  whoami       - Display developer summary & core architecture stack',
              '  skills       - Query tech toolkit & proficiency tiers',
              '  projects     - Query software projects (--flagship for top picks)',
              '  benchmark    - Display verified Infosys query optimization benchmark',
              '  stats        - Display verified recruiter benchmarks & metrics',
              '  resume       - Download verified PDF resume',
              '  contact      - Display communication channels & social links',
              '  github       - Open GitHub profile in new tab',
              '  linkedin     - Open LinkedIn profile in new tab',
              '  education    - Query academic & institutional credentials',
              '  theme        - Toggle theme (e.g. "theme dark" or "theme light")',
              '  clear        - Clear console history',
              '  exit         - Close command menu'
            ].join('\n')
          });
          break;

        case 'whoami':
        case 'bio':
          newHistory.push({
            type: 'output',
            text: `${personalInfo.name} — ${personalInfo.role}\nLocation: ${personalInfo.location}\nTagline: ${personalInfo.tagline}\n\n${personalInfo.bio[0]}`
          });
          break;

        case 'skills':
          const skillSummary = skillsData
            .map((cat) => `[${cat.category}]\n  ` + cat.skills.map((s) => `${s.name} [${s.tier}]`).join(', '))
            .join('\n\n');
          newHistory.push({ type: 'output', text: skillSummary });
          break;

        case 'projects':
          const isFlagshipOnly = arg === '--flagship';
          const projs = isFlagshipOnly ? projectsData.filter((p) => p.featured) : projectsData;
          const projList = projs
            .map((p, i) => {
              const link = p.live || p.github || p.links?.live || p.links?.github || 'https://github.com/Amar1604';
              return `#${i + 1} [${p.title}] (${p.category})\n  ${p.shortDesc}\n  Stack: ${p.tags.join(', ')}\n  Link: ${link}`;
            })
            .join('\n\n');
          newHistory.push({ type: 'output', text: projList });
          break;

        case 'benchmark':
          newHistory.push({
            type: 'output',
            text: [
              'BUDGETBUDDY PERFORMANCE BENCHMARK (INFOSYS SPRINGBOARD CAPSTONE):',
              '  • Baseline Multi-Query Latency:  128ms (48 sequential SQL queries)',
              '  • Optimized Consolidated API:    14ms (1 aggregated query + prefetch)',
              '  • Net Throughput Gain:           9.1x faster execution',
              '  • Database Overhead Reduction:   70% query load eliminated'
            ].join('\n')
          });
          break;

        case 'highfive':
        case 'kudos':
          soundFX.playWarp();
          newHistory.push({
            type: 'success',
            text: '[SUCCESS] HIGH FIVE RECEIVED! Thank you for testing the developer CLI HUD.'
          });
          break;

        case 'stats':
          const statsText = recruiterStats.map((s) => `• [${s.num}] ${s.label}`).join('\n');
          newHistory.push({ type: 'output', text: `VERIFIED METRICS:\n${statsText}` });
          break;

        case 'education':
          const eduText = educationData
            .map((e) => `• ${e.degree} — ${e.institution} (${e.year}) [Score: ${e.score}]`)
            .join('\n');
          newHistory.push({ type: 'output', text: eduText });
          break;

        case 'resume':
        case 'download':
          soundFX.playWarp();
          newHistory.push({ type: 'output', text: 'Initial transmission stream for ATS Resume...' });
          const link = document.createElement('a');
          link.href = personalInfo.resumePath;
          link.download = 'Amardeep_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          newHistory.push({ type: 'success', text: 'Document transfer completed successfully.' });
          break;

        case 'contact':
          newHistory.push({
            type: 'output',
            text: `Email:    ${personalInfo.email}\nPhone:    ${personalInfo.phone}\nGitHub:   ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`
          });
          break;

        case 'github':
          window.open(personalInfo.github, '_blank');
          newHistory.push({ type: 'output', text: `Opening GitHub profile: ${personalInfo.github}` });
          break;

        case 'linkedin':
          window.open(personalInfo.linkedin, '_blank');
          newHistory.push({ type: 'output', text: `Opening LinkedIn profile: ${personalInfo.linkedin}` });
          break;

        case 'theme':
          if (arg === 'dark' || arg === 'light') {
            if (theme !== arg && onToggleTheme) onToggleTheme();
            newHistory.push({ type: 'success', text: `Theme switched to [${arg}].` });
          } else {
            if (onToggleTheme) onToggleTheme();
            newHistory.push({ type: 'success', text: 'Theme toggled.' });
          }
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'exit':
        case 'quit':
          onClose();
          return;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not found: "${rawCmd}". Type "help" for a list of available commands.`
          });
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'whoami', 'skills', 'projects', 'benchmark', 'stats', 'resume', 'contact', 'github', 'linkedin', 'theme', 'clear', 'exit'];
      const match = commands.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else {
      soundFX.playKeypress();
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div
        className={`terminal-window ${isMaximized ? 'maximized' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Developer Command Menu"
      >
        <div className="terminal-scanline" />

        {/* Terminal Header Bar */}
        <div className="terminal-header">
          <div className="terminal-title">
            <span className="terminal-glyph">&gt;_</span>
            <span>amardeep.dev &bull; developer command menu</span>
          </div>

          <div className="terminal-actions">
            <button
              className="term-btn-text"
              onClick={() => setIsMaximized((prev) => !prev)}
              title={isMaximized ? 'Restore Window' : 'Maximize Window'}
              data-cursor="MAX"
            >
              <span>{isMaximized ? 'Restore' : 'Maximize'}</span>
            </button>
            <button
              className="term-btn-text term-close-text"
              onClick={onClose}
              title="Close (Esc)"
              data-cursor="CLOSE"
            >
              <span>Close &times; (Esc)</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="terminal-body" ref={outputRef}>
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="term-input-row">
            <span className="term-prompt">amar@quantum-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
            <span className="term-caret" />
          </div>
        </div>

        {/* Terminal Footer Quick Bar */}
        <div className="terminal-footer">
          <span>Shortcuts: [Tab] Autocomplete &bull; [↑/↓] History &bull; [Esc] Close</span>
          <div className="term-quick-chips">
            {['help', 'projects', 'skills', 'benchmark', 'resume', 'contact', 'github'].map((chip) => (
              <button
                key={chip}
                className="term-chip"
                onClick={() => {
                  setInput(chip);
                  setTimeout(() => inputRef.current?.focus(), 20);
                }}
                data-cursor="RUN"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberTerminal;
