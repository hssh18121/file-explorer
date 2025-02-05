import { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function ContextMenuProvider({ children }) {
  const [menuData, setMenuData] = useState(null);

  const openMenu = (x, y, targetFolder) => {
    setMenuData({ x, y, targetFolder });
  };

  const closeMenu = () => setMenuData(null);

  useEffect(() => {
    // Function to close the menu on left click
    const handleClickOutside = (event) => {
      if (menuData) {
        closeMenu();
      }
    };

    // Attach event listener when menu is open
    if (menuData) {
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove event listener when menu closes
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuData]);

  return (
    <MenuContext.Provider value={{ menuData, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useContextMenu() {
  return useContext(MenuContext);
}
