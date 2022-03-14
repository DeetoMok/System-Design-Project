import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import "./featuredInfo.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function Regions() {

  let [data, setgd] = useState()

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/regions/')
      let data = await response.json()
      setgd(data.regions)
  }

  return (
    <div>
      <span className="featuredTitle">Regions</span>

        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data}</span>
        </div>
        <span className="featuredSub">North, South, East, West</span>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View
        </Link>
      </div>
    </div>
  );
}