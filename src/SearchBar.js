import React from "react";
import { Row } from "react-bootstrap";
export const SearchBar = (props) => {
  return (
    <div>
      <Row className="ms-0 me-0">
        <input
          className="input mb-2"
          type="text"
          placeholder=" &#xf002; Search user"
          onChange={(event) => props.setSearch(event.target.value)}
          style={{ borderRadius: "10px" }}
        />
      </Row>
    </div>
  );
};
