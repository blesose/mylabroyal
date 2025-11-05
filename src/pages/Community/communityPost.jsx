import React, { useEffect, useState } from 'react';
import { Loader2, Heart, MessageCircle, BarChart3, Send } from 'lucide-react';
import { apiService } from '../../services/api';

export default function CommunityPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [insight, setInsight] = useState('');

  // 🧩 Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getCommunityPosts();
      setPosts(response.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✍️ Create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      await apiService.createPost({ content: newPost });
      setNewPost('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // ❤️ Like post
  const handleLike = async (id) => {
    try {
      const response = await apiService.likeCommunityPost(id);
      setInsight(response.data?.reactionTip);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // 💬 Comment on post
  const handleComment = async (id) => {
    if (!commentText.trim()) return;
    try {
      const response = await apiService.commentCommunityPost(id, { text: commentText });
      setInsight(response.data?.reactionTip);
      setCommentText('');
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // 📊 Fetch on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-6 text-[#F4F1E9] bg-[#0B132B] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-[#B1D182]">Community Posts</h1>

      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className="bg-[#2B463C] p-4 rounded-2xl mb-6">
        <textarea
          className="w-full bg-transparent border border-[#688F48] rounded-xl p-3 text-[#F4F1E9] focus:outline-none"
          rows="3"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-[#B1D182] text-[#0B132B] px-4 py-2 rounded-xl hover:bg-[#A4C973] transition-all"
        >
          Post
        </button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin text-[#B1D182]" size={32} />
        </div>
      ) : (
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-[#2B463C] p-5 rounded-2xl shadow-md">
                <p className="text-lg mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-[#B1D182]">
                  <button onClick={() => handleLike(post._id)} className="flex items-center gap-1">
                    <Heart size={18} />
                    <span>{post.likes?.length || 0}</span>
                  </button>
                  <button onClick={() => setSelectedPost(post._id)} className="flex items-center gap-1">
                    <MessageCircle size={18} />
                    <span>{post.comments?.length || 0}</span>
                  </button>
                  <button onClick={() => alert("Coming soon")} className="flex items-center gap-1">
                    <BarChart3 size={18} />
                    <span>Insights</span>
                  </button>
                </div>

                {/* Comment section */}
                {selectedPost === post._id && (
                  <div className="mt-4 border-t border-[#688F48] pt-3">
                    {post.comments?.map((c, i) => (
                      <div key={i} className="mb-2 text-sm text-gray-300">
                        💬 {c.text}
                      </div>
                    ))}
                    <div className="flex mt-3 items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-grow bg-transparent border border-[#688F48] rounded-xl px-3 py-1 focus:outline-none text-[#F4F1E9]"
                      />
                      <button
                        onClick={() => handleComment(post._id)}
                        className="bg-[#B1D182] text-[#0B132B] px-3 py-1 rounded-xl hover:bg-[#A4C973]"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No posts yet. Be the first to share something!</p>
          )}
        </div>
      )}

      {/* Insight Tip */}
      {insight && (
        <div className="fixed bottom-6 right-6 bg-[#688F48] text-[#F4F1E9] px-4 py-3 rounded-xl shadow-lg animate-bounce">
          💡 {insight}
        </div>
      )}
    </div>
  );
}
