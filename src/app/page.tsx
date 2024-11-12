// page.tsx
"use client";
import { useState } from "react";
import { MyButton } from "./components/my-button";
import { MdOutlineDelete } from "react-icons/md";
import { fetchAddress, formatDate } from "./addressUtil";
import { motion } from "framer-motion";
// import imgBackground from "../../public/backgroundMapa.jpg"

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
    id: crypto.randomUUID(),
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
    console.log(id);
    const filteredAddresses = addresses.filter((address) => address.id !== id);
    console.log(filteredAddresses);
    setAddresses(filteredAddresses);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-1 pb-20 gap-12 font-[family-name:var(--font-geist-sans)]">
      <motion.img
        src="/backgroundMapa.jpg"
        alt={"Imagem de um mapa como imagem de fundo"}
        className="absolute top-0 bottom-[-10px] bg-gradient-to-tl brightness-75 w-full h-full object-cover 
      opacity-50 z-0"
        initial={{ scale: 2.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.h1
        className="flex justify-center text-4xl font-semibold z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        CEP Torpedo
        <motion.span
          // initial={{ opacity: 0, y: 20 }}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            // repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          🚀
        </motion.span>
      </motion.h1>

      <motion.div
        className="w-96 p-10 bg-primary bg-opacity-15 rounded-md flex flex-col gap-5 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
      >
        <MyButton onFetchAddress={handleFetchAddress} />
      </motion.div>

      {loading && <p>Carregando...</p>}

      {addresses.length > 0 && (
        <motion.table
          className="table-auto bg-primary bg-opacity-15 rounded-md [&>*>*>*]:border-2 z-10 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
        >
          <thead className="">
            <tr className=" [&>*]:px-4 [&>*]:py-2">
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
        </motion.table>
      )}
    </div>
  );
}
