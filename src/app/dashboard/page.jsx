

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


const Dashboard = async () => {

    `const session = await getServerSession(authOptions)

    if (!session){
        redirect("/login");
    }`

    return (
        <div className={"mt-4"}>
            <MaxWidthWrapper>

                <h1 className={"text-2xl"}>You are at Dashboard page</h1>
                <h1>THIS IS PROTECTED ROUTE</h1>

            </MaxWidthWrapper>
        </div>
    );

}

export default Dashboard;