import Link from "next/link";

export function Header(){
    return (
        <>
            <ul>
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
        </>
    )
}