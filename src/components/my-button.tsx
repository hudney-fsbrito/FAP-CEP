"use client"
import { getAddress } from "../../get-address";

export function MyButton() {

  async function handleGetAddress(){
    const result = await getAddress("53025122")
    console.log(result);
    
  }

  return (
    <>
      <button
        onClick={handleGetAddress}
        className="border border-blue-950 px-8 py-3 bg-primary text-[#fff] rounded-3xl">
        Button
      </button>
    </>
  );
}
