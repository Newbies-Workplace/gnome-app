import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  label?: string;
  selectedDate?: Date;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  selectedDate,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className=" text-[#757A75]">{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="bg-[#ffffff] text-[#B3B3B3] min-w-75 w-[30%] h-15 rounded-[10px] pl-[25px]"
        placeholderText={placeholder ?? "Wybierz datę"}
      />
    </div>
  );
};
