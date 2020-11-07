import React from 'react'
import { withRouter } from 'react-router-dom'

const Steps = ({step2,step3,history}) => {
    return (
       <div className="container first">
         <ul className="mt-4 progressbar">
      <li onClick={()=>history.push('/')} className="active">Step 1</li>
      <li className={step2?'active':""} >Step 2</li>
      <li className={step3?'active':""}>Step 3</li>
      </ul>
      </div>
       
      
  
  
  

        
    )
}

export default withRouter(Steps)
