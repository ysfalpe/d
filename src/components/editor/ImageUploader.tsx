import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImagePlus } from 'lucide-react';
import styles from './ImageUploader.module.css';
import { clsx } from 'clsx';

interface ImageUploaderProps {
    onUpload: (files: File[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onUpload(acceptedFiles);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        multiple: true
    });

    return (
        <div
            {...getRootProps()}
            className={clsx(styles.uploader, isDragActive && styles.active)}
        >
            <input {...getInputProps()} />
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    {isDragActive ? <Upload size={24} /> : <ImagePlus size={24} />}
                </div>
                <div className={styles.text}>
                    <p className={styles.title}>
                        {isDragActive ? 'Drop to upload' : 'Upload Screenshots'}
                    </p>
                    <p className={styles.subtitle}>
                        Drag & drop or click to browse
                    </p>
                </div>
                <div className={styles.formats}>
                    PNG, JPG, WebP
                </div>
            </div>
        </div>
    );
};
