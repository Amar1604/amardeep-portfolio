export const projectsData = [
  {
    id: "budgetbuddy",
    title: "BudgetBuddy: Full-Stack Personal Finance & Portfolio Planner",
    shortDesc: "A decoupled personal finance management platform with real-time budget tracking, visual expense analytics, recurring transaction alerts, and 70% backend query optimization.",
    fullDesc: "BudgetBuddy is a production-grade full-stack personal finance and wealth management platform engineered during the Infosys Springboard Virtual Internship 7.0 (Batch 1 Capstone). Built with a decoupled React 19/Vite frontend and an asynchronous Django REST Framework backend, it features secure JWT authentication, Google and GitHub OAuth2 integration, consolidated dashboard APIs that reduced database queries by 70%, constant-memory streaming CSV exports, and comprehensive automated test suites (68 Django unit tests + 7 Playwright E2E suites).",
    category: "fullstack",
    featured: true,
    tags: ["React 19", "Vite", "Django REST", "Python", "PostgreSQL", "JWT & OAuth2"],
    image: "assets/images/project_novacommerce.png",
    github: "https://github.com/Amar1604/BudgetBuddy",
    live: "https://budget-buddy-nine-teal.vercel.app",
    role: "Full-Stack Developer (Infosys Capstone Lead)",
    features: [
      "Decoupled React 19/Vite frontend with an asynchronous Django REST Framework backend.",
      "Consolidated dashboard API reducing database roundtrips and queries by 70%.",
      "Robust dual authentication: JWT tokens plus Google and GitHub OAuth2 sign-in.",
      "Constant-memory streaming CSV exports for high-volume financial transaction history.",
      "High reliability engineering with 68 Django unit tests and 7 automated Playwright E2E suites."
    ],
    challenges: "Handling large transaction histories without overloading server memory or inducing browser rendering lags. Solved by implementing constant-memory streaming for CSV exports and building aggregated backend queries with database signals.",
    metrics: "Reduced API roundtrip overhead and database queries by 70% with sub-30ms dashboard load times."
  },
  {
    id: "cfoe",
    title: "Carbon Footprint Optimization Engine (COFE / CFOE)",
    shortDesc: "Award-winning multi-agent ESG compliance platform for automated carbon footprint assessment, predictive analytics, and blockchain audit trails.",
    fullDesc: "COFE won 1st Place nationwide at Hacknovate 7.0. Designed to automate enterprise carbon accounting and regulatory verification, it utilizes a multi-agent AI architecture to analyze emission sources across GHG Protocol Scopes 1, 2, and 3, generate actionable decarbonization roadmaps, and secure immutable audit trails on a decentralized blockchain ledger.",
    category: "fullstack",
    featured: true,
    tags: ["Python", "Multi-Agent AI", "ESG Analytics", "Blockchain", "React.js"],
    image: "assets/images/project_cfoeblockchain.png",
    github: "https://github.com/Amar1604/CFOE-blockchainV2",
    live: "https://github.com/Amar1604/CFOE-blockchainV2",
    role: "1st Place Winner, Hacknovate 7.0 // Lead System Architect",
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
    title: "Local-LLM-UI: Offline NIST Cybersecurity Policy Gap Analyzer",
    shortDesc: "A fully offline, privacy-focused system for analyzing organizational cybersecurity policies against NIST Cybersecurity Framework standards using a lightweight Large Language Model running entirely on your local machine. (WITH UI)",
    fullDesc: "A fully offline, privacy-focused system for analyzing organizational cybersecurity policies against NIST Cybersecurity Framework standards using a lightweight Large Language Model running entirely on your local machine (with UI). It allows security teams to upload sensitive internal policy documents with zero data transmission to external servers or cloud providers, automatically cross-referencing controls against NIST CSF categories and generating structured compliance audit reports.",
    category: "ai",
    featured: true,
    tags: ["Python", "Ollama", "Gemma3", "FastAPI", "NIST Framework", "Local AI"],
    image: "assets/images/project_localllm.png",
    github: "https://github.com/Amar1604/Local-LLM-UI",
    live: "https://github.com/Amar1604/Local-LLM-UI",
    role: "AI Security Systems Engineer",
    features: [
      "100% offline Local LLM inference framework guaranteeing enterprise data privacy.",
      "Automated policy gap detection mapped directly against NIST Cybersecurity controls.",
      "Structured PDF compliance report generation via a modular CLI/API pipeline with a web UI.",
      "Semantic text chunking and similarity evaluation for accurate regulation mapping."
    ],
    challenges: "Optimizing token context windows and inference latency on developer hardware. Solved by creating localized semantic text chunking and selective prompt routing.",
    metrics: "Generates comprehensive NIST compliance audits in <30 seconds without cloud data exposure."
  },
  {
    id: "safeguard",
    title: "SafeGuard: Women Safety Alert & Live Tracking System",
    shortDesc: "Real-time emergency safety platform providing GPS tracking, ESP32 IoT simulation, and Web Audio API siren synthesis.",
    fullDesc: "SafeGuard is a real-time safety application providing location tracking, active emergency notifications, IoT device simulation, and Leaflet.js mapping. It synchronizes GPS coordinates and profiles via Firebase Firestore, features Web Audio API siren alerts, and simulates wearable ESP32 device states.",
    category: "fullstack",
    featured: true,
    tags: ["JavaScript", "Firebase Firestore", "Leaflet.js", "Web Audio API", "IoT ESP32"],
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
    title: "Go-School: Enterprise School & Academic Management System",
    shortDesc: "Web-based institutional management system to handle student records, attendance, and academic performance with MySQL and responsive UI.",
    fullDesc: "Go-School is a database-driven administrative portal designed to handle student enrollment, attendance logs, teacher assignments, and academic grading reports with role-based access control and responsive interfaces.",
    category: "fullstack",
    featured: false,
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Relational Schemas"],
    image: "assets/images/project_goschool.png",
    github: "https://github.com/Amar1604/go-school",
    live: "https://github.com/Amar1604/go-school",
    role: "Backend & Database Developer",
    features: [
      "Comprehensive student roster, attendance, and academic grading ledger.",
      "Role-based authentication for administrators, teachers, and students.",
      "Optimized MySQL schema with automated report generation."
    ],
    challenges: "Structuring relational schemas to support rapid academic term queries. Solved by writing normalized tables with indexed student keys.",
    metrics: "Handled 1,000+ student records with instantaneous sub-50ms page loads."
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
  }
];
