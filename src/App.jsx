import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'

function App() {
  return (
    <div>
      <nav>
        <Link to="/products">Produtos</Link>
        {' | '}
        <Link to="/customers">Clientes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </div>
  )
}

export default App