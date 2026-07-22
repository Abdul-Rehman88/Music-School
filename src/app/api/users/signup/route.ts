import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { z } from "zod";
connectDB(); 

const signupSchema = z.object({
  userName: z.string().min(1, "Username must be at least 1 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(5, "Must be at least 5 years old"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export async function POST(request: NextRequest) {

    try {
        const requestBody = await request.json();
        const parsed = signupSchema.safeParse(requestBody);
    
        if (!parsed.success) {
          return NextResponse.json(
            { error: parsed.error.flatten().fieldErrors },{ status: 400 });
        }

        const {userName, email, age, password} = parsed.data;
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