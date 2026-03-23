import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, UtensilsCrossed, Apple, Beef, Wheat, Milk, Coffee, Pizza, Plus, Check, Minus } from 'lucide-react';
import { apiService } from '../../services/api';

const FoodSearch = ({ onSelectFood, onClose, selectedFood, onSelectMultipleFoods }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [recentFoods, setRecentFoods] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mode, setMode] = useState('single'); // 'single' or 'multiple'
  const [showCombinedModal, setShowCombinedModal] = useState(false);
  const [combinedName, setCombinedName] = useState('');
  const searchRef = useRef(null);

  const categoryIcons = {
    fruits: '🍎',
    vegetables: '🥕',
    proteins: '🍗',
    carbs: '🍚',
    dairy: '🥛',
    meals: '🍕',
    snacks: '🍿',
    beverages: '🥤',
  };

  // Load recent foods from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentFoods');
    if (saved) {
      setRecentFoods(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Search foods
  useEffect(() => {
    const searchFoods = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await apiService.searchFoods(searchTerm);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Error searching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchFoods, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Load foods by category
  useEffect(() => {
    const loadCategoryFoods = async () => {
      if (selectedCategory === 'all' || searchTerm) return;
      
      setLoading(true);
      try {
        const response = await apiService.getFoodsByCategory(selectedCategory);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Error loading category foods:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryFoods();
  }, [selectedCategory]);

  const handleSelectFood = (food) => {
    if (mode === 'multiple') {
      // Add to selected items
      const existing = selectedItems.find(item => item._id === food._id);
      if (existing) {
        setSelectedItems(selectedItems.filter(item => item._id !== food._id));
      } else {
        setSelectedItems([...selectedItems, { ...food, quantity: 1 }]);
      }
    } else {
      // Single selection
      const updated = [food, ...recentFoods.filter(f => f._id !== food._id)].slice(0, 5);
      localStorage.setItem('recentFoods', JSON.stringify(updated));
      setRecentFoods(updated);
      onSelectFood(food);
      onClose();
    }
  };

  const handleQuantityChange = (foodId, delta) => {
    setSelectedItems(selectedItems.map(item => {
      if (item._id === foodId) {
        const newQuantity = Math.max(0.5, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (foodId) => {
    setSelectedItems(selectedItems.filter(item => item._id !== foodId));
  };

  const handleCombineMeals = () => {
    if (selectedItems.length < 2) {
      alert('Please select at least 2 foods to combine');
      return;
    }
    setShowCombinedModal(true);
  };

  const calculateCombinedNutrition = () => {
    const combined = {
      name: combinedName || selectedItems.map(item => item.name).join(' + '),
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
      isCombined: true,
      ingredients: selectedItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        calories: Math.round(item.calories * item.quantity),
        protein: Math.round(item.protein * item.quantity * 10) / 10,
        carbs: Math.round(item.carbs * item.quantity * 10) / 10,
        fats: Math.round(item.fats * item.quantity * 10) / 10,
      }))
    };

    selectedItems.forEach(item => {
      combined.calories += Math.round(item.calories * item.quantity);
      combined.protein += Math.round(item.protein * item.quantity * 10) / 10;
      combined.carbs += Math.round(item.carbs * item.quantity * 10) / 10;
      combined.fats += Math.round(item.fats * item.quantity * 10) / 10;
      combined.fiber += (item.fiber || 0) * item.quantity;
      combined.sugar += (item.sugar || 0) * item.quantity;
    });

    return combined;
  };

  const handleConfirmCombine = () => {
    const combined = calculateCombinedNutrition();
    // Save to recent foods
    const updated = [combined, ...recentFoods.filter(f => f._id !== combined._id)].slice(0, 5);
    localStorage.setItem('recentFoods', JSON.stringify(updated));
    setRecentFoods(updated);
    onSelectMultipleFoods?.(combined);
    setSelectedItems([]);
    setMode('single');
    setShowCombinedModal(false);
    onClose();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      fruits: <Apple className="h-4 w-4" />,
      vegetables: <Apple className="h-4 w-4" />,
      proteins: <Beef className="h-4 w-4" />,
      carbs: <Wheat className="h-4 w-4" />,
      dairy: <Milk className="h-4 w-4" />,
      meals: <Pizza className="h-4 w-4" />,
      snacks: <Coffee className="h-4 w-4" />,
      beverages: <Coffee className="h-4 w-4" />,
    };
    return icons[category] || <UtensilsCrossed className="h-4 w-4" />;
  };

  const categoriesList = [
    { id: 'all', name: 'All', icon: '🔍' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'proteins', name: 'Proteins', icon: '🍗' },
    { id: 'carbs', name: 'Carbs', icon: '🍚' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'meals', name: 'Meals', icon: '🍕' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'beverages', name: 'Drinks', icon: '🥤' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          ref={searchRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Search className="h-5 w-5 text-green-500" />
                Search Food
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => {
                  setMode('single');
                  setSelectedItems([]);
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  mode === 'single'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Single Food
              </button>
              <button
                onClick={() => {
                  setMode('multiple');
                  setSelectedItems([]);
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  mode === 'multiple'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Combine Meals
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={mode === 'multiple' ? "Search foods to combine... (e.g., bread, egg)" : "Search for food... (e.g., chicken breast, apple, pizza)"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                autoFocus
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
              )}
            </div>
          </div>

          {/* Selected Items for Combined Mode */}
          {mode === 'multiple' && selectedItems.length > 0 && (
            <div className="p-4 border-b border-gray-200 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-green-800">Selected Items ({selectedItems.length})</h3>
                <button
                  onClick={handleCombineMeals}
                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-lg hover:opacity-90 transition-all"
                >
                  Combine Meals
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between bg-white p-2 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.calories} kcal per serving</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -0.5)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-12 text-center">{item.quantity}x</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 0.5)}
                        className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {!searchTerm && (
            <div className="p-4 border-b border-gray-200 overflow-x-auto">
              <div className="flex gap-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {!searchTerm && recentFoods.length > 0 && selectedCategory === 'all' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">🕒 Recent Foods</h3>
                <div className="space-y-2">
                  {recentFoods.map((food) => (
                    <button
                      key={food._id}
                      onClick={() => handleSelectFood(food)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                        mode === 'multiple' && selectedItems.find(i => i._id === food._id)
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-gray-50 hover:bg-green-50'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-gray-800">{food.name}</div>
                        <div className="text-xs text-gray-500">{food.calories} kcal • {food.servingSize}</div>
                      </div>
                      <div className="text-sm text-green-600">
                        {food.calories} kcal
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((food) => (
                  <button
                    key={food._id}
                    onClick={() => handleSelectFood(food)}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between ${
                      mode === 'multiple' && selectedItems.find(i => i._id === food._id)
                        ? 'bg-green-100 border-2 border-green-500'
                        : selectedFood?._id === food._id
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-gray-50 hover:bg-green-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{categoryIcons[food.category] || '🍽️'}</div>
                      <div>
                        <div className="font-medium text-gray-800">{food.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {food.servingSize} • {food.protein}g protein • {food.carbs}g carbs • {food.fats}g fats
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{food.calories}</div>
                      <div className="text-xs text-gray-500">kcal</div>
                      {mode === 'multiple' && (
                        <div className="mt-1">
                          {selectedItems.find(i => i._id === food._id) ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Plus className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : searchTerm && !loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500">No foods found for "{searchTerm}"</p>
                <button
                  onClick={() => {
                    if (mode === 'multiple') {
                      setSelectedItems([...selectedItems, { 
                        name: searchTerm, 
                        isCustom: true, 
                        calories: 0, 
                        protein: 0, 
                        carbs: 0, 
                        fats: 0,
                        quantity: 1,
                        _id: Date.now().toString()
                      }]);
                      setSearchTerm('');
                    } else {
                      onSelectFood({ name: searchTerm, isCustom: true });
                      onClose();
                    }
                  }}
                  className="mt-3 text-sm text-green-600 hover:text-green-700"
                >
                  + Add "{searchTerm}" as custom food
                </button>
              </div>
            ) : !searchTerm && selectedCategory === 'all' && recentFoods.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🍽️</div>
                <p className="text-gray-500">Search for a food or browse categories</p>
                <p className="text-sm text-gray-400 mt-2">Try: chicken, apple, pizza, rice...</p>
                {mode === 'multiple' && (
                  <p className="text-sm text-green-600 mt-4">💡 Tip: Combine multiple foods like "bread" + "egg" for a complete meal!</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Combined Meal Modal */}
      {showCombinedModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Name Your Combined Meal</h3>
            <p className="text-gray-600 mb-4">What would you like to call this meal?</p>
            <input
              type="text"
              placeholder="e.g., Breakfast Sandwich, Tea Time"
              value={combinedName}
              onChange={(e) => setCombinedName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              autoFocus
            />
            
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Nutrition Summary:</h4>
              {selectedItems.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-600 mb-1">
                  {item.name} ({item.quantity}x): {Math.round(item.calories * item.quantity)} kcal
                </div>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{calculateCombinedNutrition().calories} kcal</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Protein:</span>
                  <span>{calculateCombinedNutrition().protein}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Carbs:</span>
                  <span>{calculateCombinedNutrition().carbs}g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fats:</span>
                  <span>{calculateCombinedNutrition().fats}g</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCombinedModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCombine}
                className="flex-1 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Save Combined Meal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default FoodSearch;