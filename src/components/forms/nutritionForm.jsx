import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { 
  Apple, 
  Flame, 
  Beef, 
  Wheat, 
  Calendar, 
  Edit2, 
  Trash2, 
  Plus, 
  RefreshCw,
  TrendingUp,
  Target,
  Zap,
  Salad,
  Coffee,
  UtensilsCrossed,
  ChefHat,
  Scale,
  PieChart,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const NutritionForm = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [form, setForm] = useState({
    meal: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    fiber: '',
    mealType: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    mealsCount: 0,
    dailyAverage: 0
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Meal types with icons
  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: '🍳', color: 'from-orange-500 to-yellow-500' },
    { id: 'lunch', name: 'Lunch', icon: '🥗', color: 'from-green-500 to-emerald-500' },
    { id: 'dinner', name: 'Dinner', icon: '🍽️', color: 'from-blue-500 to-cyan-500' },
    { id: 'snack', name: 'Snack', icon: '🍎', color: 'from-purple-500 to-pink-500' },
    { id: 'dessert', name: 'Dessert', icon: '🍰', color: 'from-pink-500 to-red-500' },
  ];

  // Quick meal templates
  const quickMeals = [
    { name: 'Chicken Salad', calories: 350, protein: 30, carbs: 15, fats: 20, icon: '🥗' },
    { name: 'Protein Shake', calories: 250, protein: 25, carbs: 30, fats: 5, icon: '🥤' },
    { name: 'Avocado Toast', calories: 320, protein: 12, carbs: 35, fats: 18, icon: '🥑' },
    { name: 'Greek Yogurt', calories: 150, protein: 15, carbs: 20, fats: 3, icon: '🥄' },
    { name: 'Grilled Salmon', calories: 420, protein: 35, carbs: 5, fats: 28, icon: '🐟' },
    { name: 'Fruit Bowl', calories: 180, protein: 2, carbs: 45, fats: 1, icon: '🍓' },
  ];

  const calculateStats = (data) => {
    const totalCalories = data.reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0);
    const totalProtein = data.reduce((sum, item) => sum + (parseInt(item.protein) || 0), 0);
    const totalCarbs = data.reduce((sum, item) => sum + (parseInt(item.carbs) || 0), 0);
    const mealsCount = data.length;
    const dailyAverage = mealsCount > 0 ? Math.round(totalCalories / (mealsCount / 3)) : 0;

    setStats({
      totalCalories,
      totalProtein,
      totalCarbs,
      mealsCount,
      dailyAverage
    });
  };

  const fetchNutrition = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Loading nutrition data...</span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      }
    );

    try {
      setLoading(true);
      const data = await apiService.getAllNutrition();
      setNutritionData(data);
      calculateStats(data);
      
      toast.dismiss(loadingToast);
      toast.success(
        <div className="space-y-1">
          <div className="font-bold">🍎 Nutrition Data Loaded!</div>
          <div className="text-sm opacity-90">{data.length} meals logged</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 2000 
        }
      );
    } catch {
      toast.dismiss(loadingToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">⚠️ Failed to Load Data</div>
          <div className="text-sm">Unable to fetch nutrition records</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 4000 
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">
          {editingId ? 'Updating meal...' : 'Adding new meal...'}
        </span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        },
        duration: Infinity
      }
    );

    try {
      if (editingId) {
        await apiService.updateNutrition(editingId, form);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✏️</div>
              <div>
                <div className="font-bold text-lg">Meal Updated!</div>
                <div className="text-sm opacity-90">{form.meal} has been updated</div>
              </div>
            </div>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: '#fff',
              borderRadius: '12px',
            },
            duration: 3000 
          }
        );
      } else {
        await apiService.createNutrition(form);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎉</div>
              <div>
                <div className="font-bold text-lg">Meal Added!</div>
                <div className="text-sm opacity-90">{form.meal} has been logged</div>
              </div>
            </div>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
              color: '#fff',
              borderRadius: '12px',
            },
            duration: 3000 
          }
        );
      }
      
      setForm({
        meal: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
        fiber: '',
        mealType: 'breakfast',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
      setEditingId(null);
      fetchNutrition();
      
      if (parseInt(form.protein) > 30) {
        setTimeout(() => {
          toast('💪 High protein meal! Great for muscle recovery.', {
            icon: '🏋️‍♂️',
            duration: 3000,
          });
        }, 500);
      }
    } catch {
      toast.dismiss(submitToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">❌ Operation Failed</div>
          <div className="text-sm">Unable to save meal. Please try again.</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 4000 
        }
      );
    }
  };

  const handleDelete = async (id, mealName) => {
    toast.custom((t) => (
      <div className={`bg-white rounded-xl shadow-2xl p-4 max-w-sm ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Delete Meal?</h3>
            <p className="text-gray-600 text-sm mt-1">"{mealName}" will be permanently deleted</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  confirmDelete(id);
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const confirmDelete = async (id) => {
    const deleteToast = toast.loading('Deleting meal...', {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });

    try {
      await apiService.deleteNutrition(id);
      toast.dismiss(deleteToast);
      toast.success(
        <div className="flex items-center space-x-3">
          <div className="text-green-500 text-2xl">✅</div>
          <div>
            <div className="font-bold">Meal Deleted</div>
            <div className="text-sm opacity-90">Removed from your nutrition log</div>
          </div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 3000 
        }
      );
      fetchNutrition();
    } catch {
      toast.dismiss(deleteToast);
      toast.error('Failed to delete meal. Please try again.', {
        style: {
          background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      });
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
    toast('✏️ Editing mode activated! Update your meal details.', {
      icon: '📝',
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });
  };

  const applyQuickMeal = (meal) => {
    setForm({
      ...form,
      meal: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats || '',
    });
    toast(`Applied ${meal.name} template!`, {
      icon: meal.icon,
      duration: 2000,
    });
  };

  const filteredData = activeFilter === 'all' 
    ? nutritionData 
    : nutritionData.filter(item => item.mealType === activeFilter);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const StatCard = ({ icon, label, value, unit, color }) => (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-white/90 text-sm">{label}</div>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      {unit && <div className="text-white/70 text-xs mt-2">{unit}</div>}
    </div>
  );

  const getMealIcon = (mealType) => {
    const type = mealTypes.find(t => t.id === mealType);
    return type ? type.icon : '🍽️';
  };

  // Mobile meal history card
  const MobileMealCard = ({ item }) => {
    const totalMacros = (parseInt(item.protein) || 0) + (parseInt(item.carbs) || 0) + (parseInt(item.fats) || 0);
    const proteinPercent = totalMacros > 0 ? Math.round(((parseInt(item.protein) || 0) / totalMacros) * 100) : 0;
    
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-3">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getMealIcon(item.mealType)}</span>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">{item.meal}</h4>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">{item.date}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {item.mealType}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">{item.calories}</div>
            <div className="text-xs text-gray-500">kcal</div>
          </div>
        </div>

        {/* Macros Summary */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Protein: <span className="font-bold">{item.protein}g</span></span>
            <span>Carbs: <span className="font-bold">{item.carbs}g</span></span>
            <span>Fats: <span className="font-bold">{item.fats || 0}g</span></span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div 
                className="bg-blue-500"
                style={{ width: `${proteinPercent}%` }}
              ></div>
              <div 
                className="bg-yellow-500"
                style={{ width: `${Math.round(((parseInt(item.carbs) || 0) / totalMacros) * 100)}%` }}
              ></div>
              <div 
                className="bg-purple-500"
                style={{ width: `${Math.round(((parseInt(item.fats) || 0) / totalMacros) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Notes & Actions */}
        {item.notes && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.notes}</p>
        )}
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEdit(item)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-lg hover:opacity-90 transition-opacity flex items-center"
          >
            <Edit2 className="h-3 w-3 mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id, item.meal)}
            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-lg hover:opacity-90 transition-opacity flex items-center"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="text-charcoal-grey min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-3 sm:p-4 md:p-6">
      {/* React Hot Toast Container */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 10,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
          },
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Apple className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Nutrition</h1>
                <p className="text-xs text-gray-600">Track meals & macros</p>
              </div>
            </div>
            <button
              onClick={fetchNutrition}
              className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <Apple className="h-8 w-8 text-white" />
                </div>
                <span>Nutrition Tracker</span>
              </h1>
              <p className="text-gray-600">Track your meals, monitor macros, and achieve your nutrition goals</p>
            </div>
            <button
              onClick={fetchNutrition}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh Data</span>
            </button>
          </div>

          {/* Stats Cards - Desktop */}
          <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon="🔥" 
              label="Total Calories" 
              value={stats.totalCalories.toLocaleString()} 
              unit="kcal" 
              color="from-orange-500 to-red-500"
            />
            <StatCard 
              icon="💪" 
              label="Total Protein" 
              value={stats.totalProtein} 
              unit="grams" 
              color="from-blue-500 to-cyan-500"
            />
            <StatCard 
              icon="🌾" 
              label="Total Carbs" 
              value={stats.totalCarbs} 
              unit="grams" 
              color="from-yellow-500 to-amber-500"
            />
            <StatCard 
              icon="📊" 
              label="Meals Logged" 
              value={stats.mealsCount} 
              color="from-purple-500 to-pink-500"
            />
          </div>
        </div>

        {/* Mobile Stats Cards */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Calories</div>
                <div className="text-lg font-bold">{stats.totalCalories.toLocaleString()}</div>
              </div>
              <span className="text-xl">🔥</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Protein</div>
                <div className="text-lg font-bold">{stats.totalProtein}g</div>
              </div>
              <span className="text-xl">💪</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-amber-500 text-white p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Carbs</div>
                <div className="text-lg font-bold">{stats.totalCarbs}g</div>
              </div>
              <span className="text-xl">🌾</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Meals</div>
                <div className="text-lg font-bold">{stats.mealsCount}</div>
              </div>
              <span className="text-xl">📊</span>
            </div>
          </div>
        </div>

        {/* Mobile Filter Tabs */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Filter by Type:</h3>
            <Filter className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {mealTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className={`px-3 py-1.5 rounded-full text-xs flex-shrink-0 whitespace-nowrap ${
                  activeFilter === type.id
                    ? `bg-gradient-to-r ${type.color} text-white`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type.icon} {type.name}
              </button>
            ))}
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs flex-shrink-0 whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All Meals
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Left Column - Form & Quick Meals */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Meal Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 md:p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                  {editingId ? '✏️ Edit Meal' : '➕ Log New Meal'}
                </h2>
                {editingId && (
                  <button
                    onClick={() => {
                      setForm({
                        meal: '',
                        calories: '',
                        protein: '',
                        carbs: '',
                        fats: '',
                        fiber: '',
                        mealType: 'breakfast',
                        date: new Date().toISOString().split('T')[0],
                        notes: ''
                      });
                      setEditingId(null);
                      toast('Editing cancelled. Ready for new meal!', { icon: '🔄' });
                    }}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Meal Type Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {mealTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setForm({ ...form, mealType: type.id })}
                        className={`p-2 md:p-3 rounded-lg text-center transition-all ${
                          form.mealType === type.id 
                            ? `bg-gradient-to-br ${type.color} text-white shadow-lg transform scale-105` 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="text-base md:text-lg">{type.icon}</div>
                        <div className="text-xs font-medium mt-1">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <UtensilsCrossed className="inline h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-green-500" />
                      Meal Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Chicken Salad"
                      value={form.meal}
                      onChange={(e) => setForm({ ...form, meal: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:ring-2 md:focus:ring-4 focus:ring-green-100 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-blue-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 md:focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Macronutrients Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Flame className="inline h-3 w-3 md:h-4 md:w-4 mr-1 text-red-500" />
                      Calories
                    </label>
                    <input
                      type="number"
                      placeholder="kcal"
                      value={form.calories}
                      onChange={(e) => setForm({ ...form, calories: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-red-50 border-2 border-red-200 rounded-xl focus:border-red-400 focus:ring-2 md:focus:ring-4 focus:ring-red-100"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Beef className="inline h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-500" />
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      placeholder="g"
                      value={form.protein}
                      onChange={(e) => setForm({ ...form, protein: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-blue-50 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 md:focus:ring-4 focus:ring-blue-100"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Wheat className="inline h-3 w-3 md:h-4 md:w-4 mr-1 text-yellow-500" />
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      placeholder="g"
                      value={form.carbs}
                      onChange={(e) => setForm({ ...form, carbs: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-yellow-50 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-2 md:focus:ring-4 focus:ring-yellow-100"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Scale className="inline h-3 w-3 md:h-4 md:w-4 mr-1 text-purple-500" />
                      Fats (g)
                    </label>
                    <input
                      type="number"
                      placeholder="g"
                      value={form.fats}
                      onChange={(e) => setForm({ ...form, fats: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-purple-50 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-2 md:focus:ring-4 focus:ring-purple-100"
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      <Salad className="inline h-3 w-3 md:h-4 md:w-4 mr-1 text-green-500" />
                      Fiber (g)
                    </label>
                    <input
                      type="number"
                      placeholder="g"
                      value={form.fiber}
                      onChange={(e) => setForm({ ...form, fiber: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-green-50 border-2 border-green-200 rounded-xl focus:border-green-400 focus:ring-2 md:focus:ring-4 focus:ring-green-100"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Homemade"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:ring-2 md:focus:ring-4 focus:ring-gray-100"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm md:text-base font-bold py-3 md:py-4 px-4 md:px-8 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:shadow-xl md:hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                        <span>{editingId ? 'Updating...' : 'Logging...'}</span>
                      </>
                    ) : editingId ? (
                      <>
                        <Edit2 className="h-4 w-4 md:h-5 md:w-5" />
                        <span>Update Meal</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 md:h-5 md:w-5" />
                        <span>Log Meal</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* Quick Meal Templates - Mobile Carousel */}
            <div className="md:hidden bg-white rounded-2xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Templates</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {quickMeals.map((meal, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyQuickMeal(meal)}
                    className="flex-shrink-0 w-32 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200"
                  >
                    <div className="text-2xl mb-2">{meal.icon}</div>
                    <div className="font-medium text-gray-800 text-sm mb-1 truncate">{meal.name}</div>
                    <div className="text-xs text-gray-600 truncate">
                      {meal.calories} kcal • {meal.protein}g
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Meal Templates - Desktop */}
            <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Quick Meal Templates</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickMeals.map((meal, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyQuickMeal(meal)}
                    className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all transform hover:scale-105 border border-blue-200"
                  >
                    <div className="text-2xl mb-2">{meal.icon}</div>
                    <div className="font-medium text-gray-800 text-sm mb-1">{meal.name}</div>
                    <div className="text-xs text-gray-600">
                      {meal.calories} kcal • {meal.protein}g protein
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Meal History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 md:p-6 border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">Meal History</h2>
                  {/* Desktop Filter Buttons */}
                  <div className="hidden md:flex items-center space-x-2">
                    {mealTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setActiveFilter(type.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          activeFilter === type.id
                            ? `bg-gradient-to-r ${type.color} text-white`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type.icon} {type.name}
                      </button>
                    ))}
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        activeFilter === 'all'
                          ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All Meals
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 md:mt-0">
                  <span className="text-sm text-gray-500">
                    {filteredData.length} meals
                  </span>
                  {/* Pagination Controls */}
                  {filteredData.length > itemsPerPage && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-1 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-600">
                        {currentPage}/{totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1 disabled:opacity-50"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8 md:py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-green-500"></div>
                  <p className="mt-3 text-gray-600 text-sm md:text-base">Loading nutrition data...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4">🍎</div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-1 md:mb-2">No Meals Logged Yet</h3>
                  <p className="text-gray-500 text-sm md:text-base">Start by logging your first meal!</p>
                </div>
              ) : (
                <>
                  {/* Mobile Meal Cards */}
                  <div className="md:hidden">
                    {paginatedData.map((item) => (
                      <MobileMealCard key={item._id} item={item} />
                    ))}
                  </div>

                  {/* Desktop Meal Cards */}
                  <div className="hidden md:block space-y-4">
                    {paginatedData.map((item) => {
                      const totalMacros = (parseInt(item.protein) || 0) + (parseInt(item.carbs) || 0) + (parseInt(item.fats) || 0);
                      const proteinPercent = totalMacros > 0 ? Math.round(((parseInt(item.protein) || 0) / totalMacros) * 100) : 0;
                      
                      return (
                        <div
                          key={item._id}
                          className="group bg-gradient-to-r from-white to-gray-50 hover:from-green-50 hover:to-emerald-50 rounded-2xl p-5 shadow-lg border border-gray-200 hover:border-green-300 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                                <span className="text-2xl">{getMealIcon(item.mealType)}</span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{item.meal}</h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-sm text-gray-500">{item.date}</span>
                                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                        {item.mealType}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl font-bold text-green-600">{item.calories}</div>
                                    <div className="text-sm text-gray-500">kcal</div>
                                  </div>
                                </div>
                                
                                {/* Macronutrient Progress Bars */}
                                <div className="mt-4">
                                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                    <span>Macronutrients:</span>
                                    <span className="font-medium">
                                      P: {item.protein}g • C: {item.carbs}g • F: {item.fats || 0}g
                                    </span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full flex">
                                      <div 
                                        className="bg-blue-500"
                                        style={{ width: `${proteinPercent}%` }}
                                      ></div>
                                      <div 
                                        className="bg-yellow-500"
                                        style={{ width: `${Math.round(((parseInt(item.carbs) || 0) / totalMacros) * 100)}%` }}
                                      ></div>
                                      <div 
                                        className="bg-purple-500"
                                        style={{ width: `${Math.round(((parseInt(item.fats) || 0) / totalMacros) * 100)}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                
                                {item.notes && (
                                  <p className="text-gray-600 text-sm mt-3">{item.notes}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                                title="Edit"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id, item.meal)}
                                className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Nutrition Stats & Tips */}
          <div className="space-y-4 md:space-y-6">
            {/* Mobile Nutrition Tips */}
            <div className="md:hidden bg-gradient-to-br from-green-500 to-emerald-500 text-white p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">💡 Quick Tips</h3>
              <div className="space-y-2">
                {[
                  'Drink water with meals',
                  'Include protein in each meal',
                  'Choose complex carbs',
                  'Eat colorful vegetables',
                ].map((tip, idx) => (
                  <div key={idx} className="text-sm opacity-90">
                    • {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Nutrition Tips */}
            <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Nutrition Tips</h3>
              <div className="space-y-4">
                {[
                  'Drink 8 glasses of water daily for metabolism',
                  'Include protein in every meal for satiety',
                  'Choose complex carbs over refined ones',
                  'Healthy fats support brain function',
                  'Fiber aids digestion and gut health',
                  'Eat colorful fruits and vegetables daily',
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all"
                    onClick={() => toast(tip, { icon: '💡' })}
                  >
                    <div className="p-1 bg-green-100 rounded">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Macronutrient Info - Mobile */}
            <div className="md:hidden bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 rounded-2xl">
              <h3 className="text-lg font-bold mb-3">⚖️ Macros</h3>
              <div className="space-y-2">
                {[
                  { icon: '💪', name: 'Protein', desc: 'Builds tissues' },
                  { icon: '🌾', name: 'Carbs', desc: 'Energy source' },
                  { icon: '🥑', name: 'Fats', desc: 'Hormones' },
                ].map((macro, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{macro.icon}</span>
                      <div>
                        <div className="text-sm font-medium">{macro.name}</div>
                        <div className="text-xs opacity-80">{macro.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Goals - Desktop */}
            <div className="hidden md:block bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">🎯 Daily Goals</h3>
              <div className="space-y-4">
                {[
                  { label: 'Calories', current: 1850, goal: 2000, unit: 'kcal', color: 'bg-red-500' },
                  { label: 'Protein', current: 120, goal: 150, unit: 'g', color: 'bg-blue-500' },
                  { label: 'Carbs', current: 180, goal: 200, unit: 'g', color: 'bg-yellow-500' },
                  { label: 'Fats', current: 60, goal: 70, unit: 'g', color: 'bg-purple-500' },
                ].map((goal, idx) => {
                  const percentage = Math.min(100, (goal.current / goal.goal) * 100);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{goal.label}</span>
                        <span>{goal.current}/{goal.goal} {goal.unit}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${goal.color} transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Macronutrient Info - Desktop */}
            <div className="hidden md:block bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">⚖️ Macronutrients</h3>
              <div className="space-y-3">
                {[
                  { icon: '💪', name: 'Protein', desc: 'Builds & repairs tissues', color: 'bg-blue-400' },
                  { icon: '🌾', name: 'Carbs', desc: 'Primary energy source', color: 'bg-yellow-400' },
                  { icon: '🥑', name: 'Fats', desc: 'Hormone production', color: 'bg-purple-400' },
                  { icon: '🥦', name: 'Fiber', desc: 'Digestive health', color: 'bg-green-400' },
                ].map((macro, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${macro.color}`}>
                        <span className="text-lg">{macro.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{macro.name}</div>
                        <div className="text-xs opacity-80">{macro.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 p-2 shadow-2xl">
        <div className="flex justify-around items-center">
          <button 
            onClick={() => {
              const formElement = document.querySelector('form');
              formElement?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-green-600"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Add</span>
          </button>
          <button 
            onClick={() => {
              const randomMeal = quickMeals[Math.floor(Math.random() * quickMeals.length)];
              applyQuickMeal(randomMeal);
            }}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-blue-600"
          >
            <ChefHat className="h-5 w-5" />
            <span className="text-xs mt-1">Quick</span>
          </button>
          <button 
            onClick={fetchNutrition}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-purple-600"
          >
            <RefreshCw className="h-5 w-5" />
            <span className="text-xs mt-1">Refresh</span>
          </button>
          <button 
            onClick={() => {
              toast('🍎 Remember to drink water with your meals!', {
                icon: '💧',
                style: {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                }
              });
            }}
            className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-red-600"
          >
            <Apple className="h-5 w-5" />
            <span className="text-xs mt-1">Tips</span>
          </button>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-out {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-20px); opacity: 0; }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        /* Hide scrollbar but allow scrolling */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        
        .overflow-x-auto::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        /* Line clamp for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Optimize for very small screens */
        @media (max-width: 375px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
            gap: 2;
          }
          
          .p-4 {
            padding: 0.75rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
        }
        
        /* Better tap targets for mobile */
        button, input, textarea {
          touch-action: manipulation;
        }
        
        /* Prevent text size adjustment on mobile */
        html {
          -webkit-text-size-adjust: 100%;
        }
      `}</style>
    </div>
  );
};

export default NutritionForm;