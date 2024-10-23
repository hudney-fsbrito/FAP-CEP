"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";

export function MyButton() {
  const [adress, setAdress] = useState(null);
  const [cep, setCep] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGetAddress() {
    setLoading(true)
    try{

      const result = await getAddress("53025122");
      console.log(result);
  
      setAdress(result.logradouro);
      setCep(result.cep);
      setNeighborhood(result.bairro);
    } catch (error){
      console.log(error);
      alert("Ocorrey um erro ao obter o endereço.")
    } finally{
      setLoading(false)
    }
    
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
        {/* {String(loading)} */}
        {loading? "Carregando..." : "Obter endereço"}
        <div>Endereço: {adress}</div>
        <div>cep: {cep}</div>
        <div>Bairro: {neighborhood}</div>
      </div>
    </div>
  );
}
