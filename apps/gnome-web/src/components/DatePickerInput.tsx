import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  label?: string;
  selectedDate?: Date;
  onChange: (date: Date | null) => void;
  className?: string;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  selectedDate,
  onChange,
  className = "",
}) => {
  const [date, setDate] = useState<Date | null>(selectedDate || null);

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className=" text-[#757A75]">{label}</label>}
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="bg-[#ffffff] text-[#B3B3B3] w-[500px] h-[50px] rounded-[10px] pl-[25px]"
        placeholderText="Wybierz datę"
      />
    </div>
  );
};
