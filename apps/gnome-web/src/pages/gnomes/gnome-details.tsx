import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CreationIcon from "@/assets/icons/creation-icon.svg";
import DeleteIcon from "@/assets/icons/delete-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import FoundIcon from "@/assets/icons/found-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Button } from "@/components/ui/button";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

function useToastNavigate() {
  const navigate = useNavigate();

  const toastNavigate = (
    path: string,
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
    navigate(path);
  };

  return toastNavigate;
}

function GnomeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { gnomes, removeGnome } = useGnomeStore();
  const { districts } = useDistrictStore();
  const toastNavigate = useToastNavigate();

  const gnome = gnomes.find((g) => g.id.toString() === id);
  const districtName = districts.find((d) => d.id === gnome?.districtId)?.name;

  if (!gnome) {
    toastNavigate("/admin", `Nie znaleziono krasnala o ID ${id}`, "error");
    return null;
  }

  const handleEdit = () => {
    navigate(`/admin/gnomes/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć tego krasnala?",
    );
    if (!confirmed) return;

    await removeGnome(gnome.id);
    toastNavigate("/admin", `Gnom "${gnome.name}" został usunięty`, "success");
  };

  return (
    <div className="text-white p-4 font-Afacad flex flex-col gap-4">
      <Button
        onClick={() => navigate("/admin")}
        className="bg-primary-color px-4 py-2 rounded-2xl text-white"
      >
        go back
      </Button>
      <div className="flex flex-row items-stretch gap-4">
        <img
          src={gnome.pictureUrl || PlaceHolder}
          alt={gnome.name}
          className="w-32 h-40 object-cover rounded"
        />
        <div className="flex flex-col justify-between h-32">
          <div className="text-2xl font-bold text-center">{gnome.name}</div>
          <div className="text-sm text-gray-300 text-center">
            {districtName || "Brak przypisanej dzielnicy"}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-m flex flex-row gap-2">
              <img src={LocationIcon} alt="location" className="w-6 h-6" />
              {gnome.location}
            </div>
            <div className="text-m flex flex-row gap-2">
              <img src={CreationIcon} alt="date" className="w-6 h-6" />
              {new Date(gnome.creationDate).toLocaleDateString()}
            </div>
            <div className="text-m flex flex-row gap-2">
              <img src={FoundIcon} alt="users" className="w-6 h-6" />0 osób
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <Button
          onClick={handleEdit}
          className="w-1/2 text-center text-white font-Afacad bg-primary-color border-none rounded-4xl"
        >
          <div className="flex flex-row gap-2 items-center">
            <img src={EditIcon} alt="delete" className="w-6 h-6" />
            Edytuj gnoma
          </div>
        </Button>
        <Button
          onClick={handleDelete}
          className="w-1/2 text-center text-white font-Afacad bg-primary-color border-none rounded-4xl"
        >
          <div className="flex flex-row gap-2 items-center">
            <img src={DeleteIcon} alt="delete" className="w-6 h-6" />
            Usuń gnoma
          </div>
        </Button>
      </div>
      <hr className="border-t-2 border-primary-color " />
      <div className="flex flex-col text-left">
        <div>{gnome.description}</div>
        <h4 className="mt-2 font-bold">Ciekawostka:</h4>
        <div>{gnome.funFact}</div>
      </div>
    </div>
  );
}

export default GnomeDetail;
