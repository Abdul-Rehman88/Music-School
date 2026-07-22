import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest){
    try {

        const requestBody = await request.json();
        const {email, password} = requestBody;
        console.log({email, password});

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({ error: "Wrong Email" }, { status: 404 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch){
            return NextResponse.json({ error: "Wrong Password" }, { status: 404 });
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '1d' });

         const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
        
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 }); 
    }
}