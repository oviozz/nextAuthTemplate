
"use client"

import Link from "next/link";
import ThemeToggleButton from "@/components/NavBar/ThemeToggle/ThemeToggleButton";
import {signOut, useSession} from "next-auth/react";

const navigation_items = [
    //    {'title': 'dashboard', 'link': '/home'},
]

const NavList = () => {

    const { data: session } = useSession()


    const navItems = navigation_items.map((nav, index) => {
        return (
            <Link className={"font-medium "} key={index} href={nav.link}>
                {nav.title}
            </Link>
        )
    })

    return (
        <div className={"flex items-center gap-4"}>
            <ThemeToggleButton/>
            {navItems}

            {
                !session ?
                    <Link className={"font-medium "} href={"/login"}>
                        Login
                    </Link>
                    :
                    (
                        <div className={"flex items-center gap-4"}>
                            <Link className={"font-medium "} href={'/dashboard'}>
                                Dashboard
                            </Link>

                            <Link href={"/login"} onClick={() => signOut({redirect: false})} className={"font-medium text-red-500"} >
                                Logout
                            </Link>
                        </div>
                    )
            }
        </div>
    )

}

export default NavList;