import React, { useState } from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(post.isSaved);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <article className="bg-white border-b border-gray-100 mb-2 pb-3">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className={`p-[1.5px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600`}>
            <div className="bg-white p-[1.5px] rounded-full">
              <img src={post.user.avatarUrl} alt={post.user.username} className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col -gap-0.5 leading-none">
            <span className="font-semibold text-sm flex items-center gap-1">
              {post.user.username}
              {post.user.isVerified && (
                <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </span>
            {post.location && <span className="text-xs text-gray-500">{post.location}</span>}
          </div>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden" onDoubleClick={handleLike}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="p-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className={`transition-transform active:scale-90 ${isLiked ? 'text-red-500' : 'text-black'}`}>
              <Heart size={26} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-black transition-transform active:scale-90">
              <MessageCircle size={26} className="-rotate-90" />
            </button>
            <button className="text-black transition-transform active:scale-90">
              <Send size={26} />
            </button>
          </div>
          <button onClick={() => setIsSaved(!isSaved)} className={`transition-transform active:scale-90 ${isSaved ? 'text-black' : 'text-black'}`}>
            <Bookmark size={26} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
        
        <div className="font-semibold text-sm mb-1">{likesCount.toLocaleString('tr-TR')} beğenme</div>
        
        <div className="text-sm mb-1">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span dangerouslySetInnerHTML={{ __html: post.caption.replace(/(#\w+)/g, '<span class="text-blue-900">$1</span>') }}></span>
        </div>

        {post.comments.length > 0 && (
          <div className="text-gray-500 text-sm cursor-pointer mb-1">
            {post.comments.length} yorumun tümünü gör
          </div>
        )}

        {post.comments.slice(0, 1).map(comment => (
            <div key={comment.id} className="text-sm">
                <span className="font-semibold mr-2">{comment.username}</span>
                <span>{comment.text}</span>
            </div>
        ))}
        
        <div className="text-gray-400 text-[10px] uppercase mt-1 tracking-wide">
          {post.timestamp}
        </div>
      </div>
    </article>
  );
};

export default PostItem;