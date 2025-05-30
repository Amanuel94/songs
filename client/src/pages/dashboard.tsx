/** @jsxImportSource @emotion/react */

import Footer from "components/footer";
import SongStat from "components/songStat";

import NavBar from "components/NavBar";
import Stage from "components/Stage";
import { color, font } from "styles";
import { dashboardStyles } from "styles/dashboard";
import { useState } from "react";
import { css } from "@emotion/react";
import MySongs from "components/mySongs";
import AllSongs from "components/allSongs";

const Dashboard = () => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const highlightBtnCss = css({
    borderBottom: "2px solid " + color.primary,
    backgroundColor: color.primary,
  });
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
                selectedBtn === 0 && highlightBtnCss,
              ]}
              onClick={() => setSelectedBtn(0)}
            >
              My Songs
            </button>
            <button
              css={[dashboardStyles.btn, selectedBtn === 1 && highlightBtnCss]}
              onClick={() => setSelectedBtn(1)}
            >
              All Songs
            </button>
            <button
              css={[dashboardStyles.btn, selectedBtn === 2 && highlightBtnCss]}
              onClick={() => setSelectedBtn(2)}
            >
              Song Stats
            </button>
          </div>
          <Stage>
            {selectedBtn === 0 ? (
              <MySongs />
            ) : selectedBtn === 1 ? (
              <AllSongs />
            ) : (
              <SongStat />
            )}
          </Stage>
          {/* <div></div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
