import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import Chain from '../../../utils/Disaster_Management.json';


function ChangeOwner() {

  const deployAddress = "0x43984da072707A9F477eC6f295128fE8A5ebd55B"

  const [ownerAddr, setOwnerAddr] = useState('')
  const [click, setClick] = useState(false)
  const [msg, setMsg] = useState("")

  const change = async () => {
    setClick(true)
    setMsg("please wait....")
    try {
      if(typeof window !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, Chain.abi, signer)
  
        const transfer = await contract.transferOwnership(ownerAddr)
        await transfer.wait()
        window.location.replace("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen max-w-screen-sm h-screen flex flex-col justify-center items-center`,
    bigtxt: `text-white text-3xl font-bold`,
    midtxt: `text-white text-2xl`,
    smalltxt: `text-white text-xs`
  }
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-900'>
      <div className={styles.page}>
        <span className={styles.bigtxt}>This Can Transfer</span>
        <span className={styles.midtxt}>Your Ownership</span>
        <span className={styles.bigtxt}>To Another Address</span>
        <span className={styles.smalltxt}>(That means you will no longer be an Owner)</span>
        <div className="w-full h-24 flex flex-col justify-between items-center">

          <input 
            type="text" 
            className='p-2 w-11/12 rounded-md' 
            placeholder='Enter the new Owner Address' 
            onChange={(e) => setOwnerAddr(e.target.value)}
            value={ownerAddr}
          />

          <Button variant='contained' color="error" className='mt-3 w-7/12 bg-red-600' disabled={click} onClick={change}>
            <span className='capitalize'>Change Ownership</span>
          </Button>
          <span className='text-white text-xs'>{msg}</span>

        </div>
      </div>
    </div>
  )
}

export default ChangeOwner