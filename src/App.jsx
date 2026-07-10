import { useEffect, useState } from 'react'
import { getProducts } from './services/api'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <h1>Order Management</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}

export default App