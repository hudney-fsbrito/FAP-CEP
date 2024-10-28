"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";

export function MyButton() {
  const [adress, setAdress] = useState(null);
  const [cep, setCep] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(false);

  const [textValue,setTextVelue] = useState('')

  async function handleGetAddress() {
    setLoading(true)
    try{

      const result = await getAddress(textValue);
      console.log(result);
      console.log(textValue);
      
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
      
      <div className="flex flex-col">
      <label htmlFor="">CEP</label>
      <input 
        onChange={(e)=>{setTextVelue(e.target.value)}}
        className="border border-s-4 border-b-primary p-5 rounded-2xl" 
        type="text" 
        placeholder="Digite um CEP válido"
      />
      </div>

      <button
        disabled={textValue == "" ? true : false}
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
