import React, { createContext, useState } from "react";

export const appContext = createContext();

const Context = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const contextValue = {
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    searchBarOpen,
    setSearchBarOpen,
    searchQuery,
    setSearchQuery,
    isSearching,
    setIsSearching,
    deleteModal,
    setDeleteModal,
  };
  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};
export default Context;
