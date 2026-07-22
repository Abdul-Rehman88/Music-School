import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import bcryptjs from "bcryptjs";

connectDB(); 
export async function POST(request: NextRequest) {

    try {
        const requestBody = await request.json();
        const {userName, email, age, password} = requestBody;
        console.log({userName, email, age, password});

       const user = await User.findOne({ email})

       if(user){
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
       }
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password, salt );

       const newUser = new User({
        userName,
        email,
        age,
        password: hashedPassword
       });

       await newUser.save();

       return NextResponse.json({ message: "User created successfully" }, {
        status: 201
       })
        
    } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 }); 
   }

}