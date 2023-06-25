import { useEffect } from "react";

// ** react-router-dom imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ** Redux hooks imports
import { useDispatch } from "react-redux";

// ** Pages imports
import { Bookmarks, Details, Home } from "./pages";

// ** PokemonSlice imports
import { fetchPokemons, updateActiveRoute } from "./store/pokemon";

import { Container } from "react-bootstrap";

function App() {
  // ** react-redux hooks
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveRoute("/"));
    dispatch(fetchPokemons("https://pokeapi.co/api/v2/pokemon"));

    // ** Saving empty array if bookmarked key not availabe in localStorage
    if (!localStorage.getItem("bookmarked")) {
      localStorage.setItem("bookmarked", JSON.stringify([]));
    }
  }, [dispatch]);

  return (
    <Container>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pokemon/:name" element={<Details />} />
          <Route exact path="/pokemon/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
