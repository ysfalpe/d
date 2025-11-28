'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <AlertTriangle size={48} color="#ef4444" />
        </div>
        
        <h1 style={styles.title}>Something went wrong</h1>
        
        <p style={styles.message}>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        {error.digest && (
          <p style={styles.digest}>Error ID: {error.digest}</p>
        )}

        <div style={styles.actions}>
          <button onClick={reset} style={styles.primaryBtn}>
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link href="/" style={styles.secondaryBtn}>
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#030303',
    padding: '2rem',
  },
  card: {
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: '16px',
    padding: '3rem',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center' as const,
  },
  iconWrapper: {
    width: '80px',
    height: '80px',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#ededed',
    marginBottom: '0.75rem',
  },
  message: {
    fontSize: '0.95rem',
    color: '#888',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  digest: {
    fontSize: '0.75rem',
    color: '#555',
    fontFamily: 'monospace',
    marginBottom: '1.5rem',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'transparent',
    color: '#888',
    border: '1px solid #333',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

