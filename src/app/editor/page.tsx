'use client';

import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Header } from '@/components/layout/Header';
import { EditorSidebar } from '@/components/editor/EditorSidebar';
import { PreviewCanvas } from '@/components/editor/PreviewCanvas';
import { UpgradeModal } from '@/components/modals/UpgradeModal';
import styles from './page.module.css';
import { Screenshot, CaptionData } from './types';
import { generateCaptionAction, AIResponse } from '../actions/generateCaption';
import { checkCredits } from '../actions/user';

const GRADIENTS_BY_VIBE: Record<string, string[]> = {
    'Professional & Trustworthy': [
        'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
        'linear-gradient(135deg, #0e7490 0%, #22d3ee 100%)',
    ],
    'Exciting & Energetic': [
        'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
        'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
        'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    ],
    'Friendly & Casual': [
        'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
        'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
    ],
    'Minimalist & Clean': [
        'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
        'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
        'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
    ],
    'Luxurious & Elegant': [
        'linear-gradient(135deg, #000000 0%, #434343 100%)',
        'linear-gradient(135deg, #4a044e 0%, #701a75 100%)',
        'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    ],
};

export default function EditorPage() {
    const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
    const [isGlobalGenerating, setIsGlobalGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
    const [appName, setAppName] = useState('');
    const [description, setDescription] = useState('');
    const [tone, setTone] = useState('Professional & Trustworthy');
    const [language, setLanguage] = useState('English');

    // Credit state
    const [credits, setCredits] = useState<number | null>(null); // null = loading
    const [isPro, setIsPro] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [creditsLoading, setCreditsLoading] = useState(true);

    // İlk yüklemede credit durumunu kontrol et
    const refreshCredits = async () => {
        try {
            setCreditsLoading(true);
            const result = await checkCredits();
            setCredits(result.credits);
            setIsPro(result.isPro);
        } catch (e) {
            console.error('Failed to load credits:', e);
            setCredits(0);
        } finally {
            setCreditsLoading(false);
        }
    };

    useEffect(() => {
        refreshCredits();
    }, []);

    const handleUpload = (files: File[]) => {
        const newScreenshots: Screenshot[] = files.map(file => ({
            id: Math.random().toString(36).substring(7),
            file,
            caption: {
                text: '',
                highlight: '',
                icon: 'sparkles',
                color: '#ffffff'
            }, 
            background: 'linear-gradient(160deg, #4f46e5 0%, #9333ea 100%)',
            isGenerating: false
        }));
        setScreenshots(prev => [...prev, ...newScreenshots]);
    };

    const compressImage = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const scaleSize = MAX_WIDTH / img.width;
                
                if (scaleSize < 1) {
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context error'));
                    return;
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedBase64);
            };
            img.onerror = (err) => reject(err);
        });
    };

    const handleGenerateAI = async () => {
        if (screenshots.length === 0) return;

        // Kredi kontrolü (Pro değilse ve yeterli kredi yoksa)
        if (!isPro && credits < screenshots.length) {
            setShowUpgradeModal(true);
            return;
        }

        setIsGlobalGenerating(true);

        const gradients = GRADIENTS_BY_VIBE[tone] || GRADIENTS_BY_VIBE['Professional & Trustworthy'];
        const optimisticScreenshots = screenshots.map(shot => ({
            ...shot,
            isGenerating: true,
            background: gradients[Math.floor(Math.random() * gradients.length)]
        }));
        setScreenshots(optimisticScreenshots);

        let lastCredits = credits;

        const promises = optimisticScreenshots.map(async (shot) => {
            try {
                const base64 = await compressImage(shot.file);
                
                const aiData: AIResponse = await generateCaptionAction(base64, {
                    appName,
                    description,
                    tone,
                    language
                });

                // Kalan kredileri güncelle
                if (aiData.creditsRemaining !== undefined && aiData.creditsRemaining >= 0) {
                    lastCredits = aiData.creditsRemaining;
                }
                
                return { 
                    ...shot, 
                    caption: {
                        text: aiData.headline,
                        highlight: aiData.highlight,
                        icon: aiData.icon,
                        color: aiData.color
                    },
                    isGenerating: false
                };
            } catch (error) {
                console.error(`Error generating for ${shot.id}:`, error);
                
                // Kredi hatası kontrolü
                if (error instanceof Error && error.message.includes('credits')) {
                    setShowUpgradeModal(true);
                }

                return { 
                    ...shot, 
                    caption: { text: "Failed", highlight: "", icon: "alert-triangle", color: "#fff" }, 
                    isGenerating: false 
                };
            }
        });

        const results = await Promise.all(promises);

        setScreenshots(results);
        // Kredileri sunucudan yeniden al (doğru değeri görmek için)
        await refreshCredits();
        setIsGlobalGenerating(false);
    };

    // Update only text for manual editing (complex editing would require more UI)
    const handleCaptionChange = (id: string, newText: string) => {
        setScreenshots(prev => prev.map(shot => 
            shot.id === id ? { ...shot, caption: { ...shot.caption, text: newText } } : shot
        ));
    };

    const handleExportAll = async () => {
        if (screenshots.length === 0) return;
        setIsExporting(true);

        try {
            for (const shot of screenshots) {
                const element = document.getElementById(`screenshot-card-${shot.id}`);
                if (element) {
                    const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
                    const link = document.createElement('a');
                    link.download = `appshot-${shot.id}.png`;
                    link.href = dataUrl;
                    link.click();
                }
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const handleShuffleBackground = (id: string) => {
        const gradients = GRADIENTS_BY_VIBE[tone] || GRADIENTS_BY_VIBE['Professional & Trustworthy'];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        
        setScreenshots(prev => prev.map(shot => 
            shot.id === id ? { ...shot, background: randomGradient } : shot
        ));
    };

    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <EditorSidebar
                    onGenerateAI={handleGenerateAI}
                    isGenerating={isGlobalGenerating}
                    appName={appName}
                    setAppName={setAppName}
                    description={description}
                    setDescription={setDescription}
                    tone={tone}
                    setTone={setTone}
                    language={language}
                    setLanguage={setLanguage}
                    onExportAll={handleExportAll}
                    isExporting={isExporting}
                    credits={credits ?? 0}
                    isPro={isPro}
                    isLoadingCredits={creditsLoading}
                    onUpgradeClick={() => setShowUpgradeModal(true)}
                />
                <PreviewCanvas
                    screenshots={screenshots}
                    onUpload={handleUpload}
                    onCaptionChange={handleCaptionChange}
                    onShuffleBackground={handleShuffleBackground}
                />
            </main>

            <UpgradeModal 
                isOpen={showUpgradeModal} 
                onClose={() => setShowUpgradeModal(false)} 
            />
        </div>
    );
}
