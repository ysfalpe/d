import React, { useState } from 'react';
import styles from './PreviewCanvas.module.css';
import { ImageUploader } from './ImageUploader';
import { Screenshot } from '@/app/editor/types';
import { RefreshCw, Trash2, Pencil, Check } from 'lucide-react';
import * as Icons from 'lucide-react';

interface PreviewCanvasProps {
    screenshots: Screenshot[];
    onUpload: (files: File[]) => void;
    onCaptionChange: (id: string, caption: string) => void;
    onShuffleBackground: (id: string) => void;
    onDelete: (id: string) => void;
    appIcon?: File | null;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
    screenshots,
    onUpload,
    onCaptionChange,
    onShuffleBackground,
    onDelete,
    appIcon
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    // Helper to render dynamic icon safely
    const renderIcon = (iconName: string, color: string) => {
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

    const startEditing = (id: string, currentText: string) => {
        setEditingId(id);
        setEditText(currentText);
    };

    const saveEdit = (id: string) => {
        onCaptionChange(id, editText);
        setEditingId(null);
        setEditText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit(id);
        } else if (e.key === 'Escape') {
            setEditingId(null);
            setEditText('');
        }
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
                                style={{
                                    background: shot.background,
                                    flexDirection: 'column',
                                    justifyContent: shot.type === 'cover' ? 'center' : 'flex-start',
                                    paddingTop: shot.type === 'cover' ? '0' : '2.5rem'
                                }}
                            >
                                {shot.type === 'cover' ? (
                                    // COVER SLIDE LAYOUT
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        textAlign: 'center',
                                        padding: '2rem'
                                    }}>
                                        <div style={{ transform: 'scale(1.5)', marginBottom: '2rem' }}>
                                            {appIcon ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={URL.createObjectURL(appIcon)}
                                                    alt="App Icon"
                                                    style={{
                                                        width: '64px',
                                                        height: '64px',
                                                        borderRadius: '16px',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                                                    }}
                                                />
                                            ) : (
                                                renderIcon(shot.caption.icon, shot.caption.color)
                                            )}
                                        </div>
                                        <h1 style={{
                                            fontSize: '2.5rem',
                                            fontWeight: '800',
                                            color: '#fff',
                                            marginBottom: '1rem',
                                            lineHeight: '1.1',
                                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                                        }}>
                                            {shot.caption.text}
                                        </h1>
                                        <h2 style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '500',
                                            color: 'rgba(255,255,255,0.9)',
                                            maxWidth: '80%'
                                        }}>
                                            {shot.caption.highlight}
                                        </h2>
                                    </div>
                                ) : (
                                    // SCREENSHOT SLIDE LAYOUT
                                    <>
                                        <div className={styles.captionEditor}>
                                            <div className={styles.dynamicIcon}>
                                                {renderIcon(shot.caption.icon, shot.caption.color)}
                                            </div>

                                            {editingId === shot.id ? (
                                                <div className={styles.editWrapper}>
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        onKeyDown={(e) => handleKeyDown(e, shot.id)}
                                                        className={styles.editInput}
                                                        autoFocus
                                                    />
                                                    <button 
                                                        className={styles.saveEditBtn}
                                                        onClick={() => saveEdit(shot.id)}
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <h2 
                                                    className={styles.styledHeadline}
                                                    onClick={() => startEditing(shot.id, shot.caption.text)}
                                                    title="Click to edit"
                                                >
                                                    {renderStyledCaption(shot.caption.text, shot.caption.highlight, shot.caption.color)}
                                                </h2>
                                            )}
                                        </div>

                                        <div className={styles.phoneWrapper}>
                                            <div className={styles.phoneFrame}>
                                                <div className={styles.screenContent}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    {shot.imageDataUrl && (
                                                        <img
                                                            src={shot.imageDataUrl}
                                                            alt="Screenshot"
                                                            className={styles.screenshot}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Generating Overlay */}
                                {shot.isGenerating && (
                                    <div className={styles.generatingOverlay}>
                                        <div className={styles.generatingSpinner} />
                                        <span>Generating...</span>
                                    </div>
                                )}
                            </div>

                            {/* Controls below the card */}
                            <div className={styles.cardControls}>
                                <button
                                    className={styles.controlBtn}
                                    onClick={() => onShuffleBackground(shot.id)}
                                    title="Shuffle background"
                                >
                                    <RefreshCw size={14} />
                                </button>
                                
                                {editingId !== shot.id && (
                                    <button
                                        className={styles.controlBtn}
                                        onClick={() => startEditing(shot.id, shot.caption.text)}
                                        title="Edit caption"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                )}
                                
                                <button
                                    className={`${styles.controlBtn} ${styles.deleteBtn}`}
                                    onClick={() => onDelete(shot.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
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
