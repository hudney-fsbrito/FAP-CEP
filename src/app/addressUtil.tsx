import { Address } from "@/app/page";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAddress } from "../../get-address";
// import toast from "react-hot-toast";



// Formatação de data
export function formatDate(date: Date) {
  return formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });
}

// Função para buscar o endereço
export async function fetchAddress(textValue: string): Promise<Address | null> {
  
  try {
    const result = await getAddress(textValue);

    if (result?.erro === "true") {
      alert("CEP inválido.");
      return null;
    }

    const newAddress: Address = {
      id: self.crypto.randomUUID(),
      consultedAt: new Date(),
      ...result,
    };
    return newAddress;
  } catch (error) {
    console.error("Erro ao obter o endereço:", textValue,error);
    alert("Ocorreu um erro ao obter o endereço.");
    return null;
  }
}
