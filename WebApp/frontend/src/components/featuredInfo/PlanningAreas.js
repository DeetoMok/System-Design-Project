import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import "./featuredInfo.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function PlanningAreas() {

  let [data, setgd] = useState()

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/planningareas/')
      let data = await response.json()
      setgd(data.regions)
  }

  return (
    <div>
      <span className="featuredTitle">Planning Areas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data}</span>
        </div>
        <span className="featuredSub">1, 2, 3, 4, 5, ...</span>

    </div>
  );
}