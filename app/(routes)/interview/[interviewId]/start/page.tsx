"use client"
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';

type interviewData = {
    jobTitle: string|null,
    jobDescription: string|null,
    interviewQuestions: interviewQuestions[],
    userId: string|null,
    _id: string
}

type interviewQuestions = {
    answer: string,
    question: string
}

function StartInterview() {
    const {interviewId} = useParams();
    const convex = useConvex();
    const [interviewData, setInterviewData] = useState<interviewData>();
    useEffect(() => {
        GetInterviewQuestions();
    }, [interviewId]);

    const GetInterviewQuestions = async () => {
        //@ts-ignore
        const result = await convex.query(api.Interview.GetInterviewQuestions,{
            interviewRecordId: interviewId
        })
        console.log(result);
        setInterviewData(result);
    }
  return (
    <div>StartInterview</div>
  )
}

export default StartInterview