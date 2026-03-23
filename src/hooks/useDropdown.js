import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing dropdown state and behavior
 * Features:
 * - Keyboard navigation (Escape to close, Arrow keys for navigation)
 * - Outside click detection
 * - Touch device support
 * - Accessibility (ARIA attributes support)
 * - Multiple dropdown management
 */

export const useDropdown = (options = {}) => {
  const {
    closeOnOutsideClick = true,
    closeOnEscape = true,
    enableKeyboardNavigation = true,
    autoFocus = false,
    onOpen,
    onClose
  } = options;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!closeOnOutsideClick || !activeDropdown) return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeDropdown, closeOnOutsideClick]);

  // Handle keyboard events
  useEffect(() => {
    if (!activeDropdown || !enableKeyboardNavigation) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'Escape':
          if (closeOnEscape) {
            event.preventDefault();
            closeDropdown();
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          focusNextItem();
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusPreviousItem();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown, closeOnEscape, enableKeyboardNavigation]);

  // Auto-focus first item when dropdown opens
  useEffect(() => {
    if (activeDropdown && autoFocus && dropdownRef.current) {
      const firstItem = dropdownRef.current.querySelector(
        'button, a, [tabindex="0"]'
      );
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 100);
      }
    }
  }, [activeDropdown, autoFocus]);

  const openDropdown = useCallback((dropdownName, triggerElement = null) => {
    setActiveDropdown(dropdownName);
    
    if (triggerElement) {
      triggerRef.current = triggerElement;
    }

    if (onOpen) {
      onOpen(dropdownName);
    }
  }, [onOpen]);

  const closeDropdown = useCallback(() => {
    if (activeDropdown) {
      if (onClose) {
        onClose(activeDropdown);
      }
      setActiveDropdown(null);
      
      // Return focus to trigger element
      if (triggerRef.current) {
        setTimeout(() => triggerRef.current?.focus(), 0);
      }
    }
  }, [activeDropdown, onClose]);

  const toggleDropdown = useCallback((dropdownName, triggerElement = null) => {
    if (activeDropdown === dropdownName) {
      closeDropdown();
    } else {
      openDropdown(dropdownName, triggerElement);
    }
  }, [activeDropdown, openDropdown, closeDropdown]);

  // Keyboard navigation functions
  const focusNextItem = useCallback(() => {
    if (!dropdownRef.current) return;

    const focusableElements = dropdownRef.current.querySelectorAll(
      'button, a, [tabindex="0"]'
    );
    const currentIndex = Array.from(focusableElements).findIndex(
      el => el === document.activeElement
    );

    const nextIndex = currentIndex < focusableElements.length - 1 
      ? currentIndex + 1 
      : 0;

    focusableElements[nextIndex]?.focus();
  }, []);

  const focusPreviousItem = useCallback(() => {
    if (!dropdownRef.current) return;

    const focusableElements = dropdownRef.current.querySelectorAll(
      'button, a, [tabindex="0"]'
    );
    const currentIndex = Array.from(focusableElements).findIndex(
      el => el === document.activeElement
    );

    const prevIndex = currentIndex > 0 
      ? currentIndex - 1 
      : focusableElements.length - 1;

    focusableElements[prevIndex]?.focus();
  }, []);

  // Check if specific dropdown is active
  const isDropdownOpen = useCallback((dropdownName) => {
    return activeDropdown === dropdownName;
  }, [activeDropdown]);

  // Get ARIA attributes for accessibility
  const getDropdownProps = useCallback((dropdownName) => {
    return {
      'aria-expanded': isDropdownOpen(dropdownName),
      'aria-haspopup': 'true',
      'aria-controls': `${dropdownName}-dropdown`,
    };
  }, [isDropdownOpen]);

  const getMenuProps = useCallback((dropdownName) => {
    return {
      id: `${dropdownName}-dropdown`,
      role: 'menu',
      'aria-labelledby': `${dropdownName}-trigger`,
    };
  }, []);

  return {
    // State
    activeDropdown,
    isDropdownOpen,
    
    // Refs
    dropdownRef,
    triggerRef,
    
    // Actions
    openDropdown,
    closeDropdown,
    toggleDropdown,
    closeAllDropdowns: () => setActiveDropdown(null),
    
    // Keyboard navigation
    focusNextItem,
    focusPreviousItem,
    
    // Accessibility
    getDropdownProps,
    getMenuProps,
  };
};

export default useDropdown;