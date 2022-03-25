import { useState } from "react";
import React from 'react'

function AedNumberForm({ Submit, error }) {
  // numK and numIters variable not in use.
  const [details, setDetails] = useState({numAeds:"", numK: "", numIters: ""});

  const submitHandler = e =>{
    e.preventDefault();

    Submit(details);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-inner'>
      
        <div className='form-group'>
          
          <label htmlFor='name'>Number of AEDs to add:</label>
          <input type="number" name="aeds" id="aeds" onChange={e => setDetails({...details, numAeds: e.target.value})} value={details.name}/>
        </div>

        <input type="submit" value="SUBMIT"/>
      </div>
    </form>
  )
}

export default AedNumberForm