/** @jsxImportSource @emotion/react */

import AllSongs from "components/allSongs";
import Footer from "components/footer";
// import MySongs from "components/mySongs";
import NavBar from "components/NavBar";
import Stage from "components/Stage";
import { font } from "styles";
import { dashboardStyles } from "styles/dashboard";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div
        css={{
          width: "100%",
          height: "1200px",
          background: "lightgray",
          paddingTop: "2rem",
        }}
      >
        <div id="self" css={[dashboardStyles.self, font.lubrifont]}>
          <div id="nav" css={dashboardStyles.nav}>
            <button
              css={[
                dashboardStyles.btn,
                { borderRadius: "20px 0px 0px 0px" },
              ]}
            >
              My Songs
            </button>
            <button css={[dashboardStyles.btn]}>All Songs</button>
            <button css={[dashboardStyles.btn]}>Song Stats</button>
          </div>
          <Stage>
            {/* <MySongs /> */}
            <AllSongs />
          </Stage>
          {/* <div></div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
