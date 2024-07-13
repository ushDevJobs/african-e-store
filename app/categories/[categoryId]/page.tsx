import React from 'react'
import SingleCategoryPage from './SingleCategoryPage'
type Props = {
    params: { categoryId: string }
}

const SingleCategory = ({params}: Props) => {
  return (
      <SingleCategoryPage params={params}/>
  )
}

export default SingleCategory