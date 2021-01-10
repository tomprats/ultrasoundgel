import {useEffect} from "react";
import {useLocation} from "react-router-dom";

// Similar to https://react-bootstrap.netlify.com/components/navbar/
export default function useNavbar({ref}) {
  const location = useLocation();
  const closeMenu = () => {
    const collapse = ref.current.querySelector(".navbar-collapse");

    collapse.classList.add("collapse");
    collapse.classList.remove("in");
  };

  const toggleDropdown = (e) => {
    if(!e.target.classList.contains("dropdown-toggle")) { return; }

    const dropdown = e.target.closest(".dropdown");

    dropdown.classList.toggle("show");
    [...dropdown.querySelectorAll(".dropdown-menu")].forEach((element) => {
      element.classList.toggle("show");
    });
  };

  const toggleMenu = () => {
    const collapse = ref.current.querySelector(".navbar-collapse");

    collapse.classList.toggle("collapse");
    collapse.classList.toggle("in");
  };

  useEffect(() => {
    const closeMenuOnResize = () => {
      if(document.body.clientWidth < 768) { return; }

      closeMenu();
    };

    window.addEventListener("resize", closeMenuOnResize, false);
    ref.current.addEventListener("click", toggleDropdown, false);

    return () => {
      window.removeEventListener("resize", closeMenuOnResize, false);
      ref.current.removeEventListener("click", toggleDropdown, false);
    };
  }, []);

  useEffect(() => { closeMenu(); }, [location]);

  return {toggleMenu};
}
