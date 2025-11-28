import React from 'react';
import styles from './PreviewCanvas.module.css';
import { ImageUploader } from './ImageUploader';
import { Screenshot } from '@/app/editor/types';
import { RefreshCw, LucideProps } from 'lucide-react';
import * as Icons from 'lucide-react';

interface PreviewCanvasProps {
    screenshots: Screenshot[];
    onUpload: (files: File[]) => void;
    onCaptionChange: (id: string, caption: string) => void;
    onShuffleBackground: (id: string) => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ 
    screenshots, 
    onUpload, 
    onCaptionChange,
    onShuffleBackground 
}) => {

    // Helper to render dynamic icon safely
    const renderIcon = (iconName: string, color: string) => {
        // Capitalize first letter just in case (e.g. "sparkles" -> "Sparkles")
        // But usually lucide exports PascalCase components. 
        // Let's try to find a match.
        
        // Convert kebab-case to PascalCase (e.g. alert-circle -> AlertCircle)
        const pascalName = iconName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('');

        const IconComponent = (Icons as any)[pascalName] || (Icons as any)[iconName] || Icons.Sparkles;

        return <IconComponent size={32} color={color} style={{ marginBottom: '0.5rem', filter: `drop-shadow(0 0 8px ${color})` }} />;
    };

    // Helper to render highlighted text
    const renderStyledCaption = (text: string, highlight: string, color: string) => {
        if (!highlight) return text;

        // Case insensitive replace
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        
        return (
            <>
                {parts.map((part, i) => 
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} style={{ color: color, textShadow: `0 0 20px ${color}40` }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div className={styles.canvasContainer}>
            {screenshots.length === 0 ? (
                <div className={styles.emptyState}>
                    <ImageUploader onUpload={onUpload} />
                </div>
            ) : (
                <div className={styles.previewGrid}>
                    {screenshots.map((shot) => (
                        <div key={shot.id} className={styles.previewWrapper}>
                            {/* The Card to be Exported */}
                            <div 
                                id={`screenshot-card-${shot.id}`}
                                className={styles.previewItem}
                                style={{ background: shot.background }} 
                            >
                                <div className={styles.captionEditor}>
                                    <div className={styles.dynamicIcon}>
                                        {renderIcon(shot.caption.icon, shot.caption.color)}
                                    </div>
                                    
                                    {/* Editable input is hidden but overlayed, or we use a contentEditable div. 
                                        For simplicity, we show the styled text, and if clicked, turn into input.
                                        But let's stick to a simpler approach: 
                                        Show the STYLED text as preview. If user wants to edit, they edit the raw text below.
                                    */}
                                    
                                    <h2 className={styles.styledHeadline}>
                                        {renderStyledCaption(shot.caption.text, shot.caption.highlight, shot.caption.color)}
                                    </h2>

                                    {/* Hidden textarea for editing (can be toggled in future) */}
                                    {/* <textarea
                                        value={shot.caption.text}
                                        onChange={(e) => onCaptionChange(shot.id, e.target.value)}
                                        className={styles.captionInput}
                                        rows={3}
                                    /> */}
                                </div>
                                
                                <div className={styles.phoneWrapper}>
                                    <div className={styles.phoneFrame}>
                                        <div className={styles.notch}></div>
                                        <div className={styles.screenContent}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={URL.createObjectURL(shot.file)}
                                                alt="Screenshot"
                                                className={styles.screenshot}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls below the card */}
                            <div className={styles.cardControls}>
                                <button 
                                    className={styles.controlBtn}
                                    onClick={() => onShuffleBackground(shot.id)}
                                    title="Shuffle Background Color"
                                >
                                    <RefreshCw size={16} />
                                    Shuffle Color
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className={styles.addMoreCard}>
                        <ImageUploader onUpload={onUpload} />
                    </div>
                </div>
            )}
        </div>
    );
};
