"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";
import { Address } from "@/app/page";
import { initialAddress } from "@/app/page";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";


function formatDate(date:Date) {
  const resultDate = formatDistanceToNow(
    new Date(date),
    {
      includeSeconds: true, 
      locale: ptBR,
    }
  )
  //=> 'less than 20 seconds'
  return resultDate
}

export function MyButton() {
  const [adress, setAdress] = useState(null);
  const [cep, setCep] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(false);

  const [textValue, setTextVelue] = useState("");
  const [addresses, setAddresses] = useState<Address[]>(initialAddress);

  async function handleGetAddress() {
    setLoading(true);
    try {
      const result = await getAddress(textValue);
    
      //Adiciona um atributo no objeto
      const newAdress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date, 
        ...result} 

      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }

      console.log(result);
      console.log(newAdress);
      
      console.log(textValue);

      setAdress(result.logradouro);
      setCep(result.cep);
      setNeighborhood(result.bairro);

      const newAddresses = [newAdress, ...addresses];
      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
      alert("Ocorrey um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col text-primary3">
          <label htmlFor="" className="text-primary3">CEP</label>
          <input
            onChange={(e) => {
              setTextVelue(e.target.value);
            }}
            className="border border-s-4 border-b-primary text-primary4 active:text-primary4 p-5 rounded-2xl"
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
          {loading ? "Carregando..." : "Obter endereço"}

          <div>Endereço: {adress}</div>
          <div>cep: {cep}</div>
          <div>Bairro: {neighborhood}</div>
        </div>
      </div>
      <div>
        {addresses.map((address) => (
          <div key={address.id} className="mt-4">
            <div>Endereço: {address.logradouro} {formatDate(address.consultedAt)}</div>
            <div>CEP: {address.cep}</div>
            <div>Bairro: {address.bairro}</div>
          </div>
        ))}
      </div>
    </>
  );
}
