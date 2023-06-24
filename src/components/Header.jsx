// ** React Imports
import React from "react";

// ** Custom Styles Imports
import "../styles/header.css";
import { Navbar, Container } from "react-bootstrap";

// ** react-router-dom Imports
import { Link } from "react-router-dom";

// ** Redux hooks Imports
import { useDispatch } from "react-redux";

// ** Imports from PokemonSlice
import { updateActiveRoute } from "../store/pokemon";

const Header = () => {
  // ** react-redux hooks
  const dispatch = useDispatch();

  return (
    <Navbar>
      <Container className="d-flex justify-content-center">
        <Link to="/" onClick={() => dispatch(updateActiveRoute("/"))}>
          <Navbar.Brand>
            <img src="/logo.svg" alt="" height={150} width={250} />
          </Navbar.Brand>
        </Link>
      </Container>
      <div className="divider"></div>
    </Navbar>
  );
};

export default Header;
