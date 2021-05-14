import {useRef} from "react";
import {NavLink} from "react-router-dom";
import {useNavbar} from "lib/hooks";

export default function Navbar() {
  const ref = useRef(null);
  const {toggleMenu} = useNavbar({ref});

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" ref={ref}>
      <a className="navbar-brand" href="/">Admin</a>
      <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleMenu}>
        <i className="fas fa-bars" />
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="dropdown">
            <button className="nav-link dropdown-toggle" type="button">Articles</button>
            <div className="dropdown-menu">
              <div className="dropdown-item"><a href="/admin/articles">Articles</a></div>
              <div className="dropdown-item"><a href="/admin/article-categories">Categories</a></div>
            </div>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/sections">Content</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/channels">Channels</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/episodes">Episodes</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/pages">Pages</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/stats">Stats</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
