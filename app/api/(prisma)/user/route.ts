import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email, name } = body;

    if (!userId && !email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userDetails = await prismadb.user.findUnique({
      where: {
        userId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    if (!userDetails) {
      await prismadb.user.create({
        data: {
          userId,
          email,
          name,
        },
      });
    }

    return NextResponse.json({
      email: userDetails?.email ?? email,
      name: userDetails?.name ?? name,
    });
  } catch (error) {
    console.log("[AUTH_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
