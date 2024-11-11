"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";
import { Address } from "@/app/page";
import { initialAddress } from "@/app/page";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";


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

  function handleDeleteAddress(id:string) {
    console.log(id);
    const filteredAddresses = addresses.filter((address)=> address.id != id)
    console.log(filteredAddresses);
    setAddresses(filteredAddresses)
    
  }

  return (
    <>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col">
          <label htmlFor="">CEP</label>
          <input
            onChange={(e) => {
              setTextVelue(e.target.value);
            }}
            className="border border-s-4 border-b-primary p-5 rounded-2xl"
            type="text"
            placeholder="Digite um CEP válido"
          />
          {loading ? "Carregando..." : "Obter endereço"}
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
          

          <div>Endereço: {adress}</div>
          <div>cep: {cep}</div>
          <div>Bairro: {neighborhood}</div>
        </div>
      </div>
      <div>
        
      <table className="table-auto [&>*>*>*]:border-2">
        <thead>
          <tr className="[&>*]:px-4 [&>*]:py-2">
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Localidade</th>
            <th>UF</th>
            <th>CEP</th>
            <th>Consultado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {addresses.map((address) => (
            <tr key={address.id} className="[&>*]:px-4 [&>*]:py-2">
              <td>{address.logradouro}</td>
              <td>{address.bairro}</td>
              <td>{address.localidade}</td>
              <td>{address.estado}</td>
              <td>{address.cep}</td>
              <td>{formatDate(address.consultedAt)}</td>
              <td>
                <button onClick={()=>handleDeleteAddress(address.id)} className="bg-red-300 p-0.5 flex items-center">
                  <MdOutlineDelete size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
