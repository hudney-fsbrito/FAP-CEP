export function ListItem(nomes:string[]) {
    return (
        <ul>
          {nomes.map((nome,i)=>(
            <li key={i}>{nome}</li>
          ))}
        </ul>
    )
}