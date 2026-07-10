import { Routes, Route, Link, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  return (
    <div>
      <nav>
        <Link to="/products">Produtos</Link>
        {' | '}
        <Link to="/customers">Clientes</Link>
        {' | '}
        <Link to="/orders">Pedidos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </div>
  )
}

export default App