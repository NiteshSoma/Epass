import React, { useEffect, useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import axios from "axios";

const MyRequests = () => {

  const [requests, setRequests] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  const fetchRequests = async () => {
    const { data } = await axios.get("/api/requests");

    setRequests(data);
  };

  console.log(requests);

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <MainPage title="Welcome back Nitesh Soma...">
      <Link to="createrequest">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create Request
        </Button>
      </Link>
      {requests.map((request) => (
        <Accordion key={request._id}>
          <Accordion.Item eventKey="0">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Header>
                    {request.origin} -&gt; {request.destination}
                  </Accordion.Header>
                </span>
                <div>
                  <Button href={`/request/${request._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(request._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      Travelling from {request.origin} to {request.destination}{" "}
                      on {request.date}
                    </p>
                    <footer className="blockquote-footer">
                      Created on date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainPage>
  );
};

export default MyRequests;
