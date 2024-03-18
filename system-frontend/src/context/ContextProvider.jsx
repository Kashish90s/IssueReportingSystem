import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  report: null,
  currentUser: null,
  token: null,
  notification: null,
  loading: false,
  users: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setReport: () => {},
  setUsers: () => {},
  setLoading: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [report, setReport] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        users,
        setUser,
        setUsers,
        token,
        setToken,
        report,
        setReport,
        loading,
        setLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
