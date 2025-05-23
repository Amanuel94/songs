/** @jsxImportSource @emotion/react */
import { cardProp } from "@types";
import { cardContStyle } from "styles";

const Card = (prop: cardProp) => {
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
      >
      </div>
        <p css={cardContStyle.caption}>{prop.caption}</p>
    </div>
  );
};

export default Card;
