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
      {label && <label className="mb-2 text-gray-300">{label}</label>}
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="bg-[#1E201E] border-2 border-[#FFF] text-white w-full h-10 rounded-[15px] pl-3"
        placeholderText="Wybierz datę"
      />
    </div>
  );
};
