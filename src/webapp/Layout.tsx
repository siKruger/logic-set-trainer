import Top from "../components/top";
import "./common.css";
import Main from "../components/main";
import Footer from "../components/footer";



function Layout() {

  return (
      <div className="page">
        <div>
          {/*top: include instructions for use and task text*/}
          <Top></Top>
          {/* main field */}
          <Main></Main>
        </div>

        {/* foot */}
        <Footer></Footer>
      </div>
  );
}

export default Layout;
