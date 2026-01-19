import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";
import { aj } from "@/utils/arcjet";
import { currentUser } from "@clerk/nextjs/server";
import { DessertIcon } from "lucide-react";

//@ts-ignore
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_URL_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_URL_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export async function POST(req: NextRequest) {
    try{
        const user = await currentUser();
        const formData = await req.formData();
        const file = formData.get('file') as File | null;
        const jobTitle = formData.get('jobTitle') as string | null;
        const jobDescription = formData.get('jobDescription') as string | null;

        let resumeUrl: string | null = null;

        const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress ?? '', requested: 5 }); // Deduct 5 tokens from the bucket
        console.log("arcjet decision", decision);
        
        //@ts-ignore
        if(decision?.reason?.remaining == 0){
            return NextResponse.json({
                status:429,
                result: 'No free credit remaining, Try after 24 hours'
            })
        }
        if (file) {
            console.log("file", formData);
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse = await imagekit.upload({
                file: buffer,
                fileName: `upload-${Date.now()}.pdf`,
                isPrivateFile: false,
                useUniqueFileName: true,
            });

            resumeUrl = uploadResponse?.url ?? null;
        }

        // Call n8n webhook for both resume and JD-only flows
        const result = await axios.post('http://localhost:5678/webhook/generate-interview-questions-fin', {
            resumeUrl,
            jobTitle,
            jobDescription,
        });

        console.log(result.data);

        return NextResponse.json({
            questions: result.data?.questions,
            resumeUrl,
            status: 200,
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({error: error.message }, { status: 500})
    }
}
