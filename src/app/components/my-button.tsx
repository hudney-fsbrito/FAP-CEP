"use client";
import { useState } from "react";

interface MyButtonProps {
  onFetchAddress: (textValue: string) => void;
}

export function MyButton({ onFetchAddress }: MyButtonProps) {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="cep-input">CEP</label>
        <input
          id="cep-input"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="border border-primary p-2 rounded-md shadow-[40px] focus:outline-0"
          type="text"
          placeholder="Digite um CEP válido"
        />
      </div>
      <button
        disabled={!textValue}
        onClick={() => onFetchAddress(textValue)}
        className="w-full p-2 bg-primary text-[#fff] rounded-2xl outline-none"
      >
        Buscar Endereço
      </button>
    </div>
  );
}
