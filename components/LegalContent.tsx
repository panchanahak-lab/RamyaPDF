
import React from 'react';

// Fix: Made 'children' optional in the type definition to resolve TS errors where it's reported as missing when using JSX tags.
const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
      {title}
    </h2>
    <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 text-[15px]">
      {children}
    </div>
  </section>
);

export const TermsOfService = () => (
  <article className="max-w-4xl mx-auto py-12 px-6">
    <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Terms of Service</h1>
      <p className="text-slate-500">Effective Date: May 20, 2026 | Jurisdiction: Odisha, India</p>
    </header>

    <Section title="1. Acceptance of Terms">
      <p>By accessing and using RamyaPDF ("the Service"), operated by RamyaPDF Inc. in Odisha, India, you agree to be bound by these Terms of Service and all applicable laws and regulations in India, including the Information Technology Act, 2000.</p>
    </Section>

    <Section title="2. Description of Service">
      <p>RamyaPDF provides a freemium platform for PDF editing, conversion, and document management. We utilize Hostinger for secure storage and Razorpay for processing payments. The Service is provided "as is" and "as available."</p>
    </Section>

    <Section title="3. User Responsibilities & Conduct">
      <ul className="list-disc pl-5 space-y-2">
        <li>Users must be at least 13 years of age.</li>
        <li>You are solely responsible for the content of the files you upload.</li>
        <li>You agree not to use the service for any illegal activities under Indian law, including distributing malware or infringing on intellectual property.</li>
      </ul>
    </Section>

    <Section title="4. Intellectual Property">
      <p>You retain full ownership of the documents you upload. RamyaPDF does not claim any rights over your content. However, by using the Service, you grant us the necessary technical permissions to process your files (e.g., converting a PDF to Word).</p>
    </Section>

    <Section title="5. Governing Law">
      <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts located in Bhubaneswar, Odisha.</p>
    </Section>
  </article>
);

export const PrivacyPolicy = () => (
  <article className="max-w-4xl mx-auto py-12 px-6">
    <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
      <p className="text-slate-500">Compliant with DPDP Act, 2023 | Last Updated: May 2026</p>
    </header>

    <Section title="1. Data Collection">
      <p>We collect minimal personal data required to provide the service: email address, basic profile information (if logged in), and technical data via Google Analytics.</p>
    </Section>

    <Section title="2. Document Privacy & Retention">
      <p>RamyaPDF prioritizes your document security. All file transfers are encrypted via HTTPS/TLS. Files uploaded for processing are stored temporarily on Hostinger servers and are automatically deleted within 2 hours of processing completion.</p>
    </Section>

    <Section title="3. Third-Party Services">
      <p>We share data with third-party fiduciaries only as necessary:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Hostinger:</strong> For secure document hosting and processing infrastructure.</li>
        <li><strong>Razorpay:</strong> For secure payment processing (we do not store credit card details).</li>
        <li><strong>Google Analytics:</strong> For improving platform performance and user experience.</li>
      </ul>
    </Section>

    <Section title="4. Your Rights">
      <p>Under the Digital Personal Data Protection Act, 2023, you have the right to access, correct, and erase your personal data. You may withdraw consent at any time by contacting our Grievance Officer.</p>
    </Section>
  </article>
);

export const Disclaimer = () => (
  <article className="max-w-4xl mx-auto py-12 px-6">
    <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Disclaimer</h1>
    </header>

    <Section title="1. Professional Advice">
      <p>RamyaPDF provides document management tools. We do not provide legal, financial, or professional advice. The accuracy of OCR (Optical Character Recognition) and AI-generated summaries is not guaranteed.</p>
    </Section>

    <Section title="2. Limitation of Liability">
      <p>To the maximum extent permitted by Indian law, RamyaPDF shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Service, including but not limited to data loss or document corruption.</p>
    </Section>

    <Section title="3. External Links">
      <p>Our platform may contain links to third-party websites. We are not responsible for the content or privacy practices of such sites.</p>
    </Section>
  </article>
);

export const SecurityCompliance = () => (
  <article className="max-w-4xl mx-auto py-12 px-6">
    <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Security & Compliance</h1>
      <p className="text-slate-500">Adhering to IT Act 2000 & DPDP Act 2023 | Security Controls & Standards</p>
    </header>

    <Section title="Data Protection & Privacy (Section 43A & SPDI Rules)">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Consent:</strong> We obtain explicit consent for collecting any sensitive personal data (SPDI), including financial information, adhering to strict data minimization principles.</li>
        <li><strong>Security Practices:</strong> RamyaPDF implements reasonable security practices and procedures (IS/ISO/IEC 27001 aligned) to protect SPDI from unauthorized access, damage, or destruction.</li>
        <li><strong>Privacy Policy:</strong> Our detailed privacy policy is easily accessible and transparent about data handling practices.</li>
        <li><strong>Breach Notification:</strong> We have established protocols to notify CERT-In and affected individuals within 72 hours of any cybersecurity incident as mandated.</li>
      </ul>
    </Section>

    <Section title="Electronic Records & Signatures (IT Act Sections 4, 5, 6)">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Data Integrity:</strong> All electronic records processed are retained in a manner that ensures they remain accessible and maintain their original integrity.</li>
        <li><strong>Authentication:</strong> Where applicable, we support the use of Digital Signatures (DSCs) for document authentication in compliance with Indian law.</li>
        <li><strong>Attribution:</strong> Our system logs ensure secure attribution of electronic records to their specific senders and recipients.</li>
      </ul>
    </Section>

    <Section title="Cyber Security & Incident Response (Sections 43, 66-67)">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Network & Endpoint Security:</strong> We deploy advanced firewalls, intrusion detection systems, and secure configurations across all endpoints to prevent unauthorized access.</li>
        <li><strong>Incident Response:</strong> A comprehensive Incident Response Plan is in place to handle breaches, ransomware, or hacking attempts effectively.</li>
        <li><strong>Log Retention:</strong> System logs are retained for a rolling period of 180 days to support forensic analysis, complying with CERT-In directions.</li>
      </ul>
    </Section>

    <Section title="Roles & Governance">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Data Protection Officer (DPO):</strong> A dedicated DPO is appointed to oversee SPDI handling and address user grievances.</li>
        <li><strong>Risk Assessments:</strong> We conduct regular security and privacy risk assessments to identify and mitigate potential vulnerabilities.</li>
        <li><strong>Compliance Audits:</strong> Regular internal and external audits ensure ongoing adherence to the IT Act, 2000 and best security practices.</li>
      </ul>
    </Section>
  </article>
);
