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
      <div className="page-header">
        <h1>Clientes</h1>
        <p>Cadastro de clientes</p>
      </div>

      <div className="card">
        <h2>Novo cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">Criar cliente</button>
        </form>
      </div>

      <div className="card">
        <h2>Clientes cadastrados ({customers.length})</h2>
        {customers.length === 0 ? (
          <p className="empty-state">Nenhum cliente cadastrado ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th className="mono">Telefone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td className="mono">{customer.phone}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(customer.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CustomersPage