// src/features/products/components/ProductList.jsx
import React from 'react'
import Button from '../../../components/common/Button'
import './ProductList.css'

const ProductList = ({ products, onEdit, onDelete, onView }) => {
  return (
    <div className="product-list">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price}</td>
                <td>
                  <span className={product.quantity <= product.threshold ? 'low-stock' : ''}>
                    {product.quantity}
                  </span>
                </td>
                <td>{product.category}</td>
                <td>
                  <div className="action-buttons">
                    <Button size="small" onClick={() => onView(product)}>
                      View
                    </Button>
                    <Button size="small" variant="secondary" onClick={() => onEdit(product)}>
                      Edit
                    </Button>
                    <Button size="small" variant="danger" onClick={() => onDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
