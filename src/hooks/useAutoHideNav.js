import { useState, useEffect } from "react";

export default function useAutoHideNav() {
  const [visible, setVisible] = useState(true);

  // Hide navbar whenever a menu item is clicked
  const hideNav = () => setVisible(false);

  // Show when mouse reaches top of screen
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 20) {
        setVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { visible, hideNav };
}
