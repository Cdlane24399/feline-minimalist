'use client'

import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  additionalImages?: string[]
  videoUrl?: string
  detailedDescription?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
  index: number
}


export default function ProductCard({ product, onAddToCart, onProductClick, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="product-card group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden transition-all duration-300 group-hover:scale-105">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {product.name}
          </h3>
          <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        
        <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light text-neutral-900">
            ${product.price}
          </span>
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product)
            }}
            className="flex items-center space-x-2 bg-neutral-900 text-white px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-all duration-300 group-hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart size={16} />
            <span className="font-medium">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
