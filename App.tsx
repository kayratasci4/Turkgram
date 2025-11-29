import React, { useState, useEffect } from 'react';
import { Home, Search, PlusSquare, Film, User as UserIcon, Heart, Send } from 'lucide-react';
import Stories from './components/Stories';
import PostItem from './components/PostItem';
import UploadModal from './components/UploadModal';
import { CURRENT_USER, INITIAL_POSTS } from './constants';
import { Post, ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isUploadModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isUploadModalOpen]);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="pb-16 max-w-md mx-auto min-h-screen bg-white md:border-x md:border-gray-200">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
              <h1 className="font-logo text-2xl mt-1 select-none cursor-pointer">Turkagram</h1>
              <div className="flex items-center gap-5">
                <div className="relative cursor-pointer">
                  <Heart size={24} className="text-black" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                </div>
                <div className="relative cursor-pointer">
                  <Send size={24} className="text-black" />
                  <div className="absolute -top-1 -right-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full border border-white">
                    2
                  </div>
                </div>
              </div>
            </header>

            <Stories />
            
            <main>
              {posts.map(post => (
                <PostItem key={post.id} post={post} />
              ))}
            </main>
          </div>
        );
      case 'search':
        return (
            <div className="pb-16 max-w-md mx-auto min-h-screen bg-white md:border-x md:border-gray-200">
                <div className="p-4">
                    <div className="relative">
                        <input type="text" placeholder="Ara" className="w-full bg-gray-100 rounded-lg py-2 px-4 pl-10 focus:outline-none" />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-0.5">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-200 relative group cursor-pointer">
                            <img src={`https://picsum.photos/seed/${i + 20}/300/300`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'profile':
        return (
          <div className="pb-16 max-w-md mx-auto min-h-screen bg-white md:border-x md:border-gray-200">
             <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4">
                 <h2 className="font-bold text-lg flex items-center gap-1">
                     {CURRENT_USER.username}
                     <svg className="w-3 h-3 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                     </svg>
                 </h2>
                 <div className="flex gap-4">
                     <PlusSquare size={24} />
                     <div className="w-6 h-6 border-2 border-black rounded-md flex flex-col justify-center items-center gap-[2px]">
                         <div className="w-3 h-[2px] bg-black"></div>
                         <div className="w-3 h-[2px] bg-black"></div>
                         <div className="w-3 h-[2px] bg-black"></div>
                     </div>
                 </div>
             </header>

             <div className="px-4 py-6">
                 <div className="flex items-center justify-between mb-6">
                     <div className="relative">
                        <img src={CURRENT_USER.avatarUrl} className="w-20 h-20 rounded-full border border-gray-200 p-0.5" />
                        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                        </div>
                     </div>
                     <div className="flex flex-1 justify-around text-center ml-4">
                         <div>
                             <div className="font-bold text-lg">12</div>
                             <div className="text-sm text-gray-500">Gönderi</div>
                         </div>
                         <div>
                             <div className="font-bold text-lg">458</div>
                             <div className="text-sm text-gray-500">Takipçi</div>
                         </div>
                         <div>
                             <div className="font-bold text-lg">321</div>
                             <div className="text-sm text-gray-500">Takip</div>
                         </div>
                     </div>
                 </div>
                 
                 <div className="mb-4">
                     <div className="font-bold">{CURRENT_USER.fullName}</div>
                     <div className="text-sm">Dijital İçerik Üreticisi</div>
                     <div className="text-sm">📍 İstanbul</div>
                     <div className="text-sm text-blue-900">youtu.be/kanalim</div>
                 </div>

                 <div className="flex gap-2 mb-6">
                     <button className="flex-1 bg-gray-100 py-1.5 rounded-lg text-sm font-semibold">Profili Düzenle</button>
                     <button className="flex-1 bg-gray-100 py-1.5 rounded-lg text-sm font-semibold">Profili Paylaş</button>
                 </div>
             </div>

             <div className="border-t border-gray-200">
                 <div className="flex">
                     <button className="flex-1 flex justify-center py-3 border-b-2 border-black">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                     </button>
                     <button className="flex-1 flex justify-center py-3 text-gray-400">
                         <Film size={24} />
                     </button>
                     <button className="flex-1 flex justify-center py-3 text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                     </button>
                 </div>
                 <div className="grid grid-cols-3 gap-0.5">
                     {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-100">
                            <img src={`https://picsum.photos/seed/${i + 100}/300/300`} className="w-full h-full object-cover" />
                        </div>
                     ))}
                 </div>
             </div>
          </div>
        );
      default:
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Çok Yakında</h2>
                    <p className="text-gray-500">Bu özellik henüz yapım aşamasında.</p>
                </div>
            </div>
        )
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderContent()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-40 bg-white border-t border-gray-200 h-12 pb-safe">
        <div className="max-w-md mx-auto h-full flex justify-around items-center px-2">
          <button onClick={() => setView('home')} className="p-2 transition-transform active:scale-90">
            {view === 'home' ? <Home size={26} fill="black" /> : <Home size={26} />}
          </button>
          
          <button onClick={() => setView('search')} className="p-2 transition-transform active:scale-90">
            <Search size={26} strokeWidth={view === 'search' ? 3 : 2} />
          </button>

          <button onClick={() => setIsUploadModalOpen(true)} className="p-2 transition-transform active:scale-90">
            <PlusSquare size={26} />
          </button>

          <button onClick={() => setView('reels')} className="p-2 transition-transform active:scale-90">
            <Film size={26} strokeWidth={view === 'reels' ? 3 : 2} />
          </button>

          <button onClick={() => setView('profile')} className="p-2 transition-transform active:scale-90">
            <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${view === 'profile' ? 'border-black' : 'border-transparent'}`}>
              <img src={CURRENT_USER.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </nav>

      {/* Upload Modal */}
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        currentUser={CURRENT_USER}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default App;