import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    window.gtag("config", "UA-53529962-9", {page_path: location.pathname});
  }, [location.pathname]);
}
