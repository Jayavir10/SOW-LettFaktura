import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_API_BACKEND_URL;
  const [lang, setLangState] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  );
  const [translations, setTranslations] = useState({});

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

  const value = {
    backendURL,
    lang,
    setLang,
    translations,
    getTranslations,
    t,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
