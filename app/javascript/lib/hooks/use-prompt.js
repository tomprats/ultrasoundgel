import {useEffect, useRef} from "react";
import {useHistory} from "react-router-dom";

export default function usePrompt({message: _message, when}) {
  const history = useHistory();
  const message = _message || "Are you sure you want to leave without saving?";
  const unblock = useRef(null);
  const onNavigate = (_event) => {
    const event = _event || window.event;

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
