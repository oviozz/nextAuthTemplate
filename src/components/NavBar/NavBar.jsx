
import {cn} from "@/lib/utils";
import {rubik} from "@/fonts/fonts";
import NavList from "@/components/NavBar/NavList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const NavBar = () => {

    return (
        <MaxWidthWrapper>
            <div className={"flex justify-between mt-4"}>
                <Link href={"/"} className={cn("text-2xl font-semibold", rubik.className)}>
                    nextBlog
                </Link>

                <div className={""}>
                    <NavList />
                </div>
            </div>

        </MaxWidthWrapper>
    )
}

export default NavBar;