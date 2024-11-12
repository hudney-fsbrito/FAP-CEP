"use client";
import { useState } from "react";

interface MyButtonProps {
  onFetchAddress: (textValue: string) => void;
}

export function MyButton({ onFetchAddress }: MyButtonProps) {
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col">
        <label htmlFor="cep-input">CEP</label>
        <input
          id="cep-input"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="border border-s-4 border-b-primary p-5 rounded-2xl"
          type="text"
          placeholder="Digite um CEP válido"
        />
      </div>
      <button
        disabled={!textValue}
        onClick={() => onFetchAddress(textValue)}
        className="border border-blue-950 px-8 py-3 bg-primary text-[#fff] rounded-3xl"
      >
        Buscar Endereço
      </button>
    </div>
  );
}
