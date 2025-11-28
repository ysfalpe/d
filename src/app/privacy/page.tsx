import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './page.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: November 2024</p>

          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>
              When you use AppShot AI, we collect information you provide directly to us, such as:
            </p>
            <ul>
              <li>Account information (email address, name)</li>
              <li>Payment information (processed securely by Polar)</li>
              <li>Screenshots you upload for processing</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Process your payments</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Respond to your requests and support needs</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Image Processing</h2>
            <p>
              Screenshots you upload are processed by our AI service to generate captions. 
              We do not store your images permanently. Images are processed in real-time 
              and are not used to train AI models.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. 
              All data is encrypted in transit using SSL/TLS. Payment processing is handled 
              by PCI-compliant providers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Clerk</strong> - Authentication and user management</li>
              <li><strong>Polar</strong> - Payment processing</li>
              <li><strong>OpenRouter</strong> - AI processing</li>
              <li><strong>Vercel</strong> - Hosting</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@appshot.ai">privacy@appshot.ai</a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

