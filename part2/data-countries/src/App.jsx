import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

const url = 'https://studies.cs.helsinki.fi/restcountries/api/'
const all = 'all'
const name = 'name/'
const MAXCOUNTRIES = 10
const api_key = import.meta.env.VITE_SOME_KEY

const FindCountries = ({ setSearch, Message }) => {
  return (
    <div>
      Find countries
      <input onChange={(event) => setSearch(event.target.value)}/>
      {Message ? <p> {Message}</p> : null}
    </div>
  )
}

const Countries = ({ countries, handleShow }) => {
  if (countries === null)
    return null
  return (
    <>
      {countries.map((c) => <div key={c.cca3}>{c.name.common} <button type="button" onClick={() => handleShow(c.name.common)}>Show</button></div>)}
    </>
  )

}

const Country = ({ country }) => {
  if (country) {
    return (
      <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map((language) => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>  
      </>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [listCountries, setListCountries] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios.get(url + all).then((response) => {
      const filtered = response.data.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
      if (filtered.length > 1){
        if (filtered.length > MAXCOUNTRIES) {
          setListCountries(null)
          setMessage("Too many matches, specify another filter")
        }
        else {
          setListCountries(filtered)
          setMessage(null)
        }
        setCountry(null)
      }
      else if (filtered.length === 1){
        handleShow(filtered[0].name.common)
   }
      else {
        setListCountries(null)
        setCountry(null)
        setMessage("No matches")
      }
    })
  },[search])

  const handleShow = (namec) => {
    axios.get(url + name + namec).then((respCountry) => {
      setCountry(respCountry.data)
      setMessage(null)
      setListCountries(null)
    })
  }

  return(
  <>
  <FindCountries setSearch={setSearch} Message={message}/>
  <Countries countries={listCountries} handleShow={handleShow}/>
  <Country country={country}/>
  </>
  )
}

export default App