import React, { useState, useEffect } from 'react'

const Header = () => {

    let [geoData, setgd] = useState([])

    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/aeds/')
        // let response = await fetch('http://127.0.0.1:8000/aeds/')
        let data = await response.json()
        console.log('DATA:', data)
        setgd(data)
    }

    return (
        <div>
            <h1>Header</h1>
            <div>
                {geoData.map((geoData, index) => (
                    <div key={index}>
                        <h3>{geoData.lat}</h3>
                        <h3>{geoData.lon}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header
