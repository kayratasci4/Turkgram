import React, { useState, useRef } from 'react';
import { X, ArrowLeft, Wand2, Sparkles } from 'lucide-react';
import { generateCaptionForImage } from '../services/geminiService';
import { Post, User } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onPostCreated: (post: Post) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, currentUser, onPostCreated }) => {
  const [step, setStep] = useState<'select' | 'edit'>('select');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep('edit');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;
    setIsGenerating(true);
    // Remove data:image/jpeg;base64, prefix for API
    const base64Data = selectedImage.split(',')[1];
    const generated = await generateCaptionForImage(base64Data);
    setCaption(generated);
    setIsGenerating(false);
  };

  const handleShare = () => {
    if (!selectedImage) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      user: currentUser,
      imageUrl: selectedImage,
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: 'Şimdi',
      location: 'Türkiye',
      isLiked: false,
      isSaved: false,
    };

    onPostCreated(newPost);
    
    // Reset
    setSelectedImage(null);
    setCaption('');
    setStep('select');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="h-12 border-b flex items-center justify-between px-4">
          {step === 'edit' ? (
            <button onClick={() => setStep('select')}><ArrowLeft size={24} /></button>
          ) : (
            <button onClick={onClose}><X size={24} /></button>
          )}
          
          <span className="font-semibold text-base">Yeni Gönderi</span>
          
          {step === 'edit' ? (
            <button onClick={handleShare} className="text-blue-500 font-semibold text-sm">Paylaş</button>
          ) : (
            <div className="w-6"></div> 
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col">
          {step === 'select' ? (
            <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
              <div className="mb-4">
                <svg className="mx-auto w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Fotoğraflarını buraya sürükle</h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#0095f6] text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition"
              >
                Bilgisayardan Seç
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="w-full aspect-square bg-black flex items-center justify-center">
                <img src={selectedImage!} alt="Preview" className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="p-4 bg-white flex-1 border-t">
                <div className="flex gap-3">
                  <img src={currentUser.avatarUrl} className="w-8 h-8 rounded-full" />
                  <div className="flex-1 relative">
                    <textarea 
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Açıklama yaz..."
                      className="w-full h-24 resize-none outline-none text-sm placeholder-gray-400"
                    />
                    
                    {/* Gemini AI Button */}
                    <div className="absolute bottom-2 right-2">
                      <button 
                        onClick={handleGenerateCaption}
                        disabled={isGenerating}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isGenerating 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 hover:from-purple-200 hover:to-blue-200 border border-purple-200'
                        }`}
                      >
                         {isGenerating ? (
                           <>
                            <Sparkles size={12} className="animate-spin" />
                            <span>Yazılıyor...</span>
                           </>
                         ) : (
                           <>
                            <Wand2 size={12} />
                            <span>Sihirli Başlık Yaz</span>
                           </>
                         )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
                   <div className="flex justify-between py-2 items-center cursor-pointer hover:bg-gray-50">
                     <span>Konum Ekle</span>
                     <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                   </div>
                   <div className="flex justify-between py-2 items-center cursor-pointer hover:bg-gray-50">
                     <span>Kişileri Etiketle</span>
                     <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;