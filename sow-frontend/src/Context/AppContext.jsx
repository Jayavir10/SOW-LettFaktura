import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_API_BACKEND_URL;
  const [auth, setAuth] = useState(
    localStorage.getItem("auth") ? localStorage.getItem("auth") : false
  );
  const [lang, setLangState] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  );
  const [translations, setTranslations] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState({});
  const [user, setUser] = useState([]);

  const getTranslations = useCallback(
    async (language) => {
      try {
        const { data } = await axios.get(
          `${backendURL}/api/translation/fetch/${language}`
        );

        if (data && data.success) {
          setTranslations(data.message || {});
        } else {
          setTranslations({});
          console.log(data && data.message ? data.message : "No translations");
        }
      } catch (error) {
        console.log("Failed to load translations", error);
        setTranslations({});
        console.log(error.message);
      }
    },
    [backendURL]
  );

  useEffect(() => {
    getTranslations(lang);
    localStorage.setItem("lang", lang);
  }, [lang, getTranslations]);

  const setLang = (newLang) => {
    setLangState(newLang);
  };

  const t = (key) => translations[key] ?? key;

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/products/getAll`, {
        headers: { Authorization: `Bearer ${auth}` },
      });

      if (data.success) {
        setProducts(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/users/fetch`, {
        headers: { Authorization: `Bearer ${auth}` },
      });

      if (data.success) {
        setUser(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (auth) {
      getUserInfo()
    }
  },[auth])

  const value = {
    backendURL,
    auth,
    setAuth,
    lang,
    setLang,
    translations,
    getTranslations,
    t,
    sidebarOpen, setSidebarOpen,
    products, getProducts,
    user
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
