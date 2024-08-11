import React from 'react'
import SingleCategoryPage from './SingleCategoryPage'
type Props = {
    params: { categoryId: string }
}

const SingleCategory = ({params}: Props) => {
  return (
     <div className="pt-24">
          <SingleCategoryPage params={params} />
     </div>
  )
}

export default SingleCategory