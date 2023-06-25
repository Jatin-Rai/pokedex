import React, { useEffect, useState } from "react";

// ** react-router-dom imports
import { useNavigate } from "react-router-dom";

//** bootstrap styles
import { Row, Col, Container, Card } from "react-bootstrap";

// ** Redux hooks Imports
import { useDispatch } from "react-redux";

// ** Custom Components Imports
import { Footer, Header, Navigation, Search } from "../components";

// ** Custom Utilities Functions Imports
import { capitalizeFirstLetter } from "../utils/functions";

// ** Imports from PokemonSlice
import { updateActiveRoute } from "../store/pokemon";

const Bookmarks = () => {
  // ** react-router-dom hooks
  const navigate = useNavigate();

  // ** states
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarked"))
  );

  // ** react-redux hooks
  const dispatch = useDispatch();

  // ** Remove pokemon to bookmark tab
  const handleBookmark = (id) => {
    const newBookmark = bookmarks.filter((item) => item.id !== id);
    localStorage.setItem("bookmarked", JSON.stringify(newBookmark));
    setBookmarks(newBookmark);
  };

  // ** Redirecting to details page
  const handleDetailsPage = (pokemon) => {
    dispatch(updateActiveRoute(null));
    navigate(`/pokemon/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    dispatch(updateActiveRoute("/pokemon/bookmarks"));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Search />
      <Navigation />
      <Container>
        <h2 className="text-center text-danger">Your Bookmarks</h2>
        <Row className="p-1">
          {bookmarks.length === 0 ? "No bookmarks" : null}
          {bookmarks.map((pokemon, index) => {
            return (
              <Col key={pokemon.name + index} md={3} className="p-3">
                <Card className="shadow">
                  <Card.Body className="p-4">
                    <div className="d-flex flex-row justify-content-end">
                      <p className="pokemon-id">#{pokemon.id}</p>
                      <img
                        src="/Bookmark.svg"
                        height={30}
                        width={30}
                        className="bookmark active"
                        onClick={() => handleBookmark(pokemon.id)}
                        alt=""
                      />
                    </div>
                    <div
                      className="inside-div"
                      onClick={() => handleDetailsPage(pokemon)}
                    >
                      <Card.Img
                        src={pokemon.sprites.front_default}
                        className="p-1"
                        alt=""
                      />
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row m-0 p-2 justify-content-center">
                          <h6>
                            Name :{" "}
                            <span>
                              &nbsp;{capitalizeFirstLetter(pokemon.name)}
                            </span>
                          </h6>
                        </div>

                        <div className="d-flex flex-row m-0 p-2 justify-content-center">
                          <h6>
                            weight :{" "}
                            <span>&nbsp;{pokemon.weight / 10} (Kg)</span>
                          </h6>
                        </div>

                        <div className="d-flex flex-row m-0 p-2 justify-content-center">
                          <h6>
                            height :{" "}
                            <span>&nbsp;{pokemon.height / 10} (m)</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Footer />
      </Container>
    </>
  );
};

export default Bookmarks;
