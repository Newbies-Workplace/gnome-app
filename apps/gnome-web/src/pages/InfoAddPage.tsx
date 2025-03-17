import React from "react";

const AddInfoPage: React.FC = () => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#1E201E",
    color: "#757A75",
    borderRadius: "50px",
    padding: "50px 35px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
  };

  return (
    <div>
      <button style={buttonStyle} onClick={() => (window.location.href = "/")}>
        Strona Główna
      </button>
      <button
        style={buttonStyle}
        onClick={() => (window.location.href = "/addgnome")}
      >
        Dodaj kolejnego
      </button>
    </div>
  );
};

export default AddInfoPage;
