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
    <div className="flex flex-col items-right justify-right ml-10">
      <div
        className={`border-2 border-dashed rounded-lg p-6 w-96 h-48 flex flex-col items-center justify-center ${
          isDragging ? "border-blue-500 bg-blue-100" : "border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Select Files
        </label>
      </div>

      <div className="mt-4 w-96">
        <h3 className="text-lg font-bold">Selected Files:</h3>
        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index} className="text-gray-700">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
