// page.tsx
"use client";
import { useEffect, useState } from "react";
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
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchAddress = async (textValue: string) => {
    setLoading(true);
    const newAddress = await fetchAddress(textValue);
    if (newAddress) {
      setAddresses([newAddress, ...addresses || []]);
    }
    setLoading(false);
  };

  const handleDeleteAddress = (id: string) => {
    console.log(id);
    if (!addresses) return
    const filteredAddresses = addresses.filter((address) => address.id !== id);
    console.log(filteredAddresses);
    setAddresses(filteredAddresses);
  };

  useEffect(()=>{
    console.log("Primeira renderização");
    const result = localStorage.getItem("@addresses")
    if (result !== null) {
        setAddresses(JSON.parse(result));
    }
  }, [])
  useEffect(()=>{
    console.log("Address mudou");
    if (addresses === null) return
    localStorage.setItem("@addresses", JSON.stringify(addresses))
  }, [addresses])

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

      {/* {addresses.length > 0 && ( */}
        <motion.div
          className="p-4 w-[80%] max-w-4xl bg-primary bg-opacity-15 z-10 rounded-lg shadow-lg "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
        >
          <motion.table className="table-auto w-full border-collapse ">
            <thead className="bg-primary2 text-white">
              <tr className="">
                <th className="px-4 py-2 min-w-[180px] text-center">
                  Logradouro
                </th>
                <th className="px-4 py-2 min-w-[100px] text-center">Bairro</th>
                <th className="px-4 py-2 min-w-[100px] text-center">
                  Localidade
                </th>
                <th className="px-4 py-2 min-w-[60px] text-center">UF</th>
                <th className="px-4 py-2 min-w-[120px] text-center">CEP</th>
                <th className="px-4 py-2 min-w-[100px] text-center">
                  Consultado em
                </th>
                <th className="px-4 py-2 min-w-[60px] text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {addresses?.map((address) => (
                <tr
                  key={address.id}
                  className="odd:bg-gray-100 even:bg-gray-50 text-center"
                >
                  <td className="px-4 py-2">{address.logradouro}</td>
                  <td className="px-4 py-2">{address.bairro}</td>
                  <td className="px-4 py-2">{address.localidade}</td>
                  <td className="px-4 py-2">{address.estado}</td>
                  <td className="px-4 py-2">{address.cep}</td>
                  <td className="px-4 py-2">
                    {formatDate(address.consultedAt)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-1 rounded-full z-10"
                    >
                      <MdOutlineDelete size={24} fill="red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      {/* // )} */}
    </div>
  );
}
