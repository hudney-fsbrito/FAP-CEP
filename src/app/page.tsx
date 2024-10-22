"use client"
import { MyButton } from "../components/my-button";
// import { useRouter } from "next/router";
interface AvatarProps {
  size?:number,
  alt?:string
  src:string
}

type CardProps = {
  children: React.ReactNode,
}

function Avatar({size = 100, src, alt=""}: AvatarProps) {
  
  return (
    <div>
      <picture>
        <img
        className=""
          src={src}
          alt={alt}
          width={size}
          height={size}
        />

      </picture>
    </div>
  );
}

function Card({children} : CardProps) {
  // console.log(children);
  
  return (
    <div className="p-5 border border-black rounded-md ">{children}</div>
  )
}


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1 pb-20 gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-2 p-1 border border-blue-500">
      
      <Avatar size={150} alt="Imagem teste" src="https://i.imgur.com/1bX5QH6.jpg"/>
     
      <Card>
        <div>Teste 1</div>
        <div>Teste 2</div>
      </Card>

      </div>

      <MyButton />
    </div>
  );
}
