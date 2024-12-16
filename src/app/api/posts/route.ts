import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


interface RequestBody {
    title: string;
    content: string;
}

export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    const session = await getServerSession(authOptions);

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: session?.user?.id
        }
    });

    return new Response(JSON.stringify(post));
}

export async function GET() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
        where: {
            authorId: session?.user?.id
        },
        include: {
            author: true
        }
    });

    return new Response(JSON.stringify(posts));
}