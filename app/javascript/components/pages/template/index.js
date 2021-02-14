import {useContext, useEffect, useState} from "react";
import {useRouteMatch} from "react-router-dom";
import {Context} from "app";
import Articles from "./articles";
import Contact from "./contact";
import Default from "./default";
import Home from "./home";

const getPage = ({match, pages}) => {
  if(match.path === "/") { return pages.find(({path}) => path === "home"); }

  return pages.find(({path}) => `/${path}` === match.path);
};

export default function Template() {
  const match = useRouteMatch();
  const [{pages}] = useContext(Context);
  const [page, setPage] = useState(() => getPage({match, pages}));

  useEffect(() => { setPage(getPage({match, pages})); }, [match]);

  switch(page.template) {
    case "articles": return <Articles page={page} />;
    case "contact": return <Contact page={page} />;
    case "home": return <Home page={page} />;
    default: return <Default page={page} />;
  }
}
