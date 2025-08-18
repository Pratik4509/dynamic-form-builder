import { useEffect } from 'react'
import './App.css'
import { fetchSchema } from './apis'

function App() {
  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    const data = await fetchSchema()
    console.log(data)
  }

  return (
    <>

    </>
  )
}

export default App
