// ** React Imports
import React, { useState } from "react";

// ** Custom Styles Imports
import "../styles/search.css";
import { Form, Container } from "react-bootstrap";

// ** react-router-dom Imports
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
    <Container className="w-50 my-1 p-3">
      <Form className="d-flex flex-row shadow" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          className="custom-style"
          placeholder="Search..."
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
