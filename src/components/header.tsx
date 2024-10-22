import Link from "next/link";

export function Header(){
    return (
        <div className=" flex border-b-2 justify-center items-center">
            <ul className="flex gap-4 p-6">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/register">Register</Link>
                </li>
                <li>
                    <Link href="/sign-in">Sign-IN</Link>
                </li>
            </ul>
        </div>
    )
}