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
      <div className="page-header">
        <h1>Produtos</h1>
        <p>Catálogo e controle de estoque</p>
      </div>

      <div className="card">
        <h2>Novo produto</h2>
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
              <label>Descrição</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Preço</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label>Estoque</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">Criar produto</button>
        </form>
      </div>

      <div className="card">
        <h2>Catálogo ({products.length})</h2>
        {products.length === 0 ? (
          <p className="empty-state">Nenhum produto cadastrado ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th className="mono">Preço</th>
                <th className="mono">Estoque</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td className="mono">R$ {product.price.toFixed(2)}</td>
                  <td className={`mono ${product.stockQuantity <= 5 ? 'stock-low' : ''}`}>
                    {product.stockQuantity}
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(product.id)}>
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

export default ProductsPage