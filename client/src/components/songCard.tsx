/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { SongData } from "@types";
import {songCardStyles} from "styles/dashboard";
import { capitalizeFirstLetter } from "utils/utils";

const songCard = (prop: SongData) => {
  return (
    <div css={songCardStyles.self}>
      <h2 css={songCardStyles.title}> {capitalizeFirstLetter(prop.title)} </h2>
      <hr
        css={css({
          width: "95%",
          border: "1px solid #ccc",
          marginLeft: "0px",
          marginBottom: "0",
        })}
      />
      <ul css={songCardStyles.list}>
        <li css={songCardStyles.listItem}>
          <img src="artistb.svg" alt="Artist" css={songCardStyles.icon} />
          <span css={songCardStyles.micro}>{capitalizeFirstLetter(prop.artist)}</span>
        </li>
        <li css={songCardStyles.listItem}>
          <img src="albumb.svg" alt="Album" css={songCardStyles.icon} />
          <span css={songCardStyles.micro}>{capitalizeFirstLetter(prop.album)}</span>
        </li>
        <li css={songCardStyles.listItem}>
          <img src="genreb.svg" alt="Genre" css={songCardStyles.icon} />
          <span css={songCardStyles.micro}>{capitalizeFirstLetter(prop.genre)}</span>
        </li>
        <li css={songCardStyles.listItem}>
          <img src="userb.svg" alt="Uploaded By" css={songCardStyles.icon} />
          <span css={songCardStyles.micro}>{capitalizeFirstLetter(prop.uploadedBy as string)}</span>
        </li>
        <li css={songCardStyles.listItem}>
          <img src="dateb.svg" alt="Date" css={songCardStyles.icon} />
          <span css={songCardStyles.micro}>
            {new Date(prop.createdAt ?? "").toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default songCard;
