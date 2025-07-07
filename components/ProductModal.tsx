'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ShoppingCart, Play, Pause } from 'lucide-react'
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

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  if (!product) return null

  const allImages = [product.image, ...(product.additionalImages || [])]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ 
              scale: 0.8,
              opacity: 0,
              y: 50
            }}
            animate={{ 
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{ 
              scale: 0.8,
              opacity: 0,
              y: 50
            }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300
            }}
            className="fixed inset-4 max-w-6xl max-h-[95vh] mx-auto my-auto bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-2xl font-light text-neutral-900">{product.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left side - Media */}
                <div className="relative bg-neutral-50">
                  {/* Background Video */}
                  {product.videoUrl && (
                    <div className="absolute inset-0 z-0">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay={isVideoPlaying}
                        muted
                        loop
                        playsInline
                      >
                        <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {/* Video Controls */}
                      <button
                        onClick={toggleVideo}
                        className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors z-10"
                      >
                        {isVideoPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                      </button>
                    </div>
                  )}

                  {/* Image Gallery */}
                  <div className="relative z-10 h-full flex items-center justify-center p-8">
                    <div className="relative w-full max-w-md aspect-square">
                      <Image
                        src={allImages[currentImageIndex]}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      
                      {/* Image Navigation */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                          >
                            <ChevronRight size={20} />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {allImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Product Info */}
                <div className="p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                      <span className="text-3xl font-light text-neutral-900">
                        ${product.price}
                      </span>
                    </div>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {product.detailedDescription && (
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-neutral-900 mb-3">Details</h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {product.detailedDescription}
                        </p>
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-neutral-900 mb-3">Features</h3>
                      <ul className="space-y-2 text-neutral-600">
                        <li>• Premium quality materials</li>
                        <li>• Minimalist design aesthetic</li>
                        <li>• Durable construction</li>
                        <li>• Easy to clean and maintain</li>
                      </ul>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center justify-center space-x-3 w-full bg-neutral-900 text-white py-4 rounded-xl hover:bg-neutral-800 transition-colors font-medium shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart - ${product.price}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}