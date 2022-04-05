import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import "./featuredInfo.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function Subzones() {

  let [data, setgd] = useState()

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/subzones/')
      let data = await response.json()
      setgd(data.regions)
  }

  return (
    <div>
      <span className="featuredTitle">Sub Zones</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">332</span>
        </div>
        <span className="featuredSub">1, 2, 3, 4, 5, ...</span>

    </div>
  );
}