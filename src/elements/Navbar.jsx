import { getCategories } from "../utility/axios-request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
  }, []);
  return (
    <nav className="nav">
      <ul>
        <li className="navLink" key={"reviews"}>
          <Link to={`/reviews`}>
            <button>reviews</button>
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li className="navLink" key={"nav" + categories.indexOf(category)}>
              <Link to={`/${category.slug}`}>
                <button>{category.slug}</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
