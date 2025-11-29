'use client';

import React, { useState, useEffect } from 'react';
import { X, Crown, AlertTriangle, ExternalLink, Loader2, Zap } from 'lucide-react';
import styles from './SubscriptionModal.module.css';
import { Button } from '../ui/Button';
import { 
  getSubscriptionInfo, 
  SubscriptionInfo 
} from '@/app/actions/subscription';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscriptionChange?: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ 
  isOpen, 
  onClose,
}) => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSubscription();
    }
  }, [isOpen]);

  const loadSubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await getSubscriptionInfo();
      setSubscription(info);
    } catch (e) {
      setError('Failed to load subscription info');
    } finally {
      setLoading(false);
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
          <div className={styles.iconWrapper}>
            <Crown size={24} />
          </div>
          <h2>Subscription</h2>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 size={24} className={styles.spinner} />
            <p>Loading subscription info...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <AlertTriangle size={24} />
            <p>{error}</p>
            <Button variant="outline" onClick={loadSubscription}>
              Try Again
            </Button>
          </div>
        ) : subscription?.isPro ? (
          // Pro Member View
          <div className={styles.content}>
            <div className={styles.statusCard}>
              <div className={styles.statusBadge}>
                <Crown size={16} />
                <span>Pro Member</span>
              </div>
              <p className={styles.statusDesc}>
                You have unlimited AI generations and all premium features.
              </p>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <span className={styles.infoValue}>
                <span className={styles.activeDot}></span>
                Active
              </span>
            </div>

            <div className={styles.actions}>
              <a 
                href="mailto:ifytech77@gmail.com?subject=Cancel%20AppShot%20Pro%20Subscription"
                className={styles.manageBtn}
              >
                <ExternalLink size={16} />
                Contact to Cancel
              </a>
              <p className={styles.manageHint}>
                Send us an email at ifytech77@gmail.com to cancel your subscription
              </p>
            </div>
          </div>
        ) : (
          // Free User View
          <div className={styles.content}>
            <div className={styles.statusCard + ' ' + styles.freeCard}>
              <div className={styles.statusBadge + ' ' + styles.freeBadge}>
                <Zap size={16} />
                <span>Free Plan</span>
              </div>
              <p className={styles.statusDesc}>
                You have <strong>{subscription?.credits || 0} credits</strong> remaining.
              </p>
            </div>

            <div className={styles.upgradePrompt}>
              <h3>Upgrade to Pro</h3>
              <ul className={styles.benefitsList}>
                <li>✓ Unlimited AI generations</li>
                <li>✓ Premium device frames</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

