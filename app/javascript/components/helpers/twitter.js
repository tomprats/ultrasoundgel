import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {useScript} from "lib/hooks";

function Twitter({handle}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if(!loaded) { return; }

    const element = document.createElement("div");

    ref.current.innerHTML = "";
    ref.current.appendChild(element);

    window.twttr.widgets.createTimeline(
      {screenName: handle},
      element,
      {dnt: true, height: 600}
    );
  }, [loaded]);

  useScript({onLoad: () => setLoaded(true), url: "//platform.twitter.com/widgets.js"});

  return <div className="d-none d-md-block mx-auto" ref={ref} />;
}

Twitter.propTypes = {
  handle: PropTypes.string.isRequired
};

export default Twitter;
