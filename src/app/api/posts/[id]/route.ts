import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { appAPI } from "@/api/axios";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request: Request, {params}: {params: {id: number}}) {
    const session = await getServerSession(authOptions);
    
    const post = await prisma.post.delete({
        where: {
            id: +params.id,
            authorId: session?.user?.id
        }
    });

    if (post) {
      await appAPI.get("/api/posts");
    }
    
    return new Response(JSON.stringify(post));
}       

export async function PUT(request: Request, {params}: {params: {id: number}}) {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const post = await prisma.post.update({
        where: {
            id: +params.id,
            authorId: session?.user?.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return new Response(JSON.stringify(post));
}