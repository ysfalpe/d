import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>Shotsy</h3>
                        <p>Create stunning App Store and Google Play screenshots in minutes.</p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Product</h4>
                            <a href="/#features">Features</a>
                            <a href="/pricing">Pricing</a>
                            <a href="/blog">Blog</a>
                        </div>
                        <div className={styles.column}>
                            <h4>Resources</h4>
                            <a href="mailto:ifytech77@gmail.com">Contact</a>
                        </div>
                        <div className={styles.column}>
                            <h4>Legal</h4>
                            <a href="/privacy">Privacy</a>
                            <a href="/terms">Terms</a>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Shotsy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
