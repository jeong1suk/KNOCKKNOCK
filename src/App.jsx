import Layout from "./components/sections/Layout";
import React, { useState, useEffect, useReducer, createContext } from "react";
import UserProvider from "./context/user/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
};

export default App;
