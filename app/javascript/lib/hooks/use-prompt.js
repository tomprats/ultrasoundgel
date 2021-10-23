import {useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";
import useAppContext from "./use-app-context";

export default function usePrompt({message: _message, when}) {
  const [{app: {environment}}] = useAppContext();
  const development = environment !== "production";
  const history = useHistory();
  const message = _message || "Are you sure you want to leave without saving?";
  const unblock = useRef(null);
  const onNavigate = (_event) => {
    const event = _event || window.event;

    if(development) { return; }
    if(!when) { return; }
    if(event) { event.returnValue = message; }

    return message;
  };

  useEffect(() => {
    unblock.current = when ? history.block(message) : null;

    window.addEventListener("beforeunload", onNavigate);

    return () => {
      if(unblock.current) {
        unblock.current();
        unblock.current = null;
      }

      window.removeEventListener("beforeunload", onNavigate);
    };
  }, [message, when]);
}
