import { useEffect, useState } from 'react'
import { getOrders, createOrder } from '../services/api'
import { getCustomers } from '../services/api'
import { getProducts } from '../services/api'

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
      <h1>Pedidos</h1>

      <form onSubmit={handleSubmit}>
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

        {items.map((item, index) => (
          <div key={index}>
            <select
              value={item.productId}
              onChange={(e) => updateItem(index, 'productId', e.target.value)}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
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

            <button type="button" onClick={() => removeItem(index)}>
              Remover
            </button>
          </div>
        ))}

        <button type="button" onClick={addItem}>
          + Adicionar Item
        </button>

        <br />
        <button type="submit">Criar Pedido</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.customer.name}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage