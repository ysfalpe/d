import React from 'react';
import styles from './EditorSidebar.module.css';
import { Button } from '../ui/Button';
import { Wand2, Download, Sparkles, FileText, Globe, Palette, Zap, Crown } from 'lucide-react';

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
    onUpgradeClick: () => void;
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
    onUpgradeClick
}) => {
    return (
        <aside className={styles.sidebar}>
            {/* Section: App Info */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <FileText size={14} />
                    <span>App Details</span>
                </div>
                
                <div className={styles.field}>
                    <label>Name</label>
                    <input 
                        type="text" 
                        placeholder="My App"
                        className={styles.input}
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label>Description</label>
                    <textarea 
                        placeholder="Describe what your app does..."
                        className={styles.textarea}
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Section: Style */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <Palette size={14} />
                    <span>Style</span>
                </div>
                
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label>Tone</label>
                        <select 
                            className={styles.select}
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                        >
                            <option value="Professional & Trustworthy">Professional</option>
                            <option value="Exciting & Energetic">Exciting</option>
                            <option value="Friendly & Casual">Friendly</option>
                            <option value="Minimalist & Clean">Minimal</option>
                            <option value="Luxurious & Elegant">Luxury</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Language</label>
                        <select 
                            className={styles.select}
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="English">English</option>
                            <option value="Turkish">Türkçe</option>
                            <option value="Spanish">Español</option>
                            <option value="German">Deutsch</option>
                            <option value="French">Français</option>
                            <option value="Japanese">日本語</option>
                            <option value="Portuguese">Português</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className={styles.spacer} />

            {/* Credits Display */}
            <div className={styles.creditsSection}>
                {isPro ? (
                    <div className={styles.proBadge}>
                        <Crown size={14} />
                        <span>Pro - Unlimited</span>
                    </div>
                ) : (
                    <div className={styles.creditsInfo}>
                        <div className={styles.creditsCount}>
                            <Zap size={14} />
                            <span>{credits} credits left</span>
                        </div>
                        <button 
                            className={styles.upgradeLink}
                            onClick={onUpgradeClick}
                        >
                            Get more
                        </button>
                    </div>
                )}
            </div>

            {/* Generate Button */}
            <div className={styles.generateSection}>
                <button 
                    className={styles.generateBtn}
                    onClick={onGenerateAI}
                    disabled={isGenerating || (!isPro && credits <= 0)}
                >
                    {isGenerating ? (
                        <>
                            <span className={styles.spinner}></span>
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            Generate Assets
                        </>
                    )}
                </button>
                <p className={styles.hint}>
                    {isPro ? 'Unlimited generations' : `Uses 1 credit per image`}
                </p>
            </div>

            {/* Export */}
            <div className={styles.exportSection}>
                <button 
                    className={styles.exportBtn}
                    onClick={onExportAll}
                    disabled={isExporting}
                >
                    <Download size={16} />
                    {isExporting ? 'Exporting...' : 'Export All'}
                </button>
            </div>
        </aside>
    );
};
