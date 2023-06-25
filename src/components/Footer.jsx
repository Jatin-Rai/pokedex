import React from "react";

//** Styles imports
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark pt-4 text-center text-white">
      <Container>
        <Row>
          <Col md={6}>
            <p>Copyright&copy; {currentYear} by Jatin Rai | All Rights Reserved.</p>
          </Col>
          <Col md={6}>
            <p></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
