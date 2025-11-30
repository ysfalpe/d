import React, { useState } from 'react';
import { X, Check, Zap, Loader2 } from 'lucide-react';
import styles from './UpgradeModal.module.css';
import { Button } from '../ui/Button';
import { createCheckoutAction } from '@/app/actions/createCheckout';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            await createCheckoutAction();
            // If we reach here without redirect, something went wrong
        } catch (error) {
            // NEXT_REDIRECT errors are expected - they mean redirect is working
            // Check if it's a redirect error by looking at the digest
            const isRedirect = error instanceof Error && 
                'digest' in error && 
                typeof (error as any).digest === 'string' &&
                (error as any).digest.startsWith('NEXT_REDIRECT');
            
            if (!isRedirect) {
                console.error("Checkout error:", error);
                alert("Failed to start checkout. Please try again.");
                setLoading(false);
            }
            // If it's a redirect, don't reset loading - page will navigate
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>

                <div className={styles.header}>
                    <div className={styles.trialBadge}>🎉 3 DAYS FREE</div>
                    <div className={styles.iconWrapper}>
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <h2>Upgrade to Pro</h2>
                    <p>Unlock unlimited generations and premium styles.</p>
                </div>

                <div className={styles.plan}>
                    <div className={styles.planHeader}>
                        <span className={styles.planName}>Pro Pass</span>
                        <div className={styles.price}>
                            <span className={styles.currency}>$</span>
                            <span className={styles.amount}>19</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                    </div>

                    <ul className={styles.features}>
                        <li>
                            <Check size={16} className={styles.check} />
                            <span>Unlimited AI Generations</span>
                        </li>
                        <li>
                            <Check size={16} className={styles.check} />
                            <span>Premium Device Frames</span>
                        </li>
                        <li>
                            <Check size={16} className={styles.check} />
                            <span>Remove Watermark</span>
                        </li>
                        <li>
                            <Check size={16} className={styles.check} />
                            <span>Priority Support</span>
                        </li>
                    </ul>

                    <Button 
                        fullWidth 
                        size="lg" 
                        onClick={handleUpgrade}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className={styles.spinner} />
                                Redirecting...
                            </>
                        ) : 'Start 3-Day Free Trial'}
                    </Button>
                    
                    <p className={styles.guarantee}>✓ No charge for 3 days • Cancel anytime</p>
                </div>
            </div>
        </div>
    );
};
