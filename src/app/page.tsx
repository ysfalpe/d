'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Wand2, Layout, Download, Smartphone, Upload, Sparkles, Image, Star, Users, Clock, Shield, Check, Zap, Crown, Play, Timer, TrendingUp, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "./page.module.css";
import { motion } from "framer-motion";
import { createCheckoutAction } from "@/app/actions/createCheckout";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleProSubscribe = async () => {
    if (!isSignedIn) {
      // Kullanıcı giriş yapmamışsa sign-in sayfasına yönlendir
      window.location.href = '/sign-in?redirect_url=' + encodeURIComponent('/#pricing');
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutAction();
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          {/* Gradient Glow Orbs */}
          <div className={styles.glowOrbs}>
            <div className={styles.orbLeft}></div>
            <div className={styles.orbRight}></div>
            <div className={styles.orbCenter}></div>
          </div>

          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Urgency Badge */}
              <div className={styles.urgencyBadge}>
                <Zap size={14} />
                <span>Gift: <strong>3 FREE Credits</strong> on sign up</span>
              </div>

              {/* Pain Point → Solution */}
              <p className={styles.painPoint}>
                Tired of spending <span className={styles.strikethrough}>hours in Figma</span>?
              </p>

              <h1 className={styles.title}>
                Create App Store Screenshots
                <br />
                <span className={styles.gradientText}>In 30 Seconds</span>
              </h1>

              <p className={styles.description}>
                Upload your screenshot → AI writes perfect marketing copy → 
                Download store-ready images. <strong>That's it.</strong>
              </p>

              {/* Value Props - Quick scan */}
              <div className={styles.valueProps}>
                <div className={styles.valueProp}>
                  <Check size={16} />
                  <span>No design skills needed</span>
                </div>
                <div className={styles.valueProp}>
                  <Check size={16} />
                  <span>Works in any language</span>
                </div>
                <div className={styles.valueProp}>
                  <Check size={16} />
                  <span>Export all sizes instantly</span>
                </div>
              </div>

              <div className={styles.ctaGroup}>
                <Link href="/editor">
                  <Button size="lg" rightIcon={<ArrowRight size={20} />}>
                    Start Free Trial
                  </Button>
                </Link>
                <a href="#how-it-works" className={styles.watchDemo}>
                  <Play size={18} fill="currentColor" />
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Trust Signals */}
              <div className={styles.trustSignals}>
                <div className={styles.trustItem}>
                  <Shield size={14} />
                  <span>Cancel anytime</span>
                </div>
                <div className={styles.trustDot}></div>
                <div className={styles.trustItem}>
                  <span>7-day money back</span>
                </div>
              </div>

              {/* Social Proof Bar */}
              <div className={styles.socialProof}>
                <div className={styles.proofStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                  <span>4.9</span>
                </div>
                <span className={styles.proofDesc}>Trusted by <strong>indie developers worldwide</strong></span>
              </div>
            </motion.div>
          </div>

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

        {/* Pricing Section */}
        <section className={styles.pricing} id="pricing">
          <div className={styles.sectionHeader}>
            <h2>Simple, Transparent Pricing</h2>
            <p>Start creating stunning screenshots today</p>
          </div>

          <div className={styles.pricingGrid}>
            {/* Free Plan */}
            <motion.div 
              className={styles.pricingCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className={styles.planHeader}>
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

              <ul className={styles.planFeatures}>
                <li>
                  <Check size={18} className={styles.checkIcon} />
                  <span>View examples & templates</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIcon} />
                  <span>Upload screenshots</span>
                </li>
                <li>
                  <Check size={18} className={styles.checkIcon} />
                  <span><strong>3 Free</strong> AI generations</span>
                </li>
                <li className={styles.featureDisabled}>
                  <span className={styles.xIcon}>×</span>
                  <span>Export high-res images</span>
                </li>
              </ul>

              <Link href="/editor" className={styles.planBtnSecondary}>
                Try Editor
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              className={`${styles.pricingCard} ${styles.proCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.popularBadge}>🔥 3 Days FREE Trial</div>
              
              <div className={styles.planHeader}>
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

              <ul className={styles.planFeatures}>
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
              </ul>

              <button 
                onClick={handleProSubscribe} 
                className={styles.planBtnPrimary}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className={styles.spinning} />
                    Processing...
                  </>
                ) : (
                  <>
                    Start 3-Day Free Trial
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className={styles.guarantee}>✓ Cancel anytime • 7-day money-back guarantee</p>
            </motion.div>
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
