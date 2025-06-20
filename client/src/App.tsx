/** @jsxImportSource @emotion/react */

import Banner from "components/Banner";
import Card from "components/card";
import Footer from "components/footer";
import NavBar from "components/NavBar";
import { authActions } from "features/authSlice";
import { songApiActions } from "features/songApiSlice";
import { useAppDispatch } from "hooks/stateHooks";
import { font, cardContStyle } from "styles";

const App = () => {
  const feats: string[] = [
    "Join us and Add Your Favorite Tracks",
    "Browse Our Collections as Guest",
    "Look at Our Stats",
  ];
  const dispatch = useAppDispatch();
  dispatch(authActions.reset({}))    
  const imgs: string[] = ["./concert.jpg", "./lib.jpg", "./stat.jpg"];
  const paths: string[] = [
    "/register",
    "/dashboard",
    "/dashboard",
  ];

  dispatch(songApiActions.reset({}));

  return (
      <div>
        <NavBar />
        <Banner />
        <div css={[cardContStyle.self, font.lubrifont]}>
          {feats.map((feat, index) => (
            <Card imgSrc={imgs[index]} caption={feat} key={index} link={paths[index]} />
          ))}
        </div>
        <Footer />
      </div>
  );
};
export default App;
