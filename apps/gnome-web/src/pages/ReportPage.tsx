import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FileInput } from "../components/FileInput";
import { Input } from "../components/Input";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";
import InteractiveMapPicker from "../components/mapPicker/InternalMapPicker";
import {axiosInstance} from "@/lib/api/axios"

type FormValues = {
  name: string;
  userName: string;
  location: string;
  latitude: number;
  longitude: number;
  file: FileList;
};

export const ReportPage = () => {
  console.log("Rendering ReportPage"); // Debugging log

  const { register, handleSubmit, setValue, control } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting form data:", data); // Debugging log

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("userName", data.userName);
      formData.append("location", data.location);
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

      console.log("Report sent successfully:", response.data);
      alert("Zgłoszenie przesłano pomyślnie!");
      navigate("/admin"); // Redirect to /admin after successful submission
    } catch (error) {
      console.error("Error sending report: ", error);
      alert("Wystąpił błąd podczas zgłaszania krasnala. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px] rounded-tr-[15px] h-80/50 sm:h-80/50 md:h-80/50 lg:h-80/50" />
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
              <CircleTracker
                label="1"
                text="Wprowadź nazwę zaginionego krasnala"
                className="mt-0"
              />
              <Input
                type="text"
                placeholder="Nazwa"
                className="ml-[60px]"
                {...register("name", { required: "Nazwa jest wymagana" })}
              />
            </div>
          </div>
          <div>
            <CircleTracker
              label="2"
              text="Prześlij zdjęcie miejsca w którym krasnal się znajdował"
            />
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
          <div>
            <CircleTracker
              label="3"
              text="Wskaż poprzednią lokalizacje krasnala:"
            />
            <div className=" h-[250px] w-[400px] ml-[60px]">
              <InteractiveMapPicker
                onPositionChange={(position) => {
                  setValue("latitude", position.lat);
                  setValue("longitude", position.lng);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <CircleTracker
              label="4"
              text="Podaj dokładny adres, gdzie zabrakło krasnala: "
            />
            <Input
              type="text"
              placeholder="Adres"
              className="ml-[60px]"
              {...register("location", { required: "Adres jest wymagany" })}
            />
          </div>
          <div className="flex flex-col">
            <CircleTracker label="5" text="Podaj swoje imię i nazwisko" />
            <Input
              type="text"
              placeholder="Imię i nazwisko"
              className="ml-[60px]"
              {...register("userName", {
                required: "Imię i nazwisko jest wymagane",
              })}
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
              Zgłoś
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
