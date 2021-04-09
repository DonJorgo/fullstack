import React, { useState, useEffect } from 'react'
import axios from 'axios'

const degreesToCompass = (degrees) => {
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW',
        'N'
    ]
    return directions[Math.round((degrees % 360) / 22.5)]
}

const Weather = ({ country }) => {

    const [weather, setWeather] = useState({ notReady: true })

    const apiKey = process.env.REACT_APP_API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
    // const url = "http://localhost:3001/helsinki"

    useEffect(() => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    if (weather.notReady) {
        return (
            <></>
        )
    }

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <div><b>temperature:</b> {weather.main.temp} Celsius</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <div>
                <b>wind:</b> {weather.wind.speed} m/s 
                direction {degreesToCompass(weather.wind.deg)}</div>
        </div>
    )
}

export default Weather