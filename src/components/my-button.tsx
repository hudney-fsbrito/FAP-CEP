"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";

export function MyButton() {
  const [adress, setAdress] = useState();
  const [cep, setCep] = useState();
  const [neighborhood, setNeighborhood] = useState();

  async function handleGetAddress() {
    const result = await getAddress("53025122");
    console.log(result);

    setAdress(result.logradouro);
    setCep(result.cep);
    setNeighborhood(result.bairro);
    
  }

  return (
    <div className="flex flex-row gap-5">
      <button
        onClick={handleGetAddress}
        className="border border-blue-950 px-8 py-3 bg-primary text-[#fff] rounded-3xl"
      >
        Button
      </button>

      <div>
        <div>Endereço: {adress}</div>
        <div>cep: {cep}</div>
        <div>Cidade: {neighborhood}</div>
      </div>
    </div>
  );
}
