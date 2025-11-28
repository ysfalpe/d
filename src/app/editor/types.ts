export interface CaptionData {
  text: string;
  highlight: string;
  icon: string; // Lucide icon name
  color: string; // Hex color for highlight
}

export interface Screenshot {
  id: string;
  file: File;
  caption: CaptionData; // Updated from string to object
  background: string; 
  isGenerating: boolean;
}
