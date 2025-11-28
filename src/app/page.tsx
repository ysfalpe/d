'use client';


import Link from "next/link";
import { ArrowRight, Wand2, Layout, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.badge}>✨ AI Powered</span>
              <h1 className={styles.title}>
                Perfect Screenshots <br />
                <span className={styles.gradientText}>For Your Apps</span>
              </h1>
              <p className={styles.description}>
                Create professional visuals for App Store and Google Play in seconds.
                Upload your screenshots and let AI handle the rest.
              </p>

              <div className={styles.ctaGroup}>
                <Link href="/editor">
                  <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                    Start Now
                  </Button>
                </Link>
                <Link href="/examples">
                  <Button variant="outline" size="lg">
                    View Examples
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.heroImageContainer}>
              <div className={styles.mockupGrid}>
                {/* Left Phone */}
                <div className={styles.mockupItem} style={{ transform: 'translateY(20px)', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
                  <div className={styles.mockupContent}>
                    <span className={styles.mockupHeadline}>Track Your <span style={{color: '#fff'}}>Progress</span></span>
                    <div className={styles.mockupPhone}></div>
                  </div>
                </div>
                {/* Center Phone */}
                <div className={styles.mockupItem} style={{ zIndex: 2, background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' }}>
                  <div className={styles.mockupContent}>
                    <span className={styles.mockupHeadline}>Find Your <span style={{color: '#fff'}}>Peace</span></span>
                    <div className={styles.mockupPhone}></div>
                  </div>
                </div>
                {/* Right Phone */}
                <div className={styles.mockupItem} style={{ transform: 'translateY(20px)', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}>
                  <div className={styles.mockupContent}>
                    <span className={styles.mockupHeadline}><span style={{color: '#fff'}}>Smart</span> Money</span>
                    <div className={styles.mockupPhone}></div>
                  </div>
                </div>
              </div>
              <div className={styles.glowEffect}></div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className={styles.features} id="features">
          <div className={styles.sectionHeader}>
            <h2>Why AppShot AI?</h2>
            <p>Features to make your app stand out in the store</p>
          </div>

          <div className={styles.featureGrid}>
            <FeatureCard
              icon={<Wand2 size={32} />}
              title="AI Text Generation"
              description="Tell us what your app does, and AI will write catchy marketing captions."
            />
            <FeatureCard
              icon={<Layout size={32} />}
              title="Ready-made Templates"
              description="Modern, minimalist, or colorful. Choose the design that fits your app."
            />
            <FeatureCard
              icon={<Smartphone size={32} />}
              title="Automatic Device Frames"
              description="Automatically wrap your screenshots in the latest device frames."
            />
            <FeatureCard
              icon={<Download size={32} />}
              title="One-Click Download"
              description="Instantly download images in all required sizes for App Store and Google Play."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
