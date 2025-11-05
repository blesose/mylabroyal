import React from 'react';
import { Crown, Sparkles, TrendingUp, Star } from 'lucide-react';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  glow = false,
  variant = 'default',
  padding = 'medium',
  border = true,
  premium = false,
  animated = false,
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden';
  
  const variants = {
    default: 'bg-mist-gray/10 border border-cyan-blue/20 shadow-xl',
    royal: 'bg-gradient-to-br from-cyan-blue/10 to-neon-mint/5 border border-cyan-blue/30 shadow-2xl',
    gradient: 'bg-gradient-to-br from-neon-mint/10 to-emerald/10 border border-neon-mint/20 shadow-glow',
    dark: 'bg-deep-navy/95 border border-cyan-blue/30 text-mist-gray shadow-2xl',
    glass: 'bg-cyan-blue/5 border border-cyan-blue/20 backdrop-blur-xl shadow-lg'
  };

  const paddingSizes = {
    none: '',
    small: 'p-5',
    medium: 'p-7',
    large: 'p-9',
    xl: 'p-11'
  };

  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl hover:border-neon-mint/40 hover:bg-cyan-blue/15 cursor-pointer transform-gpu' : '';
  const glowClasses = glow ? 'shadow-glow hover:shadow-glow-lg' : '';
  const borderClasses = border ? '' : 'border-0';

  const classes = `${baseClasses} ${variants[variant]} ${paddingSizes[padding]} ${hoverClasses} ${glowClasses} ${borderClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {/* Premium Crown Badge */}
      {premium && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-mint to-emerald rounded-full flex items-center justify-center shadow-glow animate-pulse">
            <Crown className="w-4 h-4 text-deep-navy" />
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      {animated && (
        <>
          <div className="absolute top-0 left-0 w-20 h-20 bg-neon-mint/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-emerald/5 rounded-full translate-x-1/2 translate-y-1/2 blur-xl"></div>
        </>
      )}

      {/* Shimmer Overlay */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-mint/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-0 group-hover:opacity-100 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-1">
        {children}
      </div>

      {/* Corner Accents */}
      {variant === 'royal' && (
        <>
          <div className="absolute top-3 left-3 w-2 h-2 bg-neon-mint rounded-full opacity-60"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-emerald rounded-full opacity-60"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-cyan-blue rounded-full opacity-60"></div>
          <div className="absolute bottom-3 right-3 w-2 h-2 bg-neon-mint rounded-full opacity-60"></div>
        </>
      )}
    </div>
  );
};

// Enhanced Card Components
export const CardHeader = ({ children, className = '', center = false }) => (
  <div className={`mb-6 ${center ? 'text-center' : ''} ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', gradient = true, premium = false }) => (
  <h3 className={`text-2xl font-bold ${gradient ? 'text-gradient' : 'text-mist-gray'} ${premium ? 'flex items-center space-x-2' : ''} ${className}`}>
    {premium && <Star className="w-5 h-5 text-emerald fill-current" />}
    <span>{children}</span>
  </h3>
);

export const CardDescription = ({ children, className = '', center = false }) => (
  <p className={`text-mist-gray/80 text-lg leading-relaxed ${center ? 'text-center' : ''} ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', padding = 'none' }) => {
  const paddingClasses = {
    none: '',
    small: 'py-4',
    medium: 'py-6',
    large: 'py-8'
  };

  return (
    <div className={`${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', border = true }) => (
  <div className={`mt-6 pt-6 ${border ? 'border-t border-cyan-blue/20' : ''} ${className}`}>
    {children}
  </div>
);

// Special Card Types
export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  className = '', 
  premium = false,
  glow = true 
}) => (
  <Card 
    hover 
    glow={glow} 
    variant={premium ? "royal" : "default"} 
    premium={premium}
    animated
    className={`text-center group ${className}`}
  >
    <div className={`w-16 h-16 bg-gradient-to-r ${premium ? 'from-neon-mint to-emerald' : 'from-cyan-blue to-cyan-blue/80'} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <CardTitle gradient={!premium} premium={premium} className="text-xl mb-3">
      {title}
    </CardTitle>
    <CardDescription className="text-base leading-relaxed">
      {description}
    </CardDescription>
    
    {/* Hover Sparkle Effect */}
    {premium && (
      <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-neon-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )}
  </Card>
);

export const StatsCard = ({ 
  number, 
  label, 
  trend, 
  className = '',
  icon,
  variant = 'default'
}) => (
  <Card variant={variant} className={`text-center ${className}`}>
    {icon && (
      <div className="w-12 h-12 bg-cyan-blue/20 rounded-xl flex items-center justify-center mx-auto mb-3">
        {icon}
      </div>
    )}
    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
      {number}
    </div>
    <div className="text-mist-gray/80 font-medium mb-2">{label}</div>
    {trend && (
      <div className={`flex items-center justify-center space-x-1 text-sm font-semibold ${
        trend > 0 ? 'text-emerald' : 'text-rose-400'
      }`}>
        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
        <span>{trend > 0 ? '+' : ''}{trend}%</span>
      </div>
    )}
  </Card>
);

// New Premium Card Types
export const RoyalCard = ({ children, ...props }) => (
  <Card
    variant="royal"
    premium
    glow
    animated
    hover
    {...props}
  >
    {children}
  </Card>
);

export const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  avatar,
  rating = 5,
  className = '' 
}) => (
  <Card variant="glass" hover className={`relative ${className}`}>
    {/* Rating Stars */}
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'text-emerald fill-current' : 'text-cyan-blue/40'}`} 
        />
      ))}
    </div>
    
    <CardDescription className="text-lg italic mb-6">
      "{quote}"
    </CardDescription>
    
    <CardFooter border={false} className="flex items-center space-x-3">
      {avatar && (
        <div className="w-10 h-10 bg-gradient-to-r from-cyan-blue to-emerald rounded-full flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
      )}
      <div>
        <div className="font-semibold text-mist-gray">{author}</div>
        <div className="text-sm text-mist-gray/60">{role}</div>
      </div>
    </CardFooter>
  </Card>
);

export default Card;
// import React from 'react';

// const Card = ({ 
//   children, 
//   className = '', 
//   hover = false, 
//   glow = false,
//   variant = 'default',
//   padding = 'medium',
//   border = true,
//   ...props 
// }) => {
//   const baseClasses = 'rounded-2xl transition-all duration-500 backdrop-blur-sm';
  
//   const variants = {
//     default: 'bg-white/80 border border-white/60 shadow-lg',
//     royal: 'bg-gradient-to-br from-white to-slate-50/80 border border-white/60 shadow-xl',
//     gradient: 'bg-gradient-to-br from-sky-blue/10 to-light-pink/10 border border-sky-blue/20 shadow-lg',
//     dark: 'bg-gray-800/90 border border-gray-700/60 text-white shadow-xl'
//   };

//   const paddingSizes = {
//     none: '',
//     small: 'p-4',
//     medium: 'p-8',
//     large: 'p-10',
//     xl: 'p-12'
//   };

//   const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl hover:bg-white/90' : '';
//   const glowClasses = glow ? 'animate-glow' : '';
//   const borderClasses = border ? '' : 'border-0';

//   const classes = `${baseClasses} ${variants[variant]} ${paddingSizes[padding]} ${hoverClasses} ${glowClasses} ${borderClasses} ${className}`;

//   return (
//     <div className={classes} {...props}>
//       {children}
//     </div>
//   );
// };

// // Enhanced Card Components
// export const CardHeader = ({ children, className = '' }) => (
//   <div className={`mb-6 ${className}`}>
//     {children}
//   </div>
// );

// export const CardTitle = ({ children, className = '' }) => (
//   <h3 className={`text-2xl font-bold bg-gradient-to-r from-regal-blue to-royal-pink bg-clip-text text-transparent ${className}`}>
//     {children}
//   </h3>
// );

// export const CardDescription = ({ children, className = '' }) => (
//   <p className={`text-gray-600 text-lg leading-relaxed ${className}`}>
//     {children}
//   </p>
// );

// export const CardContent = ({ children, className = '' }) => (
//   <div className={className}>
//     {children}
//   </div>
// );

// export const CardFooter = ({ children, className = '' }) => (
//   <div className={`mt-6 pt-6 border-t border-gray-200/60 ${className}`}>
//     {children}
//   </div>
// );

// // Special Card Types
// export const FeatureCard = ({ icon, title, description, className = '' }) => (
//   <Card hover glow className={`text-center ${className}`}>
//     <div className="w-16 h-16 bg-gradient-to-r from-sky-blue to-light-pink rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
//       <span className="text-2xl text-white">{icon}</span>
//     </div>
//     <CardTitle className="text-xl mb-3">{title}</CardTitle>
//     <CardDescription className="text-base">{description}</CardDescription>
//   </Card>
// );

// export const StatsCard = ({ number, label, trend, className = '' }) => (
//   <Card className={`text-center ${className}`}>
//     <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-regal-blue to-royal-pink bg-clip-text text-transparent mb-2">
//       {number}
//     </div>
//     <div className="text-gray-600 font-medium mb-2">{label}</div>
//     {trend && (
//       <div className={`text-sm font-semibold ${
//         trend > 0 ? 'text-green-500' : 'text-red-500'
//       }`}>
//         {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
//       </div>
//     )}
//   </Card>
// );

// export default Card;
