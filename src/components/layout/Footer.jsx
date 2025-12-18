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
                  { name: 'Sleep', href: '/sleep-recovery' },
                  { name: 'Fitness & Nutrition', href: '/fitness-nutrition' },
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
                  <span>+234 708 475 2971</span>
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
