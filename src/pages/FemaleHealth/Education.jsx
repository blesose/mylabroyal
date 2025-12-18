import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import articles from "./articles";
import { ChevronRight, Menu } from 'lucide-react';

const categories = ["All", "Menstrual Health", "Pain & Remedies", "Fertility", "Pregnancy"];

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  // For mobile: show first 2 + selected category
  // For desktop: show all categories always
  const visibleCategories = isMobile && !showAllCategories 
    ? Array.from(new Set([categories[0], categories[1], selectedCategory]))
    : categories;

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Female Health Education</h1>

      {/* Category Tabs - Mobile Responsive */}
      <div className="mb-6">
        {/* Mobile Category Header - Only show on mobile */}
        {isMobile && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Categories</span>
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-3 py-1 text-sm bg-charcoal-grey rounded-lg flex items-center gap-1"
            >
              <Menu className="w-4 h-4" />
              {showAllCategories ? 'Show Less' : 'Show All'}
            </button>
          </div>
        )}

        {/* Categories Container */}
        <div className="relative">
          {/* Horizontal Scroll for Mobile, Normal for Desktop */}
          <div className={`flex gap-2 sm:gap-3 ${isMobile ? 'overflow-x-auto pb-2' : 'flex-wrap'} hide-scrollbar`}>
            {visibleCategories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedCategory(c);
                  if (isMobile) {
                    setShowAllCategories(false);
                  }
                }}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded ${
                  isMobile ? 'whitespace-nowrap flex-shrink-0' : ''
                } text-sm sm:text-base transition-all ${
                  selectedCategory === c 
                    ? "bg-charcoal-grey text-white shadow-md" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
            
            {/* Show More Indicator on Mobile - Only when not showing all */}
            {isMobile && !showAllCategories && categories.length > visibleCategories.length && (
              <button
                onClick={() => setShowAllCategories(true)}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded whitespace-nowrap flex-shrink-0 flex items-center gap-1"
              >
                <span>+{categories.length - visibleCategories.length} more</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Indicator */}
        <div className="hidden sm:block mt-3">
          <p className="text-sm text-gray-600">
            Showing articles for:{" "}
            <span className="font-medium text-green-700">
              {selectedCategory === "All" ? "All Categories" : selectedCategory}
            </span>
          </p>
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id} 
            className="border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full"
          >
            {/* IMAGE */}
            <div className="relative w-full h-40 sm:h-44 overflow-hidden rounded-t-xl">
              <img
                src={article.images[0]}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">{article.title}</h2>
              
              {/* PREVIEW ONLY */}
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {article.content.substring(0, 100)}
                {article.content.length > 100 && "..."}
              </p>

              {/* READ MORE LINK */}
              <div className="mt-auto pt-3 border-t border-gray-100">
                <Link
                  to={`/female-health/education/${article.id}`}
                  className="text-green-700 hover:text-green-800 font-medium text-sm sm:text-base flex items-center justify-between group"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Articles Message */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">No articles found</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-4">
            No articles available for "{selectedCategory}"
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            View All Articles
          </button>
        </div>
      )}

      {/* Custom scrollbar hiding CSS */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Education;