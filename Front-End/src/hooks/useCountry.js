import { useState, useEffect } from 'react'
import { countries, getCountryByCode } from '../data/countries'

const STORAGE_KEY = 'streamhub_country'

export function useCountry() {
  const [countryCode, setCountryCodeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'US'
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, countryCode)
  }, [countryCode])

  const setCountryCode = (code) => {
    if (countries.some((c) => c.code === code)) setCountryCodeState(code)
  }

  const country = getCountryByCode(countryCode)

  return { country, countryCode, setCountryCode, countries }
}
