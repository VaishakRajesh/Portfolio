import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Portfolio.module.css'

const Portfolio = () => {
  return (
    <div className={Style.Main}>
      <div className={Style.Button}>
        <Link to='/Freelance'>
          <button>Freelance</button>
        </Link>
      </div>
    </div>
  )
}

export default Portfolio