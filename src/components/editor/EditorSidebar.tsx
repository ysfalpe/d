'use client';

import React, { useState, useRef } from 'react';
import styles from './EditorSidebar.module.css';
import { Sparkles, Download, Zap, Crown, ImagePlus, X, Plus } from 'lucide-react';

interface EditorSidebarProps {
    onGenerateAI: () => void;
    isGenerating: boolean;
    appName: string;
    setAppName: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    tone: string;
    setTone: (val: string) => void;
    language: string;
    setLanguage: (val: string) => void;
    onExportAll: () => void;
    isExporting: boolean;
    credits: number;
    isPro: boolean;
    isLoadingCredits: boolean;
    onUpgradeClick: () => void;
    screenshotCount: number;
    backgroundColor: string;
    setBackgroundColor: (val: string) => void;
    onAddCover: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    onGenerateAI,
    isGenerating,
    appName,
    setAppName,
    description,
    setDescription,
    tone,
    setTone,
    language,
    setLanguage,
    onExportAll,
    isExporting,
    credits,
    isPro,
    isLoadingCredits,
    onUpgradeClick,
    screenshotCount,
    backgroundColor,
    setBackgroundColor,
    onAddCover
}) => {
    const [appIcon, setAppIcon] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => setAppIcon(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => setAppIcon(event.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const removeIcon = () => {
        setAppIcon(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const canGenerate = screenshotCount > 0 && !isGenerating;

    return (
        <aside className={styles.sidebar}>
            {/* ══════════════════════════════════════════════════════════
                ZONE 1: PRIMARY ACTION
                Neden üstte: Kullanıcının en sık kullandığı action
                Görsel olarak dominant - dikkat çekici
            ══════════════════════════════════════════════════════════ */}
            <div className={styles.primaryZone}>
                <button
                    className={styles.generateBtn}
                    onClick={onGenerateAI}
                    disabled={!canGenerate}
                >
                    {isGenerating ? (
                        <>
                            <span className={styles.spinner} />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate with AI
                        </>
                    )}
                </button>
                
                {/* Credit Badge - Kompakt */}
                <div className={styles.creditBadge}>
                    {isLoadingCredits ? (
                        <span className={styles.loading}>•••</span>
                    ) : isPro ? (
                        <span className={styles.proBadge}>
                            <Crown size={12} /> Unlimited
                        </span>
                    ) : (
                        <span className={styles.creditCount}>
                            <Zap size={12} /> {credits} credits
                        </span>
                    )}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                ZONE 2: APP CONTEXT
                App kimliği - AI'ın doğru caption üretmesi için önemli
            ══════════════════════════════════════════════════════════ */}
            <div className={styles.contextSection}>
                {/* Header Row: Icon + Name */}
                <div className={styles.identityRow}>
                    {/* App Icon */}
                    <div
                        className={`${styles.iconArea} ${isDragging ? styles.dragging : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleIconChange}
                            className={styles.hiddenInput}
                            id="app-icon-input"
                        />
                        
                        {appIcon ? (
                            <div className={styles.iconPreview}>
                                <img src={appIcon} alt="App icon" />
                                <button className={styles.removeBtn} onClick={removeIcon}>
                                    <X size={10} />
                                </button>
                            </div>
                        ) : (
                            <label htmlFor="app-icon-input" className={styles.iconPlaceholder}>
                                <ImagePlus size={16} />
                            </label>
                        )}
                    </div>

                    {/* App Name */}
                    <input
                        type="text"
                        placeholder="App name"
                        className={styles.appNameInput}
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                    />
                </div>

                {/* Description - Full width textarea */}
                <textarea
                    placeholder="Describe your app in detail. What does it do? Who is it for? What makes it special? The more context you give, the better the AI-generated captions will be..."
                    className={styles.descTextarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />
            </div>

            {/* ══════════════════════════════════════════════════════════
                ZONE 3: SETTINGS
                Tone, Language ve Background
            ══════════════════════════════════════════════════════════ */}
            <div className={styles.settingsRow}>
                <div className={styles.selectWrapper}>
                    <label>Vibe</label>
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className={styles.select}
                    >
                        <option value="Professional & Trustworthy">💼 Professional</option>
                        <option value="Exciting & Energetic">🔥 Exciting</option>
                        <option value="Friendly & Casual">😊 Friendly</option>
                        <option value="Minimalist & Clean">✨ Minimal</option>
                        <option value="Luxurious & Elegant">👑 Luxury</option>
                    </select>
                </div>

                <div className={styles.selectWrapper}>
                    <label>Lang</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={styles.select}
                    >
                        <option value="English">🇺🇸 EN</option>
                        <option value="Turkish">🇹🇷 TR</option>
                        <option value="Spanish">🇪🇸 ES</option>
                        <option value="German">🇩🇪 DE</option>
                        <option value="French">🇫🇷 FR</option>
                        <option value="Japanese">🇯🇵 JP</option>
                        <option value="Portuguese">🇧🇷 PT</option>
                    </select>
                </div>
            </div>

            {/* Background Color Picker */}
            <div className={styles.colorSection}>
                <label className={styles.colorLabel}>Background Color</label>
                <div className={styles.colorPickerRow}>
                    <input
                        type="color"
                        value={backgroundColor.startsWith('#') ? backgroundColor : '#667eea'}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className={styles.colorPicker}
                    />
                    <span className={styles.colorValue}>{backgroundColor}</span>
                </div>
            </div>

            {/* Add Cover Page */}
            <button className={styles.addCoverBtn} onClick={onAddCover}>
                <Plus size={14} />
                Add Cover Page
            </button>

            {/* Spacer - Footer'ı alta iter */}
            <div className={styles.spacer} />

            {/* ══════════════════════════════════════════════════════════
                ZONE 4: FOOTER
                Neden altta: Secondary actions
                Kullanıcı alışkanlıklarına uygun
            ══════════════════════════════════════════════════════════ */}
            <div className={styles.footer}>
                <button
                    className={styles.exportBtn}
                    onClick={onExportAll}
                    disabled={isExporting || screenshotCount === 0}
                >
                    <Download size={16} />
                    {isExporting ? 'Exporting...' : 'Export All'}
                </button>

                {!isPro && !isLoadingCredits && (
                    <button className={styles.upgradeBtn} onClick={onUpgradeClick}>
                        <Crown size={14} />
                        Upgrade to Pro
                    </button>
                )}
            </div>
        </aside>
    );
};
