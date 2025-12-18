
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
// //     dropdownRef
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
// //     setUser(null);
// //     navigate("/login");
// //   };

// //   const isActivePath = (path) => location.pathname === path;

// //   // Updated with correct routes that exist in your app
// //   const femaleHealthItems = [
// //     { 
// //       id: 1, 
// //       label: "Cycle Tracking", 
// //       path: "/female-health/cycle", 
// //       icon: "📅",
// //       description: "Track menstrual cycles"
// //     },
// //     { 
// //       id: 2, 
// //       label: "Ovulation Tracking", 
// //       path: "/female-health/ovulation", 
// //       icon: "📊",
// //       description: "Predict fertile windows"
// //     },
// //     { 
// //       id: 3, 
// //       label: "Pregnancy Tracking", 
// //       path: "/female-health/pregnancy", 
// //       icon: "🤰",
// //       description: "Monitor pregnancy journey"
// //     },
// //   ];

// //   const menHealthItems = [
// //     { 
// //       id: 1, 
// //       label: "Health Tracking", 
// //       path: "/men-health", 
// //       icon: "💪",
// //       description: "Track health metrics"
// //     },
// //     { 
// //       id: 2, 
// //       label: "Sleep Recovery", 
// //       path: "/sleep-recovery", 
// //       icon: "😴",
// //       description: "Monitor sleep patterns"
// //     },
// //   ];

// //   const selfCareItems = [
// //     { 
// //       id: 1, 
// //       label: "Wellness Activities", 
// //       path: "/self-care", 
// //       icon: "🧘",
// //       description: "Self-care practices"
// //     },
// //     { 
// //       id: 2, 
// //       label: "Fitness & Nutrition", 
// //       path: "/fitness-nutrition", 
// //       icon: "💪",
// //       description: "Workouts and meals"
// //     },
// //   ];

// //   const handleDropdownItemClick = (item) => {
// //     closeAllDropdowns();
// //     setMobileMenuOpen(false);
// //     navigate(item.path);
// //   };

// //   const mainMenuItems = [
// //     { path: "/", label: "Home" },
// //     // { path: "/dashboard", label: "Dashboard" },
// //     { label: "Female Health", dropdown: "female", items: femaleHealthItems },
// //     { label: "Men's Health", dropdown: "men", items: menHealthItems },
// //     { label: "Self Care", dropdown: "self", items: selfCareItems },
// //     { path: "/community", label: "Community" },
// //   ];

// //   return (
// //     <nav
// //       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
// //         scrolled
// //           ? "bg-midnight-blue/95 backdrop-blur-md shadow-lg border-b border-vibrant-teal/30"
// //           : "bg-midnight-blue"
// //       }`}
// //     >
// //       {/* Top gradient accent line */}
// //       <div className="h-1 bg-gradient-to-r from-vibrant-teal via-electric-blue to-soft-mint"></div>

// //       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
// //         {/* === Logo === */}
// //         <Link
// //           to="/"
// //           className="flex items-center space-x-2"
// //           onClick={closeAllDropdowns}
// //         >
// //           <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-vibrant-teal to-electric-blue rounded-xl shadow-lg text-white font-bold">
// //             ML
// //           </div>
// //           <div>
// //             <h1 className="text-2xl font-bold text-white">
// //               MyLab
// //             </h1>
// //             <p className="text-xs text-soft-mint/70">Health & Wellness</p>
// //           </div>
// //         </Link>

// //         {/* === Desktop Menu === */}
// //         <div className="hidden lg:flex items-center space-x-1">
// //           {mainMenuItems.map((item) =>
// //             item.items ? (
// //               <div
// //                 key={item.label}
// //                 className="relative"
// //               >
// //                 <button
// //                   onClick={(e) => toggleDropdown(item.dropdown, e.currentTarget)}
// //                   {...getDropdownProps(item.dropdown)}
// //                   className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover-lift flex items-center ${
// //                     location.pathname.startsWith(`/${item.dropdown}`) || isDropdownOpen(item.dropdown) 
// //                       ? 'bg-white/20 text-vibrant-teal' 
// //                       : 'hover:bg-white/10'
// //                   }`}
// //                 >
// //                   <span>{item.label}</span>
// //                   <svg 
// //                     className={`ml-1 w-4 h-4 transition-transform duration-200 ${
// //                       isDropdownOpen(item.dropdown) ? 'rotate-180' : ''
// //                     }`} 
// //                     fill="none" 
// //                     stroke="currentColor" 
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                   </svg>
// //                 </button>

// //                 {isDropdownOpen(item.dropdown) && (
// //                   <Dropdown
// //                     ref={dropdownRef}
// //                     isOpen={isDropdownOpen(item.dropdown)}
// //                     onClose={closeDropdown}
// //                     items={item.items}
// //                     onItemClick={handleDropdownItemClick}
// //                     {...getMenuProps(item.dropdown)}
// //                   />
// //                 )}
// //               </div>
// //             ) : (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 hover-lift ${
// //                   isActivePath(item.path) 
// //                     ? 'bg-white/20 text-vibrant-teal' 
// //                     : 'hover:bg-white/10'
// //                 }`}
// //                 onClick={closeAllDropdowns}
// //               >
// //                 {item.label}
// //               </Link>
// //             )
// //           )}

// //           {/* === Auth Buttons === */}
// //           {user ? (
// //             <div className="flex items-center space-x-3 ml-4">
// //               <span className="text-white/80 text-sm">Hi, {user.name}</span>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-vibrant-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="flex items-center space-x-2 ml-4">
// //               <Link
// //                 to="/login"
// //                 className="px-4 py-2 text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
// //               >
// //                 Login
// //               </Link>
// //               <Link
// //                 to="/register"
// //                 className="bg-vibrant-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
// //               >
// //                 Sign Up
// //               </Link>
// //             </div>
// //           )}
// //         </div>

// //         {/* === Mobile Menu Button === */}
// //         <button
// //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //           className="lg:hidden flex flex-col space-y-1 p-2"
// //         >
// //           <span
// //             className={`w-6 h-0.5 bg-white transition ${
// //               mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
// //             }`}
// //           ></span>
// //           <span
// //             className={`w-6 h-0.5 bg-white transition ${
// //               mobileMenuOpen ? "opacity-0" : "opacity-100"
// //             }`}
// //           ></span>
// //           <span
// //             className={`w-6 h-0.5 bg-white transition ${
// //               mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
// //             }`}
// //           ></span>
// //         </button>
// //       </div>

// //       {/* === Mobile Menu === */}
// //       {mobileMenuOpen && (
// //         <div className="lg:hidden bg-midnight-blue/95 backdrop-blur-md border-t border-vibrant-teal/30 px-6 py-4 space-y-3">
// //           {mainMenuItems.map((item) =>
// //             item.items ? (
// //               <div key={item.label} className="space-y-2">
// //                 <button
// //                   onClick={() => toggleDropdown(`mobile-${item.dropdown}`)}
// //                   className="w-full text-left text-white hover:text-vibrant-teal py-2 font-medium flex items-center justify-between"
// //                 >
// //                   <span>{item.label}</span>
// //                   <svg 
// //                     className={`w-4 h-4 transition-transform duration-200 ${
// //                       isDropdownOpen(`mobile-${item.dropdown}`) ? 'rotate-180' : ''
// //                     }`} 
// //                     fill="none" 
// //                     stroke="currentColor" 
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                   </svg>
// //                 </button>
// //                 {isDropdownOpen(`mobile-${item.dropdown}`) && (
// //                   <div className="ml-4 space-y-2 border-l-2 border-vibrant-teal/30 pl-4">
// //                     {item.items.map((subItem) => (
// //                       <button
// //                         key={subItem.id}
// //                         onClick={() => handleDropdownItemClick(subItem)}
// //                         className="w-full text-left text-white/80 hover:text-vibrant-teal py-1 flex items-center space-x-2"
// //                       >
// //                         <span>{subItem.icon}</span>
// //                         <span>{subItem.label}</span>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 onClick={() => setMobileMenuOpen(false)}
// //                 className="block text-white hover:text-vibrant-teal py-2 font-medium"
// //               >
// //                 {item.label}
// //               </Link>
// //             )
// //           )}

// //           {/* Mobile Auth */}
// //           <div className="pt-4 border-t border-vibrant-teal/30">
// //             {user ? (
// //               <div className="space-y-2">
// //                 <div className="text-white/80 text-sm py-2">
// //                   Signed in as <span className="font-medium">{user.name}</span>
// //                 </div>
// //                 <button
// //                   onClick={handleLogout}
// //                   className="w-full bg-vibrant-teal text-white py-2 rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
// //                 >
// //                   Logout
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-2 gap-2">
// //                 <Link
// //                   to="/login"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                   className="text-center py-2 text-white border bg-vibrant-teal/80 rounded-lg bg-vibrant-teal transition-colors"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   to="/register"
// //                   onClick={() => setMobileMenuOpen(false)}
// //                   className="text-center py-2 bg-vibrant-teal text-white rounded-lg font-semibold hover:bg-vibrant-teal/90 transition-colors"
// //                 >
// //                   Get Started
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
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
//     dropdownRef
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

//   const femaleHealthItems = [
//     { id: 1, label: "Cycle Tracking", path: "/female-health/cycle", icon: "📅", description: "Track menstrual cycles" },
//     { id: 2, label: "Ovulation Tracking", path: "/female-health/ovulation", icon: "📊", description: "Predict fertile windows" },
//     { id: 3, label: "Pregnancy Tracking", path: "/female-health/pregnancy", icon: "🤰", description: "Monitor pregnancy journey" },
//   ];

//   const menHealthItems = [
//     { id: 1, label: "Health Tracking", path: "/men-health", icon: "💪", description: "Track health metrics" },
//     { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴", description: "Monitor sleep patterns" },
//   ];

//   const selfCareItems = [
//     { id: 1, label: "Wellness Activities", path: "/self-care", icon: "🧘", description: "Self-care practices" },
//     { id: 2, label: "Fitness & Nutrition", path: "/fitness-nutrition", icon: "💪", description: "Workouts and meals" },
//   ];

//   const handleDropdownItemClick = (item) => {
//     closeAllDropdowns();
//     setMobileMenuOpen(false);
//     navigate(item.path);
//   };

//   const mainMenuItems = [
//     { path: "/", label: "Home" },
//     { label: "Female Health", dropdown: "female", items: femaleHealthItems },
//     { label: "Men's Health", dropdown: "men", items: menHealthItems },
//     { label: "Self Care", dropdown: "self", items: selfCareItems },
//     { path: "/community", label: "Community" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-[#0B132B]/95 backdrop-blur-md shadow-lg border-b border-[#B1D182]/30"
//           : "bg-[#0B132B]"
//       }`}
//     >
//       {/* Top accent line */}
//       <div className="h-1 bg-gradient-to-r from-[#688F48] via-[#B1D182] to-[#F4F1E9]"></div>

//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2" onClick={closeAllDropdowns}>
//           <div className="w-10 h-10 flex items-center justify-center bg-[#688F48] rounded-xl shadow-lg text-white font-bold">
//             ML
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-white">MyLab</h1>
//             <p className="text-xs text-[#F4F1E9]/70">Health & Wellness</p>
//           </div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center space-x-1">
//           {mainMenuItems.map((item) =>
//             item.items ? (
//               <div key={item.label} className="relative">
//                 <button
//                   onClick={(e) => toggleDropdown(item.dropdown, e.currentTarget)}
//                   {...getDropdownProps(item.dropdown)}
//                   className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 flex items-center ${
//                     location.pathname.startsWith(`/${item.dropdown}`) || isDropdownOpen(item.dropdown)
//                       ? "bg-[#B1D182]/20 text-[#B1D182]"
//                       : "hover:bg-white/10"
//                   }`}
//                 >
//                   {item.label}
//                   <svg
//                     className={`ml-1 w-4 h-4 transition-transform duration-200 ${
//                       isDropdownOpen(item.dropdown) ? "rotate-180" : ""
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
//                     ref={dropdownRef}
//                     isOpen={isDropdownOpen(item.dropdown)}
//                     onClose={closeDropdown}
//                     items={item.items}
//                     onItemClick={handleDropdownItemClick}
//                     {...getMenuProps(item.dropdown)}
//                   />
//                 )}
//               </div>
//             ) : (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 ${
//                   isActivePath(item.path)
//                     ? "bg-[#B1D182]/20 text-[#B1D182]"
//                     : "hover:bg-white/10"
//                 }`}
//                 onClick={closeAllDropdowns}
//               >
//                 {item.label}
//               </Link>
//             )
//           )}

//           {/* Auth Buttons */}
//           {user ? (
//             <div className="flex items-center space-x-3 ml-4">
//               <span className="text-white/80 text-sm">Hi, {user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-[#688F48] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-2 ml-4">
//               {/* <Link
//                 to="/login"
//                 className="px-4 py-2 text-white font-medium rounded-lg border border-white/30 hover:bg-white/10 transition-colors"
//               >
//                 Login
//               </Link> */}

//               {/* <Link
//                 to="/register"
//                 className="bg-[#688F48] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
//               >
//                 Sign Up
//               </Link> */}
//               <Link
//                 to="/login"
//                 className="bg-[#688F48] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
//               >
//                 Login
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="lg:hidden flex flex-col space-y-1 p-2"
//         >
//           <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
//           <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
//           <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-[#0B132B]/95 backdrop-blur-md border-t border-[#688F48]/30 px-6 py-4 space-y-3">
//           {mainMenuItems.map((item) =>
//             item.items ? (
//               <div key={item.label} className="space-y-2">
//                 <button
//                   onClick={() => toggleDropdown(`mobile-${item.dropdown}`)}
//                   className="w-full text-left text-white py-2 font-medium flex items-center justify-between"
//                 >
//                   {item.label}
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       isDropdownOpen(`mobile-${item.dropdown}`) ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//                 {isDropdownOpen(`mobile-${item.dropdown}`) && (
//                   <div className="ml-4 space-y-2 border-l-2 border-[#688F48]/30 pl-4">
//                     {item.items.map((subItem) => (
//                       <button
//                         key={subItem.id}
//                         onClick={() => handleDropdownItemClick(subItem)}
//                         className="w-full text-left text-white/80 hover:text-[#B1D182] py-1 flex items-center space-x-2"
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
//                 className="block text-white hover:text-[#B1D182] py-2 font-medium"
//               >
//                 {item.label}
//               </Link>
//             )
//           )}

//           {/* Mobile Auth */}
//           <div className="pt-4 border-t border-[#688F48]/30">
//             {user ? (
//               <div className="space-y-2">
//                 <div className="text-white/80 text-sm py-2">
//                   Signed in as <span className="font-medium">{user.name}</span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-[#688F48] text-white py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="text-center py-2 bg-[#688F48]/80 text-white rounded-lg transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="text-center py-2 bg-[#688F48] text-white rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
//                 >
//                   Get Started
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

  // NEW: Auto Hide Navbar
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 20) {
        setVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hideNavbar = () => {
    setVisible(false);
  };

  // Scroll effect (already existing)
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
    hideNavbar();
  };

  const isActivePath = (path) => location.pathname === path;

  const femaleHealthItems = [
    { id: 1, label: "Cycle Tracking", path: "/female-health/cycle", icon: "📅", description: "Track menstrual cycles" },
    { id: 2, label: "Ovulation Tracking", path: "/female-health/ovulation", icon: "📊", description: "Predict fertile windows" },
    { id: 3, label: "Pregnancy Tracking", path: "/female-health/pregnancy", icon: "🤰", description: "Monitor pregnancy journey" },
  ];

  const menHealthItems = [
    { id: 1, label: "Health Tracking", path: "/men-health", icon: "💪", description: "Track health metrics" },
    { id: 2, label: "Sleep Recovery", path: "/sleep-recovery", icon: "😴", description: "Monitor sleep patterns" },
  ];

  const selfCareItems = [
    { id: 1, label: "Wellness Activities", path: "/self-care", icon: "🧘", description: "Self-care practices" },
    { id: 2, label: "Fitness & Nutrition", path: "/fitness-nutrition", icon: "💪", description: "Workouts and meals" },
  ];

  const handleDropdownItemClick = (item) => {
    closeAllDropdowns();
    setMobileMenuOpen(false);
    navigate(item.path);
    hideNavbar();
  };

  const mainMenuItems = [
    { path: "/", label: "Home" },
    { label: "Female Health", dropdown: "female", items: femaleHealthItems },
    { label: "Men's Health", dropdown: "men", items: menHealthItems },
    { label: "Self Care", dropdown: "self", items: selfCareItems },
    { path: "/community", label: "Community" },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
        ${scrolled
          ? "bg-[#0B132B]/95 backdrop-blur-md shadow-lg border-b border-[#B1D182]/30"
          : "bg-[#0B132B]"
        }
      `}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#688F48] via-[#B1D182] to-[#F4F1E9]"></div>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => {
            closeAllDropdowns();
            hideNavbar();
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-[#688F48] rounded-xl shadow-lg text-white font-bold">
            ML
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MyLab</h1>
            <p className="text-xs text-[#F4F1E9]/70">Health & Wellness</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {mainMenuItems.map((item) =>
            item.items ? (
              <div key={item.label} className="relative">
                <button
                  onClick={(e) => toggleDropdown(item.dropdown, e.currentTarget)}
                  {...getDropdownProps(item.dropdown)}
                  className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 flex items-center ${
                    location.pathname.startsWith(`/${item.dropdown}`) || isDropdownOpen(item.dropdown)
                      ? "bg-[#B1D182]/20 text-[#B1D182]"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen(item.dropdown) ? "rotate-180" : ""
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
                className={`px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "bg-[#B1D182]/20 text-[#B1D182]"
                    : "hover:bg-white/10"
                }`}
                onClick={hideNavbar}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-3 ml-4">
              <span className="text-white/80 text-sm">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-[#688F48] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Link
                to="/login"
                onClick={hideNavbar}
                className="bg-[#688F48] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col space-y-1 p-2"
        >
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`w-6 h-0.5 bg-white transition ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B]/95 backdrop-blur-md border-t border-[#688F48]/30 px-6 py-4 space-y-3">
          {mainMenuItems.map((item) =>
            item.items ? (
              <div key={item.label} className="space-y-2">
                <button
                  onClick={() => toggleDropdown(`mobile-${item.dropdown}`)}
                  className="w-full text-left text-white py-2 font-medium flex items-center justify-between"
                >
                  {item.label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDropdownOpen(`mobile-${item.dropdown}`) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen(`mobile-${item.dropdown}`) && (
                  <div className="ml-4 space-y-2 border-l-2 border-[#688F48]/30 pl-4">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          handleDropdownItemClick(subItem);
                          hideNavbar();
                        }}
                        className="w-full text-left text-white/80 hover:text-[#B1D182] py-1 flex items-center space-x-2"
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  hideNavbar();
                }}
                className="block text-white hover:text-[#B1D182] py-2 font-medium"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile Auth */}
          <div className="pt-4 border-t border-[#688F48]/30">
            {user ? (
              <div className="space-y-2">
                <div className="text-white/80 text-sm py-2">
                  Signed in as <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#688F48] text-white py-2 rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hideNavbar();
                  }}
                  className="text-center py-2 bg-[#688F48]/80 text-white rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    hideNavbar();
                  }}
                  className="text-center py-2 bg-[#688F48] text-white rounded-lg font-semibold hover:bg-[#688F48]/90 transition-colors"
                >
                  Get Started
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
