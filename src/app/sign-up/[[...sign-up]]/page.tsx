'use client';

import { SignUp } from '@clerk/nextjs';
import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <SignUp 
        appearance={{
          elements: {
            rootBox: styles.signUpBox,
            card: styles.card,
          }
        }}
        afterSignUpUrl="/editor"
        redirectUrl="/editor"
      />
    </div>
  );
}

