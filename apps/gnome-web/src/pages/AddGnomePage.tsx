import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DatePickerInput } from "../components/DatePickerInput";
import { FileInput } from "../components/FileInput";
import { Input } from "../components/Input";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";
import InteractiveMapPicker from "../components/mapPicker/InternalMapPicker";
import { axiosInstance } from "../lib/api/axios"; // Import axios instance

type FormValues = {
  name: string;
  description: string;
  location: string;
  creationDate: string;
  latitude: number;
  longitude: number;
  file: FileList;
};

export const AddGnomePage = () => {
  const { register, handleSubmit, setValue, control } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("creationDate", data.creationDate);
      formData.append("latitude", data.latitude.toString());
      formData.append("longitude", data.longitude.toString());

      // Append the file(s) to the FormData
      if (data.file && data.file.length > 0) {
        for (const file of Array.from(data.file)) {
          formData.append("file", file);
        }
      }

      // Send the form data to the backend
      const response = await axiosInstance.post("/gnomes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Gnome added successfully:", response.data);
      alert("Krasnal został dodany pomyślnie!");
      navigate("/admin/infoadd"); // Redirect to /admin/infoadd after successful submission
    } catch (error) {
      console.error("Error adding gnome:", error);
      alert("Wystąpił błąd podczas dodawania krasnala. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px] h-95/50 sm:h-95/50 md:h-95/50 lg:h-95/50" />
      <div>
        <a href="/admin">
          <img
            src="../src/images/Back.svg"
            alt="Wróć"
            className="ml-15 mt-5 absolute h-[30px] w-[30px]"
          />
        </a>
      </div>
      <h1 className="text-[40px] text-center mx-auto">Dodawanie krasnala</h1>
      <div className="items-left justify-left flex flex-col ml-40 mt-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center gap-10">
            <div className="flex flex-col">
              <CircleTracker label="1" text="Wprowadź nazwę krasnala" />
              <Input
                type="text"
                placeholder="Nazwa"
                className="ml-[60px]"
                {...register("name", { required: "Nazwa jest wymagana" })}
              />
            </div>
          </div>
          <div>
            <CircleTracker label="2" text="Dodaj zdjęcie krasnala" />
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileInput
                  files={field.value || []} // Pass the current value
                  onChange={(files) => field.onChange(files)} // Update the value on change
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <CircleTracker label="3" text="Wybierz datę powstania krasnala" />
            <Controller
              name="creationDate"
              control={control}
              render={({ field }) => (
                <DatePickerInput
                  className="ml-[60px]"
                  selectedDate={new Date(field.value)}
                  onChange={(date: Date | null) => field.onChange(date?.toISOString())}
                  placeholder="Data powstania"
                />
              )}
            />
          </div>
          <div className="flex flex-col">
            <CircleTracker label="4" text="Opisz krasnala" />
            <textarea
              className="bg-[#ffffff] text-[#B3B3B3] min-w-75 w-[30%] h-[150px] rounded-[10px] pl-[25px] pt-[15px] ml-[60px]"
              placeholder="Opis"
              {...register("description", { required: "Opis jest wymagany" })}
            />
          </div>
          <div>
            <CircleTracker label="5" text="Wybierz lokalizację krasnala" />
            <div className="h-[390px] w-[500px] ml-[60px] w-96 h-48">
              <InteractiveMapPicker
                onPositionChange={(position) => {
                  setValue("latitude", position.lat);
                  setValue("longitude", position.lng);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <CircleTracker label="6" text="Podaj dokładny adres krasnala" />
            <Input
              type="text"
              placeholder="Adres"
              className="ml-[60px]"
              {...register("location", { required: "Adres jest wymagany" })}
            />
          </div>
          <div className="flex flex-row mt-10">
            <CircleTracker label="7" className="-mt-15" />
            <button
              type="submit"
              className="w-[200px] h-[50px] ml-1 text-center text-[21px] text-[#fff] bg-[#D6484A]
                rounded-[20px] flex items-center justify-center transition-all duration-200 hover:text-[22px]
                hover:bg-[#D96466] hover:text-[#FFFFFF]"
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
