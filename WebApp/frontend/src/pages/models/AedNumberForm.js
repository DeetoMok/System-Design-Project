import { useState } from "react";
import React from 'react'

function AedNumberForm({ Submit, error }) {
  // const [details, setDetails] = useState(0);
  const [details, setDetails] = useState({numAeds:"", numK: "", numIters: ""});

  const submitHandler = e =>{
    // So that the page doesnt re-render
    e.preventDefault();

    Submit(details);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-inner'>
      
        {/* ERROR! */}
        <div className='form-group'>
          <label htmlFor='name'>No. of AEDs to add:</label>
          <input type="number" name="aeds" id="aeds" onChange={e => setDetails({...details, numAeds: e.target.value})} value={details.name}/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>No. of Clusters:</label>
          <input type="number" name="cluster" id="cluster" onChange={e => setDetails({...details, numK: e.target.value})} value={details.email}/>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>No. of Iterations:</label>
          <input type="number" name="iterations" id="iterations" onChange={e => setDetails({...details, numIters: e.target.value})} value={details.password}/>
        </div>

        <input type="submit" value="SUBMIT"/>
      </div>
    </form>
  )
}

export default AedNumberForm