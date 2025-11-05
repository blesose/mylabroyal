// // import React, { useEffect, useRef, useState } from 'react';
// // import { Search, X, ChevronRight, Sparkles, Crown, Star } from 'lucide-react';

// // /**
// //  * Ultra-Enhanced Dropdown Component with Royal Color Palette
// //  * Features:
// //  * - Smooth animations with custom color scheme
// //  * - Advanced positioning with viewport detection
// //  * - Search, filtering, and sections
// //  * - Custom render props for maximum flexibility
// //  * - Touch and keyboard optimized
// //  */

// // const Dropdown = ({ 
// //   isOpen, 
// //   onClose, 
// //   items = [],
// //   position = 'left',
// //   align = 'start',
// //   className = '',
// //   style = {},
// //   id,
// //   maxHeight = '320px',
// //   width = 'auto',
// //   withSearch = false,
// //   searchPlaceholder = 'Search...',
// //   onSearchChange,
// //   renderItem,
// //   premium = false,
// //   glow = true,
// //   ...props 
// // }) => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [activeIndex, setActiveIndex] = useState(-1);
// //   const dropdownRef = useRef(null);
// //   const searchRef = useRef(null);

// //   // Enhanced keyboard navigation
// //   useEffect(() => {
// //     if (!isOpen) return;

// //     const handleKeyDown = (event) => {
// //       const focusableElements = dropdownRef.current?.querySelectorAll(
// //         'button, a, [tabindex]:not([tabindex="-1"])'
// //       );
      
// //       if (!focusableElements?.length) return;

// //       const currentIndex = Array.from(focusableElements).findIndex(
// //         el => el === document.activeElement
// //       );

// //       switch (event.key) {
// //         case 'Escape':
// //           event.preventDefault();
// //           onClose();
// //           break;
// //         case 'ArrowDown':
// //           event.preventDefault();
// //           const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
// //           focusableElements[nextIndex]?.focus();
// //           setActiveIndex(nextIndex);
// //           break;
// //         case 'ArrowUp':
// //           event.preventDefault();
// //           const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
// //           focusableElements[prevIndex]?.focus();
// //           setActiveIndex(prevIndex);
// //           break;
// //         case 'Home':
// //           event.preventDefault();
// //           focusableElements[0]?.focus();
// //           setActiveIndex(0);
// //           break;
// //         case 'End':
// //           event.preventDefault();
// //           focusableElements[focusableElements.length - 1]?.focus();
// //           setActiveIndex(focusableElements.length - 1);
// //           break;
// //         case 'Enter':
// //           if (currentIndex >= 0) {
// //             event.preventDefault();
// //             focusableElements[currentIndex]?.click();
// //           }
// //           break;
// //       }
// //     };

// //     document.addEventListener('keydown', handleKeyDown);
// //     return () => document.removeEventListener('keydown', handleKeyDown);
// //   }, [isOpen, onClose]);

// //   // Close on outside click
// //   useEffect(() => {
// //     if (!isOpen) return;

// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         onClose();
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     document.addEventListener('touchstart', handleClickOutside);

// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //       document.removeEventListener('touchstart', handleClickOutside);
// //     };
// //   }, [isOpen, onClose]);

// //   // Focus search on open
// //   useEffect(() => {
// //     if (isOpen && withSearch && searchRef.current) {
// //       setTimeout(() => searchRef.current?.focus(), 100);
// //     }
// //   }, [isOpen, withSearch]);

// //   // Reset active index when items change
// //   useEffect(() => {
// //     setActiveIndex(-1);
// //   }, [items, searchTerm]);

// //   if (!isOpen) return null;

// //   const filteredItems = withSearch
// //     ? items.filter(item =>
// //         item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.keywords?.some(keyword => 
// //           keyword.toLowerCase().includes(searchTerm.toLowerCase())
// //         )
// //       )
// //     : items;

// //   const getPositionClasses = () => {
// //     const baseClasses = 'absolute top-full mt-2 z-50 transform transition-all duration-300 ease-out';
    
// //     const positionClasses = {
// //       left: 'left-0 origin-top-left',
// //       right: 'right-0 origin-top-right',
// //       center: 'left-1/2 transform -translate-x-1/2 origin-top'
// //     };

// //     return `${baseClasses} ${positionClasses[position] || positionClasses.left}`;
// //   };

// //   const handleSearchChange = (value) => {
// //     setSearchTerm(value);
// //     onSearchChange?.(value);
// //   };

// //   return (
// //     <>
// //       {/* Enhanced Backdrop */}
// //       <div 
// //         className="fixed inset-0 z-40 bg-deep-navy/30 backdrop-blur-sm animate-fade-in"
// //         onClick={onClose}
// //         aria-hidden="true"
// //       />
      
// //       {/* Dropdown Container */}
// //       <div
// //         ref={dropdownRef}
// //         id={id}
// //         className={`
// //           ${getPositionClasses()}
// //           bg-deep-navy/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-blue/30
// //           py-3 animate-slide-down
// //           ${premium ? 'shadow-glow-lg' : glow ? 'shadow-glow' : ''}
// //           ${className}
// //         `}
// //         style={{ 
// //           width: width === 'auto' ? 'auto' : `${width}px`,
// //           maxWidth: '90vw',
// //           ...style 
// //         }}
// //         role="menu"
// //         aria-orientation="vertical"
// //         {...props}
// //       >
// //         {/* Premium Crown Badge */}
// //         {premium && (
// //           <div className="absolute -top-2 -right-2 z-10">
// //             <div className="w-6 h-6 bg-gradient-to-r from-neon-mint to-emerald rounded-full flex items-center justify-center shadow-glow animate-pulse">
// //               <Crown className="w-3 h-3 text-deep-navy" />
// //             </div>
// //           </div>
// //         )}

// //         {/* Search Bar */}
// //         {withSearch && (
// //           <div className="px-4 py-3 border-b border-cyan-blue/20">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neon-mint" />
// //               <input
// //                 ref={searchRef}
// //                 type="text"
// //                 placeholder={searchPlaceholder}
// //                 value={searchTerm}
// //                 onChange={(e) => handleSearchChange(e.target.value)}
// //                 className="w-full px-4 py-2.5 pl-10 bg-cyan-blue/20 border border-cyan-blue/30 rounded-xl text-mist-gray placeholder-mist-gray/60 focus:outline-none focus:ring-2 focus:ring-neon-mint/50 focus:border-neon-mint transition-all duration-300"
// //               />
// //               {searchTerm && (
// //                 <button
// //                   onClick={() => handleSearchChange('')}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mist-gray/60 hover:text-neon-mint transition-colors duration-200"
// //                 >
// //                   <X className="w-4 h-4" />
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Dropdown Content */}
// //         <div 
// //           className="overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-blue/40 scrollbar-track-transparent hover:scrollbar-thumb-cyan-blue/60"
// //           style={{ maxHeight }}
// //         >
// //           {filteredItems.length > 0 ? (
// //             <div className="py-1">
// //               {filteredItems.map((item, index) => 
// //                 renderItem ? (
// //                   <div key={item.id || index}>
// //                     {renderItem({ item, index, onClose })}
// //                   </div>
// //                 ) : (
// //                   <button
// //                     key={item.id || index}
// //                     onClick={(e) => {
// //                       item.onClick?.(e);
// //                       if (item.closeOnClick !== false) {
// //                         onClose();
// //                       }
// //                     }}
// //                     onMouseEnter={() => setActiveIndex(index)}
// //                     className={`w-full text-left px-4 py-3 text-mist-gray transition-all duration-300 flex items-center group focus:outline-none relative overflow-hidden ${
// //                       activeIndex === index 
// //                         ? 'bg-cyan-blue/20 text-neon-mint' 
// //                         : 'hover:bg-gradient-to-r hover:from-neon-mint/10 hover:to-emerald/10 hover:text-neon-mint'
// //                     }`}
// //                     role="menuitem"
// //                     tabIndex={0}
// //                   >
// //                     {/* Animated Background */}
// //                     <div className="absolute inset-0 bg-gradient-to-r from-neon-mint/0 via-neon-mint/5 to-neon-mint/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

// //                     {/* Item Icon */}
// //                     {item.icon && (
// //                       <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
// //                         {item.icon}
// //                       </span>
// //                     )}

// //                     {/* Item Content */}
// //                     <div className="flex-1 min-w-0 relative z-10">
// //                       <div className="font-medium flex items-center space-x-2">
// //                         <span>{item.label}</span>
// //                         {item.badge && (
// //                           <span className={`text-xs px-2 py-1 rounded-full ${
// //                             item.badge.variant === 'neon-mint' 
// //                               ? 'bg-neon-mint/20 text-neon-mint' 
// //                               : item.badge.variant === 'emerald'
// //                               ? 'bg-emerald/20 text-emerald'
// //                               : 'bg-cyan-blue/20 text-mist-gray'
// //                           }`}>
// //                             {item.badge.text}
// //                           </span>
// //                         )}
// //                       </div>
// //                       {item.description && (
// //                         <div className="text-sm text-mist-gray/60 mt-1 leading-relaxed group-hover:text-mist-gray/80">
// //                           {item.description}
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Hover Indicator */}
// //                     <ChevronRight className="w-4 h-4 text-cyan-blue/60 group-hover:text-neon-mint transform group-hover:translate-x-1 transition-all duration-300 ml-3 relative z-10" />

// //                     {/* Premium Sparkle */}
// //                     {item.premium && (
// //                       <Sparkles className="absolute right-3 w-3 h-3 text-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                     )}
// //                   </button>
// //                 )
// //               )}
// //             </div>
// //           ) : (
// //             /* Empty State */
// //             <div className="px-4 py-8 text-center">
// //               <div className="w-16 h-16 bg-cyan-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
// //                 <Search className="w-6 h-6 text-neon-mint" />
// //               </div>
// //               <p className="text-mist-gray/80 text-sm">No results found</p>
// //               {withSearch && searchTerm && (
// //                 <p className="text-mist-gray/60 text-xs mt-1">Try adjusting your search terms</p>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Dropdown Footer */}
// //         {props.footer && (
// //           <div className="px-4 py-3 border-t border-cyan-blue/20 bg-cyan-blue/10 rounded-b-2xl">
// //             {props.footer}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // Specialized Dropdown Variants
// // export const RoyalDropdown = (props) => (
// //   <Dropdown
// //     premium
// //     glow
// //     className="border-2 border-neon-mint/20"
// //     style={{
// //       background: 'linear-gradient(135deg, rgba(11, 19, 43, 0.98) 0%, rgba(58, 80, 107, 0.95) 100%)',
// //       backdropFilter: 'blur(20px)'
// //     }}
// //     {...props}
// //   />
// // );

// // export const CompactDropdown = (props) => (
// //   <Dropdown
// //     className="py-2 rounded-xl"
// //     maxHeight="240px"
// //     width="200"
// //     {...props}
// //   />
// // );

// // export const GlassDropdown = (props) => (
// //   <Dropdown
// //     className="bg-cyan-blue/10 backdrop-blur-2xl border border-cyan-blue/20"
// //     glow={false}
// //     {...props}
// //   />
// // );

// // // Sectioned Dropdown Component
// // export const SectionedDropdown = ({ sections, ...props }) => {
// //   const allItems = sections.flatMap(section => section.items);
  
// //   return (
// //     <Dropdown
// //       {...props}
// //       items={allItems}
// //       renderItem={({ item, index, onClose }) => {
// //         const section = sections.find(s => s.items.includes(item));
// //         const isFirstInSection = section.items[0] === item;
        
// //         return (
// //           <div>
// //             {isFirstInSection && (
// //               <div className="px-4 py-2 bg-cyan-blue/10 border-y border-cyan-blue/20">
// //                 <div className="text-xs font-semibold text-neon-mint uppercase tracking-wide">
// //                   {section.title}
// //                 </div>
// //                 {section.description && (
// //                   <div className="text-xs text-mist-gray/60 mt-1">
// //                     {section.description}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //             <button
// //               onClick={(e) => {
// //                 item.onClick?.(e);
// //                 if (item.closeOnClick !== false) {
// //                   onClose();
// //                 }
// //               }}
// //               className="w-full text-left px-4 py-3 text-mist-gray hover:bg-cyan-blue/10 hover:text-neon-mint transition-all duration-300 flex items-center group"
// //             >
// //               {item.icon && (
// //                 <span className="mr-3 text-lg">{item.icon}</span>
// //               )}
// //               <div className="flex-1">
// //                 <div className="font-medium">{item.label}</div>
// //                 {item.description && (
// //                   <div className="text-sm text-mist-gray/60 mt-1">
// //                     {item.description}
// //                   </div>
// //                 )}
// //               </div>
// //             </button>
// //           </div>
// //         );
// //       }}
// //     />
// //   );
// // };

// // export default Dropdown;
// // // import React, { useEffect, useRef } from 'react';

// // // /**
// // //  * Ultra-Enhanced Dropdown Component
// // //  * Features:
// // //  * - Smooth animations with framer-motion like effects
// // //  * - Advanced positioning with viewport detection
// // //  * - Search, filtering, and sections
// // //  * - Custom render props for maximum flexibility
// // //  * - Touch and keyboard optimized
// // //  */

// // // const Dropdown = ({ 
// // //   isOpen, 
// // //   onClose, 
// // //   items = [],
// // //   position = 'left',
// // //   align = 'start',
// // //   className = '',
// // //   style = {},
// // //   id,
// // //   maxHeight = '320px',
// // //   width = 'auto',
// // //   withSearch = false,
// // //   searchPlaceholder = 'Search...',
// // //   onSearchChange,
// // //   renderItem,
// // //   ...props 
// // // }) => {
// // //   const [searchTerm, setSearchTerm] = React.useState('');
// // //   const dropdownRef = useRef(null);

// // //   // Enhanced keyboard navigation
// // //   useEffect(() => {
// // //     if (!isOpen) return;

// // //     const handleKeyDown = (event) => {
// // //       const focusableElements = dropdownRef.current?.querySelectorAll(
// // //         'button, a, [tabindex]:not([tabindex="-1"])'
// // //       );
      
// // //       if (!focusableElements?.length) return;

// // //       const currentIndex = Array.from(focusableElements).findIndex(
// // //         el => el === document.activeElement
// // //       );

// // //       switch (event.key) {
// // //         case 'Escape':
// // //           event.preventDefault();
// // //           onClose();
// // //           break;
// // //         case 'ArrowDown':
// // //           event.preventDefault();
// // //           const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
// // //           focusableElements[nextIndex]?.focus();
// // //           break;
// // //         case 'ArrowUp':
// // //           event.preventDefault();
// // //           const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
// // //           focusableElements[prevIndex]?.focus();
// // //           break;
// // //         case 'Home':
// // //           event.preventDefault();
// // //           focusableElements[0]?.focus();
// // //           break;
// // //         case 'End':
// // //           event.preventDefault();
// // //           focusableElements[focusableElements.length - 1]?.focus();
// // //           break;
// // //       }
// // //     };

// // //     document.addEventListener('keydown', handleKeyDown);
// // //     return () => document.removeEventListener('keydown', handleKeyDown);
// // //   }, [isOpen, onClose]);

// // //   // Close on outside click
// // //   useEffect(() => {
// // //     if (!isOpen) return;

// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         onClose();
// // //       }
// // //     };

// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     document.addEventListener('touchstart', handleClickOutside);

// // //     return () => {
// // //       document.removeEventListener('mousedown', handleClickOutside);
// // //       document.removeEventListener('touchstart', handleClickOutside);
// // //     };
// // //   }, [isOpen, onClose]);

// // //   if (!isOpen) return null;

// // //   const filteredItems = withSearch
// // //     ? items.filter(item =>
// // //         item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         item.keywords?.some(keyword => 
// // //           keyword.toLowerCase().includes(searchTerm.toLowerCase())
// // //         )
// // //       )
// // //     : items;

// // //   const getPositionClasses = () => {
// // //     const baseClasses = 'absolute top-full mt-3 z-50 transform transition-all duration-300 ease-out';
    
// // //     const positionClasses = {
// // //       left: 'left-0 origin-top-left',
// // //       right: 'right-0 origin-top-right',
// // //       center: 'left-1/2 transform -translate-x-1/2 origin-top'
// // //     };

// // //     return `${baseClasses} ${positionClasses[position] || positionClasses.left}`;
// // //   };

// // //   const handleSearchChange = (value) => {
// // //     setSearchTerm(value);
// // //     onSearchChange?.(value);
// // //   };

// // //   return (
// // //     <>
// // //       {/* Enhanced Backdrop */}
// // //       <div 
// // //         className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
// // //         onClick={onClose}
// // //         aria-hidden="true"
// // //       />
      
// // //       {/* Dropdown Container */}
// // //       <div
// // //         ref={dropdownRef}
// // //         id={id}
// // //         className={`
// // //           ${getPositionClasses()}
// // //           bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60
// // //           py-3 animate-slide-down
// // //           ${className}
// // //         `}
// // //         style={{ 
// // //           width: width === 'auto' ? 'auto' : `${width}px`,
// // //           maxWidth: '90vw',
// // //           ...style 
// // //         }}
// // //         role="menu"
// // //         aria-orientation="vertical"
// // //         {...props}
// // //       >
// // //         {/* Search Bar */}
// // //         {withSearch && (
// // //           <div className="px-4 py-3 border-b border-gray-100/60">
// // //             <div className="relative">
// // //               <input
// // //                 type="text"
// // //                 placeholder={searchPlaceholder}
// // //                 value={searchTerm}
// // //                 onChange={(e) => handleSearchChange(e.target.value)}
// // //                 className="w-full px-4 py-2.5 pl-10 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue/50 focus:border-sky-blue transition-all duration-300"
// // //                 autoFocus
// // //               />
// // //               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
// // //                 🔍
// // //               </div>
// // //               {searchTerm && (
// // //                 <button
// // //                   onClick={() => handleSearchChange('')}
// // //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
// // //                 >
// // //                   ✕
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Dropdown Content */}
// // //         <div 
// // //           className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
// // //           style={{ maxHeight }}
// // //         >
// // //           {filteredItems.length > 0 ? (
// // //             <div className="py-1">
// // //               {filteredItems.map((item, index) => 
// // //                 renderItem ? (
// // //                   <div key={item.id || index}>
// // //                     {renderItem({ item, index, onClose })}
// // //                   </div>
// // //                 ) : (
// // //                   <button
// // //                     key={item.id || index}
// // //                     onClick={(e) => {
// // //                       item.onClick?.(e);
// // //                       if (item.closeOnClick !== false) {
// // //                         onClose();
// // //                       }
// // //                     }}
// // //                     className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-sky-blue/10 hover:to-light-pink/10 hover:text-gray-900 transition-all duration-300 flex items-center group focus:outline-none focus:bg-gradient-to-r focus:from-sky-blue/10 focus:to-light-pink/10 focus:text-gray-900"
// // //                     role="menuitem"
// // //                     tabIndex={0}
// // //                   >
// // //                     {/* Item Icon */}
// // //                     {item.icon && (
// // //                       <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
// // //                         {item.icon}
// // //                       </span>
// // //                     )}

// // //                     {/* Item Content */}
// // //                     <div className="flex-1 min-w-0">
// // //                       <div className="font-medium text-gray-800 group-hover:bg-gradient-to-r group-hover:from-regal-blue group-hover:to-royal-pink group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
// // //                         {item.label}
// // //                       </div>
// // //                       {item.description && (
// // //                         <div className="text-sm text-gray-500 mt-1 leading-relaxed">
// // //                           {item.description}
// // //                         </div>
// // //                       )}
// // //                     </div>

// // //                     {/* Item Badge or Indicator */}
// // //                     {item.badge && (
// // //                       <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
// // //                         item.badge.variant === 'primary' 
// // //                           ? 'bg-gradient-to-r from-sky-blue to-light-pink text-white'
// // //                           : 'bg-gray-100 text-gray-600'
// // //                       }`}>
// // //                         {item.badge.text}
// // //                       </span>
// // //                     )}

// // //                     {/* Hover Indicator */}
// // //                     <div className="w-1.5 h-1.5 bg-gradient-to-r from-sky-blue to-light-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3" />
// // //                   </button>
// // //                 )
// // //               )}
// // //             </div>
// // //           ) : (
// // //             /* Empty State */
// // //             <div className="px-4 py-8 text-center">
// // //               <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-3">
// // //                 <span className="text-2xl text-gray-400">🔍</span>
// // //               </div>
// // //               <p className="text-gray-500 text-sm">No results found</p>
// // //               {withSearch && searchTerm && (
// // //                 <p className="text-gray-400 text-xs mt-1">Try adjusting your search</p>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Dropdown Footer */}
// // //         {props.footer && (
// // //           <div className="px-4 py-3 border-t border-gray-100/60 bg-gray-50/50 rounded-b-2xl">
// // //             {props.footer}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // // Specialized Dropdown Variants
// // // export const RoyalDropdown = (props) => (
// // //   <Dropdown
// // //     className="border-2 border-sky-blue/20 shadow-2xl"
// // //     style={{
// // //       background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
// // //       backdropFilter: 'blur(20px)'
// // //     }}
// // //     {...props}
// // //   />
// // // );

// // // export const CompactDropdown = (props) => (
// // //   <Dropdown
// // //     className="py-2 rounded-xl shadow-xl"
// // //     maxHeight="240px"
// // //     width="200"
// // //     {...props}
// // //   />
// // // );

// // // export default Dropdown;
// import React, { useEffect, useRef, useState } from 'react';
// import { Search, X, ChevronRight, Sparkles, Crown, Star } from 'lucide-react';

// /**
//  * Enhanced Dropdown Component with Health Tech Color Palette
//  * Features:
//  * - Smooth animations with health tech colors
//  * - Advanced positioning with viewport detection
//  * - Search, filtering, and sections
//  * - Custom render props for maximum flexibility
//  * - Touch and keyboard optimized
//  */

// const Dropdown = ({ 
//   isOpen, 
//   onClose, 
//   items = [],
//   position = 'left',
//   align = 'start',
//   className = '',
//   style = {},
//   id,
//   maxHeight = '320px',
//   width = 'auto',
//   withSearch = false,
//   searchPlaceholder = 'Search...',
//   onSearchChange,
//   renderItem,
//   premium = false,
//   glow = true,
//   ...props 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const dropdownRef = useRef(null);
//   const searchRef = useRef(null);

//   // Enhanced keyboard navigation
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (event) => {
//       const focusableElements = dropdownRef.current?.querySelectorAll(
//         'button, a, [tabindex]:not([tabindex="-1"])'
//       );
      
//       if (!focusableElements?.length) return;

//       const currentIndex = Array.from(focusableElements).findIndex(
//         el => el === document.activeElement
//       );

//       switch (event.key) {
//         case 'Escape':
//           event.preventDefault();
//           onClose();
//           break;
//         case 'ArrowDown':
//           event.preventDefault();
//           const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
//           focusableElements[nextIndex]?.focus();
//           setActiveIndex(nextIndex);
//           break;
//         case 'ArrowUp':
//           event.preventDefault();
//           const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
//           focusableElements[prevIndex]?.focus();
//           setActiveIndex(prevIndex);
//           break;
//         case 'Home':
//           event.preventDefault();
//           focusableElements[0]?.focus();
//           setActiveIndex(0);
//           break;
//         case 'End':
//           event.preventDefault();
//           focusableElements[focusableElements.length - 1]?.focus();
//           setActiveIndex(focusableElements.length - 1);
//           break;
//         case 'Enter':
//           if (currentIndex >= 0) {
//             event.preventDefault();
//             focusableElements[currentIndex]?.click();
//           }
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen, onClose]);

//   // Close on outside click
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('touchstart', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   // Focus search on open
//   useEffect(() => {
//     if (isOpen && withSearch && searchRef.current) {
//       setTimeout(() => searchRef.current?.focus(), 100);
//     }
//   }, [isOpen, withSearch]);

//   // Reset active index when items change
//   useEffect(() => {
//     setActiveIndex(-1);
//   }, [items, searchTerm]);

//   if (!isOpen) return null;

//   const filteredItems = withSearch
//     ? items.filter(item =>
//         item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.keywords?.some(keyword => 
//           keyword.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       )
//     : items;

//   const getPositionClasses = () => {
//     const baseClasses = 'absolute top-full mt-2 z-50 transform transition-all duration-300 ease-out';
    
//     const positionClasses = {
//       left: 'left-0 origin-top-left',
//       right: 'right-0 origin-top-right',
//       center: 'left-1/2 transform -translate-x-1/2 origin-top'
//     };

//     return `${baseClasses} ${positionClasses[position] || positionClasses.left}`;
//   };

//   const handleSearchChange = (value) => {
//     setSearchTerm(value);
//     onSearchChange?.(value);
//   };

//   return (
//     <>
//       {/* Enhanced Backdrop */}
//       <div 
//         className="fixed inset-0 z-40 bg-midnight-blue/30 backdrop-blur-sm animate-fade-in"
//         onClick={onClose}
//         aria-hidden="true"
//       />
      
//       {/* Dropdown Container */}
//       <div
//         ref={dropdownRef}
//         id={id}
//         className={`
//           ${getPositionClasses()}
//           bg-midnight-blue/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-electric-blue/30
//           py-3 animate-slide-down
//           ${premium ? 'shadow-lg shadow-vibrant-teal/20' : glow ? 'shadow-lg shadow-electric-blue/10' : ''}
//           ${className}
//         `}
//         style={{ 
//           width: width === 'auto' ? 'auto' : `${width}px`,
//           maxWidth: '90vw',
//           ...style 
//         }}
//         role="menu"
//         aria-orientation="vertical"
//         {...props}
//       >
//         {/* Premium Crown Badge */}
//         {premium && (
//           <div className="absolute -top-2 -right-2 z-10">
//             <div className="w-6 h-6 bg-gradient-to-r from-vibrant-teal to-electric-blue rounded-full flex items-center justify-center shadow-lg shadow-vibrant-teal/30 animate-pulse">
//               <Crown className="w-3 h-3 text-white" />
//             </div>
//           </div>
//         )}

//         {/* Search Bar */}
//         {withSearch && (
//           <div className="px-4 py-3 border-b border-electric-blue/20">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vibrant-teal" />
//               <input
//                 ref={searchRef}
//                 type="text"
//                 placeholder={searchPlaceholder}
//                 value={searchTerm}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 className="w-full px-4 py-2.5 pl-10 bg-electric-blue/10 border border-electric-blue/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-vibrant-teal/50 focus:border-vibrant-teal transition-all duration-300"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => handleSearchChange('')}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-vibrant-teal transition-colors duration-200"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Dropdown Content */}
//         <div 
//           className="overflow-y-auto scrollbar-thin scrollbar-thumb-electric-blue/40 scrollbar-track-transparent hover:scrollbar-thumb-electric-blue/60"
//           style={{ maxHeight }}
//         >
//           {filteredItems.length > 0 ? (
//             <div className="py-1">
//               {filteredItems.map((item, index) => 
//                 renderItem ? (
//                   <div key={item.id || index}>
//                     {renderItem({ item, index, onClose })}
//                   </div>
//                 ) : (
//                   <button
//                     key={item.id || index}
//                     onClick={(e) => {
//                       item.onClick?.(e);
//                       if (item.closeOnClick !== false) {
//                         onClose();
//                       }
//                     }}
//                     onMouseEnter={() => setActiveIndex(index)}
//                     className={`w-full text-left px-4 py-3 text-white transition-all duration-300 flex items-center group focus:outline-none relative overflow-hidden ${
//                       activeIndex === index 
//                         ? 'bg-electric-blue/20 text-vibrant-teal' 
//                         : 'hover:bg-gradient-to-r hover:from-vibrant-teal/10 hover:to-soft-mint/10 hover:text-vibrant-teal'
//                     }`}
//                     role="menuitem"
//                     tabIndex={0}
//                   >
//                     {/* Animated Background */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-vibrant-teal/0 via-vibrant-teal/5 to-vibrant-teal/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

//                     {/* Item Icon */}
//                     {item.icon && (
//                       <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
//                         {item.icon}
//                       </span>
//                     )}

//                     {/* Item Content */}
//                     <div className="flex-1 min-w-0 relative z-10">
//                       <div className="font-medium flex items-center space-x-2">
//                         <span>{item.label}</span>
//                         {item.badge && (
//                           <span className={`text-xs px-2 py-1 rounded-full ${
//                             item.badge.variant === 'vibrant-teal' 
//                               ? 'bg-vibrant-teal/20 text-vibrant-teal' 
//                               : item.badge.variant === 'electric-blue'
//                               ? 'bg-electric-blue/20 text-electric-blue'
//                               : 'bg-charcoal-grey/20 text-white'
//                           }`}>
//                             {item.badge.text}
//                           </span>
//                         )}
//                       </div>
//                       {item.description && (
//                         <div className="text-sm text-white/60 mt-1 leading-relaxed group-hover:text-white/80">
//                           {item.description}
//                         </div>
//                       )}
//                     </div>

//                     {/* Hover Indicator */}
//                     <ChevronRight className="w-4 h-4 text-electric-blue/60 group-hover:text-vibrant-teal transform group-hover:translate-x-1 transition-all duration-300 ml-3 relative z-10" />

//                     {/* Premium Sparkle */}
//                     {item.premium && (
//                       <Sparkles className="absolute right-3 w-3 h-3 text-vibrant-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     )}
//                   </button>
//                 )
//               )}
//             </div>
//           ) : (
//             /* Empty State */
//             <div className="px-4 py-8 text-center">
//               <div className="w-16 h-16 bg-electric-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                 <Search className="w-6 h-6 text-vibrant-teal" />
//               </div>
//               <p className="text-white/80 text-sm">No results found</p>
//               {withSearch && searchTerm && (
//                 <p className="text-white/60 text-xs mt-1">Try adjusting your search terms</p>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Dropdown Footer */}
//         {props.footer && (
//           <div className="px-4 py-3 border-t border-electric-blue/20 bg-electric-blue/10 rounded-b-2xl">
//             {props.footer}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// // Specialized Dropdown Variants
// export const RoyalDropdown = (props) => (
//   <Dropdown
//     premium
//     glow
//     className="border-2 border-vibrant-teal/20"
//     style={{
//       background: 'linear-gradient(135deg, rgba(13, 27, 42, 0.98) 0%, rgba(46, 58, 89, 0.95) 100%)',
//       backdropFilter: 'blur(20px)'
//     }}
//     {...props}
//   />
// );

// export const CompactDropdown = (props) => (
//   <Dropdown
//     className="py-2 rounded-xl"
//     maxHeight="240px"
//     width="200"
//     {...props}
//   />
// );

// export const GlassDropdown = (props) => (
//   <Dropdown
//     className="bg-electric-blue/10 backdrop-blur-2xl border border-electric-blue/20"
//     glow={false}
//     {...props}
//   />
// );

// // Sectioned Dropdown Component
// export const SectionedDropdown = ({ sections, ...props }) => {
//   const allItems = sections.flatMap(section => section.items);
  
//   return (
//     <Dropdown
//       {...props}
//       items={allItems}
//       renderItem={({ item, index, onClose }) => {
//         const section = sections.find(s => s.items.includes(item));
//         const isFirstInSection = section.items[0] === item;
        
//         return (
//           <div>
//             {isFirstInSection && (
//               <div className="px-4 py-2 bg-electric-blue/10 border-y border-electric-blue/20">
//                 <div className="text-xs font-semibold text-vibrant-teal uppercase tracking-wide">
//                   {section.title}
//                 </div>
//                 {section.description && (
//                   <div className="text-xs text-white/60 mt-1">
//                     {section.description}
//                   </div>
//                 )}
//               </div>
//             )}
//             <button
//               onClick={(e) => {
//                 item.onClick?.(e);
//                 if (item.closeOnClick !== false) {
//                   onClose();
//                 }
//               }}
//               className="w-full text-left px-4 py-3 text-white hover:bg-electric-blue/10 hover:text-vibrant-teal transition-all duration-300 flex items-center group"
//             >
//               {item.icon && (
//                 <span className="mr-3 text-lg">{item.icon}</span>
//               )}
//               <div className="flex-1">
//                 <div className="font-medium">{item.label}</div>
//                 {item.description && (
//                   <div className="text-sm text-white/60 mt-1">
//                     {item.description}
//                   </div>
//                 )}
//               </div>
//             </button>
//           </div>
//         );
//       }}
//     />
//   );
// };

// export default Dropdown;
import React, { useEffect } from 'react';

/**
 * Dropdown Component with Health Tech Color Palette
 * Simple and reliable dropdown that works with useDropdown hook
 */

const Dropdown = ({ 
  isOpen, 
  onClose, 
  items = [],
  onItemClick,
  position = 'left',
  className = '',
  id,
  ...props 
}) => {
  const dropdownRef = React.useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getPositionClasses = () => {
    const positionClasses = {
      left: 'left-0',
      right: 'right-0',
      center: 'left-1/2 transform -translate-x-1/2'
    };
    return `${positionClasses[position] || positionClasses.left}`;
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.onClick) {
      item.onClick();
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dropdown Container */}
      <div
        ref={dropdownRef}
        id={id}
        className={`
          absolute top-full mt-2 z-50
          ${getPositionClasses()}
          bg-midnight-blue border border-electric-blue/30 rounded-xl shadow-2xl
          py-2 min-w-48
          animate-slide-down
          ${className}
        `}
        role="menu"
        {...props}
      >
        {/* Dropdown Items */}
        <div className="py-1">
          {items.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => handleItemClick(item)}
              className="w-full text-left px-4 py-3 text-white hover:bg-electric-blue/20 hover:text-vibrant-teal transition-all duration-200 flex items-center group"
              role="menuitem"
              tabIndex={0}
            >
              {/* Item Icon */}
              {item.icon && (
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
              )}

              {/* Item Content */}
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-white/60 mt-1 group-hover:text-white/80">
                    {item.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;