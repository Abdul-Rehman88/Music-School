import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse,  } from "next/server";

connectDB();

export async function GET(){
    try {
        const response = NextResponse.json({ message: "User logged out successfully" }, { status: 200 });
        response.cookies.set('token', '', { httpOnly: true });
        return response;
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 }); 
    }
}