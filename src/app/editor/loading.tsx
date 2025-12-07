import styles from './loading.module.css';

export default function EditorLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.skeletonSection}>
          <div className={styles.skeletonHeader} />
          <div className={styles.skeletonInput} />
          <div className={styles.skeletonTextarea} />
        </div>
        <div className={styles.skeletonSection}>
          <div className={styles.skeletonHeader} />
          <div className={styles.skeletonRow}>
            <div className={styles.skeletonSelect} />
            <div className={styles.skeletonSelect} />
          </div>
        </div>
        <div className={styles.spacer} />
        <div className={styles.skeletonButton} />
        <div className={styles.skeletonButtonSmall} />
      </div>
      
      <div className={styles.canvas}>
        <div className={styles.uploadPlaceholder}>
          <div className={styles.uploadIcon} />
          <div className={styles.uploadText} />
          <div className={styles.uploadSubtext} />
        </div>
      </div>
    </div>
  );
}

