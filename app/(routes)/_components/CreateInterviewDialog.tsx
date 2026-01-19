import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from './ResumeUpload'
import JobDescription from './JobDescription'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function CreateInterviewDialog() {
  const [formData, setFormData] = useState<any>();
  const [file, setFile] = useState<File|null>();
  const [loading, setLoading] = useState(false);
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const saveInterviewQuestion = useMutation(api.Interview.SaveInterviewQuestion);
  const router = useRouter();

  const onHandleInputChange = (field: string, value: string) =>{
    setFormData((prev:any) => ({
      ...prev,
      [field]: value
    }))
  }
  const onSubmit = async () => {
    const hasFile = !!file;
    const hasJobDetails = !!formData?.jobTitle && !!formData?.jobDescription;

    // Require either a resume file OR both job title and job description
    if (!hasFile && !hasJobDetails) {
      console.log('Please upload a resume or provide both job title and description.');
      return;
    }

    setLoading(true);
    const formData_ = new FormData();
    if (hasFile && file) {
      formData_.append('file', file);
    }
    if (hasJobDetails) {
      formData_.append('jobTitle', formData?.jobTitle);
      formData_.append('jobDescription', formData?.jobDescription);
    }

    try{
      // Call our Next.js API route, which forwards to the n8n webhook
      const res = await axios.post('/api/generate-interview-questions', formData_);
      console.log(res.data);

      if(res?.data?.status == 429){
        toast.warning(res?.data?.result);
        console.log(res?.data?.result);
        return;
      }

      // save to DB
      //@ts-ignore
      const interviewId = await saveInterviewQuestion ({
        questions: res.data?.questions,
        resumeUrl: res?.data.resumeUrl ?? '',
        uid: userDetail?._id,
        // status: "generated",
        jobTitle: formData?.jobTitle ?? '',
        jobDescription: formData?.jobDescription ?? '',
      })
      // console.log(resp);
      router.push('/interview/' + interviewId);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }
  return (
    <Dialog>
    <DialogTrigger>
        <Button>
            + Create Interview
        </Button>
    </DialogTrigger>
    <DialogContent className='min-w-2xl'>
        <DialogHeader>
        <DialogTitle>Please Submit following details.</DialogTitle>
        <DialogDescription>
            <Tabs defaultValue="resume-upload" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="resume-upload">Resume Upload</TabsTrigger>
                    <TabsTrigger value="job-description">Job Description</TabsTrigger>
                </TabsList>
                <TabsContent value="resume-upload"><ResumeUpload setFiles = {(file:File)=> setFile(file)}/></TabsContent>
                <TabsContent value="job-description"><JobDescription onHandleInputChange={onHandleInputChange}/></TabsContent>
            </Tabs>
        </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-gap-4'>
            <DialogClose>
              <Button variant={'ghost'}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={onSubmit}
              disabled={
                loading ||
                (!file && !(formData?.jobTitle && formData?.jobDescription))
              }
            >
              {loading && <Loader2Icon className='animate-spin'/>} Submit</Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}

export default CreateInterviewDialog 