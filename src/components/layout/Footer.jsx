// // Footer.jsx - Premium Royal Footer with New Color Palette
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Crown, Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="relative bg-deep-navy text-mist-gray overflow-hidden border-t border-cyan-blue/30">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald/10 rounded-full blur-2xl"></div>
//         <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-blue/20 rounded-full blur-2xl"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-neon-mint/5 rounded-full blur-3xl"></div>
        
//         {/* Geometric accents */}
//         <div className="absolute top-10 right-10 w-8 h-8 border-2 border-neon-mint/30 rotate-45"></div>
//         <div className="absolute bottom-20 left-20 w-4 h-4 border border-emerald/40 rounded-full"></div>
//         <div className="absolute top-32 left-1/4 w-6 h-6 border border-cyan-blue/50 rotate-12"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Main Footer Content */}
//         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {/* Brand Column */}
//             <div className="lg:col-span-1">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-neon-mint to-emerald rounded-2xl flex items-center justify-center shadow-glow">
//                   <Crown className="w-6 h-6 text-deep-navy" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gradient">
//                     MyLab Royal
//                   </h3>
//                   <p className="text-mist-gray/80 text-sm">Premium Wellness Experience</p>
//                 </div>
//               </div>
//               <p className="text-mist-gray/80 mb-6 leading-relaxed">
//                 Experience elite healthcare with royal treatment. Our premium platform transforms your wellness journey with AI-powered insights and unparalleled care.
//               </p>
//               <div className="flex space-x-3">
//                 {[
//                   { icon: Twitter, href: '#', color: 'hover:text-cyan-400' },
//                   { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
//                   { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
//                   { icon: Linkedin, href: '#', color: 'hover:text-blue-300' }
//                 ].map((social, index) => {
//                   const IconComponent = social.icon;
//                   return (
//                     <a
//                       key={index}
//                       href={social.href}
//                       className={`w-10 h-10 bg-cyan-blue/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-neon-mint/20 hover:text-neon-mint ${social.color} hover:scale-110 backdrop-blur-sm`}
//                     >
//                       <IconComponent className="w-5 h-5" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h4 className="font-bold text-lg mb-6 text-mist-gray">Quick Links</h4>
//               <ul className="space-y-3">
//                 {[
//                   { name: 'Royal Features', href: '/features' },
//                   { name: 'How It Works', href: '/how-it-works' },
//                   { name: 'Pricing Plans', href: '/pricing' },
//                   { name: 'Success Stories', href: '/stories' },
//                   { name: 'Royal Community', href: '/community' }
//                 ].map((link, index) => (
//                   <li key={index}>
//                     <Link
//                       to={link.href}
//                       className="text-mist-gray/80 hover:text-neon-mint transition-all duration-300 flex items-center space-x-3 group py-1"
//                     >
//                       <div className="w-2 h-2 bg-neon-mint rounded-full group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Health Suites */}
//             <div>
//               <h4 className="font-bold text-lg mb-6 text-mist-gray">Health Suites</h4>
//               <ul className="space-y-3">
//                 {[
//                   { name: 'Female Health Suite', href: '/female-health' },
//                   { name: "Men's Health Suite", href: '/men-health' },
//                   { name: 'Self Care Palace', href: '/self-care' },
//                   { name: 'Sleep Recovery', href: '/sleep' },
//                   { name: 'Fitness & Nutrition', href: '/fitness' }
//                 ].map((suite, index) => (
//                   <li key={index}>
//                     <Link
//                       to={suite.href}
//                       className="text-mist-gray/80 hover:text-emerald transition-all duration-300 flex items-center space-x-3 group py-1"
//                     >
//                       <div className="w-2 h-2 bg-emerald rounded-full group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">{suite.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact Info */}
//             <div>
//               <h4 className="font-bold text-lg mb-6 text-mist-gray">Royal Support</h4>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-3 text-mist-gray/80 hover:text-neon-mint transition-colors duration-300 group">
//                   <div className="w-8 h-8 bg-cyan-blue/30 rounded-lg flex items-center justify-center group-hover:bg-neon-mint/20 transition-colors duration-300">
//                     <Mail className="w-4 h-4 text-neon-mint" />
//                   </div>
//                   <span>support@mylabroyal.com</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-mist-gray/80 hover:text-cyan-blue transition-colors duration-300 group">
//                   <div className="w-8 h-8 bg-cyan-blue/30 rounded-lg flex items-center justify-center group-hover:bg-cyan-blue/20 transition-colors duration-300">
//                     <Phone className="w-4 h-4 text-cyan-blue" />
//                   </div>
//                   <span>+1 (555) 123-ROYAL</span>
//                 </div>
//                 <div className="flex items-center space-x-3 text-mist-gray/80 hover:text-emerald transition-colors duration-300 group">
//                   <div className="w-8 h-8 bg-cyan-blue/30 rounded-lg flex items-center justify-center group-hover:bg-emerald/20 transition-colors duration-300">
//                     <MapPin className="w-4 h-4 text-emerald" />
//                   </div>
//                   <span>Royal Wellness District</span>
//                 </div>
//               </div>

//               {/* Newsletter */}
//               <div className="mt-8">
//                 <h5 className="font-semibold mb-3 text-mist-gray">Royal Newsletter</h5>
//                 <div className="flex space-x-2">
//                   <input
//                     type="email"
//                     placeholder="Your email"
//                     className="flex-1 input-primary placeholder-mist-gray/60"
//                   />
//                   <button className="btn-primary whitespace-nowrap">
//                     Subscribe
//                   </button>
//                 </div>
//                 <p className="text-mist-gray/60 text-xs mt-2">
//                   Get exclusive wellness insights and royal treatment updates
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-cyan-blue/30 bg-cyan-blue/5 backdrop-blur-sm">
//           <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//               <div className="flex items-center space-x-2 text-mist-gray/80">
//                 <span>© {currentYear} MyLab Royal. All rights reserved.</span>
//                 <Heart className="w-4 h-4 text-emerald fill-current" />
//                 <span className="text-mist-gray/60">Crafted with excellence</span>
//               </div>
              
//               <div className="flex items-center space-x-6 text-sm text-mist-gray/80">
//                 <Link to="/privacy" className="hover:text-neon-mint transition-colors duration-300">
//                   Privacy Policy
//                 </Link>
//                 <Link to="/terms" className="hover:text-neon-mint transition-colors duration-300">
//                   Terms of Service
//                 </Link>
//                 <Link to="/cookies" className="hover:text-neon-mint transition-colors duration-300">
//                   Cookies
//                 </Link>
//               </div>

//               {/* Scroll to Top */}
//               <button
//                 onClick={scrollToTop}
//                 className="btn-primary p-3 rounded-xl hover:shadow-glow transition-all duration-300 group"
//                 aria-label="Scroll to top"
//               >
//                 <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// // // Footer.jsx - Premium Royal Footer
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Crown, Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

// // const Footer = () => {
// //   const currentYear = new Date().getFullYear();

// //   const scrollToTop = () => {
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   return (
// //     <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900/90 to-pink-900/90 text-white overflow-hidden">
// //       {/* Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
// //         <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
// //         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
// //       </div>

// //       <div className="relative z-10">
// //         {/* Main Footer Content */}
// //         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
// //             {/* Brand Column */}
// //             <div className="lg:col-span-1">
// //               <div className="flex items-center space-x-3 mb-6">
// //                 <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center">
// //                   <Crown className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent">
// //                     MyLab Royal
// //                   </h3>
// //                   <p className="text-gray-300 text-sm">Premium Wellness Experience</p>
// //                 </div>
// //               </div>
// //               <p className="text-gray-300 mb-6 leading-relaxed">
// //                 Experience elite healthcare with royal treatment. Our premium platform transforms your wellness journey with AI-powered insights and unparalleled care.
// //               </p>
// //               <div className="flex space-x-4">
// //                 {[
// //                   { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
// //                   { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
// //                   { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
// //                   { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
// //                 ].map((social, index) => {
// //                   const IconComponent = social.icon;
// //                   return (
// //                     <a
// //                       key={index}
// //                       href={social.href}
// //                       className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/20 ${social.color} hover:scale-110`}
// //                     >
// //                       <IconComponent className="w-5 h-5" />
// //                     </a>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             {/* Quick Links */}
// //             <div>
// //               <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
// //               <ul className="space-y-3">
// //                 {[
// //                   { name: 'Royal Features', href: '/features' },
// //                   { name: 'How It Works', href: '/how-it-works' },
// //                   { name: 'Pricing Plans', href: '/pricing' },
// //                   { name: 'Success Stories', href: '/stories' },
// //                   { name: 'Royal Community', href: '/community' }
// //                 ].map((link, index) => (
// //                   <li key={index}>
// //                     <Link
// //                       to={link.href}
// //                       className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
// //                     >
// //                       <div className="w-1 h-1 bg-pink-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
// //                       <span>{link.name}</span>
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Health Suites */}
// //             <div>
// //               <h4 className="font-bold text-lg mb-6 text-white">Health Suites</h4>
// //               <ul className="space-y-3">
// //                 {[
// //                   { name: 'Female Health Suite', href: '/female-health' },
// //                   { name: "Men's Health Suite", href: '/men-health' },
// //                   { name: 'Self Care Palace', href: '/self-care' },
// //                   { name: 'Sleep Recovery', href: '/sleep' },
// //                   { name: 'Fitness & Nutrition', href: '/fitness' }
// //                 ].map((suite, index) => (
// //                   <li key={index}>
// //                     <Link
// //                       to={suite.href}
// //                       className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
// //                     >
// //                       <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
// //                       <span>{suite.name}</span>
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {/* Contact Info */}
// //             <div>
// //               <h4 className="font-bold text-lg mb-6 text-white">Royal Support</h4>
// //               <div className="space-y-4">
// //                 <div className="flex items-center space-x-3 text-gray-300">
// //                   <Mail className="w-5 h-5 text-pink-400" />
// //                   <span>support@mylabroyal.com</span>
// //                 </div>
// //                 <div className="flex items-center space-x-3 text-gray-300">
// //                   <Phone className="w-5 h-5 text-blue-400" />
// //                   <span>+1 (555) 123-ROYAL</span>
// //                 </div>
// //                 <div className="flex items-center space-x-3 text-gray-300">
// //                   <MapPin className="w-5 h-5 text-purple-400" />
// //                   <span>Royal Wellness District</span>
// //                 </div>
// //               </div>

// //               {/* Newsletter */}
// //               <div className="mt-6">
// //                 <h5 className="font-semibold mb-3 text-white">Royal Newsletter</h5>
// //                 <div className="flex space-x-2">
// //                   <input
// //                     type="email"
// //                     placeholder="Your email"
// //                     className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-colors duration-300"
// //                   />
// //                   <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
// //                     Join
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Bar */}
// //         <div className="border-t border-white/20">
// //           <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
// //               <div className="flex items-center space-x-2 text-gray-300">
// //                 <span>© {currentYear} MyLab Royal. All rights reserved.</span>
// //                 <Heart className="w-4 h-4 text-pink-400" />
// //               </div>
              
// //               <div className="flex items-center space-x-6 text-sm text-gray-300">
// //                 <Link to="/privacy" className="hover:text-white transition-colors duration-300">
// //                   Privacy Policy
// //                 </Link>
// //                 <Link to="/terms" className="hover:text-white transition-colors duration-300">
// //                   Terms of Service
// //                 </Link>
// //                 <Link to="/cookies" className="hover:text-white transition-colors duration-300">
// //                   Cookies
// //                 </Link>
// //               </div>

// //               {/* Scroll to Top */}
// //               <button
// //                 onClick={scrollToTop}
// //                 className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
// //               >
// //                 <ArrowUp className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  Heart,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#2B463C] text-[#F4F1E9] overflow-hidden border-t border-[#688F48]/30">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#688F48]/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#B1D182]/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#B1D182]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-8 h-8 border-2 border-[#B1D182]/30 rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 border border-[#688F48]/40 rounded-full"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl flex items-center justify-center shadow-md">
                  <Crown className="w-6 h-6 text-[#2B463C]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#B1D182]">MyLab</h3>
                  <p className="text-[#F4F1E9]/70 text-sm">Wellness for All</p>
                </div>
              </div>
              <p className="text-[#F4F1E9]/80 mb-6 leading-relaxed">
                MyLab empowers your wellness with AI-driven health insights,
                self-care tracking, and community support — all in one place.
              </p>
              <div className="flex space-x-3">
                {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-[#688F48]/30 rounded-xl flex items-center justify-center hover:bg-[#B1D182]/30 hover:scale-110 transition-all"
                  >
                    <Icon className="w-5 h-5 text-[#F4F1E9]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#B1D182]">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About MyLab', href: '/about' },
                  { name: 'Features', href: '/features' },
                  { name: 'Community', href: '/community' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/contact' },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="flex items-center space-x-2 text-[#F4F1E9]/80 hover:text-[#B1D182] transition-all"
                    >
                      <div className="w-2 h-2 bg-[#B1D182] rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Health Suites */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#B1D182]">Health Suites</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Female Health', href: '/female-health' },
                  { name: 'Men’s Health', href: '/men-health' },
                  { name: 'Self Care', href: '/self-care' },
                  { name: 'Sleep', href: '/sleep' },
                  { name: 'Fitness & Nutrition', href: '/fitness' },
                ].map((suite, index) => (
                  <li key={index}>
                    <Link
                      to={suite.href}
                      className="text-[#F4F1E9]/80 hover:text-[#B1D182] transition-all"
                    >
                      {suite.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#B1D182]">Get in Touch</h4>
              <div className="space-y-4 text-[#F4F1E9]/80">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#B1D182]" />
                  <span>support@mylab.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#B1D182]" />
                  <span>+234 800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#B1D182]" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h5 className="font-semibold mb-3 text-[#F4F1E9]">Newsletter</h5>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-[#688F48] text-[#F4F1E9] placeholder-[#F4F1E9]/50 focus:outline-none"
                  />
                  <button className="bg-[#B1D182] text-[#2B463C] px-4 py-2 rounded-lg font-medium hover:bg-[#A4C973] transition-all">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-[#F4F1E9]/60 mt-2">
                  Get health insights and personalized wellness updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#688F48]/30 bg-[#688F48]/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#F4F1E9]/80 gap-3">
            <div className="flex items-center gap-1">
              <span>© {currentYear} MyLab. All rights reserved.</span>
              <Heart className="w-4 h-4 text-[#B1D182] fill-current" />
            </div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-[#B1D182] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-[#B1D182] transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-[#B1D182] transition-colors">
                Cookies
              </Link>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 bg-[#B1D182] text-[#2B463C] rounded-full hover:bg-[#A4C973] transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
