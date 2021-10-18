import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import useAppContext from "./use-app-context";

export default function useAnalytics() {
  const [{app: {environment}}] = useAppContext();
  const location = useLocation();
  const development = environment !== "production";

  useEffect(() => {
    if(development) { return; }

    window.gtag("config", "UA-53529962-9", {page_path: location.pathname});
  }, [location.pathname]);
}
