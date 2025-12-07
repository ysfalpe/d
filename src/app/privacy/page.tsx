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
          <p className={styles.lastUpdated}>Last updated: December 2024</p>

          <section className={styles.section}>
            <h2>Introduction</h2>
            <p>
              Shotsy (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our service at shotsy.app.
            </p>
            <p>
              This policy applies to users worldwide, including those in the European Economic Area (EEA) 
              under GDPR and California residents under CCPA/CPRA.
            </p>
          </section>

          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            
            <h3>1.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Email address, name (via Clerk authentication)</li>
              <li><strong>Payment Information:</strong> Processed securely by Polar. We do not store credit card numbers.</li>
              <li><strong>Uploaded Content:</strong> Screenshots you upload for AI processing</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
              <li><strong>Device Information:</strong> Browser type, operating system</li>
              <li><strong>Log Data:</strong> IP address, access times (for security purposes)</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>We use collected information for:</p>
            <ul>
              <li>Providing and maintaining our screenshot generation service</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Sending transactional emails (receipts, account updates)</li>
              <li>Improving our service based on usage patterns</li>
              <li>Preventing fraud and ensuring security</li>
            </ul>
            <p>
              <strong>We do NOT:</strong> Sell your personal data, use your screenshots to train AI models, 
              or share your information with third parties for marketing purposes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Legal Basis for Processing (GDPR)</h2>
            <p>For users in the EEA, we process your data based on:</p>
            <ul>
              <li><strong>Contract:</strong> To provide the service you signed up for</li>
              <li><strong>Legitimate Interest:</strong> To improve our service and prevent fraud</li>
              <li><strong>Consent:</strong> For optional marketing communications (you can opt out anytime)</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Data Retention</h2>
            <ul>
              <li><strong>Account Data:</strong> Retained while your account is active, deleted within 30 days of account deletion request</li>
              <li><strong>Uploaded Screenshots:</strong> Processed in real-time and NOT stored permanently. Deleted immediately after processing.</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for legal/tax compliance</li>
              <li><strong>Log Data:</strong> Retained for 90 days for security purposes</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>5. Third-Party Services</h2>
            <p>We use the following services that may process your data:</p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Purpose</th>
                  <th>Data Shared</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clerk</td>
                  <td>Authentication</td>
                  <td>Email, name, login data</td>
                </tr>
                <tr>
                  <td>Polar</td>
                  <td>Payments</td>
                  <td>Payment details, email</td>
                </tr>
                <tr>
                  <td>OpenRouter (AI)</td>
                  <td>Caption generation</td>
                  <td>Screenshot content (not stored)</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Hosting</td>
                  <td>Access logs, IP address</td>
                </tr>
                <tr>
                  <td>Vercel Analytics</td>
                  <td>Usage analytics</td>
                  <td>Anonymous usage data</td>
                </tr>
              </tbody>
            </table>
            <p>Each service has their own privacy policy. We recommend reviewing them.</p>
          </section>

          <section className={styles.section}>
            <h2>6. Your Rights</h2>
            
            <h3>For All Users:</h3>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
            </ul>

            <h3>Additional Rights for EEA Users (GDPR):</h3>
            <ul>
              <li><strong>Data Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interest</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              <li><strong>Lodge Complaint:</strong> File a complaint with your local data protection authority</li>
            </ul>

            <h3>Additional Rights for California Residents (CCPA/CPRA):</h3>
            <ul>
              <li><strong>Know:</strong> What personal information we collect and how it&apos;s used</li>
              <li><strong>Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out of Sale:</strong> We do NOT sell your personal information</li>
              <li><strong>Non-Discrimination:</strong> Equal service regardless of exercising your rights</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Data Security</h2>
            <p>We protect your data using:</p>
            <ul>
              <li>SSL/TLS encryption for all data in transit</li>
              <li>Encrypted database storage</li>
              <li>PCI-compliant payment processing (via Polar)</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>8. International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside your residence. 
              We ensure appropriate safeguards are in place, including Standard Contractual Clauses 
              for EEA data transfers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for users under 16 years of age. We do not knowingly 
              collect data from children. If we learn we have collected data from a child, 
              we will delete it immediately.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes via email or a notice on our website. Your continued use of the service 
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. How to Exercise Your Rights</h2>
            <p>To exercise any of your privacy rights, you can:</p>
            <ul>
              <li>Email us at <a href="mailto:ifytech77@gmail.com">ifytech77@gmail.com</a></li>
              <li>Delete your account through your account settings</li>
              <li>Use the unsubscribe link in any marketing email</li>
            </ul>
            <p>We will respond to requests within 30 days (or sooner as required by law).</p>
          </section>

          <section className={styles.section}>
            <h2>12. Contact Us</h2>
            <p>
              For privacy-related questions or concerns:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:ifytech77@gmail.com">ifytech77@gmail.com</a>
            </p>
            <p>
              <strong>Data Protection:</strong> For GDPR inquiries, contact our data protection 
              representative at the same email address.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
