import {useEffect} from "react";

export default function useScript({onLoad, url}) {
  useEffect(() => {
    if(!url) { return; }

    const script = document.createElement("script");

    script.async = true;
    script.onload = onLoad;
    script.src = url;

    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, [url]);
}
