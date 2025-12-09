import { useNavigate, useParams } from "react-router-dom";
import CreationIcon from "@/assets/icons/creation-icon.svg";
import DeleteIcon from "@/assets/icons/delete-icon.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import FoundIcon from "@/assets/icons/found-icon.svg";
import GoBack from "@/assets/icons/goBack-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import PlaceHolder from "@/assets/images/placeholder.png";
import { Button } from "@/components/ui/button";
import { useToastNavigate } from "@/hooks/useToastNavigate";
import { useDistrictStore } from "@/store/useDistrictStore";
import { useGnomeStore } from "@/store/useGnomeStore";

export default function GnomeDetailsPage() {
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
    <div className="text-white p-2 sm:p-4 font-Afacad flex flex-col gap-3 min-w-[320px]">
      <div className="flex flex-row gap-4 items-center">
        <Button
          onClick={() => navigate("/admin")}
          className="bg-primary-gray px-3 py-2 rounded-4xl text-white text-sm sm:text-base"
        >
          <img src={GoBack} alt="goback" />
        </Button>
        <div className="text-white text-Afacad text-xl">Lista krasnali</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-start min-w-0">
        <img
          src={gnome.pictureUrl || PlaceHolder}
          alt={gnome.name}
          className="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded flex-shrink-0"
        />

        <div className="flex flex-col gap-1 sm:gap-2 w-full min-w-0">
          <div className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            {gnome.name}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 text-center sm:text-left">
            {districtName || "Brak przypisanej dzielnicy"}
          </div>

          <div className="flex flex-col gap-1 mt-2 text-xs sm:text-sm">
            <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
              <img src={LocationIcon} className="size-4 flex-shrink-0" />
              <span>{gnome.location}</span>
            </div>
            <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
              <img src={CreationIcon} className="size-4 flex-shrink-0" />
              <span>{new Date(gnome.creationDate).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-1 sm:gap-2 items-center flex-wrap">
              <img src={FoundIcon} className="size-4 flex-shrink-0" />
              <span>0 osób</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        <Button
          onClick={handleEdit}
          className="text-white bg-primary-color py-2 rounded-2xl w-full text-xs sm:text-sm"
        >
          <div className="flex gap-1 sm:gap-2 items-center justify-center flex-wrap">
            <img src={EditIcon} className="size-4 flex-shrink-0" />
            <span>Edytuj</span>
          </div>
        </Button>

        <Button
          onClick={handleDelete}
          className="text-white bg-primary-color py-2 rounded-2xl w-full text-xs sm:text-sm"
        >
          <div className="flex gap-1 sm:gap-2 items-center justify-center flex-wrap">
            <img src={DeleteIcon} className="size-4 flex-shrink-0" />
            <span>Usuń</span>
          </div>
        </Button>
      </div>

      <hr className="border-t-2 border-primary-color mt-3" />

      <div className="flex flex-col text-left mt-2 text-xs sm:text-sm gap-1">
        <div>{gnome.description}</div>
        <h4 className="font-bold mt-1">Ciekawostka:</h4>
        <div>{gnome.funFact}</div>
      </div>
    </div>
  );
}
