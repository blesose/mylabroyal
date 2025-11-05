// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette
        'midnight-blue': '#0D1B2A',
        'vibrant-teal': '#1ABC9C',
        'soft-mint': '#A8E6CF',
        'electric-blue': '#2979FF',
        'warm-coral': '#FF6B6B',
        
        // Secondary/Neutrals
        'off-white': '#F5F5F5',
        'charcoal-grey': '#2E3A59',
        
        // Semantic colors using your palette
        primary: '#0D1B2A', // midnight-blue
        secondary: '#1ABC9C', // vibrant-teal
        accent: '#2979FF', // electric-blue
        success: '#1ABC9C', // vibrant-teal
        warning: '#FF6B6B', // warm-coral
        error: '#FF6B6B', // warm-coral
        info: '#2979FF', // electric-blue
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(13, 27, 42, 0.1), 0 2px 4px -1px rgba(13, 27, 42, 0.06)',
        'medium': '0 10px 15px -3px rgba(13, 27, 42, 0.1), 0 4px 6px -2px rgba(13, 27, 42, 0.05)',
        'large': '0 20px 25px -5px rgba(13, 27, 42, 0.1), 0 10px 10px -5px rgba(13, 27, 42, 0.04)',
        'xl-soft': '0 25px 50px -12px rgba(13, 27, 42, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-health': 'linear-gradient(135deg, #1ABC9C 0%, #2979FF 100%)',
        'gradient-wellness': 'linear-gradient(135deg, #A8E6CF 0%, #1ABC9C 100%)',
        'gradient-premium': 'linear-gradient(135deg, #2979FF 0%, #0D1B2A 100%)',
        'gradient-coral': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./public/**/*.html",
//   ],
//   theme: {
//     extend: {
//       // Color Palette
//       colors: {
//         // Primary Colors
//         'deep-navy': {
//           DEFAULT: '#0B132B',
//           50: '#1E3A8A',
//           100: '#1B316B',
//           200: '#162A52',
//           300: '#112240',
//           400: '#0D1B33',
//           500: '#0B132B',
//           600: '#080E21',
//           700: '#060A17',
//           800: '#03050E',
//           900: '#010204',
//         },
//         'neon-mint': {
//           DEFAULT: '#6FFFE9',
//           50: '#F0FFFD',
//           100: '#D9FFF9',
//           200: '#B8FFF4',
//           300: '#96FFEF',
//           400: '#75FFEA',
//           500: '#6FFFE9',
//           600: '#3AFFDF',
//           700: '#00F5D4',
//           800: '#00CCB0',
//           900: '#00A896',
//         },
//         'cyan-blue': {
//           DEFAULT: '#3A506B',
//           50: '#EFF3F8',
//           100: '#D6E1F0',
//           200: '#A3BFE0',
//           300: '#709DD0',
//           400: '#547AA3',
//           500: '#3A506B',
//           600: '#2D3F54',
//           700: '#202E3D',
//           800: '#131D26',
//           900: '#060C0F',
//         },
//         'mist-gray': {
//           DEFAULT: '#E0E1DD',
//           50: '#FFFFFF',
//           100: '#F9F9F8',
//           200: '#F2F3F1',
//           300: '#EBECEA',
//           400: '#E5E6E3',
//           500: '#E0E1DD',
//           600: '#C8C9C6',
//           700: '#B0B1AF',
//           800: '#989998',
//           900: '#808181',
//         },
//         'emerald': {
//           DEFAULT: '#00A896',
//           50: '#E6F8F6',
//           100: '#B3ECE6',
//           200: '#80E0D6',
//           300: '#4DD4C6',
//           400: '#1AC8B6',
//           500: '#00A896',
//           600: '#008678',
//           700: '#00645A',
//           800: '#00423C',
//           900: '#00201E',
//         },
//       },
      
//       // Typography
//       fontFamily: {
//         'sans': [
//           'system-ui',
//           '-apple-system',
//           'BlinkMacSystemFont',
//           'Segoe UI',
//           'Roboto',
//           'Helvetica Neue',
//           'Arial',
//           'Noto Sans',
//           'sans-serif',
//         ],
//         'mono': [
//           'ui-monospace',
//           'SFMono-Regular',
//           'Menlo',
//           'Monaco',
//           'Consolas',
//           'Liberation Mono',
//           'Courier New',
//           'monospace',
//         ],
//       },
      
//       // Spacing
//       spacing: {
//         '18': '4.5rem',
//         '88': '22rem',
//         '128': '32rem',
//       },
      
//       // Animation
//       animation: {
//         'float': 'float 3s ease-in-out infinite',
//         'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         'bounce-slow': 'bounce 2s infinite',
//         'spin-slow': 'spin 3s linear infinite',
//       },
      
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-10px)' },
//         },
//       },
      
//       // Background Images
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//         'gradient-primary': 'linear-gradient(135deg, var(--color-neon-mint) 0%, var(--color-emerald) 100%)',
//         'gradient-dark': 'linear-gradient(135deg, var(--color-deep-navy) 0%, var(--color-cyan-blue) 100%)',
//       },
      
//       // Box Shadow
//       boxShadow: {
//         'glow': '0 0 20px rgba(111, 255, 233, 0.3)',
//         'glow-lg': '0 0 40px rgba(111, 255, 233, 0.4)',
//         'glow-emerald': '0 0 20px rgba(0, 168, 150, 0.3)',
//         'inner-glow': 'inset 0 2px 4px 0 rgba(111, 255, 233, 0.1)',
//       },
      
//       // Border
//       borderWidth: {
//         '3': '3px',
//       },
      
//       // Opacity
//       opacity: {
//         '15': '0.15',
//         '85': '0.85',
//       },
      
//       // Z-Index
//       zIndex: {
//         '60': '60',
//         '70': '70',
//         '80': '80',
//         '90': '90',
//         '100': '100',
//       },
      
//       // Screens
//       screens: {
//         '3xl': '1600px',
//         '4xl': '1920px',
//       },
      
//       // Transition
//       transitionProperty: {
//         'height': 'height',
//         'spacing': 'margin, padding',
//         'transform': 'transform',
//       },
      
//       // Backdrop
//       backdropBlur: {
//         'xs': '2px',
//       },
//     },
//   },
  
//   // Variants
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//       scale: ['active', 'group-hover'],
//       transform: ['hover', 'focus'],
//       backgroundColor: ['active', 'disabled'],
//       textColor: ['active', 'disabled'],
//       borderColor: ['active', 'focus', 'disabled'],
//       ringColor: ['focus'],
//       ringWidth: ['focus'],
//       ringOffsetColor: ['focus'],
//       ringOffsetWidth: ['focus'],
//     },
//   },
  
//   // Plugins
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('@tailwindcss/typography'),
//     require('@tailwindcss/aspect-ratio'),
    
//     // Custom plugin for gradient text
//     function({ addUtilities }) {
//       const newUtilities = {
//         '.text-gradient': {
//           background: 'linear-gradient(135deg, #6FFFE9 0%, #00A896 100%)',
//           '-webkit-background-clip': 'text',
//           '-webkit-text-fill-color': 'transparent',
//           'background-clip': 'text',
//         },
//       }
//       addUtilities(newUtilities)
//     },
//   ],
  
//   // Future
//   future: {
//     hoverOnlyWhenSupported: true,
//   },
  
//   // Experimental
//   experimental: {
//     optimizeUniversalDefaults: true,
//   },
  
//   // Dark Mode
//   darkMode: 'class',
// }