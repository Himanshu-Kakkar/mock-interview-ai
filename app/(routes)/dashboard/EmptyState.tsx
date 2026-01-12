import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import CreateInterviewDialog from '../_components/CreateInterviewDialog'

function EmptyState() {
  return (
    <div className='mt-14 flex flex-col items-center gap-5 border border-dashed p-10 border-4 rounded-2xl bg-gray-50'>
        <Image src = {'/emptystate.png'} alt='emptystate' width={180} height = {250} />
        <h2 className='mt-2 text-lg text-grey-500'>You do not have any interview</h2>
        <CreateInterviewDialog/>
    </div>
  )
}

export default EmptyState