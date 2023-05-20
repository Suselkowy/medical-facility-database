import React from "react";
import { css } from "@emotion/react";
import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  const override = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <>
      <div className="spinner-container">
        <PacmanLoader color="#007bff" css={override} size={25} />
      </div>
    </>
  );
};

export default Spinner;
