import React from "react";

// ** Styles imports
import { Navbar, Container } from "react-bootstrap";

// ** react-router-dom imports
import { Link } from "react-router-dom";

// ** Redux hooks imports
import { useDispatch } from "react-redux";

// ** PokemonSlice imports
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
