export interface CaptionData {
  text: string;
  highlight: string;
  icon: string; // Lucide icon name
  color: string; // Hex color for highlight
}

export interface Screenshot {
  id: string;
  type: 'screenshot' | 'cover';
  file?: File;
  imageDataUrl?: string; // Base64 data URL for reliable export
  caption: CaptionData; // Updated from string to object
  background: string;
  layout: 'text-top' | 'text-bottom' | 'phone-only';
  font: string;
  isGenerating: boolean;
}
