import React from 'react';
import { Link } from '../../context/RouterContext';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  kind: 'privacy' | 'terms';
}

const UPDATED = 'September 11, 2026';

const PRIVACY_SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Information We Collect',
    body: 'When you use this website or contact us, we may collect information you provide directly, such as your name, email address, company, phone number, and the contents of any message you submit through our contact and demo forms. We also collect limited technical data automatically, such as browser type, device information, and pages visited, to operate and improve the site.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use the information we collect to respond to inquiries, schedule and conduct product demonstrations, evaluate business fit, deliver the services you request, and improve the quality of our website and offerings. We do not sell your personal information to third parties.',
  },
  {
    title: 'Cookies and Session Data',
    body: 'The CMS portion of this website uses an HTTP-only session cookie to keep you signed in securely. This cookie is never read by client-side scripts and is transmitted over HTTPS only. Third-party analytics services may set their own cookies; you can control these through your browser settings.',
  },
  {
    title: 'Data Sharing',
    body: 'We share personal information only with service providers who help us operate the website (such as hosting and email infrastructure), and only to the extent necessary to provide those services. We may disclose information when required by law or to protect the rights and safety of BEEZENTS, our clients, or the public.',
  },
  {
    title: 'Data Retention and Security',
    body: 'We retain personal information only as long as necessary for the purposes described in this policy, or as required by law. We apply industry-standard administrative, technical, and physical safeguards to protect the information we hold.',
  },
  {
    title: 'Your Rights',
    body: 'Depending on your jurisdiction, you may have the right to access, correct, or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise these rights, contact us at hello@beezents.com and we will respond within a reasonable timeframe.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Material changes will be reflected by updating the effective date above, and where required, we will provide additional notice.',
  },
  {
    title: 'Contact Us',
    body: 'If you have questions about this Privacy Policy or how your information is handled, please reach us at hello@beezents.com.',
  },
];

const TERMS_SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using the BEEZENTS website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, please discontinue use of the site.',
  },
  {
    title: 'Services',
    body: 'BEEZENTS provides AI automation, software development, and consulting services as described on this website. Specific deliverables, timelines, and fees are governed by the individual statements of work or agreements executed with clients. This website does not constitute a binding offer of services.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content on this website, including text, graphics, logos, imagery, and underlying technology, is the property of BEEZENTS or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from site content without prior written permission.',
  },
  {
    title: 'Acceptable Use',
    body: 'You agree not to misuse this website, including attempting to gain unauthorized access to the CMS, interfering with site operation, scraping content at scale, or using the site to transmit malicious code.',
  },
  {
    title: 'Disclaimer of Warranties',
    body: 'This website and the information on it are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.',
  },
  {
    title: 'Limitation of Liability',
    body: 'To the maximum extent permitted by law, BEEZENTS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this website.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms of Service are governed by the laws of the jurisdiction in which BEEZENTS is registered, without regard to conflict-of-law principles.',
  },
  {
    title: 'Contact Us',
    body: 'Questions about these Terms of Service may be directed to hello@beezents.com.',
  },
];

export const LegalPage: React.FC<LegalPageProps> = ({ kind }) => {
  const isPrivacy = kind === 'privacy';
  const sections = isPrivacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  return (
    <div className="w-full bg-[#F8FAFC]">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0282EB] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-orbitron">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">Effective {UPDATED}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                <span className="text-[#0282EB] font-mono text-xs bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LegalPage;