'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import { motion } from 'framer-motion';

// Örnek screenshot verileri (gerçek uygulamada bunlar dinamik olabilir)
const examples = [
  {
    id: 1,
    appName: 'FitTrack Pro',
    category: 'Health & Fitness',
    headline: 'Track Your Progress',
    highlight: 'Progress',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  },
  {
    id: 2,
    appName: 'MindfulMe',
    category: 'Lifestyle',
    headline: 'Find Your Inner Peace',
    highlight: 'Peace',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
  },
  {
    id: 3,
    appName: 'BudgetWise',
    category: 'Finance',
    headline: 'Smart Money Management',
    highlight: 'Smart',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
  },
  {
    id: 4,
    appName: 'PhotoMaster',
    category: 'Photo & Video',
    headline: 'Edit Like A Pro',
    highlight: 'Pro',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
  },
  {
    id: 5,
    appName: 'TaskFlow',
    category: 'Productivity',
    headline: 'Get Things Done Faster',
    highlight: 'Faster',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
  },
  {
    id: 6,
    appName: 'CookBook',
    category: 'Food & Drink',
    headline: 'Delicious Recipes Daily',
    highlight: 'Delicious',
    color: '#fb923c',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
  },
];

export default function ExamplesPage() {
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
            <h1 className={styles.title}>Example Screenshots</h1>
            <p className={styles.subtitle}>
              See what you can create with AppShot AI
            </p>
          </motion.div>
        </section>

        <section className={styles.examplesSection}>
          <div className={styles.inspirationNote}>
            <span className={styles.sparkle}>✨</span>
            <p>These could be <strong>your</strong> app screenshots. Start creating now!</p>
          </div>
          
          <div className={styles.examplesGrid}>
            {examples.map((example, index) => (
              <motion.div
                key={example.id}
                className={styles.exampleCard}
                style={{ background: example.gradient }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.cardContent}>
                  <span className={styles.category}>{example.category}</span>
                  <h3 className={styles.headline}>
                    {example.headline.split(example.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span style={{ color: '#fff', textShadow: `0 0 20px ${example.color}` }}>
                            {example.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </h3>
                </div>
                
                <div className={styles.phoneFrame}>
                  <div className={styles.notch}></div>
                  <div className={styles.screenContent}>
                    <div className={styles.placeholderScreen}>
                      <div className={styles.placeholderIcon}></div>
                      <div className={styles.placeholderText}></div>
                      <div className={styles.placeholderText} style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.appName}>{example.appName}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2>Ready to create your own?</h2>
            <p>Upload your screenshots and let AI do the magic</p>
            <Link href="/editor" className={styles.ctaBtn}>
              Start Creating
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

