import React, { useState } from "react";

export const FileInput: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  return (
    <div className="flex flex-row items-right justify-right ml-[60px]">
      <div
        className={`border-2 border-dashed rounded-lg p-6 w-[500px] h-48 flex flex-col items-center justify-center ${
          isDragging ? "border-[#1E201E] bg-[#fff]" : "border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-[#757A75] text-center">
          Przeciągnij i upuść pliki tutaj lub wybierz je klikając poniżej
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <div className="flex flex-row items-center justify-center mt-2 gap-2">
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className={`mt-4 px-4 py-2 h-[40px] w-[100px] ${
              files.length >= 4
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#D6484A] hover:bg-[#D96466]"
            } text-white rounded-[15px]`}
            disabled={files.length >= 4}
          >
            Wybierz
          </button>
          <button
            onClick={() => setFiles([])}
            className="mt-4 px-4 py-2 h-[40px] w-[100px] bg-[#D6484A] text-white rounded-[15px] cursor-pointer hover:bg-[#D96466]"
          >
            Wyczyść
          </button>
        </div>
      </div>

      <div className="-mt-1 w-96 ml-5">
        {files.length > 0 && <h3 className="text-lg">Wybrane pliki:</h3>}
        <ul className="list-disc pl-5">
          {files.slice(0, 4).map((file, index) => (
            <li key={index} className="text-[#A7A7A7]">
              {file.name}
            </li>
          ))}
        </ul>
        {files.length >= 4 && (
          <p className="text-[#A7A7A7] mt-2">
            Nie możesz dodać więcej niż 4 pliki
          </p>
        )}
      </div>
    </div>
  );
};
