import {useContext, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {Context} from "app";
import {createNotification} from "app/actions/notifications";
import {destroy as destroySession} from "app/requests/session";
import {Search as SearchModal} from "components/helpers/modal";
import {useContent, useNavbar} from "lib/hooks";

export default function Navbar() {
  const email = useContent("Contact", "Email");
  const logo = useContent("Navbar", "Logo");
  const facebook = useContent("Social", "Facebook");
  const instagram = useContent("Social", "Instagram");
  const twitter = useContent("Social", "Twitter");
  const [{pages, user}, dispatch] = useContext(Context);
  const [showSearch, setShowSearch] = useState(false);
  const ref = useRef(null);
  const {toggleMenu} = useNavbar({ref});
  const signOut = () => {
    destroySession().then((data) => {
      if(data.success) {
        window.location.href = `/session?message=${data.message}&type=success`;
      } else {
        dispatch(createNotification({content: data.message, type: "danger"}));
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-theme mb-4" ref={ref}>
      <div className="container-fluid">
        {logo && (
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="Logo" src={logo} />
            </a>
          </div>
        )}
        <button className="navbar-toggler mt-2" type="button" aria-label="Toggle navigation" onClick={toggleMenu}>
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {pages.filter((page) => page.active).map((page) => (
              <li key={page.path}>
                <NavLink className="nav-link" to={`/${page.path}`}>{page.name}</NavLink>
              </li>
            ))}
            {user ? (
              <li className="dropdown">
                <button className="nav-link dropdown-toggle" type="button">Profile</button>
                <div className="dropdown-menu">
                  <div className="dropdown-item"><a href="/profile">Profile</a></div>
                  <div className="dropdown-item"><button onClick={signOut} type="button">Sign Out</button></div>
                </div>
              </li>
            ) : (
              <li>
                <NavLink className="nav-link" to="/session/new">Sign In/Up</NavLink>
              </li>
            )}
            <li className="ml-lg-3">
              <button className="nav-icon" onClick={() => setShowSearch(true)} type="button">
                <i className="fas fa-search" />
              </button>
              {email && (
                <a className="nav-icon" href={`mailto:${email}`} rel="noreferrer" target="_blank">
                  <i className="fas fa-paper-plane" />
                </a>
              )}
              {twitter && (
                <a className="nav-icon" href={`https://twitter.com/${twitter}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
              )}
              {facebook && (
                <a className="nav-icon" href={`https://www.facebook.com/${facebook}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-facebook" />
                </a>
              )}
              {instagram && (
                <a className="nav-icon" href={`https://instagram.com/${instagram}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-instagram" />
                </a>
              )}
              <a className="nav-icon" href="/feed" rel="noreferrer" target="_blank">
                <i className="fas fa-rss" />
              </a>
            </li>
          </ul>
        </div>
        <SearchModal show={showSearch} onClose={() => setShowSearch(false)} />
      </div>
    </nav>
  );
}
