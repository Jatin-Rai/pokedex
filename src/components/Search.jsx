import React, { useState } from "react";

// ** Styles imports
import "../styles/search.css";
import { Form, Container } from "react-bootstrap";

// ** react-router-dom imports
import { useNavigate } from "react-router-dom";

const Search = () => {
  // ** states
  const [searchValue, setSearchValue] = useState("");

  // ** react-router-dom hooks
  const navigate = useNavigate();

  // ** handling search functionality and redirecting to deatils page
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pokemon/${searchValue.trimStart()}`);
  };

  return (
    <Container className="w-75 my-1 p-3">
      <Form className="d-flex flex-row shadow" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          className="custom-style text-center"
          placeholder="Search Pokémon..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
      </Form>
    </Container>
  );
};

export default Search;
