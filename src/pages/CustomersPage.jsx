import { useEffect, useState } from 'react'
import { getCustomers, createCustomer, deleteCustomer } from '../services/api'

function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    loadCustomers()
  }, [])

  function loadCustomers() {
    getCustomers()
      .then(data => setCustomers(data))
      .catch(error => console.error(error))
  }

  function handleDelete(id) {
    deleteCustomer(id)
      .then(() => loadCustomers())
      .catch(error => console.error(error))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newCustomer = {
      name: name,
      email: email,
      phone: phone
    }

    createCustomer(newCustomer)
      .then(() => {
        setName('')
        setEmail('')
        setPhone('')
        loadCustomers()
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <h1>Clientes</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Criar Cliente</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button onClick={() => handleDelete(customer.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomersPage