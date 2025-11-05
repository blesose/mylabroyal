// // // import React, { useState, useEffect } from "react";
// // // import { Link, useLocation, useNavigate } from "react-router-dom";
// // // import Dropdown from "../ui/Dropdown";
// // // import { useDropdown } from "../../hooks/useDropdown";

// // // const Navbar = () => {
// // //   // 🔹 Track login state
// // //   const [user, setUser] = useState(null);

// // //   // 🔹 Router tools
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   // 🔹 Dropdown logic from custom hook
// // //   const {
// // //     activeDropdown,
// // //     toggleDropdown,
// // //     closeDropdown,
// // //     closeAllDropdowns,
// // //     getDropdownProps,
// // //     getMenuProps,
// // //     isDropdownOpen,
// // //   } = useDropdown();

// // //   // 🔹 Mobile menu toggle
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // //   // 🔹 Scroll effect (adds shadow/blur when scrolling)
// // //   const [scrolled, setScrolled] = useState(false);

// // //   // 🔹 Listen for scroll
// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // 🔹 Load user from localStorage on first render
// // //   useEffect(() => {
// // //     const userData = localStorage.getItem("user");
// // //     if (userData) {
// // //       setUser(JSON.parse(userData));
// // //     }
// // //   }, []);

// // //   // 🔹 Handle logout
// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("user");
// // //     window.location.href = "/login";
// // //   };

// // //   // 🔹 Check if current path matches
// // //   const isActivePath = (path) => location.pathname === path;
// // //   const isActiveModule = (path) => location.pathname.startsWith(path);

// // //   // 🔹 Dropdown lists
// // //   const femaleHealthItems = [
// // //     { id: 1, label: "Cycle Tracking", path: "/female-health/cycle", icon: "📅" },
// // //     { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴" },
// // //     { id: 3, label: "Pregnancy Wellness", path: "/pregnancy", icon: "🤰" },
// // //   ];

// // //   const menHealthItems = [
// // //     { id: 1, label: "Health Tracking", path: "/men-health/tracker", icon: "💪" },
// // //     { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴" },
// // //   ];

// // //   const selfCareItems = [
// // //     { id: 1, label: "Wellness Activities", path: "/self-care/activities", icon: "🧘" },
// // //     { id: 2, label: "Relaxation", path: "/self-care/relaxation", icon: "🌿" },
// // //   ];

// // //   // 🔹 Handle dropdown item click
// // //   const handleDropdownItemClick = (path) => {
// // //     closeAllDropdowns();
// // //     setMobileMenuOpen(false);
// // //     navigate(path);
// // //   };

// // //   return (
// // //     <nav
// // //       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
// // //         scrolled
// // //           ? "bg-white/70 backdrop-blur-md shadow-md"
// // //           : "bg-transparent"
// // //       }`}
// // //     >
// // //       {/* Gradient line on top */}
// // //       <div className="h-1 bg-gradient-to-r from-sky-500 via-pink-500 to-rose-300"></div>

// // //       {/* Navbar content */}
// // //       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
// // //         {/* Logo */}
// // //         <Link
// // //           to="/"
// // //           className="flex items-center space-x-2"
// // //           onClick={closeAllDropdowns}
// // //         >
// // //           <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-sky-500 to-pink-500 rounded-xl shadow-lg text-white font-bold">
// // //             ML
// // //           </div>
// // //           <div>
// // //             <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-pink-500 text-transparent bg-clip-text">
// // //               MyLab
// // //             </h1>
// // //             <p className="text-xs text-gray-500">Royal Wellness</p>
// // //           </div>
// // //         </Link>

// // //         {/* Desktop Menu */}
// // //         <div className="hidden lg:flex items-center space-x-4">
// // //           {/* Regular links and dropdowns */}
// // //           {[
// // //             { path: "/", label: "Home", icon: "🏠" },
// // //             { label: "Female Health", dropdown: "female", items: femaleHealthItems },
// // //             { label: "Men’s Health", dropdown: "men", items: menHealthItems },
// // //             { label: "Self Care", dropdown: "self", items: selfCareItems },
// // //             { path: "/contact", label: "Contact", icon: "📞" },
// // //           ].map((item) =>
// // //             item.items ? (
// // //               <div
// // //                 key={item.label}
// // //                 {...getDropdownProps(item.dropdown)}
// // //                 className="relative"
// // //               >
// // //                 <button
// // //                   onClick={() => toggleDropdown(item.dropdown)}
// // //                   className={`px-3 py-2 rounded-md font-medium flex items-center space-x-1 ${
// // //                     isDropdownOpen(item.dropdown)
// // //                       ? "text-sky-600"
// // //                       : "text-gray-700 hover:text-sky-500"
// // //                   }`}
// // //                 >
// // //                   <span>{item.label}</span>
// // //                   <span>▾</span>
// // //                 </button>

// // //                 {/* Dropdown Menu */}
// // //                 {isDropdownOpen(item.dropdown) && (
// // //                   <Dropdown
// // //                     {...getMenuProps(item.dropdown)}
// // //                     items={item.items}
// // //                     onItemClick={handleDropdownItemClick}
// // //                   />
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               <Link
// // //                 key={item.path}
// // //                 to={item.path}
// // //                 className={`px-3 py-2 rounded-md font-medium ${
// // //                   isActivePath(item.path)
// // //                     ? "text-sky-600"
// // //                     : "text-gray-700 hover:text-sky-500"
// // //                 }`}
// // //                 onClick={closeAllDropdowns}
// // //               >
// // //                 {item.label}
// // //               </Link>
// // //             )
// // //           )}

// // //           {/* Auth Buttons */}
// // //           {user ? (
// // //             <div className="flex items-center space-x-3">
// // //               <span className="text-gray-600">Hi, {user.name}</span>
// // //               <button
// // //                 onClick={handleLogout}
// // //                 className="px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
// // //               >
// // //                 Logout
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <Link
// // //               to="/login"
// // //               className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
// // //             >
// // //               Login
// // //             </Link>
// // //           )}
// // //         </div>

// // //         {/* Mobile menu button */}
// // //         <button
// // //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //           className="lg:hidden flex flex-col space-y-1"
// // //         >
// // //           <span
// // //             className={`w-6 h-0.5 bg-gray-700 transition ${
// // //               mobileMenuOpen ? "rotate-45 translate-y-2" : ""
// // //             }`}
// // //           ></span>
// // //           <span
// // //             className={`w-6 h-0.5 bg-gray-700 transition ${
// // //               mobileMenuOpen ? "opacity-0" : ""
// // //             }`}
// // //           ></span>
// // //           <span
// // //             className={`w-6 h-0.5 bg-gray-700 transition ${
// // //               mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
// // //             }`}
// // //           ></span>
// // //         </button>
// // //       </div>

// // //       {/* Mobile Menu Panel */}
// // //       {mobileMenuOpen && (
// // //         <div className="lg:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4 space-y-2">
// // //           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700">
// // //             Home
// // //           </Link>
// // //           <button
// // //             onClick={() => toggleDropdown("female")}
// // //             className="w-full text-left text-gray-700"
// // //           >
// // //             Female Health ▾
// // //           </button>
// // //           {isDropdownOpen("female") && (
// // //             <Dropdown
// // //               {...getMenuProps("female")}
// // //               items={femaleHealthItems}
// // //               onItemClick={handleDropdownItemClick}
// // //             />
// // //           )}

// // //           <button
// // //             onClick={() => toggleDropdown("men")}
// // //             className="w-full text-left text-gray-700"
// // //           >
// // //             Men’s Health ▾
// // //           </button>
// // //           {isDropdownOpen("men") && (
// // //             <Dropdown
// // //               {...getMenuProps("men")}
// // //               items={menHealthItems}
// // //               onItemClick={handleDropdownItemClick}
// // //             />
// // //           )}

// // //           <button
// // //             onClick={() => toggleDropdown("self")}
// // //             className="w-full text-left text-gray-700"
// // //           >
// // //             Self Care ▾
// // //           </button>
// // //           {isDropdownOpen("self") && (
// // //             <Dropdown
// // //               {...getMenuProps("self")}
// // //               items={selfCareItems}
// // //               onItemClick={handleDropdownItemClick}
// // //             />
// // //           )}

// // //           {user ? (
// // //             <button
// // //               onClick={handleLogout}
// // //               className="block w-full bg-sky-500 text-white py-2 rounded-md mt-2"
// // //             >
// // //               Logout
// // //             </button>
// // //           ) : (
// // //             <Link
// // //               to="/login"
// // //               onClick={() => setMobileMenuOpen(false)}
// // //               className="block bg-sky-500 text-white py-2 rounded-md mt-2 text-center"
// // //             >
// // //               Login
// // //             </Link>
// // //           )}
// // //         </div>
// // //       )}
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // // // import React, { useRef, useState, useEffect } from 'react';
// // // // import { Link, useLocation, useNavigate } from 'react-router-dom';
// // // // import { useDropdown } from '../../hooks/useDropdown';
// // // // import Dropdown from '../ui/Dropdown';

// // // // const Navbar = () => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // // // // Add this to your Navbar component
// // // // const [user, setUser] = useState(null);

// // // // useEffect(() => {
// // // //   const userData = localStorage.getItem('user');
// // // //   if (userData) {
// // // //     setUser(JSON.parse(userData));
// // // //   }
// // // // }, []);

// // // // const handleLogout = () => {
// // // //   localStorage.removeItem('token');
// // // //   localStorage.removeItem('user');
// // // //   window.location.href = '/login';
// // // // };

// // // // // Replace the login button with:
// // // // {user ? (
// // // //   <div className="flex items-center space-x-4">
// // // //     <span className="text-white">Hello, {user.name}</span>
// // // //     <button
// // // //       onClick={handleLogout}
// // // //       className="bg-white text-sky-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
// // // //     >
// // // //       Logout
// // // //     </button>
// // // //   </div>
// // // // ) : (
// // // //   <Link
// // // //     to="/login"
// // // //     className="bg-white text-sky-blue px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 hover-lift transition-all duration-200 shadow-md"
// // // //   >
// // // //     Login
// // // //   </Link>
// // // // )}
// // // //   // Scroll effect
// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       setScrolled(window.scrollY > 20);
// // // //     };
// // // //     window.addEventListener('scroll', handleScroll);
// // // //     return () => window.removeEventListener('scroll', handleScroll);
// // // //   }, []);

// // // //   const {
// // // //     activeDropdown,
// // // //     toggleDropdown,
// // // //     closeDropdown,
// // // //     closeAllDropdowns,
// // // //     getDropdownProps,
// // // //     getMenuProps,
// // // //     isDropdownOpen
// // // //   } = useDropdown();

// // // //   const femaleHealthItems = [
// // // //     {
// // // //       id: 1,
// // // //       label: 'Cycle Tracking',
// // // //       path: '/female-health/cycle',
// // // //       icon: '📅',
// // // //       description: 'Track menstrual cycles with precision',
// // // //       badge: { text: 'New', variant: 'primary' }
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       label: 'Sleep Recovery',
// // // //       path: '/sleep-recovery',
// // // //       icon: '😴',
// // // //       description: 'Monitor sleep patterns deeply'
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       label: 'Ovulation Prediction',
// // // //       path: '/female-health/ovulation',
// // // //       icon: '📊',
// // // //       description: 'Predict fertile windows accurately'
// // // //     },
// // // //     {
// // // //       id: 4,
// // // //       label: 'Pregnancy Progress',
// // // //       path: '/female-health/pregnancy',
// // // //       icon: '🤰',
// // // //       description: 'Monitor pregnancy journey elegantly'
// // // //     },
// // // //     {
// // // //       id: 5,
// // // //       label: 'Health Education',
// // // //       path: '/female-health/education',
// // // //       icon: '📚',
// // // //       description: 'Learn about health topics royally'
// // // //     }
// // // //   ];

// // // //   const menHealthItems = [
// // // //     {
// // // //       id: 1,
// // // //       label: 'Health Tracking',
// // // //       path: '/men-health/tracker',
// // // //       icon: '💪',
// // // //       description: 'Track health metrics powerfully'
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       label: 'Sleep Recovery',
// // // //       path: '/sleep-recovery',
// // // //       icon: '😴',
// // // //       description: 'Monitor sleep patterns deeply'
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       label: 'Fitness Insights',
// // // //       path: '/men-health/fitness',
// // // //       icon: '🎯',
// // // //       description: 'Get personalized fitness guidance'
// // // //     }
// // // //   ];

// // // //   const selfCareItems = [
// // // //     {
// // // //       id: 1,
// // // //       label: 'Wellness Activities',
// // // //       path: '/self-care/activities',
// // // //       icon: '🧘',
// // // //       description: 'Self-care practices mindfully'
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       label: 'Mental Wellness',
// // // //       path: '/self-care/education',
// // // //       icon: '📖',
// // // //       description: 'Mental wellness tips daily'
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       label: 'Lab Insights',
// // // //       path: '/lab-insights',
// // // //       icon: '📈',
// // // //       description: 'View your royal reports'
// // // //     }
// // // //   ];

// // // //   const isActivePath = (path) => location.pathname === path;
// // // //   const isActiveModule = (modulePath) => location.pathname.startsWith(modulePath);

// // // //   const handleDropdownItemClick = (path) => {
// // // //     closeAllDropdowns();
// // // //     setMobileMenuOpen(false);
// // // //     navigate(path);
// // // //   };

// // // //   return (
// // // //     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
// // // //       scrolled 
// // // //         ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20' 
// // // //         : 'bg-transparent'
// // // //     }`}>
// // // //       {/* Premium Gradient Border */}
// // // //       <div className="h-1 bg-gradient-to-r from-sky-blue via-royal-pink to-light-pink"></div>
      
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //         <div className="flex justify-between items-center h-20">
// // // //           {/* Logo */}
// // // //           <Link 
// // // //             to="/" 
// // // //             className="flex items-center space-x-3 group"
// // // //             onClick={closeAllDropdowns}
// // // //           >
// // // //             <div className="relative">
// // // //               <div className="w-12 h-12 bg-gradient-to-r from-regal-blue to-royal-pink rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
// // // //                 <span className="text-xl font-bold text-white">ML</span>
// // // //               </div>
// // // //               <div className="absolute -inset-1 bg-gradient-to-r from-sky-blue to-light-pink rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
// // // //             </div>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold bg-gradient-to-r from-regal-blue to-royal-pink bg-clip-text text-transparent">
// // // //                 MyLab
// // // //               </h1>
// // // //               <p className="text-xs text-gray-500 -mt-1">Royal Wellness</p>
// // // //             </div>
// // // //           </Link>

// // // //           {/* Desktop Navigation */}
// // // //           <div className="hidden lg:flex items-center space-x-1">
// // // //             {[
// // // //               { path: '/', label: 'Home', icon: '🏠' },
// // // //               { path: '/female-health', label: 'Female Health', dropdown: 'femaleHealth', items: femaleHealthItems },
// // // //               { path: '/men-health', label: 'Men\'s Health', dropdown: 'menHealth', items: menHealthItems },
// // // //               { path: '/self-care', label: 'Self Care', dropdown: 'selfCare', items: selfCareItems },
// // // //               { path: '/fitness-nutrition', label: 'Fitness & Nutrition', icon: '🍏' },
// // // //               { path: '/community', label: 'Community', icon: '👑' },
// // // //               { path: '/register', label: 'Signup', icon: '👑' }
// // // //             ].map((item) => (
// // // //               <div key={item.label} className="relative">
// // // //                 {item.dropdown ? (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={(e) => toggleDropdown(item.dropdown, e.currentTarget)}
// // // //                       onMouseEnter={() => toggleDropdown(item.dropdown)}
// // // //                       {...getDropdownProps(item.dropdown)}
// // // //                       className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 group ${
// // // //                         isActiveModule(item.path)
// // // //                           ? 'bg-gradient-to-r from-sky-blue/20 to-light-pink/20 text-regal-blue border border-sky-blue/30'
// // // //                           : 'text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-lg'
// // // //                       }`}
// // // //                     >
// // // //                       <span>{item.icon}</span>
// // // //                       <span>{item.label}</span>
// // // //                       <svg 
// // // //                         className={`w-4 h-4 transition-transform duration-200 ${
// // // //                           isDropdownOpen(item.dropdown) ? 'rotate-180' : ''
// // // //                         }`} 
// // // //                         fill="none" 
// // // //                         stroke="currentColor" 
// // // //                         viewBox="0 0 24 24"
// // // //                       >
// // // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// // // //                       </svg>
// // // //                     </button>
                    
// // // //                     <Dropdown
// // // //                       isOpen={isDropdownOpen(item.dropdown)}
// // // //                       onClose={closeDropdown}
// // // //                       items={item.items.map(dropdownItem => ({
// // // //                         ...dropdownItem,
// // // //                         onClick: () => handleDropdownItemClick(dropdownItem.path)
// // // //                       }))}
// // // //                       {...getMenuProps(item.dropdown)}
// // // //                       withSearch={item.items.length > 5}
// // // //                       searchPlaceholder={`Search ${item.label}...`}
// // // //                     />
// // // //                   </>
// // // //                 ) : (
// // // //                   <Link
// // // //                     to={item.path}
// // // //                     className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 group ${
// // // //                       isActivePath(item.path)
// // // //                         ? 'bg-gradient-to-r from-sky-blue/20 to-light-pink/20 text-regal-blue border border-sky-blue/30'
// // // //                         : 'text-gray-700 hover:bg-white/80 hover:text-gray-900 hover:shadow-lg'
// // // //                     }`}
// // // //                     onClick={closeAllDropdowns}
// // // //                   >
// // // //                     <span>{item.icon}</span>
// // // //                     <span>{item.label}</span>
// // // //                   </Link>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Auth Buttons */}
// // // //           <div className="hidden lg:flex items-center space-x-4">
            
// // // //             <button className="ml-3 px-8 py-2 bg-gradient-to-r from-regal-blue to-royal-pink text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
// // // //               Get Started
// // // //             </button>
// // // //           </div> 

// // // //           {/* Mobile Menu Button */}
// // // //           <button
// // // //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // // //             className="lg:hidden w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-1.5 shadow-lg border border-gray-200"
// // // //           >
// // // //             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
// // // //               mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
// // // //             }`}></span>
// // // //             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
// // // //               mobileMenuOpen ? 'opacity-0' : 'opacity-100'
// // // //             }`}></span>
// // // //             <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
// // // //               mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
// // // //             }`}></span>
// // // //           </button>
// // // //         </div>

// // // //         {/* Mobile Menu */}
// // // //         {mobileMenuOpen && (
// // // //           <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl animate-slide-down">
// // // //             <div className="px-4 py-6 space-y-4">
// // // //               {[
// // // //                 { path: '/', label: 'Home', icon: '🏠' },
// // // //                 { path: '/female-health', label: 'Female Health', items: femaleHealthItems },
// // // //                 { path: '/men-health', label: 'Men\'s Health', items: menHealthItems },
// // // //                 { path: '/self-care', label: 'Self Care', items: selfCareItems },
// // // //                 { path: '/fitness-nutrition', label: 'Fitness & Nutrition', icon: '🍏' },
// // // //                 { path: '/fitness-nutrition', label: 'Fitness & Nutrition', icon: '🍏' },
// // // //                 { path: '/community', label: 'Community', icon: '👑' },
// // // //                 { path: '/register', label: 'Signup', icon: '👑' }
// // // //               ].map((item) => (
// // // //                 <div key={item.label}>
// // // //                   {item.items ? (
// // // //                     <div className="space-y-2">
// // // //                       <div className="font-semibold text-gray-800 px-4 py-2 border-l-4 border-sky-blue bg-sky-blue/10 rounded-r-xl">
// // // //                         {item.label}
// // // //                       </div>
// // // //                       <div className="ml-6 space-y-2">
// // // //                         {item.items.map((subItem) => (
// // // //                           <button
// // // //                             key={subItem.id}
// // // //                             onClick={() => handleDropdownItemClick(subItem.path)}
// // // //                             className="w-full text-left px-4 py-3 rounded-xl hover:bg-sky-blue/10 transition-all duration-300 flex items-center space-x-3"
// // // //                           >
// // // //                             <span className="text-lg">{subItem.icon}</span>
// // // //                             <div>
// // // //                               <div className="font-medium text-gray-800">{subItem.label}</div>
// // // //                               <div className="text-sm text-gray-500">{subItem.description}</div>
// // // //                             </div>
// // // //                           </button>
// // // //                         ))}
// // // //                       </div>
// // // //                     </div>
// // // //                   ) : (
// // // //                     <Link
// // // //                       to={item.path}
// // // //                       onClick={() => setMobileMenuOpen(false)}
// // // //                       className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
// // // //                         isActivePath(item.path)
// // // //                           ? 'bg-gradient-to-r from-sky-blue/20 to-light-pink/20 text-regal-blue font-semibold'
// // // //                           : 'hover:bg-gray-100 text-gray-700'
// // // //                       }`}
// // // //                     >
// // // //                       <span className="text-lg">{item.icon}</span>
// // // //                       <span>{item.label}</span>
// // // //                     </Link>
// // // //                   )}
// // // //                 </div>
// // // //               ))}
              
// // // //               {/* Mobile Auth Buttons */}
// // // //               <div className="pt-4 border-t border-gray-200 space-y-3">
// // // //                 <button className="w-full px-6 py-3 text-gray-700 font-semibold border-2 border-gray-300 rounded-2xl hover:border-regal-blue hover:text-regal-blue transition-all duration-300">
// // // //                   Sign In
// // // //                 </button>
// // // //                 <button className="w-full px-6 py-3 bg-gradient-to-r from-regal-blue to-royal-pink text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
// // // //                   Get Started
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;
// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import Dropdown from "../ui/Dropdown";
// // import { useDropdown } from "../../hooks/useDropdown";

// // const Navbar = () => {
// //   const [user, setUser] = useState(null);
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const {
// //     toggleDropdown,
// //     closeDropdown,
// //     closeAllDropdowns,
// //     getDropdownProps,
// //     getMenuProps,
// //     isDropdownOpen,
// //   } = useDropdown();

// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     const userData = localStorage.getItem("user");
// //     if (userData) setUser(JSON.parse(userData));
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     window.location.href = "/login";
// //   };

// //   const isActivePath = (path) => location.pathname === path;

// //   const femaleHealthItems = [
// //     { id: 1, label: "Cycle Tracking", path: "/female-health/cycle", icon: "📅" },
// //     { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴" },
// //     { id: 3, label: "Pregnancy Wellness", path: "/pregnancy", icon: "🤰" },
// //   ];

// //   const menHealthItems = [
// //     { id: 1, label: "Health Tracking", path: "/men-health/tracker", icon: "💪" },
// //     { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴" },
// //   ];

// //   const selfCareItems = [
// //     { id: 1, label: "Wellness Activities", path: "/self-care/activities", icon: "🧘" },
// //     { id: 2, label: "Relaxation", path: "/self-care/relaxation", icon: "🌿" },
// //   ];

// //   const handleDropdownItemClick = (path) => {
// //     closeAllDropdowns();
// //     setMobileMenuOpen(false);
// //     navigate(path);
// //   };

// //   return (
// //     <nav
// //       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
// //         scrolled
// //           ? "bg-[#0B132B]/80 backdrop-blur-md shadow-lg border-b border-[#688F48]/30"
// //           : "bg-transparent"
// //       }`}
// //     >
// //       {/* Top gradient accent line */}
// //       <div className="h-1 bg-gradient-to-r from-[#688F48] via-[#B1D182] to-[#F4F1E9]"></div>

// //       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
// //         {/* === Logo === */}
// //         <Link
// //           to="/"
// //           className="flex items-center space-x-2"
// //           onClick={closeAllDropdowns}
// //         >
// //           <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#688F48] to-[#B1D182] rounded-xl shadow-lg text-[#0B132B] font-bold">
// //             ML
// //           </div>
// //           <div>
// //             <h1 className="text-2xl font-bold bg-gradient-to-r from-[#B1D182] to-[#F4F1E9] text-transparent bg-clip-text">
// //               MyLab
// //             </h1>
// //             <p className="text-xs text-[#B1D182]/70">Royal Wellness</p>
// //           </div>
// //         </Link>

// //         {/* === Desktop Menu === */}
// //         <div className="hidden lg:flex items-center space-x-4">
// //           {[
// //             { path: "/", label: "Home", icon: "🏠" },
// //             { label: "Female Health", dropdown: "female", items: femaleHealthItems },
// //             { label: "Men’s Health", dropdown: "men", items: menHealthItems },
// //             { label: "Self Care", dropdown: "self", items: selfCareItems },
// //             { path: "/contact", label: "Contact", icon: "📞" },
// //           ].map((item) =>
// //             item.items ? (
// //               <div
// //                 key={item.label}
// //                 {...getDropdownProps(item.dropdown)}
// //                 className="relative"
// //               >
// //                 <button
// //                   onClick={() => toggleDropdown(item.dropdown)}
// //                   className={`px-3 py-2 rounded-md font-medium flex items-center space-x-1 transition ${
// //                     isDropdownOpen(item.dropdown)
// //                       ? "text-[#B1D182]"
// //                       : "text-[#F4F1E9]/90 hover:text-[#B1D182]"
// //                   }`}
// //                 >
// //                   <span>{item.label}</span>
// //                   <span>▾</span>
// //                 </button>

// //                 {isDropdownOpen(item.dropdown) && (
// //                   <Dropdown
// //                     {...getMenuProps(item.dropdown)}
// //                     items={item.items}
// //                     onItemClick={handleDropdownItemClick}
// //                   />
// //                 )}
// //               </div>
// //             ) : (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`px-3 py-2 rounded-md font-medium transition ${
// //                   isActivePath(item.path)
// //                     ? "text-[#B1D182]"
// //                     : "text-[#F4F1E9]/90 hover:text-[#B1D182]"
// //                 }`}
// //                 onClick={closeAllDropdowns}
// //               >
// //                 {item.label}
// //               </Link>
// //             )
// //           )}

// //           {/* === Auth Buttons === */}
// //           {user ? (
// //             <div className="flex items-center space-x-3">
// //               <span className="text-[#F4F1E9]/80">Hi, {user.name}</span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="px-3 py-2 bg-[#688F48] text-[#F4F1E9] rounded-md hover:bg-[#B1D182] hover:text-[#0B132B] transition"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           ) : (
// //             <Link
// //               to="/login"
// //               className="px-4 py-2 bg-[#688F48] text-[#F4F1E9] rounded-md hover:bg-[#B1D182] hover:text-[#0B132B] transition"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </div>

// //         {/* === Mobile Menu Button === */}
// //         <button
// //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //           className="lg:hidden flex flex-col space-y-1"
// //         >
// //           <span
// //             className={`w-6 h-0.5 bg-[#F4F1E9] transition ${
// //               mobileMenuOpen ? "rotate-45 translate-y-2" : ""
// //             }`}
// //           ></span>
// //           <span
// //             className={`w-6 h-0.5 bg-[#F4F1E9] transition ${
// //               mobileMenuOpen ? "opacity-0" : ""
// //             }`}
// //           ></span>
// //           <span
// //             className={`w-6 h-0.5 bg-[#F4F1E9] transition ${
// //               mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
// //             }`}
// //           ></span>
// //         </button>
// //       </div>

// //       {/* === Mobile Menu === */}
// //       {mobileMenuOpen && (
// //         <div className="lg:hidden bg-[#0B132B] border-t border-[#688F48]/40 shadow-md px-6 py-4 space-y-2 text-[#F4F1E9]">
// //           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#B1D182]">
// //             Home
// //           </Link>

// //           {/* Female Health */}
// //           <button
// //             onClick={() => toggleDropdown("female")}
// //             className="w-full text-left hover:text-[#B1D182]"
// //           >
// //             Female Health ▾
// //           </button>
// //           {isDropdownOpen("female") && (
// //             <Dropdown
// //               {...getMenuProps("female")}
// //               items={femaleHealthItems}
// //               onItemClick={handleDropdownItemClick}
// //             />
// //           )}

// //           {/* Men’s Health */}
// //           <button
// //             onClick={() => toggleDropdown("men")}
// //             className="w-full text-left hover:text-[#B1D182]"
// //           >
// //             Men’s Health ▾
// //           </button>
// //           {isDropdownOpen("men") && (
// //             <Dropdown
// //               {...getMenuProps("men")}
// //               items={menHealthItems}
// //               onItemClick={handleDropdownItemClick}
// //             />
// //           )}

// //           {/* Self Care */}
// //           <button
// //             onClick={() => toggleDropdown("self")}
// //             className="w-full text-left hover:text-[#B1D182]"
// //           >
// //             Self Care ▾
// //           </button>
// //           {isDropdownOpen("self") && (
// //             <Dropdown
// //               {...getMenuProps("self")}
// //               items={selfCareItems}
// //               onItemClick={handleDropdownItemClick}
// //             />
// //           )}

// //           {/* Auth */}
// //           {user ? (
// //             <button
// //               onClick={handleLogout}
// //               className="block w-full bg-[#688F48] text-[#F4F1E9] py-2 rounded-md mt-2 hover:bg-[#B1D182] hover:text-[#0B132B] transition"
// //             >
// //               Logout
// //             </button>
// //           ) : (
// //             <Link
// //               to="/login"
// //               onClick={() => setMobileMenuOpen(false)}
// //               className="block bg-[#688F48] text-[#F4F1E9] py-2 rounded-md mt-2 text-center hover:bg-[#B1D182] hover:text-[#0B132B] transition"
// //             >
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Dropdown from "../ui/Dropdown";
// import { useDropdown } from "../../hooks/useDropdown";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     toggleDropdown,
//     closeDropdown,
//     closeAllDropdowns,
//     getDropdownProps,
//     getMenuProps,
//     isDropdownOpen,
//   } = useDropdown();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) setUser(JSON.parse(userData));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const isActivePath = (path) => location.pathname === path;

//   // Updated with correct routes that exist in your app
//   const femaleHealthItems = [
//     { 
//       id: 1, 
//       label: "Cycle Tracking", 
//       path: "/female-health/cycle", 
//       icon: "📅",
//       description: "Track menstrual cycles"
//     },
//     { 
//       id: 2, 
//       label: "Ovulation Tracking", 
//       path: "/female-health/ovulation", 
//       icon: "📊",
//       description: "Predict fertile windows"
//     },
//     { 
//       id: 3, 
//       label: "Pregnancy Tracking", 
//       path: "/female-health/pregnancy", 
//       icon: "🤰",
//       description: "Monitor pregnancy journey"
//     },
//   ];

//   const menHealthItems = [
//     { 
//       id: 1, 
//       label: "Health Tracking", 
//       path: "/men-health", 
//       icon: "💪",
//       description: "Track health metrics"
//     },
//     { 
//       id: 2, 
//       label: "Sleep Recovery", 
//       path: "/sleep-recovery", 
//       icon: "😴",
//       description: "Monitor sleep patterns"
//     },
//   ];

//   const selfCareItems = [
//     { 
//       id: 1, 
//       label: "Wellness Activities", 
//       path: "/self-care", 
//       icon: "🧘",
//       description: "Self-care practices"
//     },
//     { 
//       id: 2, 
//       label: "Fitness & Nutrition", 
//       path: "/fitness-nutrition", 
//       icon: "💪",
//       description: "Workouts and meals"
//     },
//   ];

//   const handleDropdownItemClick = (item) => {
//     closeAllDropdowns();
//     setMobileMenuOpen(false);
//     navigate(item.path);
//   };

//   const mainMenuItems = [
//     { path: "/", label: "Home" },
//     { path: "/dashboard", label: "Dashboard" },
//     { label: "Female Health", dropdown: "female", items: femaleHealthItems },
//     { label: "Men's Health", dropdown: "men", items: menHealthItems },
//     { label: "Self Care", dropdown: "self", items: selfCareItems },
//     { path: "/community", label: "Community" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-midnight-blue/95 backdrop-blur-md shadow-lg border-b border-vibrant-teal/30"
//           : "bg-midnight-blue"
//       }`}
//     >
//       {/* Top gradient accent line */}
//       <div className="h-1 bg-gradient-to-r from-vibrant-teal via-electric-blue to-soft-mint"></div>

//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
//         {/* === Logo === */}
//         <Link
//           to="/"
//           className="flex items-center space-x-2"
//           onClick={closeAllDropdowns}
//         >
//           <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-vibrant-teal to-electric-blue rounded-xl shadow-lg text-white font-bold">
//             ML
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gradient-health">
//               MyLab
//             </h1>
//             <p className="text-xs text-soft-mint/70">Health & Wellness</p>
//           </div>
//         </Link>

//         {/* === Desktop Menu === */}
//         <div className="hidden lg:flex items-center space-x-1">
//           {mainMenuItems.map((item) =>
//             item.items ? (
//               <div
//                 key={item.label}
//                 className="relative"
//               >
//                 <button
//                   onClick={() => toggleDropdown(item.dropdown)}
//                   {...getDropdownProps(item.dropdown)}
//                   className={`nav-link flex items-center space-x-1 ${
//                     location.pathname.startsWith(`/${item.dropdown}`) ? 'active' : ''
//                   }`}
//                 >
//                   <span>{item.label}</span>
//                   <svg 
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       isDropdownOpen(item.dropdown) ? 'rotate-180' : ''
//                     }`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {isDropdownOpen(item.dropdown) && (
//                   <Dropdown
//                     {...getMenuProps(item.dropdown)}
//                     items={item.items}
//                     onItemClick={handleDropdownItemClick}
//                   />
//                 )}
//               </div>
//             ) : (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`nav-link ${
//                   isActivePath(item.path) ? 'active' : ''
//                 }`}
//                 onClick={closeAllDropdowns}
//               >
//                 {item.label}
//               </Link>
//             )
//           )}

//           {/* === Auth Buttons === */}
//           {user ? (
//             <div className="flex items-center space-x-3 ml-4">
//               <span className="text-white/80 text-sm">Hi, {user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="btn-secondary text-sm"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-2 ml-4">
//               <Link
//                 to="/login"
//                 className="btn-ghost text-sm"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="btn-primary text-sm"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* === Mobile Menu Button === */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="lg:hidden flex flex-col space-y-1 p-2"
//         >
//           <span
//             className={`w-6 h-0.5 bg-white transition ${
//               mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
//             }`}
//           ></span>
//           <span
//             className={`w-6 h-0.5 bg-white transition ${
//               mobileMenuOpen ? "opacity-0" : "opacity-100"
//             }`}
//           ></span>
//           <span
//             className={`w-6 h-0.5 bg-white transition ${
//               mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
//             }`}
//           ></span>
//         </button>
//       </div>

//       {/* === Mobile Menu === */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-midnight-blue/95 backdrop-blur-md border-t border-vibrant-teal/30 px-6 py-4 space-y-3">
//           {mainMenuItems.map((item) =>
//             item.items ? (
//               <div key={item.label} className="space-y-2">
//                 <button
//                   onClick={() => toggleDropdown(`mobile-${item.dropdown}`)}
//                   className="w-full text-left text-white hover:text-vibrant-teal py-2 font-medium flex items-center justify-between"
//                 >
//                   <span>{item.label}</span>
//                   <svg 
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       isDropdownOpen(`mobile-${item.dropdown}`) ? 'rotate-180' : ''
//                     }`} 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {isDropdownOpen(`mobile-${item.dropdown}`) && (
//                   <div className="ml-4 space-y-2 border-l-2 border-vibrant-teal/30 pl-4">
//                     {item.items.map((subItem) => (
//                       <button
//                         key={subItem.id}
//                         onClick={() => handleDropdownItemClick(subItem)}
//                         className="w-full text-left text-white/80 hover:text-vibrant-teal py-1 flex items-center space-x-2"
//                       >
//                         <span>{subItem.icon}</span>
//                         <span>{subItem.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="block text-white hover:text-vibrant-teal py-2 font-medium"
//               >
//                 {item.label}
//               </Link>
//             )
//           )}

//           {/* Mobile Auth */}
//           <div className="pt-4 border-t border-vibrant-teal/30">
//             {user ? (
//               <div className="space-y-2">
//                 <div className="text-white/80 text-sm py-2">
//                   Signed in as <span className="font-medium">{user.name}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full btn-secondary"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="btn-ghost text-center"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="btn-primary text-center"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../ui/Dropdown";
import { useDropdown } from "../../hooks/useDropdown";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    toggleDropdown,
    closeDropdown,
    closeAllDropdowns,
    getDropdownProps,
    getMenuProps,
    isDropdownOpen,
    dropdownRef
  } = useDropdown();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isActivePath = (path) => location.pathname === path;

  // Updated with correct routes that exist in your app
  const femaleHealthItems = [
    { 
      id: 1, 
      label: "Cycle Tracking", 
      path: "/female-health/cycle", 
      icon: "📅",
      description: "Track menstrual cycles"
    },
    { 
      id: 2, 
      label: "Ovulation Tracking", 
      path: "/female-health/ovulation", 
      icon: "📊",
      description: "Predict fertile windows"
    },
    { 
      id: 3, 
      label: "Pregnancy Tracking", 
      path: "/female-health/pregnancy", 
      icon: "🤰",
      description: "Monitor pregnancy journey"
    },
  ];

  const menHealthItems = [
    { 
      id: 1, 
      label: "Health Tracking", 
      path: "/men-health", 
      icon: "💪",
      description: "Track health metrics"
    },
    { 
      id: 2, 
      label: "Sleep Recovery", 
      path: "/sleep-recovery", 
      icon: "😴",
      description: "Monitor sleep patterns"
    },
  ];

  const selfCareItems = [
    { 
      id: 1, 
      label: "Wellness Activities", 
      path: "/self-care", 
      icon: "🧘",
      description: "Self-care practices"
    },
    { 
      id: 2, 
      label: "Fitness & Nutrition", 
      path: "/fitness-nutrition", 
      icon: "💪",
      description: "Workouts and meals"
    },
  ];

  const handleDropdownItemClick = (item) => {
    closeAllDropdowns();
    setMobileMenuOpen(false);
    navigate(item.path);
  };

  const mainMenuItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { label: "Female Health", dropdown: "female", items: femaleHealthItems },
    { label: "Men's Health", dropdown: "men", items: menHealthItems },
    { label: "Self Care", dropdown: "self", items: selfCareItems },
    { path: "/community", label: "Community" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-midnight-blue/95 backdrop-blur-md shadow-lg border-b border-vibrant-teal/30"
          : "bg-midnight-blue"
      }`}
    >
      {/* Top gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-vibrant-teal via-electric-blue to-soft-mint"></div>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* === Logo === */}
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={closeAllDropdowns}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-vibrant-teal to-electric-blue rounded-xl shadow-lg text-white font-bold">
            ML
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              MyLab
            </h1>
            <p className="text-xs text-soft-mint/70">Health & Wellness</p>
          </div>
        </Link>

        {/* === Desktop Menu === */}
        <div className="hidden lg:flex items-center space-x-1">
          {mainMenuItems.map((item) =>
            item.items ? (
              <div
                key={item.label}
                className="relative"
              >
                <button
                  onClick={(e) => toggleDropdown(item.dropdown, e.currentTarget)}
                  {...getDropdownProps(item.dropdown)}
                  className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover-lift flex items-center ${
                    location.pathname.startsWith(`/${item.dropdown}`) || isDropdownOpen(item.dropdown) 
                      ? 'bg-white/20 text-vibrant-teal' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen(item.dropdown) ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen(item.dropdown) && (
                  <Dropdown
                    ref={dropdownRef}
                    isOpen={isDropdownOpen(item.dropdown)}
                    onClose={closeDropdown}
                    items={item.items}
                    onItemClick={handleDropdownItemClick}
                    {...getMenuProps(item.dropdown)}
                  />
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover-lift ${
                  isActivePath(item.path) 
                    ? 'bg-white/20 text-vibrant-teal' 
                    : 'hover:bg-white/10'
                }`}
                onClick={closeAllDropdowns}
              >
                {item.label}
              </Link>
            )
          )}

          {/* === Auth Buttons === */}
          {user ? (
            <div className="flex items-center space-x-3 ml-4">
              <span className="text-white/80 text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-vibrant-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-vibrant-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* === Mobile Menu Button === */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col space-y-1 p-2"
        >
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* === Mobile Menu === */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight-blue/95 backdrop-blur-md border-t border-vibrant-teal/30 px-6 py-4 space-y-3">
          {mainMenuItems.map((item) =>
            item.items ? (
              <div key={item.label} className="space-y-2">
                <button
                  onClick={() => toggleDropdown(`mobile-${item.dropdown}`)}
                  className="w-full text-left text-white hover:text-vibrant-teal py-2 font-medium flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen(`mobile-${item.dropdown}`) ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen(`mobile-${item.dropdown}`) && (
                  <div className="ml-4 space-y-2 border-l-2 border-vibrant-teal/30 pl-4">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleDropdownItemClick(subItem)}
                        className="w-full text-left text-white/80 hover:text-vibrant-teal py-1 flex items-center space-x-2"
                      >
                        <span>{subItem.icon}</span>
                        <span>{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white hover:text-vibrant-teal py-2 font-medium"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile Auth */}
          <div className="pt-4 border-t border-vibrant-teal/30">
            {user ? (
              <div className="space-y-2">
                <div className="text-white/80 text-sm py-2">
                  Signed in as <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-vibrant-teal text-white py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 bg-vibrant-teal text-white rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;