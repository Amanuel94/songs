/** @jsxImportSource @emotion/react */
import { cardProp } from "@types";
import { useNavigate } from "react-router-dom";
import { cardContStyle } from "styles";

const Card = (prop: cardProp) => {
  const navigate = useNavigate();
  return (
    <div css={cardContStyle.card}>
      <div
        css={[
          cardContStyle.img,
          {
            backgroundImage: `url(${prop.imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&:hover": {
                backgroundSize: "110%",
                backgroundPosition: "center",
                transition: "background-size 1s ease-in-out",
            }
          },
        ]}

      onClick={() => {
        if (prop.link) {
          navigate(prop.link);
        }
      }}
      >
      </div>
        <p css={cardContStyle.caption}>{prop.caption}</p>
    </div>
  );
};

export default Card;
