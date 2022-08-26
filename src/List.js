import React, { useState } from "react";
import "./App.css";
import { Accordion, Row, Col, Form } from "react-bootstrap";
import celebs from "./celebrities.json";
import { DeleteModal } from "./DeleteModal";

var celebId;
export const List = () => {
  const [show, setShow] = useState(false);
  const [newCountry, setNewCountry] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [abled, setAbled] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const age = (age) => {
    var today = new Date();
    var birthDate = new Date(age);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const handleUpdate = (age) => {
    age >= 18 ? setShow(!show) : console.log("Person is not an Adult");
  };

  const handleSaveUpdate = () => {
    if (abled) {
      newCountry ? (celebs[celebId].country = newCountry) : <></>;
      newGender ? (celebs[celebId].gender = newGender) : <></>;
      newDescription ? (celebs[celebId].description = newDescription) : <></>;
      setShow(!show);
      setAbled(!abled);
    }
  };

  return (
    <div className="mt-3 d-flex justify-content-center">
      <Col lg={5}>
        <Row className="ms-0 me-0">
          <input
            className="input mb-2"
            type="text"
            placeholder=" &#xf002; Search user"
            style={{ borderRadius: "10px" }}
          />
        </Row>
        {celebs.map((celebrities) => {
          return (
            <div key={celebrities.id}>
              <Row>
                <Accordion>
                  <Accordion.Item eventKey={celebrities.id - 1}>
                    <Accordion.Header>
                      {
                        <img
                          src={celebrities.picture}
                          alt="Dp"
                          className="me-3"
                          height={60}
                          width={60}
                          style={{ borderRadius: "30px" }}
                        />
                      }
                      <div>
                        <b>
                          {celebrities.first} {celebrities.last}
                        </b>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <Form.Group as={Col} controlId="formGridAge">
                            <Form.Text className="d-flex justify-content-start">
                              Age
                            </Form.Text>
                            <Form.Label className="d-flex mb-1">
                              {!show && age(celebrities.dob) + " Years"}
                            </Form.Label>
                            {show && (
                              <Form.Control
                                type="age"
                                placeholder="Enter Age"
                                defaultValue={age(celebrities.dob) + " Years"}
                                disabled
                              />
                            )}
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group as={Col} controlId="formGridGender">
                            <Form.Text className="d-flex">Gender</Form.Text>
                            <Form.Label className="d-flex mb-1">
                              {!show &&
                                celebrities.gender.charAt(0).toUpperCase() +
                                  celebrities.gender.substring(1)}
                            </Form.Label>
                            {show && (
                              <Form.Select
                                onChange={(event) => {
                                  setNewGender(event.target.value);
                                  celebId = celebrities.id - 1;
                                  setAbled(true);
                                }}
                              >
                                <option defaultValue="Choose Gender">
                                  {celebrities.gender.charAt(0).toUpperCase() +
                                    celebrities.gender.substring(1)}
                                </option>
                                {celebrities.gender !== "male" &&
                                celebrities.gender !== "Male" ? (
                                  <option value="Male">Male</option>
                                ) : (
                                  ""
                                )}
                                {celebrities.gender !== "female" &&
                                celebrities.gender !== "Female" ? (
                                  <option value="Female">Female</option>
                                ) : (
                                  ""
                                )}
                                {celebrities.gender !== "transgender" &&
                                celebrities.gender !== "Transgender" ? (
                                  <option value="Transgender">
                                    Transgender
                                  </option>
                                ) : (
                                  ""
                                )}
                                {celebrities.gender !== "rathernotsay" &&
                                celebrities.gender !== "Rather not say" ? (
                                  <option value="Rather not say">
                                    Rather not say
                                  </option>
                                ) : (
                                  ""
                                )}
                                {celebrities.gender !== "other" &&
                                celebrities.gender !== "Other" ? (
                                  <option value="Other">Other</option>
                                ) : (
                                  ""
                                )}
                              </Form.Select>
                            )}
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group as={Col} controlId="formGridCountry">
                            <Form.Text className="d-flex">Country</Form.Text>
                            <Form.Label className="d-flex mb-1">
                              {!show && celebrities.country}
                            </Form.Label>
                            {show && (
                              <Form.Control
                                type="country"
                                onChange={(event) => {
                                  setNewCountry(event.target.value);
                                  celebId = celebrities.id - 1;
                                  setAbled(true);
                                }}
                                placeholder="Enter Country"
                                defaultValue={celebrities.country}
                              />
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Text className="d-flex">Description</Form.Text>
                          <p
                            className="d-flex ms-0 mb-1"
                            style={{ textAlign: "left" }}
                          >
                            {!show && celebrities.description}
                          </p>
                          {show && (
                            <textarea
                              className="mb-1 d-flex justify-content-start"
                              onChange={(event) => {
                                setNewDescription(event.target.value);
                                celebId = celebrities.id - 1;
                                setAbled(true);
                              }}
                              defaultValue={celebrities.description}
                              placeholder="Enter Description"
                              cols="64"
                              rows="5"
                              style={{ borderRadius: "10px" }}
                            ></textarea>
                          )}
                        </Form.Group>
                      </Row>
                      <Row className="mt-1">
                        <div className="d-flex justify-content-end">
                          {!show && (
                            <div className="me-3">
                              <i
                                onClick={() => {
                                  setModalShow(true);
                                  celebId = celebrities.id;
                                }}
                                style={{ color: "red" }}
                                className="bi bi-trash3"
                              ></i>
                            </div>
                          )}
                          {!show && (
                            <i
                              onClick={() => {
                                handleUpdate(age(celebrities.dob));
                              }}
                              style={{ color: "blue" }}
                              className="bi bi-pencil"
                            ></i>
                          )}
                          {show && (
                            <div className="me-3">
                              <i
                                onClick={() => setShow(false)}
                                style={{ color: "red" }}
                                className="bi bi-x-circle"
                              ></i>
                            </div>
                          )}
                          {show && (
                            <i
                              onClick={handleSaveUpdate}
                              style={{ color: "green" }}
                              className="bi bi-check-circle"
                            ></i>
                          )}
                        </div>
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
              <br />
            </div>
          );
        })}
      </Col>
      <DeleteModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        celebId={celebId}
        celebs={celebs}
      />
    </div>
  );
};
