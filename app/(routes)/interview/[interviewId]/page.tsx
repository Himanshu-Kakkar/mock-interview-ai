"use client"
import React from 'react'
import Image from 'next/image'
import { ArrowBigRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import Link  from 'next/link';
import { useParams } from 'next/navigation';


function Interview() {
  const {interviewId} = useParams();

  return (
    <div className='flex flex-col items-center justify-center mt-14'> 
    <div className='w-full max-w-3xl'>
      <Image src={'/interview.jpeg'} alt='interview' 
      width={400} 
      height={200} 
      className='w-full h-[300px] object-cover'/>

      <div className='p-6 flex flex-col items-center space-y-5'>
        <h2 className='font-bold text-3xl text-center'>Ready to Start Interview?</h2>
        <p className='text-gray-500 text-center'>
          The interview will last 45 minutes. Are you ready to begin?
        </p>
        <Link href={'/interview/'+ interviewId + '/start'}>
          <Button className='cursor-pointer'>Start Interview <ArrowBigRight/> </Button>
        </Link>
        <hr />
        <div className='p-6 bg-gray-50 rounded-2xl'>
          <h2 className='font-semibold text-2xl'>Want to send interview link to someone ?</h2>
          <div className='flex gap-5 w-full items-center max-w-xl '>
            <input type="mail" placeholder='Enter email address' className='w-full max-w-xl' />
            <Button><Send/></Button>
          </div>
        </div>
        
        


      </div>
    </div>
      
    </div>
  )
}

export default Interview;