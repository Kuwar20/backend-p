import React from "react";
import Header from "../components/Header";
import "./Main.css";

const Main = () => {
  return (
    <div>
      <div className="main-container">
        <div className="main-content">
          <p>
            This is the landing page of the application.
            <br />
            You can navigate to the other pages using the links in the header.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
