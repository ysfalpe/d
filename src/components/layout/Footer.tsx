import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>AppShot AI</h3>
                        <p>Create stunning App Store and Google Play screenshots in minutes.</p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Product</h4>
                            <a href="/#features">Features</a>
                            <a href="/editor">Editor</a>
                        </div>
                        <div className={styles.column}>
                            <h4>Resources</h4>
                            <a href="mailto:support@appshot.ai">Contact</a>
                            <a href="https://github.com/ysfalpe/d" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                        <div className={styles.column}>
                            <h4>Legal</h4>
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} AppShot AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
