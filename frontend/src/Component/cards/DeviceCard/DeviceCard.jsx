import React from "react";
import "./Style.css"; // Import the CSS file

const WalletCard = () => {
  const product = {
    name: "Smart Wallet Pro",
    charge: "85%", // Battery percentage or charge level
  };

  return (
    <div className="wallet-card">
      {/* Image Section */}
      <img
        src="https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg"
        alt="Wallet Logo"
        className="wallet-image"
      />

      {/* Product Info Section */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-charge">Charge: {product.charge}</p>
      </div>

      {/* Buttons Section */}
      <div className="button-group">
        <button className="connect-btn">Connect</button>
        {/* <button className="disconnect-btn">Disconnect</button> */}
      </div>
    </div>
  );
};

export default WalletCard;
