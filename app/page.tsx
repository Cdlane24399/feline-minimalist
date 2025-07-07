'use client'

import { useState, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Star, Truck, Shield, Gift, Palette } from 'lucide-react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import FloatingCartButton from '../components/FloatingCartButton'

const Cart = dynamic(() => import('../components/Cart'), {
  ssr: false,
})

const ProductModal = dynamic(() => import('../components/ProductModal'), {
  ssr: false,
})

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

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: '1',
    name: 'Sisal Scratch Collection',
    description: 'Complete set of rope-wrapped scratching posts and toys in neutral tones. Perfect for maintaining claws while protecting furniture.',
    price: 89.99,
    image: '/images/sisal-collection.jpg',
    category: 'Scratching',
    additionalImages: ['/images/sisal-collection.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Our premium sisal collection features hand-wrapped natural rope around sturdy wooden cores. Each piece is designed to complement modern interiors while providing cats with essential scratching surfaces. The collection includes multiple heights and angles to satisfy different scratching preferences and helps redirect destructive behavior away from furniture.'
  },
  {
    id: '2',
    name: 'Feather Wand Toys',
    description: 'Interactive wand toys with premium feathers and minimalist handles. Stimulates natural hunting instincts.',
    price: 24.99,
    image: '/images/feather-wand.jpg',
    category: 'Interactive',
    additionalImages: ['/images/feather-wand.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Crafted with ethically sourced feathers and sustainable bamboo handles, these wand toys are designed to engage your cat\'s natural predatory instincts. The feathers are carefully selected for their movement and texture, creating an irresistible hunting experience that promotes healthy exercise and mental stimulation.'
  },
  {
    id: '3',
    name: 'Rope Mouse Toy',
    description: 'Handcrafted rope mouse in monochrome design. Durable construction with natural sisal rope for long-lasting play.',
    price: 16.99,
    image: '/images/rope-mouse.jpg',
    category: 'Toys',
    additionalImages: ['/images/rope-mouse.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Each rope mouse is individually handcrafted using premium sisal rope and filled with organic catnip. The monochrome design ensures it complements any interior while the textured surface satisfies your cat\'s need to knead and scratch. Built to withstand enthusiastic play sessions while maintaining its shape and appeal.'
  },
  {
    id: '4',
    name: 'Modern Cat Beds',
    description: 'Sleek, contemporary cat beds in various shapes. Made with premium materials for ultimate comfort and style.',
    price: 79.99,
    image: '/images/cat-beds.jpg',
    category: 'Comfort',
    additionalImages: ['/images/cat-beds.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'These architectural cat beds feature memory foam cores wrapped in premium organic cotton covers. Available in multiple geometric shapes, each bed is designed to provide optimal support while serving as a beautiful accent piece in your home. The removable covers are machine washable for easy maintenance.'
  },
  {
    id: '5',
    name: 'Hideaway Cat House',
    description: 'Cylindrical cat house with modern aesthetic. Provides privacy and security while maintaining clean lines.',
    price: 129.99,
    image: '/images/cat-house.jpg',
    category: 'Comfort',
    additionalImages: ['/images/cat-house.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'This minimalist hideaway combines function with sophisticated design. The cylindrical structure provides cats with a secure retreat while the clean lines and neutral palette integrate seamlessly with contemporary interiors. Interior cushioning is removable and washable, ensuring long-term comfort and hygiene.'
  },
  {
    id: '6',
    name: 'Smart Interactive Ball',
    description: 'Motion-activated electronic toy ball. Keeps cats engaged with unpredictable movement patterns and built-in timer.',
    price: 49.99,
    image: '/images/smart-ball.jpg',
    category: 'Interactive',
    additionalImages: ['/images/smart-ball.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'This intelligent toy ball features advanced motion sensors and AI-driven movement patterns that adapt to your cat\'s play style. The built-in timer prevents overstimulation while the whisper-quiet motor ensures peaceful coexistence in your home. USB rechargeable with up to 30 days of standby time.'
  }
]

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header />

      {/* Floating Cart Button */}
      <FloatingCartButton
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        isCartOpen={isCartOpen}
      />

      {/* Cart */}
      <Suspense fallback={null}>
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      </Suspense>

      {/* Product Modal */}
      <Suspense fallback={null}>
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={closeProductModal}
          onAddToCart={addToCart}
        />
      </Suspense>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-light text-neutral-900 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Elevated Play for<br />
              <span className="text-neutral-600">Modern Cats</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover our curated collection of minimalist cat accessories designed to seamlessly 
              blend with your contemporary home while providing endless entertainment for your feline friend.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#products"
                className="btn-primary inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Collection
              </motion.a>
              
              <motion.a
                href="#about"
                className="btn-secondary inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10k+', label: 'Happy Cats' },
              { number: '50+', label: 'Products' },
              { number: '99%', label: 'Satisfaction' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl font-light text-neutral-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-light text-neutral-900 mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Each piece is thoughtfully designed to meet your cat&apos;s natural needs while 
              maintaining the aesthetic integrity of your modern home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onProductClick={openProductModal}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-light text-neutral-900 mb-4">
              Why Choose Feline Minimalist
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We believe that functional design should never compromise on beauty. 
              Our products prove that cat accessories can be both practical and elegant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Thoughtful Design',
                description: 'Each product is carefully crafted to complement modern interiors while meeting cats\' natural needs for play and comfort.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Premium Materials',
                description: 'We use only the finest natural materials including organic cotton, sustainable sisal rope, and eco-friendly finishes.'
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Fast Shipping',
                description: 'Free shipping on orders over $50. Most orders arrive within 2-3 business days with careful packaging.'
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: 'Gift Ready',
                description: 'All products come in elegant, minimalist packaging perfect for gifting to fellow cat lovers and design enthusiasts.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div 
                  className="flex justify-center mb-6 text-neutral-700 group-hover:text-neutral-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-light text-neutral-900 mb-4">
              What Cat Parents Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Finally, cat accessories that don't clash with my modern decor. Luna loves her new scratching post!",
                author: "Sarah M.",
                rating: 5
              },
              {
                quote: "The quality is exceptional and the design is so elegant. Worth every penny for both style and function.",
                author: "David L.", 
                rating: 5
              },
              {
                quote: "My cats are obsessed with the feather wand, and I love that it looks beautiful even when not in use.",
                author: "Emma R.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-medium text-neutral-900">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-neutral-900 text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Customer Care</h3>
              <ul className="space-y-2 text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-300">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-neutral-400 mb-4 md:mb-0">
                &copy; 2024 Feline Minimalist. All rights reserved.
              </p>
              <div className="flex space-x-6 text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}