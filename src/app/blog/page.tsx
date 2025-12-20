'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import styles from './blog.module.css';
import { motion } from 'framer-motion';

// Blog yazıları - SEO optimized, real content
const posts = [
  {
    slug: 'create-app-store-screenshots-without-figma',
    title: 'How to Create App Store Screenshots Without Figma (5 Faster Alternatives)',
    description: 'Figma has a learning curve most developers don\'t have time for. Here are 5 tools that create professional screenshots in minutes, not hours.',
    date: '2025-01-20',
    author: 'Alex Thompson',
    category: 'Tools',
    tags: ['figma alternative', 'screenshot maker', 'app store screenshots', 'no design skills'],
    image: '/blog/figma-alternatives.jpg',
    readingTime: '10 min read',
  },
  {
    slug: 'app-store-screenshot-sizes-2025-complete-guide',
    title: 'App Store Screenshot Sizes in 2025: The Complete Developer Guide',
    description: 'Stop wasting hours on wrong dimensions. Here are the exact screenshot sizes Apple and Google require, plus pro tips that took me 3 years to learn.',
    date: '2025-01-18',
    author: 'Marcus Chen',
    category: 'Guide',
    tags: ['app store screenshots', 'screenshot sizes', 'ios', 'android'],
    image: '/blog/screenshot-sizes.jpg',
    readingTime: '12 min read',
  },
  {
    slug: 'why-your-app-screenshots-are-killing-downloads',
    title: 'Why Your App Screenshots Are Killing Your Downloads (And How to Fix It)',
    description: 'I analyzed 500+ top apps in the App Store. Here\'s what separates apps with 50% conversion rates from those stuck at 2%.',
    date: '2025-01-14',
    author: 'Sarah Mitchell',
    category: 'Conversion',
    tags: ['app store optimization', 'conversion rate', 'aso tips'],
    image: '/blog/conversion-fix.jpg',
    readingTime: '9 min read',
  },
  {
    slug: 'indie-developer-aso-guide-zero-budget',
    title: 'ASO for Indie Developers: How I Got 10K Downloads with $0 Marketing Budget',
    description: 'No paid ads. No influencer deals. Just smart App Store Optimization. Here\'s my exact playbook from launching 4 successful indie apps.',
    date: '2025-01-10',
    author: 'Jake Williams',
    category: 'ASO',
    tags: ['indie developer', 'aso', 'organic growth', 'app marketing'],
    image: '/blog/indie-aso.jpg',
    readingTime: '15 min read',
  },
  {
    slug: 'screenshot-copywriting-that-converts',
    title: 'Screenshot Copywriting: 7 Headlines That Made Apps Go Viral',
    description: 'The difference between "Calendar App" and "Never Miss Mom\'s Birthday Again" is millions of downloads. Learn the psychology behind high-converting copy.',
    date: '2025-01-06',
    author: 'Emma Rodriguez',
    category: 'Copywriting',
    tags: ['copywriting', 'app store', 'marketing psychology'],
    image: '/blog/copywriting.jpg',
    readingTime: '8 min read',
  },
  {
    slug: 'google-play-vs-app-store-screenshots',
    title: 'Google Play vs App Store Screenshots: What Works on Each Platform',
    description: 'Android and iOS users behave differently. After A/B testing 200+ screenshot variations, here\'s what actually converts on each store.',
    date: '2025-01-02',
    author: 'Marcus Chen',
    category: 'Strategy',
    tags: ['google play', 'app store', 'a/b testing', 'screenshots'],
    image: '/blog/platform-comparison.jpg',
    readingTime: '11 min read',
  },
  {
    slug: 'app-store-rejection-design-reasons',
    title: 'App Store Review Guidelines: 5 Design Reasons Your App Might Get Rejected',
    description: 'Apple rejects 40% of apps submitted. Don\'t let your screenshots be the reason. Here are the most common design guidelines developers violate.',
    date: '2025-01-22',
    author: 'Alex Thompson',
    category: 'Guide',
    tags: ['app store review', 'rejection', 'design guidelines', 'ios'],
    image: '/blog/rejection.jpg',
    readingTime: '8 min read',
  },
  {
    slug: 'psychology-of-color-app-screenshots',
    title: 'The Psychology of Color in App Icons and Screenshots',
    description: 'Why do finance apps use blue? Why are food apps red or orange? Learn how color influences user trust and conversion rates.',
    date: '2025-01-25',
    author: 'Sarah Mitchell',
    category: 'Design',
    tags: ['color psychology', 'design', 'conversion', 'marketing'],
    image: '/blog/color-psychology.jpg',
    readingTime: '10 min read',
  },
  {
    slug: 'localize-app-store-screenshots-growth',
    title: 'How to Localize Your App Store Screenshots for 2x Downloads',
    description: 'Translating your app is only half the battle. Learn why localized screenshots are the secret weapon for global growth.',
    date: '2025-01-28',
    author: 'Jake Williams',
    category: 'Growth',
    tags: ['localization', 'growth', 'global markets', 'translation'],
    image: '/blog/localization.jpg',
    readingTime: '9 min read',
  },
  {
    slug: 'app-store-preview-video-vs-screenshots',
    title: 'App Store Preview Video vs Screenshots: Which Converts Better in 2025?',
    description: 'Should you invest time in making an app preview video, or are screenshots enough? Data from 100+ apps reveals the surprising answer.',
    date: '2025-01-30',
    author: 'Emma Rodriguez',
    category: 'Conversion',
    tags: ['app preview video', 'screenshots', 'conversion rate', 'app store'],
    image: '/blog/video-vs-screenshots.jpg',
    readingTime: '11 min read',
  },
  {
    slug: 'complete-aso-checklist-2025',
    title: 'The Complete ASO Checklist for 2025: 47 Steps to More Downloads',
    description: 'Everything you need to optimize your App Store listing, from keywords to screenshots to reviews. Bookmark this comprehensive checklist.',
    date: '2025-02-01',
    author: 'Marcus Chen',
    category: 'ASO',
    tags: ['aso checklist', 'app store optimization', 'app marketing', 'downloads'],
    image: '/blog/aso-checklist.jpg',
    readingTime: '18 min read',
  },
  {
    slug: 'app-store-description-copywriting',
    title: 'How to Write an App Store Description That Converts (With Templates)',
    description: 'Most developers write boring descriptions. Use these proven copywriting templates to turn browsers into downloaders.',
    date: '2025-02-03',
    author: 'Sarah Mitchell',
    category: 'Copywriting',
    tags: ['app description', 'copywriting', 'conversion', 'app store'],
    image: '/blog/description-copywriting.jpg',
    readingTime: '12 min read',
  },
  {
    slug: 'ipad-app-screenshots-complete-guide',
    title: 'How to Create iPad App Screenshots That Convert in 2025',
    description: 'iPad users behave differently than iPhone users. Learn the exact dimensions, design principles, and strategies that work for tablet apps.',
    date: '2025-02-06',
    author: 'Alex Thompson',
    category: 'Guide',
    tags: ['ipad screenshots', 'tablet apps', 'app store', 'design'],
    image: '/blog/ipad-screenshots.jpg',
    readingTime: '11 min read',
  },
  {
    slug: 'first-7-days-after-app-launch-aso',
    title: 'The First 7 Days After Launch: Critical ASO Strategy for New Apps',
    description: 'Your launch window is crucial. Here is the day-by-day playbook I use to maximize visibility and downloads in the first week.',
    date: '2025-02-08',
    author: 'Jake Williams',
    category: 'ASO',
    tags: ['app launch', 'aso strategy', 'new apps', 'marketing'],
    image: '/blog/launch-week.jpg',
    readingTime: '14 min read',
  },
  {
    slug: 'dark-mode-screenshots-convert-better',
    title: 'Dark Mode Screenshots: Why They Convert Better (With Data)',
    description: '52% of users prefer dark mode. Here is how to create dark screenshots that stand out and increase your conversion rate.',
    date: '2025-02-10',
    author: 'Emma Rodriguez',
    category: 'Design',
    tags: ['dark mode', 'design', 'conversion', 'screenshots'],
    image: '/blog/dark-mode.jpg',
    readingTime: '9 min read',
  },
  {
    slug: 'app-store-ab-testing-guide',
    title: 'App Store A/B Testing: How to Run Experiments That Actually Work',
    description: 'Most developers waste months on bad A/B tests. Learn the statistical framework and practical tips for tests that drive real growth.',
    date: '2025-02-12',
    author: 'Marcus Chen',
    category: 'Strategy',
    tags: ['a/b testing', 'optimization', 'google play', 'conversion'],
    image: '/blog/ab-testing.jpg',
    readingTime: '13 min read',
  },
  {
    slug: 'update-screenshots-without-losing-rankings',
    title: 'How to Update Your App Screenshots Without Tanking Your Rankings',
    description: 'Changing screenshots can hurt your conversion rate if done wrong. Here is the safe, data-driven approach to screenshot updates.',
    date: '2025-02-14',
    author: 'Sarah Mitchell',
    category: 'Strategy',
    tags: ['screenshot updates', 'aso', 'rankings', 'optimization'],
    image: '/blog/update-screenshots.jpg',
    readingTime: '10 min read',
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.heroContent}
          >
            <div className={styles.badge}>
              <BookOpen size={16} />
              <span>Shotsy Blog</span>
            </div>
            <h1 className={styles.title}>
              Tips, Tutorials & Insights
            </h1>
            <p className={styles.description}>
              Learn how to create stunning app screenshots, optimize your store presence, 
              and grow your app downloads.
            </p>
          </motion.div>
        </section>

        {/* Blog Posts Grid */}
        <section className={styles.postsSection}>
          <div className={styles.postsGrid}>
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                className={styles.postCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <div className={styles.postImage}>
                    <div className={styles.postImagePlaceholder}>
                      <BookOpen size={40} />
                    </div>
                    <span className={styles.category}>{post.category}</span>
                  </div>
                  
                  <div className={styles.postContent}>
                    <div className={styles.postMeta}>
                      <span className={styles.metaItem}>
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </span>
                      <span className={styles.metaItem}>
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                    
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postDescription}>{post.description}</p>
                    
                    <div className={styles.readMore}>
                      <span>Read Article</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Ready to Create Better Screenshots?</h2>
            <p>Try Shotsy free and see the difference AI-powered screenshots can make.</p>
            <Link href="/editor" className={styles.ctaButton}>
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

