'use client';


import Link from "next/link";
import { ArrowRight, Wand2, Layout, Download, Smartphone, Upload, Sparkles, Image, Star, Users, Clock, Shield } from "lucide-react";
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
              <span className={styles.badge}>🎉 3 Days FREE Trial</span>
              <h1 className={styles.title}>
                App Store Screenshots <br />
                <span className={styles.gradientText}>10x Faster</span>
              </h1>
              <p className={styles.description}>
                Stop wasting hours in Figma. Upload your screenshot, let AI generate 
                marketing captions, and export store-ready images in 30 seconds.
              </p>

              <div className={styles.ctaGroup}>
                <Link href="/editor">
                  <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                    Start Free Trial
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg">
                    See How It Works
                  </Button>
                </a>
              </div>
              <p className={styles.trialNote}>
                ✓ 3 days free • No credit card required • $19.99/mo after trial
              </p>

              {/* Social Proof Bar */}
              <div className={styles.socialProof}>
                <div className={styles.proofItem}>
                  <Users size={16} />
                  <span><strong>500+</strong> developers</span>
                </div>
                <div className={styles.proofDivider}></div>
                <div className={styles.proofItem}>
                  <Star size={16} fill="currentColor" />
                  <span><strong>4.9</strong> rating</span>
                </div>
                <div className={styles.proofDivider}></div>
                <div className={styles.proofItem}>
                  <Clock size={16} />
                  <span><strong>30s</strong> avg. time</span>
                </div>
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
            <h2>Why Shotsy?</h2>
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

        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <h2>Loved by App Developers</h2>
            <p>See what creators are saying about Shotsy</p>
          </div>

          <div className={styles.testimonialGrid}>
            <TestimonialCard
              quote="Cut my screenshot creation time from 2 hours to 10 minutes. This is a game changer for indie developers."
              author="Alex Chen"
              role="iOS Developer"
              rating={5}
            />
            <TestimonialCard
              quote="The AI captions are surprisingly good. It understands what my app does and writes compelling copy."
              author="Sarah Miller"
              role="Startup Founder"
              rating={5}
            />
            <TestimonialCard
              quote="Finally, a tool that doesn't require Figma skills. Upload, generate, download. That's it."
              author="Marcus Johnson"
              role="Android Developer"
              rating={5}
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorks} id="how-it-works">
          <div className={styles.sectionHeader}>
            <h2>How It Works</h2>
            <p>Create stunning app screenshots in 3 simple steps</p>
          </div>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>
                <Upload size={32} />
              </div>
              <h3>Upload Screenshots</h3>
              <p>Drag and drop your app screenshots. We support all sizes and formats.</p>
            </div>

            <div className={styles.stepConnector}>
              <ArrowRight size={24} />
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>
                <Sparkles size={32} />
              </div>
              <h3>Add App Details</h3>
              <p>Tell us your app name and what it does. AI will generate perfect marketing captions.</p>
            </div>

            <div className={styles.stepConnector}>
              <ArrowRight size={24} />
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>
                <Image size={32} />
              </div>
              <h3>Download & Publish</h3>
              <p>Export your polished screenshots and upload directly to App Store or Google Play.</p>
            </div>
          </div>

          <div className={styles.ctaCenter}>
            <Link href="/editor">
              <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                Start Creating
              </Button>
            </Link>
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

function TestimonialCard({ quote, author, role, rating }: { quote: string, author: string, role: string, rating: number }) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.stars}>
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
        ))}
      </div>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.author}>
        <div className={styles.avatar}>{author.charAt(0)}</div>
        <div>
          <strong>{author}</strong>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}
