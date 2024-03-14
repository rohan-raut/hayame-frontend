import React from "react";
import "./sectSeven.css";
import { HayameVideo } from "../../../../../assets";
import { useRef } from "react";

const SectSeven = () => {
  return (
    <div>
      <video src={HayameVideo} autoplay="true" muted className="sect-seven-video"></video>
    </div>
  );
};

export default SectSeven;
