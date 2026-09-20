export const projectsData = [
  {
    id: "budgetbuddy",
    title: "BudgetBuddy: Full-Stack Personal Finance & Portfolio Planner",
    shortDesc: "A decoupled personal finance management platform with real-time budget tracking, visual expense analytics, recurring transaction alerts, and exportable financial reports.",
    fullDesc: "BudgetBuddy is an end-to-end personal finance platform developed as part of the Infosys Springboard Virtual Internship 7.0 Capstone. Built with a decoupled React 19/Vite frontend and a Django REST backend, it features JWT authentication, Google/GitHub OAuth2, role-based resource allocation, automated recurring expense categorization, and database signals. It integrates constant-memory streaming CSV export, asynchronous email notifications, and consolidated dashboard APIs.",
    category: "fullstack",
    featured: true,
    tags: ["React 19", "Vite", "Django REST", "Python", "PostgreSQL", "JWT"],
    image: "assets/images/project_novacommerce.png",
    github: "https://github.com/Amar1604/BudgetBuddy",
    live: "https://github.com/Amar1604/BudgetBuddy",
    role: "Full-Stack Developer (Infosys Capstone)",
    features: [
      "Decoupled React 19/Vite frontend with Django REST Framework backend.",
      "Consolidated dashboard API that reduced API roundtrip overhead and database queries by 70%.",
      "Secure JWT authentication, Google/GitHub OAuth2, and role-based permissions.",
      "Asynchronous email notifications and constant-memory streaming CSV export for scalable transaction reports.",
      "Comprehensive test coverage with 68 Django unit tests and 7 Playwright E2E tests."
    ],
    challenges: "Handling large transaction histories without overloading server memory or inducing browser rendering lags. Solved by implementing constant-memory streaming for CSV exports and building aggregated backend queries with database signals.",
    metrics: "Reduced API roundtrip overhead and database queries by 70% with sub-30ms dashboard load times."
  },
  {
    id: "cfoe",
    title: "Carbon Footprint Optimization Engine (COFE)",
    shortDesc: "Multi-agent ESG compliance platform for automated carbon footprint assessment, predictive analytics, and blockchain audit trails.",
    fullDesc: "COFE is an award-winning sustainability platform designed to automate enterprise carbon accounting and compliance verification. It utilizes a multi-agent AI architecture to analyze emission sources, generate actionable decarbonization roadmaps, and secure audit trails on a decentralized ledger. Winner of 1st Place at Hacknovate 7.0.",
    category: "fullstack",
    featured: true,
    tags: ["Python", "Multi-Agent AI", "ESG Analytics", "Blockchain", "React.js"],
    image: "assets/images/project_cfoeblockchain.png",
    github: "https://github.com/Amar1604/CFOE-blockchainV2",
    live: "https://github.com/Amar1604/CFOE-blockchainV2",
    role: "Full-Stack & System Engineer",
    features: [
      "Multi-agent AI workflow for automated carbon emission parsing and recommendation generation.",
      "Blockchain-based immutable audit trails ensuring verifiable ESG compliance.",
      "Dynamic visual dashboards for carbon offset modeling and forecasting.",
      "Winner of 1st Place at Hacknovate 7.0 nationwide competition."
    ],
    challenges: "Synthesizing disparate unstructured emission documents into standardized GHG Protocol scopes. Solved by designing automated multi-agent extraction pipelines.",
    metrics: "Processed complex organizational carbon assessments 10x faster with 100% auditable blockchain integrity."
  },
  {
    id: "localllm",
    title: "Local LLM Policy Gap Analyzer",
    shortDesc: "Privacy-first offline compliance analysis tool using local LLMs (Ollama/Gemma3) to audit organizational security standards against the NIST Framework.",
    fullDesc: "Local LLM Policy Gap Analyzer is a privacy-first cybersecurity auditing engine. It allows organizations to upload confidential security policies and evaluate them against the NIST Cybersecurity Framework using local LLMs (Ollama and Gemma3) completely on-premise. It compiles gap detection audits into downloadable structured PDF compliance reports.",
    category: "ai",
    featured: false,
    tags: ["Python", "Ollama", "Gemma3", "NIST Framework", "FastAPI"],
    image: "assets/images/project_localllm.png",
    github: "https://github.com/Amar1604/Local-LLM-UI",
    live: "https://github.com/Amar1604/Local-LLM-UI",
    role: "Integration Engineer & AI Architect",
    features: [
      "100% offline Local LLM inference framework guaranteeing enterprise data privacy.",
      "Automated policy gap detection mapped directly against NIST Cybersecurity controls.",
      "Structured PDF compliance report generation via a modular CLI/API pipeline.",
      "Semantic text chunking and similarity evaluation for accurate regulation mapping."
    ],
    challenges: "Optimizing token context windows and inference latency on developer hardware. Solved by creating localized semantic text chunking and selective prompt routing.",
    metrics: "Generates comprehensive NIST compliance audits in <30 seconds without cloud data exposure."
  },
  {
    id: "voting",
    title: "Decentralized Voting System",
    shortDesc: "Blockchain-based transparent voting platform with Solidity smart contracts, Hardhat, and MetaMask authentication.",
    fullDesc: "Decentralized Voting System is a secure, tamper-proof electronic voting application built on the Ethereum blockchain. It guarantees transparency and immutability for institutional elections using Solidity smart contracts, Ethers.js integration, and a sleek Next.js & Tailwind CSS frontend.",
    category: "fullstack",
    featured: false,
    tags: ["Next.js", "Tailwind CSS", "Solidity", "Hardhat", "Ethers.js"],
    image: "assets/images/project_algoarena.png",
    github: "https://github.com/Amar1604",
    live: "https://github.com/Amar1604",
    role: "Blockchain Developer",
    features: [
      "Solidity smart contracts handling ballot deployment and cryptographic vote counting.",
      "MetaMask Web3 authentication and voter eligibility checks.",
      "Real-time election tally visualizer with instant cryptographic auditability.",
      "Gas-optimized transaction execution on Ethereum testnets."
    ],
    challenges: "Minimizing gas consumption during large-scale ballot submissions. Solved by optimizing contract state variables and batch verification.",
    metrics: "Reduced vote verification gas costs by 35% with zero double-voting vulnerabilities."
  },
  {
    id: "safeguard",
    title: "SafeGuard: Women Safety Alert & Live Tracking System",
    shortDesc: "Real-time emergency safety platform providing GPS tracking, ESP32 IoT simulation, and Web Audio API siren synthesis.",
    fullDesc: "SafeGuard is a real-time safety application providing location tracking, active emergency notifications, IoT device simulation, and Leaflet.js mapping. It synchronizes GPS coordinates and profiles via Firebase, features Web Audio API siren alerts, and simulates wearable ESP32 device states.",
    category: "fullstack",
    featured: false,
    tags: ["JavaScript", "Firebase", "Leaflet.js", "Web Audio API", "IoT"],
    image: "assets/images/project_safeguard.png",
    github: "https://github.com/Amar1604/Safeguard",
    live: "https://github.com/Amar1604/Safeguard",
    role: "Creator & Full-Stack Developer",
    features: [
      "Real-time GPS coordinate capturing and breadcrumb trail map rendering.",
      "ESP32 hardware telemetry controls simulator (battery monitoring, active movement tracker).",
      "Web Audio API synthesizer for client-side warning siren audio.",
      "Emergency dispatcher tracking map with audio alert cues."
    ],
    challenges: "Synchronizing real-time coordinate logging to Firebase without blocking the browser thread. Resolved by building debounced geo-location handlers.",
    metrics: "Maintains real-time database sync in <50ms with 5-meter coordinate resolution."
  },
  {
    id: "school",
    title: "School Management System",
    shortDesc: "Web-based management system to manage student records, attendance, and academic performance with MySQL and responsive UI.",
    fullDesc: "School Management System is a database-driven administrative portal designed to handle student enrollment, attendance logs, teacher assignments, and academic grading reports with role-based access control and responsive interfaces.",
    category: "fullstack",
    featured: false,
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    image: "assets/images/project_goschool.png",
    github: "https://github.com/Amar1604",
    live: "https://github.com/Amar1604",
    role: "Backend Database Developer",
    features: [
      "Comprehensive student roster, attendance, and academic grading ledger.",
      "Role-based authentication for administrators, teachers, and students.",
      "Optimized MySQL schema with automated report generation."
    ],
    challenges: "Structuring relational schemas to support rapid academic term queries. Solved by writing normalized tables with indexed student keys.",
    metrics: "Handled 1,000+ student records with instantaneous page loads."
  }
];
