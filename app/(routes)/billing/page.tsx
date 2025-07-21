import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div>
        <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
        <p className='text-center mb-10 text-lg'>Select a subscription model to get all AI Tools Access</p>
        <PricingTable/>
    </div>
  )
}

export default Billing