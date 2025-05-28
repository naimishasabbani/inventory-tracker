// src/pages/Products.jsx
import React, { useState } from 'react'
// import { useProducts } from '../../features/products/hooks/useProducts'
import ProductList from '../../features/products/components/ProductList'
import ProductForm from '../../features/products/components/ProductForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { useProducts } from '../../features/products/hooks/useProducts'

const Products = () => {
  const {
    products,
    loading,
    error,
    success,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getLowStockProducts,
    fetchProducts,
    clearMessages
  } = useProducts()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id)
    }
  }

  const handleView = (product) => {
    alert(`Product Details:\nName: ${product.name}\nSKU: ${product.sku}\nPrice: $${product.price}\nQuantity: ${product.quantity}`)
  }

  const handleSubmit = async (formData) => {
    let result
    if (selectedProduct) {
      result = await updateProduct(selectedProduct.id, formData)
    } else {
      result = await createProduct(formData)
    }
    
    if (result.success) {
      setIsModalOpen(false)
      setSelectedProduct(null)
    }
    
    return result
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      await searchProducts(searchTerm)
    } else {
      await fetchProducts()
    }
  }

  const handleShowLowStock = () => {
    getLowStockProducts(10)
  }

  const handleShowAll = () => {
    setSearchTerm('')
    fetchProducts()
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Products ({products.length})</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
          Add Product
        </Button>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}
      
      {success && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{success}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}

      {/* Search and Filters */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name..."
            />
          </div>
          <Button type="submit" disabled={loading}>
            Search
          </Button>
          <Button type="button" variant="secondary" onClick={handleShowLowStock} disabled={loading}>
            Low Stock
          </Button>
          <Button type="button" variant="secondary" onClick={handleShowAll} disabled={loading}>
            Show All
          </Button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading products...</p>
        </div>
      )}

      {/* Product List */}
      {!loading && (
        <ProductList 
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
        size="medium"
      >
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedProduct(null)
          }}
          loading={loading}
        />
      </Modal>
    </div>
  )
}

export default Products
