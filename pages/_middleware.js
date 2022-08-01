//Nextjs
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    //Token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const {pathname} = req.nextUrl;

    //Redirect user to menu if he is already authenticated
    if(pathname === "/login" && token){
        return NextResponse.redirect("/");
    }

    //User try to authenticate or token is true
    if(pathname.includes("/api/auth") || token){
        return NextResponse.next();
    }
    
    //Redirect to login if token is null
    if(!token && pathname !== '/login'){
        return NextResponse.redirect("/login");
    }
}