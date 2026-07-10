import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import OrdersPage from './pages/OrdersPage'

function App() {
  const location = useLocation()

  function isActive(path) {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          Vitor<span>API</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/products" className={isActive('/products')}>Produtos</Link>
          <Link to="/customers" className={isActive('/customers')}>Clientes</Link>
          <Link to="/orders" className={isActive('/orders')}>Pedidos</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App