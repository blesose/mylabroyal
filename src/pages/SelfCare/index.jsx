import React, { useEffect, useState } from "react";
import SelfForm from "../../components/forms/selfcareForm";
import Education from "./Education";
import { toast } from "react-toastify";
import { apiService } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Moon, 
  Sun,
  Leaf,
  Edit2,
  Trash2,
  BookOpen,
  Plus,
  CheckCircle,
  Zap
} from "lucide-react";

const SelfCare = () => {
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: "all", label: "All", icon: Sparkles, color: "text-purple-400" },
    { id: "mental", label: "Mental", icon: Brain, color: "text-blue-400" },
    { id: "physical", label: "Physical", icon: Zap, color: "text-green-400" },
    { id: "emotional", label: "Emotional", icon: Heart, color: "text-pink-400" },
    { id: "spiritual", label: "Spiritual", icon: Leaf, color: "text-emerald-400" },
    { id: "rest", label: "Rest", icon: Moon, color: "text-indigo-400" },
  ];

  // Filter activities based on selected category
  const filteredActivities = selectedCategory === "all" 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  // Load activities from backend
  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.fetchAllSelfCareActivities();
      setActivities(data);
    } catch (error) {
      toast.error("Failed to fetch self-care activities");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await apiService.addSelfCare(formData);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Self-care activity added successfully!
        </div>
      );
      loadActivities();
    } catch (error) {
      toast.error("Error adding activity");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await apiService.updateSelfCare(id, updatedData);
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Activity updated successfully
        </div>
      );
      setEditing(null);
      loadActivities();
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await apiService.deleteSelfCare(id);
        toast.success("Activity deleted successfully");
        loadActivities();
      } catch {
        toast.error("Failed to delete activity");
      }
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Sparkles;
  };

  const getCategoryColor = (category) => {
    const colors = {
      mental: "from-blue-500 to-cyan-400",
      physical: "from-green-500 to-emerald-400",
      emotional: "from-pink-500 to-rose-400",
      spiritual: "from-purple-500 to-violet-400",
      rest: "from-indigo-500 to-blue-400",
      default: "from-gray-500 to-gray-400"
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B1D182] via-[#688F48] to-[#688F48] text-white p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#B1D182] via-[#688F48] to-[#B1D182] bg-clip-text text-transparent mb-2"
            >
              Self Care Sanctuary
            </motion.h1>
            <p className="text-gray-300">Nurture your mind, body, and soul</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEducation(!showEducation)}
            className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] font-semibold hover:shadow-lg hover:shadow-[#688F48]/30 transition-all duration-300 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {showEducation ? "Back to Activities" : "Learn About Self Care"}
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {showEducation ? (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Education />
            </motion.div>
          ) : (
            <motion.div
              key="activities"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Category Filters */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] shadow-lg"
                          : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${category.color}`} />
                      {category.label}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-lg bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-[#688F48] to-[#B1D182]">
                    <Plus className="w-6 h-6 text-[#0A1A2F]" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {editing ? "Edit Activity" : "Add New Self-Care Activity"}
                  </h2>
                </div>
                <SelfForm
                  onSubmit={
                    editing ? (data) => handleUpdate(editing._id, data) : handleAdd
                  }
                  existingData={editing}
                  onCancel={() => setEditing(null)}
                />
              </motion.div>

              {/* Activities List */}
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#B1D182]" />
                    Your Self-Care Journey
                  </h2>
                  <span className="text-sm text-gray-400">
                    {filteredActivities.length} activities
                  </span>
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-[#B1D182]/30 border-t-[#B1D182] rounded-full animate-spin"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-[#688F48] rounded-full animate-spin animation-delay-500"></div>
                    </div>
                  </div>
                ) : filteredActivities.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <AnimatePresence>
                      {filteredActivities.map((activity, index) => {
                        const Icon = getCategoryIcon(activity.category);
                        return (
                          <motion.div
                            key={activity._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            onMouseEnter={() => setHoveredCard(activity._id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="group relative"
                          >
                            {/* Glow effect on hover */}
                            {hoveredCard === activity._id && (
                              <div className="absolute inset-0 bg-gradient-to-r from-[#688F48]/20 to-[#B1D182]/20 rounded-2xl blur-xl -z-10"></div>
                            )}
                            
                            <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#B1D182]/50 transition-all duration-300 h-full flex flex-col">
                              {/* Category Badge */}
                              <div className="flex justify-between items-start mb-4">
                                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(activity.category)} text-white text-xs font-medium flex items-center gap-1`}>
                                  <Icon className="w-3 h-3" />
                                  {activity.category}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setEditing(activity)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDelete(activity._id)}
                                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </div>

                              {/* Content */}
                              <h3 className="text-xl font-bold text-[#B1D182] mb-3 line-clamp-1">
                                {activity.title}
                              </h3>
                              <p className="text-gray-300/80 text-sm mb-4 line-clamp-3 flex-grow">
                                {activity.description}
                              </p>

                              {/* Date */}
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                <span className="text-xs text-gray-400">
                                  {new Date(activity.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                                <motion.div
                                  animate={{ rotate: hoveredCard === activity._id ? 360 : 0 }}
                                  transition={{ duration: 0.5 }}
                                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#688F48] to-[#B1D182] flex items-center justify-center"
                                >
                                  <Leaf className="w-4 h-4 text-[#0A1A2F]" />
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#688F48]/20 to-[#B1D182]/20 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-[#B1D182]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No activities found</h3>
                    <p className="text-gray-400 mb-6">
                      {selectedCategory === "all" 
                        ? "Start your self-care journey by adding your first activity!"
                        : `No ${selectedCategory} activities found. Try adding one!`
                      }
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#0A1A2F] font-semibold hover:shadow-lg"
                    >
                      Add Your First Activity
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setEditing(null)}
              className="p-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-2xl"
            >
              Cancel Edit
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SelfCare;