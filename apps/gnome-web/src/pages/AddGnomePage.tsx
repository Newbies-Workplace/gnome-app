import Navbar from "./Navbar";

export const AddGnomePage = () => {
  const AddGnomeButton: React.CSSProperties = {
    backgroundColor: "#1E201E",
    color: "#757A75",
    borderRadius: "50px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
  };
  return (
    <div>
      <Navbar />
      <h1>Dodawanie krasnala</h1>
      <button
        style={AddGnomeButton}
        onClick={() => (window.location.href = "/infoadd")}
      >
        Dodaj
      </button>
    </div>
  );
};
