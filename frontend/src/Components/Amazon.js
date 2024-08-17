import React from 'react';
import Cards from './Cards';
const Amazon = ({handleClick,dataList}) => {
  return (
    <section>
        {
           dataList.map((item)=>(
                <Cards item={item} key={item.id} handleClick={handleClick} />
            ))
        }
    </section>
  )
}

export default Amazon;