import { MyButton } from "./components/my-button";
interface AvatarProps {
  size?:number,
  alt?:string
  src:string
}

type CardProps = {
  children: React.ReactNode,
}

function Avatar({size = 100,src,alt=""}: AvatarProps) {
  
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
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
    <div className="flex flex-col items-center justify-center min-h-screen p-1 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Home!</h1>
      <div className="flex p-16 border border-blue-500">
      
      <Avatar size={150} alt="Imagem teste" src="https://i.imgur.com/1bX5QH6.jpg"/>
      <Avatar size={50} alt="Imagem teste" src="https://i.imgur.com/1bX5QH6.jpg"/>
      <Avatar size={200} src="https://i.imgur.com/1bX5QH6.jpg"/>
     

      </div>

      <Card>
        <div>Teste 1</div>
        <div>Teste 2</div>
      </Card>

      <MyButton />
    </div>
  );
}
