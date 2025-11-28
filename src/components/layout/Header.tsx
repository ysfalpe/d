'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Sparkles, Crown } from 'lucide-react';
import { UpgradeModal } from '../modals/UpgradeModal';
import { SubscriptionModal } from '../modals/SubscriptionModal';
import { 
    SignInButton, 
    SignedIn, 
    SignedOut, 
    UserButton 
} from '@clerk/nextjs';
import { getUserSubscription } from '@/app/actions/user';

export const Header = () => {
    const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const [credits, setCredits] = useState(0);

    const checkStatus = async () => {
        try {
            const user = await getUserSubscription();
            if (user) {
                setIsPro(user.isPro);
                setCredits(user.credits);
            }
        } catch (e) {
            console.error("Failed to fetch user status", e);
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Sparkles size={18} />
                        </div>
                        <span className={styles.logoText}>AppShot</span>
                        <span className={styles.badge}>AI</span>
                    </Link>

                    <div className={styles.center}>
                        {isPro ? (
                            <button 
                                className={styles.proBadge}
                                onClick={() => setIsSubscriptionOpen(true)}
                                title="Manage subscription"
                            >
                                <Crown size={14} fill="gold" color="gold" />
                                PRO MEMBER
                            </button>
                        ) : (
                            <span className={styles.status}>
                                <span className={styles.statusDot}></span>
                                {credits > 0 ? `${credits} credits` : 'Ready to generate'}
                            </span>
                        )}
                    </div>

                    <nav className={styles.nav}>
                        <Link href="/examples" className={styles.link}>
                            Examples
                        </Link>
                        <Link href="/pricing" className={styles.link}>
                            Pricing
                        </Link>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            {!isPro && (
                                <button 
                                    className={styles.upgradeBtn}
                                    onClick={() => setIsUpgradeOpen(true)}
                                >
                                    Upgrade
                                </button>
                            )}
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </nav>
                </div>
            </header>

            <UpgradeModal 
                isOpen={isUpgradeOpen} 
                onClose={() => setIsUpgradeOpen(false)} 
            />

            <SubscriptionModal 
                isOpen={isSubscriptionOpen} 
                onClose={() => setIsSubscriptionOpen(false)}
                onSubscriptionChange={checkStatus}
            />
        </>
    );
};
