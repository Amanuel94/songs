/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import { dashboardStyles } from "styles/dashboard";

const Stage = ({ children }: { children: ReactNode }) => {
  return <div id="stage" css={dashboardStyles.stage}>{children}</div>;
};

export default Stage;
