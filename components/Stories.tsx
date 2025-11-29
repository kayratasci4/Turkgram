import React from 'react';
import { MOCK_STORIES, CURRENT_USER } from '../constants';
import { Plus } from 'lucide-react';

const Stories: React.FC = () => {
  return (
    <div className="border-b border-gray-200 bg-white py-4 overflow-x-auto no-scrollbar">
      <div className="flex gap-4 px-4 min-w-max">
        {/* Current User Story Add */}
        <div className="flex flex-col items-center gap-1 cursor-pointer relative">
          <div className="relative w-16 h-16">
            <img 
              src={CURRENT_USER.avatarUrl} 
              alt="Hikayen" 
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-white">
              <Plus size={14} className="text-white" />
            </div>
          </div>
          <span className="text-xs text-gray-500 truncate w-16 text-center">Hikayen</span>
        </div>

        {/* Other Stories */}
        {MOCK_STORIES.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer">
            <div className={`p-[2px] rounded-full ${story.isSeen ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600'}`}>
              <div className="bg-white p-[2px] rounded-full">
                <img 
                  src={story.user.avatarUrl} 
                  alt={story.user.username} 
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-black truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;