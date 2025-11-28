'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './error.module.css';

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Editor Error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <AlertTriangle size={40} />
        </div>
        
        <h2 className={styles.title}>Editor Error</h2>
        
        <p className={styles.message}>
          {error.message || 'Something went wrong in the editor. Your work may not be saved.'}
        </p>

        <div className={styles.actions}>
          <button onClick={reset} className={styles.primaryBtn}>
            <RefreshCw size={16} />
            Reload Editor
          </button>
          
          <Link href="/" className={styles.secondaryBtn}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

