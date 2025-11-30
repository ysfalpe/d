'use client';

import { Check, Zap, Crown, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import styles from './page.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.title}>Simple, Transparent Pricing</h1>
            <p className={styles.subtitle}>
              Start creating stunning app screenshots today
            </p>
          </motion.div>
        </section>

        <section className={styles.pricingSection}>
          <div className={styles.pricingGrid}>
            {/* Free Plan */}
            <motion.div 
              className={styles.pricingCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.planIcon}>
                  <Zap size={24} />
                </div>
                <h3 className={styles.planName}>Free</h3>
                <p className={styles.planDesc}>Try before you buy</p>
              </div>
              
              <div className={styles.priceContainer}>
                <span className={styles.price}>$0</span>
                <span className={styles.period}>/forever</span>
              </div>

              <ul className={styles.features}>
                <li>
                  <Check size={18} className={styles.checkIcon} />
                  <span>View examples & templates</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIcon} />
                  <span>Upload screenshots</span>
                </li>
                <li className={styles.featureDisabled}>
                  <span className={styles.xIcon}>×</span>
                  <span>AI caption generation</span>
                </li>
                <li className={styles.featureDisabled}>
                  <span className={styles.xIcon}>×</span>
                  <span>Export high-res images</span>
                </li>
              </ul>

              <Link href="/editor" className={styles.secondaryBtn}>
                Try Editor
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              className={`${styles.pricingCard} ${styles.proCard}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.popularBadge}>Most Popular</div>
              
              <div className={styles.cardHeader}>
                <div className={styles.planIconPro}>
                  <Crown size={24} />
                </div>
                <h3 className={styles.planName}>Pro</h3>
                <p className={styles.planDesc}>For serious app creators</p>
              </div>
              
              <div className={styles.priceContainer}>
                <span className={styles.originalPrice}>$49</span>
                <span className={styles.price}>$19</span>
                <span className={styles.period}>/month</span>
              </div>
              <div className={styles.savingsBadge}>Save 61% - Limited Time</div>

              <ul className={styles.features}>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span><strong>Unlimited</strong> AI generations</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span>All premium templates</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span>High-res exports (PNG)</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span>All device frames</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span>Priority support</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIconPro} />
                  <span>Cancel anytime</span>
                </li>
              </ul>

              <Link href="/editor" className={styles.primaryBtn}>
                Get Pro Access
                <ArrowRight size={18} />
              </Link>

              <p className={styles.guarantee}>7-day money-back guarantee</p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Can I cancel anytime?</h4>
              <p>Yes! You can cancel your subscription at any time. Your Pro access will remain until the end of your billing period.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, debit cards, and PayPal through our secure payment provider Polar.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is there a refund policy?</h4>
              <p>Yes, we offer a 7-day money-back guarantee. If you're not satisfied, contact us for a full refund.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>How many screenshots can I create?</h4>
              <p>Pro users get unlimited AI generations. Create as many screenshots as you need for all your apps.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

