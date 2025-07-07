'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface FloatingCartButtonProps {
  cartItemCount: number
  onCartClick: () => void
  isCartOpen: boolean
}

export default function FloatingCartButton({ cartItemCount, onCartClick, isCartOpen }: FloatingCartButtonProps) {
  return (
    <AnimatePresence>
      {!isCartOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={onCartClick}
            className="relative w-16 h-16 bg-neutral-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            layoutId="cart-button"
          >
            <ShoppingCart size={24} />
            
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium"
              >
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}