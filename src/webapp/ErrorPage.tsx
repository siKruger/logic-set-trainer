import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./ErrorPage.css";
import ErrorTop from "../components/errorTop";

function ErrorPage() {
  return (
    <div className="error_page">
      <Container>
        {/*top: include instructions for use and task text*/}
        <ErrorTop></ErrorTop>

        {/* main field */}
        <Container id="error_page_container">
          <div id="error_block">
            <h2>An Error Occurred!</h2>
            <p>Something went wrong!</p>
            <Link to="/">back</Link>
          </div>
        </Container>
      </Container>

      {/* foot */}
      <Footer></Footer>
    </div>
  );
}

export default ErrorPage;
