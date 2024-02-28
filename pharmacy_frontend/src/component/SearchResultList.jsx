import React from 'react'

function SearchResultList({results}) {
  return (
    <div className='results-list'>

  {
    results.map((result, id) => {
         return <div key={id}>
        {result.name}
         </div>
    })
  }     

     <style jsx= 'true'>

     {`
     
    .results-list {
        width: 30%;
        display: block;
        flex-direction: column;
        background-color: white;
        box-shadow: 0px 0px 8px #ddd;
        border-radius: 10px;
        margin-top: 1rem;
?        max-height:300px;
        overflow-y: scroll;


    }
     
     
     `}
     </style>
    </div>
  )
}

export default SearchResultList;