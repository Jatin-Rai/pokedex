// ** React Imports
import React, { useEffect, useState } from "react";

// ** Custom Styles Imports
import "../styles/details.css";
import { Container, Row, Col, Card } from "react-bootstrap";

// ** react-router-dom Imports
import { useParams } from "react-router-dom";

// ** Redux hooks Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import { Header, Loading, Navigation, Search } from "../components";

// ** Third Party Import
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

// ** Custom Utilities Functions Imports
import {
  progressBarColor,
  capitalizeFirstLetter,
  isBookmarked,
} from "../utils/functions";

// ** Imports from PokemonSlice
import {
  fetchSinglePokemonDetail,
  removePokemon,
  updateActiveRoute,
} from "../store/pokemon";

const Details = () => {
  // ** react-redux hooks
  const dispatch = useDispatch();
  const { name } = useParams();

  // ** Redux States
  const { pokemon, loading } = useSelector((state) => state.pokemon);

  // ** states
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarked"))
  );

  // ** Add or remove pokemon from bookmarks
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

  useEffect(() => {
    dispatch(fetchSinglePokemonDetail(name.toLowerCase()));
    dispatch(updateActiveRoute(null));

    return () => {
      dispatch(removePokemon());
    };
  }, [dispatch, name]);

  return (
    <Container>
      <Header />
      <Search />
      <Navigation />

      {loading ? (
        <Loading />
      ) : pokemon && pokemon.length === 0 ? (
        <div className="text-center m-2 p-2">No Pokemon Found</div>
      ) : null}
      <Row className="mb-5">
        {pokemon && pokemon.length !== 0 && (
          <>
            <Container className="d-flex justify-content-end align-items-center me-4 pe-4">
              <h4 className="text-end">{pokemon.name.toUpperCase()} Details</h4>
              <img
                src="/Bookmark.svg"
                height={100}
                width={50}
                className={`bookmarked ${isBookmarked(pokemon.id, bookmarks)}`}
                title="Add to bookmark"
                alt=""
                onClick={() => handleBookmark(pokemon)}
              />
            </Container>
            <Col className="d-flex">
              <Container md={2}>
                <Card className="w-100 shadow mb-4">
                  <Card.Body className="p-4">
                    <Card.Title className="text-center">
                      {capitalizeFirstLetter(pokemon.name)}
                    </Card.Title>
                    <Card.Img
                      src={pokemon.sprites.front_default}
                      height={250}
                      width={100}
                      alt=""
                    />
                  </Card.Body>
                </Card>
              </Container>
            </Col>
            <Col>
              <Container>
                <Card className="shadow mb-4">
                  <div>
                    <Tabs>
                      <TabList>
                        <Tab>About</Tab>
                        <Tab>Basic Stats</Tab>
                        <Tab>Moves</Tab>
                      </TabList>

                      <TabPanel>
                        <div className="details-about p-4">
                          <div className="title">
                            <p>Species</p>
                            <span>
                              {capitalizeFirstLetter(pokemon.species.name)}
                            </span>
                          </div>
                          <div className="title">
                            <p>Weight</p>
                            <span>{pokemon.weight / 10} (Kg)</span>
                          </div>
                          <div className="title">
                            <p>Height</p>
                            <span>{pokemon.height / 10} (m)</span>
                          </div>
                          <div className="title">
                            <p>Abilities</p>
                            <span>
                              {pokemon.abilities.map(
                                (item, index) =>
                                  `${
                                    pokemon.abilities.length - 1 !== index
                                      ? `${item.ability.name}, `
                                      : item.ability.name
                                  }`
                              )}
                            </span>
                          </div>
                          <div className="title">
                            <p>Types</p>
                            <span>
                              {pokemon.types.map((item, index) =>
                                pokemon.types.length - 1 !== index
                                  ? `${item.type.name}, `
                                  : item.type.name
                              )}
                            </span>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="details-stats p-4">
                          {pokemon.stats.map((item, index) => {
                            return (
                              <div key={index} className="stats">
                                <p>{capitalizeFirstLetter(item.stat.name)}</p>
                                <span>{item.base_stat}</span>
                                <div>
                                  <p
                                    style={{
                                      backgroundColor: progressBarColor(
                                        item.base_stat
                                      ),
                                      width: `${item.base_stat}%`,
                                      maxWidth: "100%",
                                    }}
                                  ></p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="details-moves p-4">
                          {pokemon.moves.map((item, index) => (
                            <p key={index}>{item.move.name}</p>
                          ))}
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </Card>
              </Container>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default Details;
