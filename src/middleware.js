import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;
    

    // Obtiene el rol del usuario desde el token
    const userRole = token?.role;

    console.log("Token Role:", userRole);

    // Si el usuario intenta acceder a /admin y es admin, redirigir a /admin/users
<<<<<<< HEAD
    if (pathname === "/admin" && userRole === "Admin") {
=======
    if (pathname === "/admin" && userRole === "Webmaster") {
>>>>>>> 44eb78dd74e63735a41a501542a7b3c8578d09aa
      return NextResponse.redirect(new URL("/admin/users", req.url));
    }

    // Si la ruta es /admin y el usuario no es admin, redirigir a /403
<<<<<<< HEAD
    if (pathname.startsWith("/admin") && userRole !== "Admin") {
=======
    if (pathname.startsWith("/admin") && userRole !== "Webmaster") {
>>>>>>> 44eb78dd74e63735a41a501542a7b3c8578d09aa
      return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Solo permite acceso si hay un token
    },
  }
);

export const config = {
  matcher: [
    "/instances/:path*",
    "/profile",
    "/trial",
    "/support",
    "/admin/:path*", 
    "/",
  ],
};
