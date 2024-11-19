"use client";
import { useState } from "react";

interface MyButtonProps {
  onFetchAddress: (textValue: string) => void;
}

export function MyButton({ onFetchAddress }: MyButtonProps) {
  const [textValue, setTextValue] = useState("");
  function handleButtonClick(textValue: string) {
    if (!textValue) {
      alert("Por favor, insira um CEP.");
      return;
    }

    console.log("Chamando a função onFetchAddress do BTN com:", textValue);
    onFetchAddress(textValue); // Passa o valor para a função do pai
    setTextValue(""); // Reseta o valor do input após a chamada
  }
  
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
        onClick={() => handleButtonClick(textValue)}
        className="w-full p-2 bg-primary text-[#fff] rounded-2xl outline-none"
      >
        Buscar Endereço
      </button>
    </div>
  );
}
