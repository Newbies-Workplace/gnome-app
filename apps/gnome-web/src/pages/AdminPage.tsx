import Navbar from "./Navbar";

export const AdminPage = () => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#1E201E",
    color: "#757A75",
    borderRadius: "50px",
    padding: "60px 50px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
  };
  return (
    <div>
      <Navbar />
      <h1>Admin</h1>
      <button
        style={buttonStyle}
        onClick={() => (window.location.href = "/addgnome")}
      >
        Dodaj krasnala do bazy
      </button>
      <button
        style={buttonStyle}
        onClick={() => (window.location.href = "/lostinfo")}
      >
        Sprawdź ostatnie zgłoszenia
      </button>
    </div>
  );
};
