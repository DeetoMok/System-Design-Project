import { useState } from "react";
import React from 'react'

function AedNumberForm({ Submit, error }) {
  // const [details, setDetails] = useState(0);
  const [details, setDetails] = useState({name: "", email: "", password: ""});

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
          <input type="number" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>No. of Clusters:</label>
          <input type="number" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
        </div>
        <div className='form-group'>
          <label htmlFor='name'>No. of Iterations:</label>
          <input type="number" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
        </div>

        <input type="submit" value="SUBMIT"/>
      </div>
    </form>
  )
}

export default AedNumberForm