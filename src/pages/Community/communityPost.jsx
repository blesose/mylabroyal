import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Heart, 
  MessageCircle, 
  BarChart3, 
  Send, 
  Sparkles,
  Users,
  Globe,
  TrendingUp,
  Zap,
  MoreVertical,
  Bookmark,
  Share2,
  Eye,
  Filter,
  X,
  ChevronUp,
  Lightbulb,
  PartyPopper, Laugh
} from 'lucide-react';
import { apiService } from '../../services/api';

export default function CommunityPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [insight, setInsight] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [posting, setPosting] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState(null);
  const [reactionAnimations, setReactionAnimations] = useState({});

  const filters = [
    { id: 'all', label: 'All Posts', icon: Globe, color: 'from-blue-500 to-cyan-500' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { id: 'following', label: 'Following', icon: Users, color: 'from-green-500 to-emerald-500' },
    { id: 'popular', label: 'Most Liked', icon: Heart, color: 'from-red-500 to-orange-500' },
  ];

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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    setPosting(true);
    try {
      await apiService.createPost({ content: newPost });
      setNewPost('');
      
      // Animate new post creation
      setTimeout(() => {
        fetchPosts();
      }, 500);
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (id) => {
    try {
      // Trigger animation
      setReactionAnimations(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setReactionAnimations(prev => ({ ...prev, [id]: false }));
      }, 1000);

      const response = await apiService.likeCommunityPost(id);
      setInsight(response.data?.reactionTip);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

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

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts; // Add your filtering logic here

  return (
    <div className="bg-[#F4F1E9]/80 backdrop-blur-sm rounded-3xl min-h-screen p-3 sm:p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-52 h-52 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center sm:text-left sm:flex-row justify-between mb-6 md:mb-8"
        >
          <div className="mb-4 sm:mb-0">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#B1D182] via-[#688F48] to-[#B1D182] bg-clip-text text-transparent mb-2"
            >
              Community Pulse
            </motion.h1>
            <p className="text-charcoal-grey text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Connect, share, and grow together
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] font-semibold hover:shadow-xl hover:shadow-[#688F48]/30 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Join Community</span>
            <span className="xs:hidden">Join</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#2B463C]/70 flex flex-wrap gap-1 sm:gap-2 mb-4 md:mb-6 justify-center"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-2 transition-all duration-300 text-xs sm:text-sm ${
                  activeFilter === filter.id
                    ? `bg-gradient-to-r ${filter.color} text-charcoal-grey shadow-lg`
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{filter.label}</span>
                <span className="xs:hidden">{filter.id === 'all' ? 'All' : 
                  filter.id === 'trending' ? 'Trend' : 
                  filter.id === 'following' ? 'Follow' : 
                  'Popular'}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Create Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F4F1E9] backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-4 sm:p-6 mb-6 md:mb-8 border border-white/10 shadow-2xl"
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#688F48] to-[#B1D182] flex items-center justify-center flex-shrink-0"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A1A2F]" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-charcoal-grey font-semibold text-base sm:text-lg mb-2">Share your journey</h3>
              <form onSubmit={handleCreatePost}>
                <textarea
                  className="w-full bg-[#B1D182] backdrop-blur-sm border border-white/20 rounded-2xl p-3 sm:p-4 text-white placeholder-charcoal-grey focus:outline-none focus:ring-2 focus:ring-[#B1D182] transition-all resize-none text-sm sm:text-base"
                  rows="3"
                  placeholder="What's on your mind? Share your self-care wins, struggles, or insights..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
                  <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                    {['😊', '🌟', '💪', '🧠', '🌱'].map((emoji) => (
                      <motion.button
                        key={emoji}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-2xl sm:text-3xl hover:bg-white/10 p-1 sm:p-2 rounded-lg transition-colors flex-shrink-0"
                        onClick={() => setNewPost(prev => prev + emoji)}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={posting || !newPost.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center ${
                      posting || !newPost.trim()
                        ? 'bg-charcoal-grey cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] hover:shadow-xl hover:shadow-[#688F48]/30'
                    } transition-all`}
                  >
                    {posting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span className="hidden sm:inline">Posting...</span>
                        <span className="sm:hidden">Posting</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Share with Community</span>
                        <span className="sm:hidden">Share</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Posts Section */}
        <div className="bg-[#F4F1E9] space-y-4 sm:space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#B1D182]/30 border-t-[#B1D182] rounded-full animate-spin"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-[#688F48] rounded-full animate-spin animation-delay-500"></div>
              </div>
              <p className="text-gray-300 animate-pulse text-sm sm:text-base">Loading community stories...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:shadow-3xl transition-all"
                >
                  {/* Post Header */}
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-[#688F48] to-[#B1D182] rounded-full flex items-center justify-center">
                            <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-[#0A1A2F]" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm sm:text-lg truncate">Community Member</h3>
                          <p className="text-xs sm:text-sm text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <button className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">
                        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-lg leading-relaxed">{post.content}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4">
                      <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(post._id)}
                          className="flex items-center gap-1 sm:gap-2 group flex-shrink-0"
                        >
                          <div className="relative">
                            <Heart className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                              post.likes?.length > 0 
                                ? 'fill-red-500 text-red-500' 
                                : 'text-gray-400 group-hover:text-red-500'
                            }`} />
                            {reactionAnimations[post._id] && (
                              <motion.div
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                className="absolute inset-0 bg-red-500/20 rounded-full"
                              />
                            )}
                          </div>
                          <span className="font-medium text-sm sm:text-base">{post.likes?.length || 0}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedPost(selectedPost === post._id ? null : post._id)}
                          className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-blue-400 transition-colors flex-shrink-0"
                        >
                          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="font-medium text-sm sm:text-base">{post.comments?.length || 0}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setExpandedInsights(expandedInsights === post._id ? null : post._id)}
                          className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-[#B1D182] transition-colors flex-shrink-0"
                        >
                          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="font-medium text-sm sm:text-base hidden xs:inline">Insights</span>
                          <span className="font-medium text-sm sm:text-base xs:hidden">Stats</span>
                        </motion.button>
                      </div>

                      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                        <button className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="p-1 sm:p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {selectedPost === post._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 p-4 sm:p-6"
                      >
                        <h4 className="font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          Comments
                        </h4>
                        <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-60 overflow-y-auto pr-2">
                          {post.comments?.map((comment, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-white/5 rounded-2xl p-3 sm:p-4"
                            >
                              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0"></div>
                                <span className="font-medium text-sm sm:text-base truncate">Commenter</span>
                              </div>
                              <p className="text-white/80 text-sm sm:text-base">{comment.text}</p>
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Share your thoughts..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B1D182] text-sm sm:text-base"
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleComment(post._id)}
                            className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] font-semibold hover:shadow-lg flex-shrink-0"
                          >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Insights Panel */}
                  <AnimatePresence>
                    {expandedInsights === post._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 bg-gradient-to-r from-[#688F48]/10 to-[#B1D182]/10 p-4 sm:p-6"
                      >
                        <h4 className="font-bold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                          <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
                          Community Insights
                        </h4>
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-[#B1D182]">92%</div>
                            <div className="text-xs sm:text-sm text-gray-300">Positive Vibes</div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-[#B1D182]">45</div>
                            <div className="text-xs sm:text-sm text-gray-300">Active Discussions</div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-[#B1D182]">8.7</div>
                            <div className="text-xs sm:text-sm text-gray-300">Engagement Score</div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center">
                            <div className="text-xl sm:text-2xl font-bold text-[#B1D182]">24</div>
                            <div className="text-xs sm:text-sm text-gray-300">Supportive Replies</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-20 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-[#688F48]/20 to-[#B1D182]/20 flex items-center justify-center">
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-[#B1D182]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Be the first to share!</h3>
              <p className="text-charcoal-grey mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
                This community is waiting for your story. Share your journey and inspire others.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-charcoal-grey text-white font-semibold hover:shadow-xl text-sm sm:text-base"
              >
                Create First Post
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Insight Tip */}
      <AnimatePresence>
        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-xs sm:max-w-sm"
          >
            <div className="backdrop-blur-lg bg-gradient-to-r from-[#688F48] to-[#B1D182] rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/20">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/20 rounded-xl flex-shrink-0">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A1A2F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#0A1A2F] text-sm sm:text-base">Community Insight</h4>
                  <p className="text-[#0A1A2F]/90 mt-1 text-xs sm:text-sm">{insight}</p>
                </div>
                <button
                  onClick={() => setInsight('')}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A1A2F]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 backdrop-blur-lg bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-2 sm:p-3 shadow-2xl transition-all"
      >
        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </div>
  );
}