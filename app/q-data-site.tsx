"use client";

import { useEffect, useMemo, useState } from "react";

type ArchitectureStage = {
  number: string;
  title: string;
  short: string;
  detail: string;
  outputs: string[];
};

const architectureStages: ArchitectureStage[] = [
  {
    number: "01",
    title: "Source & security audit",
    short: "Establish authority, integrity, rights, semantics, and risk.",
    detail:
      "Each pilot begins with an authoritative source manifest, cryptographic checksums, license and redistribution conditions, record and label relationships, software dependencies, and a security review. TrojAI models are treated as untrusted artifacts; EMBER2024 uses released features and metadata rather than executable content.",
    outputs: ["Source manifests", "Risk register", "Leakage review"],
  },
  {
    number: "02",
    title: "Semantic curation",
    short: "Preserve the cybersecurity meaning of every transformation.",
    detail:
      "The team defines the unit of analysis, feature roles, labels, fixed benchmark partitions, and prohibited leakage fields. Cleaning, normalization, selection, and reduction are auditable, and all learned transformations are fitted only on designated training data.",
    outputs: ["Security-semantic schema", "Fixed partitions", "Fitted reductions"],
  },
  {
    number: "03",
    title: "Quantum representation",
    short: "Declare how reduced features become resource-profiled circuits.",
    detail:
      "Candidate encodings include angle, dense-angle, data re-uploading, and IQP/ZZ-style feature maps. Each representation declares qubits, gates, depth, shots, target gate set, runtime, noise assumptions, circuit templates, and record-level data bindings.",
    outputs: ["Encoding recipes", "Circuit templates", "Hardware profiles"],
  },
  {
    number: "04",
    title: "Validation & conformance",
    short: "Measure what is preserved, lost, reproducible, and portable.",
    detail:
      "Semantic-loss analysis, matched classical and QML consumers, and cross-platform tests separate representation effects from model effects. Qiskit, PennyLane, and Cirq/TensorFlow Quantum adapters are compared within published numerical tolerances.",
    outputs: ["Semantic-loss reports", "Matched baselines", "Conformance suite"],
  },
  {
    number: "05",
    title: "Independent reuse",
    short: "Test whether another institution can reconstruct the result.",
    detail:
      "External users obtain or validate the source, build a derived feature view, generate a quantum representation, run a conformance test, and reproduce a benchmark result. Setup time, errors, support needs, and documentation gaps become adoption evidence.",
    outputs: ["Tester reports", "Documentation revisions", "Adoption evidence"],
  },
];

const pilots = {
  trojai: {
    eyebrow: "Pilot 01 · AI model poisoning",
    title: "NIST TrojAI Round 11",
    summary:
      "A controlled model-level test of whether indicators of poisoning survive feature reduction, circuit encoding, transpilation, and simulated noise.",
    stats: [
      ["288", "trained models"],
      ["50%", "with embedded triggers"],
      ["3", "model architecture families"],
      ["1", "end-to-end alpha"],
    ],
    unit: "Trained image-classification model",
    task: "Poisoned-versus-clean model detection",
    stress:
      "Label leakage, unsafe model loading, architecture variation, trigger type, conditional behavior, and small-sample uncertainty.",
    alpha:
      "Static structural summaries and standardized behavioral probes will be evaluated with model-level partitions and grouped folds. Configuration fields that reveal poison status remain in the audit manifest but are excluded from predictive views.",
  },
  ember: {
    eyebrow: "Pilot 02 · Malware and evasion",
    title: "EMBER2024",
    summary:
      "A large, heterogeneous file-record test of whether compressed representations retain malware signals across formats, time, and evasive samples.",
    stats: [
      ["3.24M", "released records"],
      ["6", "file formats"],
      ["6,315", "evasive challenge records"],
      ["≤100K", "bounded alpha cohort"],
    ],
    unit: "Released software or document feature record",
    task: "Malicious-versus-benign and challenge-set detection",
    stress:
      "Extreme dimensionality reduction, temporal leakage, format heterogeneity, class imbalance, drift, and access dependencies.",
    alpha:
      "The audit covers the full schema, while the alpha uses a predeclared stratified cohort plus the challenge set. It preserves the official temporal boundary and uses released features and metadata—never raw malware.",
  },
};

const gates = [
  ["Gate 1", "Traceable source", "Source, version, rights, checksums, labels, unit of analysis, and known limitations are documented."],
  ["Gate 2", "Auditable transformation", "Every extraction, cleaning, normalization, selection, reduction, augmentation, and partitioning step is versioned and reproducible."],
  ["Gate 3", "Resource-feasible encoding", "The representation declares its feature dimension, qubits, gates, depth, target platform, shots, runtime, and noise assumptions—and satisfies a stated resource profile."],
  ["Gate 4", "Reproducible benchmark", "Fixed partitions, matched classical baselines, QML reference consumers, executable tests, environments, and numerical tolerances support comparison."],
  ["Gate 5", "Governed reuse", "Licensing, contribution, security, correction, versioning, access, withdrawal, retirement, and external-user documentation are in place."],
];

const workPackages = [
  ["WP1", "Months 1–6", "Landscape, audit & requirements", "Audit both sources, map the technical landscape, identify risks, and learn what prospective users need before trusting or reusing an enhanced dataset.", "Dataset landscape · source-audit report · stakeholder-needs report · risk register"],
  ["WP2", "Across both years", "Community design & consensus", "Three working groups and two hybrid workshops resolve choices in security semantics, quantum portability, governance, adoption, and independent reuse.", "Decision log · requirements matrix · workshop reports · unresolved issues"],
  ["WP3", "Months 7–21", "Specification & architecture", "Create the five-gate readiness rubric, machine-readable metadata schema, backend-neutral architecture, and conformance process.", "Specification v0.5 and v1.0 · rubric · schema · conformance-suite design"],
  ["WP4", "Months 11–24", "Dual pilots & validation", "Build bounded TrojAI and EMBER2024 alpha products, measure semantic loss and circuit cost, test framework portability, and conduct independent reuse tasks.", "Two alpha releases · adapters · notebooks · resource and limitations reports"],
];

const timeline = [
  ["1–3", "Establish the evidence base", "Kickoff, source and security audits, landscape scan, working-group formation.", "Source manifests, initial risk register, stakeholder map"],
  ["4–6", "Define community requirements", "Needs assessment, technical sessions, EMBER cohort design, Workshop 1.", "Fixed pilot plans, community requirements, Workshop 1 report"],
  ["7–10", "Specify Q-readiness", "Readiness rubric, metadata schema, governance draft, reference architecture.", "Specification v0.5, domain profiles, conformance design"],
  ["11–14", "Build the first bounded alpha", "TrojAI views and leakage audit; EMBER feature and temporal-leakage audit.", "TrojAI alpha, EMBER cohort, preliminary reports"],
  ["15–18", "Test across pilots and platforms", "EMBER transformations, matched baselines, cross-platform testing, Workshop 2.", "Two pilot candidates and revised specification"],
  ["19–21", "Demonstrate independent reuse", "External reuse tests, governance exercise, infrastructure and cost analysis.", "Tester report, v1.0 candidate, sustainment options"],
  ["22–24", "Synthesize planning evidence", "Final alpha releases, dissemination, and readiness assessment.", "Final specification, dual-pilot releases, Impact Readiness Package"],
];

const evaluation = [
  ["Semantic preservation", "Every released representation includes stratified semantic-loss evidence; failures remain visible."],
  ["Resource feasibility", "Each released representation satisfies at least one predeclared qubit, gate, depth, shot, and noise profile."],
  ["Cross-dataset generality", "A mandatory core supports both pilots; necessary differences become named profiles."],
  ["Reproducibility", "External testers reproduce specified outputs within published tolerances."],
  ["Portability", "Results agree across Qiskit, PennyLane, and Cirq/TFQ within stated tolerances and uncertainty."],
  ["Community breadth", "At least 30 participants from at least 10 organizations contribute to the planning process."],
  ["Community acceptance", "At least 75% acceptance of mandatory fields, with disagreements and minority positions documented."],
  ["Adoption readiness", "At least five of six external testers complete the reference workflow without live investigator intervention."],
];

const team = [
  ["University of Central Arkansas", "Lead institution", "Dr. Md Jobair Hossain Faruk, PI · Dr. Sharif Ullah, co-PI", "Project leadership, Q-Data integration, cybersecurity semantics, threat models, leakage review, integrity, and release stewardship."],
  ["University of Arkansas at Little Rock", "Subaward partner", "Dr. Abdelrahman Elfikky, subaward lead", "Quantum encodings, simulator and hardware resource profiles, circuit conformance, cross-platform testing, and technical workshops."],
  ["Tennessee State University", "Subaward partner · HBCU", "Dr. Kamrul Hasan, subaward lead", "Independent reconstruction, usability testing, adoption assessment, student engagement, and an external implementation perspective."],
];

const navItems = [["vision", "Vision"], ["architecture", "Architecture"], ["pilots", "Pilots"], ["plan", "Plan"], ["evidence", "Evidence"], ["governance", "Governance"], ["team", "Team"]];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function ExternalIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M18 13v6H5V6h6" /></svg>;
}

export default function QDataSite() {
  const [activeStage, setActiveStage] = useState(0);
  const [activePilot, setActivePilot] = useState<"trojai" | "ember">("trojai");
  const [openGate, setOpenGate] = useState(0);
  const [activeMonth, setActiveMonth] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("vision");
  const pilot = useMemo(() => pilots[activePilot], [activePilot]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-18% 0px -68%", threshold: [0.05, 0.25, 0.5] });
    navItems.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <a className="skip-link" href="#vision">Skip to project overview</a>
      <header className="site-header">
        <a className="brand" href="#vision" aria-label="Q-Data home"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>Q‑Data</span></a>
        <button className="menu-button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
        <nav className={menuOpen ? "site-nav open" : "site-nav"} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="header-link" href="#readiness">Impact readiness <ArrowIcon /></a>
      </header>

      <section className="hero" id="vision">
        <div className="hero-grid grid-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Proposed Planning Grant · NSF 26‑512</p>
            <h1>From classical security data to <em>reusable</em> quantum-ready evidence.</h1>
            <p className="hero-lede">Q‑Data will define, test, and govern a reproducible bridge between established cybersecurity datasets and quantum or hybrid machine-learning workflows.</p>
            <div className="hero-actions"><a className="button primary" href="#architecture">Explore the workflow <ArrowIcon /></a><a className="button secondary" href="#evidence">See how success is measured</a></div>
          </div>
          <aside className="hero-panel" aria-label="Project at a glance">
            <p className="panel-kicker">Planning premise</p>
            <blockquote>Encoding data in a quantum circuit does not, by itself, create a reusable scientific dataset.</blockquote>
            <div className="metric-grid"><div><strong>2 years</strong><span>bounded planning effort</span></div><div><strong>2 pilots</strong><span>complementary security objects</span></div><div><strong>5 gates</strong><span>for declared Q-readiness</span></div><div><strong>3 institutions</strong><span>one lead, two subawards</span></div></div>
          </aside>
        </div>
        <div className="funding-note grid-shell"><strong>Funding status.</strong><span>The Q‑Data project is pending funding through NSF Program Solicitation NSF 26-512. Content on this site reflects the proposed program as described in the submitted proposal.</span></div>
      </section>

      <section className="problem-section section grid-shell">
        <div className="section-intro narrow"><p className="section-number">01 · The scientific gap</p><h2>Today, the same dataset can become a different experiment in every laboratory.</h2><p>QML researchers often make consequential choices about feature selection, reduction, normalization, encoding, circuit resources, and partitions—then document those choices only inside one model-specific notebook. That makes it difficult to determine whether an observed result comes from the data, the encoding, or the learning algorithm.</p></div>
        <div className="contrast-grid">
          <article className="contrast-card muted"><p className="card-label">Common practice</p><h3>Experiment-specific preprocessing</h3><ul><li>Source and transformation history may be incomplete</li><li>Resource assumptions are difficult to compare</li><li>Security meaning can be lost without being measured</li><li>Another team may not reconstruct the representation</li></ul></article>
          <article className="contrast-card highlighted"><p className="card-label">Proposed Q‑Data approach</p><h3>A versioned scientific data product</h3><ul><li>Traceable sources and auditable transformations</li><li>Declared quantum hardware and simulator profiles</li><li>Fixed tasks with matched classical and QML baselines</li><li>Provenance, conformance tests, and governed reuse</li></ul></article>
        </div>
        <div className="definition-band"><span className="definition-symbol">Q</span><div><p className="card-label">Working definition</p><p>A <strong>Q‑ready data product</strong> is a versioned, independently reusable package connecting an unchanged source dataset to documented transformations, hardware-profiled encodings, fixed benchmarks, provenance, and governance.</p></div><p className="definition-caveat">It is not data stored in qubits, a circuit for one classifier, or a claim of quantum advantage.</p></div>
      </section>

      <section className="architecture-section section" id="architecture">
        <div className="grid-shell">
          <div className="section-heading split-heading"><div><p className="section-number">02 · Planning architecture</p><h2>One shared workflow, tested against two very different datasets.</h2></div><p>Community co-design shapes each decision. Governance, security, integrity, and sustainment operate across every stage.</p></div>
          <div className="architecture-rail top-rail"><span>Community co-design</span><i /><span>workshops · working groups · external review</span></div>
          <div className="architecture-flow" role="tablist" aria-label="Q-Data enhancement stages">
            {architectureStages.map((stage, index) => <button key={stage.number} role="tab" aria-selected={activeStage === index} className={activeStage === index ? "architecture-node active" : "architecture-node"} onClick={() => setActiveStage(index)}><span>{stage.number}</span><strong>{stage.title}</strong><small>{stage.short}</small></button>)}
          </div>
          <div className="architecture-rail bottom-rail"><span>Governance · security · integrity · sustainment</span><i /></div>
          <div className="stage-detail" role="tabpanel"><div><p className="panel-kicker">Stage {architectureStages[activeStage].number}</p><h3>{architectureStages[activeStage].title}</h3><p>{architectureStages[activeStage].detail}</p></div><div className="stage-outputs"><p>Planning outputs</p>{architectureStages[activeStage].outputs.map((output) => <span key={output}>{output}</span>)}</div></div>
        </div>
      </section>

      <section className="pilots-section section grid-shell" id="pilots">
        <div className="section-heading split-heading"><div><p className="section-number">03 · Complementary pilots</p><h2>Model poisoning and evasive malware test different limits of Q‑readiness.</h2></div><p>The pilots are selected for contrast, not dataset count. Together they test whether a reusable core can span model-level and file-record scientific objects without erasing domain-specific requirements.</p></div>
        <div className="pilot-switch" role="tablist" aria-label="Select pilot dataset"><button role="tab" aria-selected={activePilot === "trojai"} className={activePilot === "trojai" ? "active" : ""} onClick={() => setActivePilot("trojai")}>NIST TrojAI Round 11</button><button role="tab" aria-selected={activePilot === "ember"} className={activePilot === "ember" ? "active" : ""} onClick={() => setActivePilot("ember")}>EMBER2024</button></div>
        <article className="pilot-panel" role="tabpanel" key={activePilot}>
          <div className="pilot-summary"><p className="eyebrow">{pilot.eyebrow}</p><h3>{pilot.title}</h3><p className="pilot-lede">{pilot.summary}</p><div className="pilot-facts"><div><span>Scientific object</span><strong>{pilot.unit}</strong></div><div><span>Initial task</span><strong>{pilot.task}</strong></div><div><span>Planning stress test</span><strong>{pilot.stress}</strong></div></div></div>
          <div className="pilot-data"><div className="pilot-stats">{pilot.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><div className="bounded-alpha"><p className="card-label">Bounded technical validation</p><p>{pilot.alpha}</p></div></div>
        </article>
        <p className="pilot-note"><strong>Planning discipline:</strong> Neither pilot is presented as the production-scale collection envisioned for a possible future Impact project. Failed encodings and unmet resource profiles remain part of the evidence.</p>
      </section>

      <section className="readiness-section section" id="plan">
        <div className="grid-shell">
          <div className="section-heading split-heading"><div><p className="section-number">04 · The Q‑Data readiness rubric</p><h2>Q‑readiness is reported by gate and resource profile—not as an unqualified label.</h2></div><p>A representation feasible on a noiseless simulator must not be mistaken for one suitable for a current device. Select a gate to see its evidence requirement.</p></div>
          <div className="gates-layout"><div className="gate-list">{gates.map((gate, index) => <button key={gate[0]} className={openGate === index ? "gate-row open" : "gate-row"} aria-expanded={openGate === index} onClick={() => setOpenGate(index)}><span>{gate[0]}</span><strong>{gate[1]}</strong><i>{openGate === index ? "−" : "+"}</i></button>)}</div><div className="gate-detail"><span className="gate-number">0{openGate + 1}</span><p className="panel-kicker">{gates[openGate][0]}</p><h3>{gates[openGate][1]}</h3><p>{gates[openGate][2]}</p><div className="manifest-chip">Release manifest: pass · conditional · not met</div></div></div>
          <div className="work-package-heading"><p className="section-number">Four connected work packages</p><p>Planning decisions move from evidence and community requirements to specification, bounded implementation, and independent validation.</p></div>
          <div className="work-grid">{workPackages.map((wp) => <article className="work-card" key={wp[0]}><div><span>{wp[0]}</span><small>{wp[1]}</small></div><h3>{wp[2]}</h3><p>{wp[3]}</p><footer>{wp[4]}</footer></article>)}</div>
        </div>
      </section>

      <section className="timeline-section section grid-shell">
        <div className="section-heading split-heading"><div><p className="section-number">05 · 24-month work plan</p><h2>Milestones turn open questions into testable planning evidence.</h2></div><p>Formal reviews at Months 6, 10, 14, 18, 21, and 24 assess technical evidence, participation, risks, spending, and unresolved decisions.</p></div>
        <div className="timeline-tabs" role="tablist" aria-label="Project timeline">{timeline.map((item, index) => <button key={item[0]} role="tab" aria-selected={activeMonth === index} className={activeMonth === index ? "active" : ""} onClick={() => setActiveMonth(index)}><span>Months</span><strong>{item[0]}</strong></button>)}</div>
        <article className="timeline-detail" role="tabpanel"><div><p className="panel-kicker">Months {timeline[activeMonth][0]}</p><h3>{timeline[activeMonth][1]}</h3></div><div><span>Primary activity</span><p>{timeline[activeMonth][2]}</p></div><div><span>Milestone</span><p>{timeline[activeMonth][3]}</p></div></article>
      </section>

      <section className="evidence-section section" id="evidence">
        <div className="grid-shell">
          <div className="section-heading split-heading light-heading"><div><p className="section-number">06 · Evidence and evaluation</p><h2>The planning project succeeds by producing trustworthy comparisons—not by claiming quantum superiority.</h2></div><p>Every success criterion is tied to observable evidence. Technical failures, negative results, disagreement, and subgroup losses are retained because they determine whether scale-up is justified.</p></div>
          <div className="evaluation-grid">{evaluation.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="neutrality-callout"><p className="card-label">A deliberately neutral test</p><blockquote>Under matched source features, partitions, and resource assumptions, what additional or different information—if any—is obtained from quantum kernels or small hybrid models relative to strong classical baselines?</blockquote><p>A finding that classical methods remain stronger under current constraints is still useful: it identifies unsuitable encodings, measurable information loss, and the conditions that must change before a quantum approach is scientifically useful.</p></div>
        </div>
      </section>

      <section className="community-section section grid-shell">
        <div className="section-heading split-heading"><div><p className="section-number">07 · Community co-design and adoption</p><h2>Attendance shows reach. Documented work shows commitment.</h2></div><p>Cybersecurity researchers, quantum scientists, data stewards, software developers, infrastructure specialists, educators, and prospective users will decide what the standard must contain.</p></div>
        <div className="community-metrics"><div><strong>30+</strong><span>unique participants</span></div><div><strong>10+</strong><span>organizations</span></div><div><strong>2</strong><span>hybrid design workshops</span></div><div><strong>6</strong><span>focused virtual sessions</span></div><div><strong>6</strong><span>external reuse testers</span></div><div><strong>3</strong><span>external testing organizations</span></div></div>
        <div className="working-groups"><article><span>Working group A</span><h3>Security semantics & data integrity</h3><p>Units of analysis, feature meaning, leakage, source integrity, benchmark partitions, and safe artifact handling.</p></article><article><span>Working group B</span><h3>Quantum encoding & portability</h3><p>Encoding alternatives, resource profiles, canonical representations, transpilation, and cross-framework conformance.</p></article><article><span>Working group C</span><h3>Governance, adoption & reuse</h3><p>Documentation, contribution review, corrections, retirement, usability, and independent reproduction.</p></article></div>
      </section>

      <section className="governance-section section" id="governance">
        <div className="grid-shell">
          <div className="section-heading split-heading"><div><p className="section-number">08 · Governance, security and availability</p><h2>Stewardship is designed with the data—not added after release.</h2></div><p>UCA will serve as the accountable steward of planning-grant artifacts. Original-source authority remains with the respective data providers.</p></div>
          <div className="governance-grid"><article className="governance-main"><p className="card-label">Contribution-to-release pathway</p><div className="governance-steps">{[["01", "Source & rights", "Identify authority, permissions, and intended resource profile."], ["02", "Security screening", "Review privacy, integrity, leakage, unsafe artifacts, and dependencies."], ["03", "Reproducible build", "Provide code, metadata, benchmark evidence, and automated tests."], ["04", "Independent review", "Two qualified reviewers assess technical and scientific adequacy."], ["05", "Governance decision", "Approve, revise, reject, correct, withdraw, or retire with a recorded rationale."]].map(([number, title, text]) => <div key={number}><span>{number}</span><section><h3>{title}</h3><p>{text}</p></section></div>)}</div></article><aside className="governance-side"><article><p className="card-label">Integrity</p><h3>Traceable by design</h3><p>Machine-readable manifests connect each output to source identifiers, hashes, software versions, partitions, transformations, seeds, and known exclusions.</p></article><article><p className="card-label">Security</p><h3>Risk-aware handling</h3><p>TrojAI models are isolated and dependency-pinned. EMBER2024 uses released feature vectors and metadata; the project will not distribute or execute malware.</p></article><article><p className="card-label">Availability</p><h3>Open where permitted</h3><p>Code and documentation will use a public version-controlled repository; stable releases and permissible artifacts will use a DOI-bearing archive.</p></article></aside></div>
        </div>
      </section>

      <section className="team-section section grid-shell" id="team">
        <div className="section-heading split-heading"><div><p className="section-number">09 · Collaborative structure</p><h2>One lead institution, two subaward partners, and clearly separated validation roles.</h2></div><p>The structure follows the solicitation’s restriction on separately submitted collaborative proposals: UCA leads the single proposal, with UALR and TSU participating through subawards.</p></div>
        <div className="team-grid">{team.map((member, index) => <article key={member[0]} className={index === 0 ? "lead" : ""}><div><span>{member[1]}</span><b>0{index + 1}</b></div><h3>{member[0]}</h3><p className="team-people">{member[2]}</p><p>{member[3]}</p></article>)}</div>
        <div className="student-band"><strong>6+ students</strong><p>Undergraduate and graduate students across UCA, UALR, and TSU will contribute to auditing, cybersecurity review, encoding, conformance testing, documentation, and responsible data stewardship.</p></div>
      </section>

      <section className="readiness-package section" id="readiness">
        <div className="grid-shell readiness-grid"><div className="readiness-copy"><p className="section-number">10 · Decision point</p><h2>An Impact Readiness Package grounded in evidence rather than assumptions.</h2><p>The planning award will determine whether a larger AI Datasets Impact project is warranted. It does not commit the team to submit a future proposal and does not presume future NSF support.</p><a className="button primary light-button" href="#resources">Review source resources <ArrowIcon /></a></div><div className="package-list">{["Community-approved scientific and technical requirements", "Final Q‑Data specification and readiness rubric", "Dual-pilot performance, resource, conformance, and adoption evidence", "Governance, stewardship, infrastructure, and staffing alternatives", "Scaling analysis, cost model, partnerships, risks, and dependencies", "Evidence-based scope and evaluation design for a possible Impact project"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div></div>
      </section>

      <section className="resources-section section grid-shell" id="resources">
        <div className="section-heading split-heading"><div><p className="section-number">Selected source resources</p><h2>Project foundations</h2></div><p>The proposal builds on established federal and community datasets while addressing a different need: a reusable, cybersecurity-aware standard for classical-to-quantum enhancement.</p></div>
        <div className="resource-links"><a href="https://www.nsf.gov/funding/opportunities/ai-datasets-unlocking-dataset-value-ai-enabled-scientific-discovery/nsf26-512/solicitation" target="_blank" rel="noreferrer"><span>Program</span><strong>NSF 26‑512: AI Datasets</strong><ExternalIcon /></a><a href="https://pages.nist.gov/trojai/docs/image-classification-sep2022.html" target="_blank" rel="noreferrer"><span>Pilot 01</span><strong>NIST TrojAI Round 11</strong><ExternalIcon /></a><a href="https://github.com/FutureComputing4AI/EMBER2024" target="_blank" rel="noreferrer"><span>Pilot 02</span><strong>EMBER2024 repository</strong><ExternalIcon /></a></div>
      </section>

      <footer className="site-footer"><div className="grid-shell footer-grid"><div><a className="brand footer-brand" href="#vision"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>Q‑Data</span></a><p>Architecting reusable quantum-ready cybersecurity datasets.</p></div><div><strong>Funding status.</strong><p>The Q‑Data project is pending funding through NSF Program Solicitation NSF 26-512. Content on this site reflects the proposed program as described in the submitted proposal.</p></div><div><strong>Proposed lead</strong><p>University of Central Arkansas<br />with UALR and TSU as subaward partners</p></div></div><div className="grid-shell footer-bottom"><span>Planning proposal · 2026</span><a href="#vision">Back to top ↑</a></div></footer>
    </main>
  );
}
