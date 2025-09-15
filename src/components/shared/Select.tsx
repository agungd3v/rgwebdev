import { useToggleState } from "@/store/toggle";
import { useCallback, useEffect } from "react";

type selectOption = {
  label: string;
  value: string | number;
}

export default function Select({options, onChange}: {options: selectOption[], onChange?: (option: selectOption) => void}) {
  const {select, selectedOption, setSelect, setSelectedOption} = useToggleState();

  const handleSelect = useCallback((option: selectOption) => {
    setSelectedOption(option);
    onChange?.(option);
    setSelect(false);
  }, [setSelect, setSelectedOption, onChange]);
  
  useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0]);
      onChange?.(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full relative">
      <button
        type="button"
        onClick={() => setSelect(!select)}
        className="w-full flex justify-between items-center px-4 py-2 border-2 border-yellow-100 text-white rounded-lg text-left outline-none"
      >
        <span className="font-semibold">{selectedOption!.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${select ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {select && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${
                selectedOption!.value === option.value ? "bg-indigo-50 font-medium" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
