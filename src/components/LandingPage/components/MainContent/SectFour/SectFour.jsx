import React from 'react'
import "./sectFour.css"
import { sectFourContent } from '../../../../../assets'



const SectFour = () => {


  return (
    <div className='sect4-div'>
      <div className='sect4-card'>
        <h3 className='sect4-title'>Dive deeper into the Businesses we serve</h3>
        <img src={sectFourContent} alt='Table with types of workers' className='sect4-table' />
      </div>
    </div>
  )
}

export default SectFour