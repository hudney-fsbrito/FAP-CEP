// page.tsx
"use client";
import { useState } from "react";
import { MyButton } from "./components/my-button";
import { MdOutlineDelete } from "react-icons/md";
import { fetchAddress, formatDate } from "./addressUtil";

export type Address = {
  id: string;
  bairro: string;
  estado: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  cep: string;
  consultedAt: Date;
};

export const initialAddress: Address[] = [
  {
    id: self.crypto.randomUUID(),
    bairro: "Bairro",
    estado: "Estado",
    localidade: "Cidade",
    logradouro: "Nome da rua, avenida...",
    regiao: "Região",
    cep: "Cep",
    consultedAt: new Date(),
  },
];

export default function Home() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddress);
  const [loading, setLoading] = useState(false);

  const handleFetchAddress = async (textValue: string) => {
    setLoading(true);
    const newAddress = await fetchAddress(textValue);
    if (newAddress) {
      setAddresses([newAddress, ...addresses]);
    }
    setLoading(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1 pb-20 gap-12 font-[family-name:var(--font-geist-sans)]">
      <h1 className="flex justify-center text-4xl">CEP Torpedo</h1>
      <MyButton onFetchAddress={handleFetchAddress} />

      {loading && <p>Carregando...</p>}

      {addresses.length > 0 && (
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
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="bg-red-300 p-0.5 flex items-center"
                  >
                    <MdOutlineDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
