import React from "react";

// ** Styles imports
import "../styles/navigation.css";

import { Navbar, Container } from "react-bootstrap";

// ** react-router-dom imports
import { Link } from "react-router-dom";

// ** Redux hooks imports
import { useDispatch, useSelector } from "react-redux";

// ** PokemonSlice imports
import { updateActiveRoute } from "../store/pokemon";

const Navigation = () => {
  // ** react-redux hooks
  const dispatch = useDispatch();

  // ** Redux States
  const { activeRoute } = useSelector((state) => state.pokemon);

  return (
    <Navbar>
      <Container className="d-flex m-1 p-2 justify-content-center align-items-center">
        <Link
          to="/"
          className={activeRoute === "/" ? "active" : "text-decoration-none"}
          onClick={() => dispatch(updateActiveRoute("/"))}
        >
          <div className="mx-3">
            <img src="/Home.svg" height={30} /> Home
          </div>
        </Link>
        <Link
          to="/pokemon/bookmarks"
          className={
            activeRoute === "/pokemon/bookmarks"
              ? "active"
              : "text-decoration-none"
          }
          onClick={() => dispatch(updateActiveRoute("/pokemon/bookmarks"))}
        >
          <div className="mx-3">
            <img src="/Bookmark.svg" height={30} /> Bookmarks
          </div>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Navigation;
