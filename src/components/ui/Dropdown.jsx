
// import React, { useEffect } from 'react';

// /**
//  * Dropdown Component with Health Tech Color Palette
//  * Simple and reliable dropdown that works with useDropdown hook
//  */

// const Dropdown = ({ 
//   isOpen, 
//   onClose, 
//   items = [],
//   onItemClick,
//   position = 'left',
//   className = '',
//   id,
//   ...props 
// }) => {
//   const dropdownRef = React.useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen, onClose]);

//   // Handle escape key
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const getPositionClasses = () => {
//     const positionClasses = {
//       left: 'left-0',
//       right: 'right-0',
//       center: 'left-1/2 transform -translate-x-1/2'
//     };
//     return `${positionClasses[position] || positionClasses.left}`;
//   };

//   const handleItemClick = (item) => {
//     if (onItemClick) {
//       onItemClick(item);
//     }
//     if (item.onClick) {
//       item.onClick();
//     }
//     onClose();
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 z-40"
//         onClick={onClose}
//         aria-hidden="true"
//       />
      
//       {/* Dropdown Container */}
//       <div
//         ref={dropdownRef}
//         id={id}
//         className={`
//           absolute top-full mt-2 z-50
//           ${getPositionClasses()}
//           bg-midnight-blue border border-electric-blue/30 rounded-xl shadow-2xl
//           py-2 min-w-48
//           animate-slide-down
//           ${className}
//         `}
//         role="menu"
//         {...props}
//       >
//         {/* Dropdown Items */}
//         <div className="py-1">
//           {items.map((item, index) => (
//             <button
//               key={item.id || index}
//               onClick={() => handleItemClick(item)}
//               className="w-full text-left px-4 py-3 text-white hover:bg-electric-blue/20 hover:text-vibrant-teal transition-all duration-200 flex items-center group"
//               role="menuitem"
//               tabIndex={0}
//             >
//               {/* Item Icon */}
//               {item.icon && (
//                 <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
//                   {item.icon}
//                 </span>
//               )}

//               {/* Item Content */}
//               <div className="flex-1">
//                 <div className="font-medium text-sm">{item.label}</div>
//                 {item.description && (
//                   <div className="text-xs text-white/60 mt-1 group-hover:text-white/80">
//                     {item.description}
//                   </div>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dropdown;
import React, { useEffect } from 'react';

/**
 * Dropdown Component with Your Custom Health Palette
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
    if (onItemClick) onItemClick(item);
    if (item.onClick) item.onClick();
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
          bg-[#0B132B] border border-[#688F48]/40 
          rounded-xl shadow-2xl py-2 min-w-48
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
              className="
                w-full text-left px-4 py-3 text-[#F4F1E9] 
                hover:bg-[#688F48]/20 hover:text-[#B1D182]
                transition-all duration-200 flex items-center group
              "
              role="menuitem"
              tabIndex={0}
            >
              {/* Icon */}
              {item.icon && (
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
              )}

              {/* Label + Description */}
              <div className="flex-1">
                <div className="font-medium text-sm">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-[#F4F1E9]/60 mt-1 group-hover:text-[#F4F1E9]/80">
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
