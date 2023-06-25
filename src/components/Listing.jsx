import React, { useState } from "react";

// ** Styles imports
import "../styles/listing.css";
import { Row, Col, Card, Container } from "react-bootstrap";

// ** react-router-dom imports
import { useNavigate } from "react-router-dom";

// ** Custom Components imports
import { Loading } from "./index";

// ** Utilities Functions imports
import { capitalizeFirstLetter, isBookmarked } from "../utils/functions";

// ** Redux hooks imports
import { useDispatch, useSelector } from "react-redux";

// ** PokemonSlice imports
import { fetchPokemons } from "../store/pokemon";

// ** infinite scroll package import
import InfiniteScroll from "react-infinite-scroll-component";

const Listing = () => {
  // ** react-router-dom hooks
  const navigate = useNavigate();

  // ** states
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarked"))
  );

  // ** react-redux hooks
  const dispatch = useDispatch();

  // ** Redux States
  const { pokemonData, nextPage } = useSelector((state) => state.pokemon);

  // ** Redirecting to details page
  const handleDetailsPage = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  // ** Add or remove pokemon to bookmark tab
  const handleBookmark = (pokemon) => {
    const isBookmark = isBookmarked(pokemon.id, bookmarks);

    if (isBookmark === "active") {
      const newBookmark = bookmarks.filter((item) => item.id !== pokemon.id);
      localStorage.setItem("bookmarked", JSON.stringify(newBookmark));
      setBookmarks(newBookmark);
    } else {
      localStorage.setItem(
        "bookmarked",
        JSON.stringify([...bookmarks, pokemon])
      );
      setBookmarks([...bookmarks, pokemon]);
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-center text-danger">Pokémons</h2>

        {
          <InfiniteScroll
            dataLength={pokemonData.length}
            next={() => dispatch(fetchPokemons(nextPage))}
            hasMore={!!nextPage}
            loader={<Loading />}
            endMessage={<p>No more Pokémon to load.</p>}
          >
            <Row className="p-1">
              {pokemonData.map((pokemon, index) => {
                return (
                  <Col key={pokemon.name + index} md={3} className="p-3">
                    <Card className="shadow card-style">
                      <Card.Body className="p-4">
                        <div className="d-flex flex-row justify-content-end">
                          <img
                            src="/Bookmark.svg"
                            height={30}
                            width={30}
                            className={`bookmark ${isBookmarked(
                              pokemon.id,
                              bookmarks
                            )}`}
                            onClick={() => handleBookmark(pokemon)}
                            alt=""
                          />
                        </div>

                        <div onClick={() => handleDetailsPage(pokemon)}>
                          <Card.Img
                            height={200}
                            src={pokemon.sprites.front_default}
                            className="p-4"
                            alt=""
                          />
                          <Card.Title className="text-center">
                            &nbsp;{capitalizeFirstLetter(pokemon.name)}
                          </Card.Title>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        }
      </Container>
    </>
  );
};

export default Listing;
