import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
    username: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const user = await prisma.user.create({
        data: {
            email: body.email,
            name: body.username,
            password: await bcrypt.hash(body.password, 10)
        }
    });

    return new Response(JSON.stringify(user));
}
