import React from "react";
import SectOne from "./SectOne/SectOne";
import SectTwo from "./SectTwo/SectTwo";
import SectThree from "./SectThree/SectThree";
import SectFour from "./SectFour/SectFour";
import SectFive from "./SectFive/SectFive";
import SectSix from "./SectSix/SectSix";
import SectSeven from "./SectSeven/SectSeven";

const MainContent = () => {
  return (
    <div>
      <section>
        <SectFour />
        {/* <SectSeven /> */}
        {/* <SectThree /> */}
        <SectOne />
        <SectTwo />
        {/* <SectSix /> */}
        {/* <SectFive /> */}
      </section>
    </div>
  );
};

export default MainContent;
