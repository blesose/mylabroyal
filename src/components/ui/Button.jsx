// import React from 'react';
// import { Sparkles, Loader2, Crown, Star } from 'lucide-react';

// const Button = ({ 
//   children, 
//   variant = 'primary', 
//   size = 'medium', 
//   className = '', 
//   loading = false,
//   disabled = false,
//   icon,
//   iconPosition = 'left',
//   premium = false,
//   glow = true,
//   ...props 
// }) => {
//   const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 inline-flex items-center justify-center relative overflow-hidden group';
  
//   const variants = {
//     primary: `bg-gradient-to-r from-neon-mint to-emerald text-deep-navy hover:shadow-glow hover:scale-105 focus:ring-neon-mint/30 focus:ring-offset-deep-navy ${
//       glow ? 'shadow-lg' : ''
//     }`,
//     secondary: 'bg-cyan-blue/20 text-mist-gray border-2 border-cyan-blue/30 hover:border-neon-mint hover:bg-cyan-blue/30 hover:text-neon-mint hover:shadow-glow focus:ring-cyan-blue/30 focus:ring-offset-deep-navy',
//     royal: 'bg-gradient-to-r from-cyan-blue to-emerald text-mist-gray hover:shadow-glow-emerald hover:scale-105 focus:ring-emerald/30 focus:ring-offset-deep-navy',
//     ghost: 'bg-transparent text-mist-gray/80 hover:bg-cyan-blue/10 hover:text-neon-mint hover:shadow-lg border border-transparent hover:border-cyan-blue/30 focus:ring-cyan-blue/30 focus:ring-offset-deep-navy',
//     danger: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 focus:ring-rose-500/30 focus:ring-offset-deep-navy',
//     premium: 'bg-gradient-to-r from-neon-mint via-emerald to-cyan-blue text-deep-navy hover:shadow-glow-lg hover:scale-105 focus:ring-neon-mint/50 focus:ring-offset-deep-navy relative'
//   };
  
//   const sizes = {
//     small: 'px-5 py-2.5 text-sm',
//     medium: 'px-8 py-3.5 text-base',
//     large: 'px-10 py-4 text-lg',
//     xl: 'px-12 py-5 text-xl'
//   };

//   const loadingClasses = loading ? 'opacity-90 cursor-not-allowed' : '';
//   const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${disabledClasses} ${className}`;

//   return (
//     <button 
//       className={classes} 
//       disabled={disabled || loading}
//       {...props}
//     >
//       {/* Premium Crown Badge */}
//       {premium && !disabled && !loading && (
//         <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-mint to-emerald rounded-full flex items-center justify-center shadow-glow animate-pulse">
//           <Crown className="w-3 h-3 text-deep-navy" />
//         </div>
//       )}

//       {/* Animated Shimmer Effect */}
//       {!disabled && !loading && (
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//       )}

//       {/* Pulsing Glow Effect */}
//       {glow && !disabled && !loading && variant === 'primary' && (
//         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-mint/20 to-emerald/20 blur-md group-hover:blur-lg transition-all duration-500 -z-10 group-hover:scale-110" />
//       )}

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-2xl">
//           <Loader2 className="w-5 h-5 animate-spin text-current" />
//         </div>
//       )}

//       {/* Content */}
//       <span className={`relative flex items-center space-x-3 ${loading ? 'opacity-0' : 'opacity-100'}`}>
//         {icon && iconPosition === 'left' && (
//           <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
//             {icon}
//           </span>
//         )}
        
//         <span className="relative">
//           {children}
          
//           {/* Sparkle effect for premium buttons */}
//           {premium && !loading && (
//             <>
//               <Sparkles className="absolute -top-3 -right-4 w-3 h-3 text-neon-mint animate-ping" />
//               <Sparkles className="absolute -bottom-2 -left-4 w-2 h-2 text-emerald animate-pulse" />
//             </>
//           )}
//         </span>
        
//         {icon && iconPosition === 'right' && (
//           <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
//             {icon}
//           </span>
//         )}
//       </span>
//     </button>
//   );
// };

// // Enhanced Button Group Component
// export const ButtonGroup = ({ children, className = '', segmented = false }) => {
//   return (
//     <div className={`flex ${segmented ? 'bg-cyan-blue/10 rounded-2xl p-1' : 'space-x-4'} ${className}`}>
//       {React.Children.map(children, (child, index) => {
//         if (segmented) {
//           return React.cloneElement(child, {
//             className: `${child.props.className} ${
//               index === 0 ? 'rounded-r-none' : 
//               index === React.Children.count(children) - 1 ? 'rounded-l-none' : 
//               'rounded-none'
//             } ${child.props.variant === 'primary' ? 'bg-cyan-blue/20' : ''}`,
//             glow: false
//           });
//         }
//         return child;
//       })}
//     </div>
//   );
// };

// // Special Royal Button with Enhanced Effects
// export const RoyalButton = ({ children, ...props }) => (
//   <Button
//     premium
//     glow
//     variant="premium"
//     className="relative overflow-visible"
//     {...props}
//   >
//     {/* Animated border */}
//     <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-mint to-emerald rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
//     {children}
//   </Button>
// );

// // Icon Button Variant
// export const IconButton = ({ icon, size = 'medium', ...props }) => {
//   const sizes = {
//     small: 'w-10 h-10',
//     medium: 'w-12 h-12',
//     large: 'w-14 h-14',
//     xl: 'w-16 h-16'
//   };

//   return (
//     <Button
//       size={size}
//       className={`${sizes[size]} !p-0 rounded-xl`}
//       icon={icon}
//       {...props}
//     />
//   );
// };

// export default Button;
import React from 'react';
import { Sparkles, Loader2, Crown } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  premium = false,
  glow = true,
  ...props 
}) => {
  const baseClasses =
    'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 inline-flex items-center justify-center relative overflow-hidden group';

  const variants = {
    primary: `bg-gradient-to-r from-[#B1D182] to-[#688F48] text-[#0B132B] hover:shadow-lg hover:scale-105 focus:ring-[#B1D182]/40 focus:ring-offset-[#0B132B] ${
      glow ? 'shadow-md shadow-[#B1D182]/30' : ''
    }`,
    secondary:
      'bg-[#688F48]/20 text-[#F4F1E9] border border-[#B1D182]/30 hover:border-[#B1D182] hover:bg-[#688F48]/30 hover:text-[#B1D182] focus:ring-[#688F48]/30 focus:ring-offset-[#0B132B]',
    royal:
      'bg-gradient-to-r from-[#688F48] to-[#B1D182] text-[#F4F1E9] hover:scale-105 hover:shadow-lg focus:ring-[#B1D182]/30 focus:ring-offset-[#0B132B]',
    ghost:
      'bg-transparent text-[#F4F1E9]/80 hover:bg-[#688F48]/10 hover:text-[#B1D182] hover:shadow-lg border border-transparent hover:border-[#688F48]/30 focus:ring-[#688F48]/30 focus:ring-offset-[#0B132B]',
    danger:
      'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 focus:ring-rose-500/30 focus:ring-offset-[#0B132B]',
    premium:
      'bg-gradient-to-r from-[#B1D182] via-[#688F48] to-[#2B463C] text-[#0B132B] hover:scale-105 hover:shadow-lg focus:ring-[#B1D182]/50 focus:ring-offset-[#0B132B] relative'
  };

  const sizes = {
    small: 'px-5 py-2.5 text-sm',
    medium: 'px-8 py-3.5 text-base',
    large: 'px-10 py-4 text-lg',
    xl: 'px-12 py-5 text-xl'
  };

  const loadingClasses = loading ? 'opacity-90 cursor-not-allowed' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${disabledClasses} ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {/* Premium Crown Badge */}
      {premium && !disabled && !loading && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-full flex items-center justify-center shadow-md animate-pulse">
          <Crown className="w-3 h-3 text-[#0B132B]" />
        </div>
      )}

      {/* Shimmer Effect */}
      {!disabled && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}

      {/* Pulsing Glow */}
      {glow && !disabled && !loading && variant === 'primary' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B1D182]/10 to-[#688F48]/10 blur-md group-hover:blur-lg transition-all duration-500 -z-10 group-hover:scale-110" />
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-2xl">
          <Loader2 className="w-5 h-5 animate-spin text-current" />
        </div>
      )}

      {/* Content */}
      <span className={`relative flex items-center space-x-3 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            {icon}
          </span>
        )}

        <span className="relative">
          {children}
          {premium && !loading && (
            <>
              <Sparkles className="absolute -top-3 -right-4 w-3 h-3 text-[#B1D182] animate-ping" />
              <Sparkles className="absolute -bottom-2 -left-4 w-2 h-2 text-[#688F48] animate-pulse" />
            </>
          )}
        </span>

        {icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

// Button Group
export const ButtonGroup = ({ children, className = '', segmented = false }) => {
  return (
    <div className={`flex ${segmented ? 'bg-[#688F48]/10 rounded-2xl p-1' : 'space-x-4'} ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (segmented) {
          return React.cloneElement(child, {
            className: `${child.props.className} ${
              index === 0
                ? 'rounded-r-none'
                : index === React.Children.count(children) - 1
                ? 'rounded-l-none'
                : 'rounded-none'
            }`,
            glow: false
          });
        }
        return child;
      })}
    </div>
  );
};

// Royal Button
export const RoyalButton = ({ children, ...props }) => (
  <Button premium glow variant="premium" className="relative overflow-visible" {...props}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
    {children}
  </Button>
);

// Icon Button
export const IconButton = ({ icon, size = 'medium', ...props }) => {
  const sizes = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-14 h-14',
    xl: 'w-16 h-16'
  };

  return (
    <Button
      size={size}
      className={`${sizes[size]} !p-0 rounded-xl`}
      icon={icon}
      {...props}
    />
  );
};

export default Button;

// import React from 'react';

// const Button = ({ 
//   children, 
//   variant = 'primary', 
//   size = 'medium', 
//   className = '', 
//   loading = false,
//   disabled = false,
//   icon,
//   iconPosition = 'left',
//   ...props 
// }) => {
//   const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 inline-flex items-center justify-center relative overflow-hidden';
  
//   const variants = {
//     primary: 'bg-gradient-to-r from-regal-blue to-royal-pink text-white hover:shadow-2xl hover:scale-105 focus:ring-royal-pink/30',
//     secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-sky-blue hover:bg-gray-50 hover:shadow-lg focus:ring-sky-blue/30',
//     royal: 'bg-gradient-to-r from-sky-blue to-light-pink text-white hover:shadow-2xl hover:scale-105 focus:ring-sky-blue/30',
//     ghost: 'bg-transparent text-gray-600 hover:bg-white/80 hover:text-gray-800 hover:shadow-lg border border-transparent hover:border-gray-200 focus:ring-gray-400/30',
//     danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105 focus:ring-red-500/30'
//   };
  
//   const sizes = {
//     small: 'px-5 py-2.5 text-sm',
//     medium: 'px-8 py-3.5 text-base',
//     large: 'px-10 py-4 text-lg',
//     xl: 'px-12 py-5 text-xl'
//   };

//   const loadingClasses = loading ? 'opacity-70 cursor-not-allowed' : '';
//   const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

//   const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingClasses} ${disabledClasses} ${className}`;

//   return (
//     <button 
//       className={classes} 
//       disabled={disabled || loading}
//       {...props}
//     >
//       {/* Shimmer Effect */}
//       {!disabled && !loading && (
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//       )}

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-2xl">
//           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//         </div>
//       )}

//       {/* Content */}
//       <span className={`relative flex items-center space-x-3 ${loading ? 'opacity-0' : 'opacity-100'}`}>
//         {icon && iconPosition === 'left' && (
//           <span className="text-lg transition-transform duration-300 group-hover:scale-110">
//             {icon}
//           </span>
//         )}
//         <span>{children}</span>
//         {icon && iconPosition === 'right' && (
//           <span className="text-lg transition-transform duration-300 group-hover:scale-110">
//             {icon}
//           </span>
//         )}
//       </span>
//     </button>
//   );
// };

// // Enhanced Button Group Component
// export const ButtonGroup = ({ children, className = '' }) => {
//   return (
//     <div className={`flex space-x-4 ${className}`}>
//       {React.Children.map(children, (child, index) => 
//         React.cloneElement(child, {
//           className: `${child.props.className} ${
//             index === 0 ? 'rounded-r-none' : 
//             index === React.Children.count(children) - 1 ? 'rounded-l-none' : 
//             'rounded-none'
//           }`
//         })
//       )}
//     </div>
//   );
// };

// export default Button;
