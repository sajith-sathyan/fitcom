import React from "react";

function CardLoading() {
  return (
    <div>
      <div className="cards">
        {/* Loading Card */}
        <div className="card is-loading">
          <div className="image"></div>
          <div className="content">
            <h2></h2>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLoading;
