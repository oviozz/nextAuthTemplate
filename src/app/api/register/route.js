
import User from "@/models/User";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";
import connectDB from "@/utils/dbConnect";


export const POST = async (request) => {

    const {email, password} = await request.json();
    await connectDB();

    const existing = await User.findOne({email: email});

    if (existing) {
        return NextResponse.json({error: "Email is already in use"}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        return NextResponse.json({ message: "User is created" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Could not create user." }, { status: 500 });
    }
}
