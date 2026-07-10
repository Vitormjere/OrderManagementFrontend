import { useEffect, useState } from 'react'
import { getProducts, createProduct, deleteProduct } from '../services/api'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  function loadProducts() {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  }

  function handleDelete(id) {
    deleteProduct(id)
      .then(() => loadProducts())
      .catch(error => console.error(error))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newProduct = {
      name: name,
      description: description,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
    }

    createProduct(newProduct)
      .then(() => {
        setName('')
        setDescription('')
        setPrice('')
        setStockQuantity('')
        loadProducts()
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <h1>Produtos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Estoque"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />
        <button type="submit">Criar Produto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductsPage