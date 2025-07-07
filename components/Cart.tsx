'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          
          {/* Cart Modal */}
          <motion.div
            initial={{ 
              scale: 0,
              opacity: 0,
              originX: 1,
              originY: 1
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              originX: 1,
              originY: 1
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              originX: 1,
              originY: 1
            }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className="fixed bottom-4 right-4 top-4 left-4 max-w-2xl max-h-[90vh] ml-auto mr-4 mt-4 mb-4 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl z-50 flex flex-col rounded-3xl overflow-hidden"
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <ShoppingCart size={20} />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                {getTotalItems() > 0 && (
                  <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 flex justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-neutral-400">
                      <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-neutral-500 mb-4">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm"
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg relative overflow-hidden border border-white/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-2">
                          ${item.price} each
                        </p>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-1 hover:bg-white/20 rounded backdrop-blur-sm transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white/20 rounded backdrop-blur-sm transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-neutral-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/20 p-6 bg-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    ${getTotalPrice()}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-neutral-900/90 backdrop-blur-sm text-white py-4 rounded-xl font-medium hover:bg-neutral-800/90 transition-all border border-white/10 shadow-lg"
                >
                  Proceed to Checkout
                </motion.button>
                
                <button
                  onClick={onClose}
                  className="w-full mt-3 text-neutral-600 hover:text-neutral-900 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
