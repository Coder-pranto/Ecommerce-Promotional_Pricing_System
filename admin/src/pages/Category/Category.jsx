// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import CategoryCreationForm from './CategoryCreationForm'

const Category = () => {
  return (
    <div className='category'>
      <div className="firstSectionCategory">
        <h3 className='cate-title'>Category</h3>
        <Link to='allCategory' className='allCategory-btn'>All Category</Link>
      </div>

      <div className='secondSectionCategory'>
        <CategoryCreationForm />
      </div>
    </div>
  )
}

export default Category