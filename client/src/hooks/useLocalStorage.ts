import { useState, useEffect } from 'react'

const getLsVal = (key: string, defaultValue: any) => {
  const storedStr = localStorage.getItem(key) || ''

  if (!!storedStr) {
    return JSON.parse(storedStr)
  } else {
    return defaultValue
  }
}

const setLsVal = (key: string, value: any) => {
  if (value !== undefined && value !== null) {
    const str = JSON.stringify(value)

    localStorage.setItem(key, str)
  }
}

const useLocalStorage = (key: string, defaultValue: any = null) => {
  const [value, setValue] = useState(getLsVal(key, defaultValue))

  useEffect(() => setLsVal(key, value), [key, value])

  return [value, setValue]
}

export default useLocalStorage
