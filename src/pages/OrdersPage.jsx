import { useEffect, useState } from 'react'
import { getOrders, createOrder, getCustomers, getProducts } from '../services/api'

const STATUS_LABELS = {
  0: { label: 'Pending', className: 'badge-pending' },
  1: { label: 'Confirmed', className: 'badge-confirmed' },
  2: { label: 'Shipped', className: 'badge-shipped' },
  3: { label: 'Delivered', className: 'badge-delivered' },
  4: { label: 'Cancelled', className: 'badge-cancelled' },
}

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])

  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    loadOrders()
    getCustomers().then(data => setCustomers(data))
    getProducts().then(data => setProducts(data))
  }, [])

  function loadOrders() {
    getOrders()
      .then(data => setOrders(data))
      .catch(error => console.error(error))
  }

  function addItem() {
    setItems([...items, { productId: '', quantity: 1 }])
  }

  function updateItem(index, field, value) {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newOrder = {
      customerId: Number(selectedCustomerId),
      items: items.map(item => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      })),
    }

    createOrder(newOrder)
      .then(() => {
        setSelectedCustomerId('')
        setItems([])
        loadOrders()
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <div className="page-header">
        <h1>Pedidos</h1>
        <p>Criação e acompanhamento de pedidos</p>
      </div>

      <div className="card">
        <h2>Novo pedido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label>Cliente</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                required
              >
                <option value="">Selecione um cliente</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--muted)' }}>
            Itens do pedido
          </label>

          {items.length === 0 && (
            <p className="empty-state">Nenhum item adicionado ainda.</p>
          )}

          {items.map((item, index) => (
            <div className="item-row" key={index}>
              <select
                value={item.productId}
                onChange={(e) => updateItem(index, 'productId', e.target.value)}
                required
              >
                <option value="">Selecione um produto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} — R$ {product.price.toFixed(2)}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                required
              />

              <button type="button" className="btn-danger" onClick={() => removeItem(index)}>
                Remover
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button type="button" className="btn-ghost" onClick={addItem}>
              + Adicionar item
            </button>
            <button type="submit" className="btn-primary" disabled={items.length === 0}>
              Criar pedido
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Pedidos ({orders.length})</h2>
        {orders.length === 0 ? (
          <p className="empty-state">Nenhum pedido criado ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th className="mono">Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const status = STATUS_LABELS[order.status] ?? STATUS_LABELS[0]
                return (
                  <tr key={order.id}>
                    <td>{order.customer.name}</td>
                    <td className="mono">R$ {order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${status.className}`}>{status.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default OrdersPage