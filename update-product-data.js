#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Updated product data with new image paths
const updatedProductsData = `const products: Product[] = [
  {
    id: '1',
    name: 'Sisal Scratch Collection',
    description: 'Complete set of rope-wrapped scratching posts and toys in neutral tones. Perfect for maintaining claws while protecting furniture.',
    price: 89.99,
    image: '/images/sisal-collection-main.jpg',
    category: 'Scratching',
    additionalImages: ['/images/sisal-collection-detail.jpg', '/images/sisal-collection-lifestyle.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Our premium sisal collection features hand-wrapped natural rope around sturdy wooden cores. Each piece is designed to complement modern interiors while providing cats with essential scratching surfaces. The collection includes multiple heights and angles to satisfy different scratching preferences and helps redirect destructive behavior away from furniture.'
  },
  {
    id: '2',
    name: 'Feather Wand Toys',
    description: 'Interactive wand toys with premium feathers and minimalist handles. Stimulates natural hunting instincts.',
    price: 24.99,
    image: '/images/feather-wand-main.jpg',
    category: 'Interactive',
    additionalImages: ['/images/feather-wand-detail.jpg', '/images/feather-wand-action.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Crafted with ethically sourced feathers and sustainable bamboo handles, these wand toys are designed to engage your cat\\'s natural predatory instincts. The feathers are carefully selected for their movement and texture, creating an irresistible hunting experience that promotes healthy exercise and mental stimulation.'
  },
  {
    id: '3',
    name: 'Rope Mouse Toy',
    description: 'Handcrafted rope mouse in monochrome design. Durable construction with natural sisal rope for long-lasting play.',
    price: 16.99,
    image: '/images/rope-mouse-main.jpg',
    category: 'Toys',
    additionalImages: ['/images/rope-mouse-detail.jpg', '/images/rope-mouse-lifestyle.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'Each rope mouse is individually handcrafted using premium sisal rope and filled with organic catnip. The monochrome design ensures it complements any interior while the textured surface satisfies your cat\\'s need to knead and scratch. Built to withstand enthusiastic play sessions while maintaining its shape and appeal.'
  },
  {
    id: '4',
    name: 'Modern Cat Beds',
    description: 'Sleek, contemporary cat beds in various shapes. Made with premium materials for ultimate comfort and style.',
    price: 79.99,
    image: '/images/cat-beds-main.jpg',
    category: 'Comfort',
    additionalImages: ['/images/cat-beds-shapes.jpg', '/images/cat-beds-lifestyle.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'These architectural cat beds feature memory foam cores wrapped in premium organic cotton covers. Available in multiple geometric shapes, each bed is designed to provide optimal support while serving as a beautiful accent piece in your home. The removable covers are machine washable for easy maintenance.'
  },
  {
    id: '5',
    name: 'Hideaway Cat House',
    description: 'Cylindrical cat house with modern aesthetic. Provides privacy and security while maintaining clean lines.',
    price: 129.99,
    image: '/images/cat-house-main.jpg',
    category: 'Comfort',
    additionalImages: ['/images/cat-house-interior.jpg', '/images/cat-house-lifestyle.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'This minimalist hideaway combines function with sophisticated design. The cylindrical structure provides cats with a secure retreat while the clean lines and neutral palette integrate seamlessly with contemporary interiors. Interior cushioning is removable and washable, ensuring long-term comfort and hygiene.'
  },
  {
    id: '6',
    name: 'Smart Interactive Ball',
    description: 'Motion-activated electronic toy ball. Keeps cats engaged with unpredictable movement patterns and built-in timer.',
    price: 49.99,
    image: '/images/smart-ball-main.jpg',
    category: 'Interactive',
    additionalImages: ['/images/smart-ball-detail.jpg', '/images/smart-ball-action.jpg'],
    videoUrl: 'placeholder-video.mp4',
    detailedDescription: 'This intelligent toy ball features advanced motion sensors and AI-driven movement patterns that adapt to your cat\\'s play style. The built-in timer prevents overstimulation while the whisper-quiet motor ensures peaceful coexistence in your home. USB rechargeable with up to 30 days of standby time.'
  }
]`;

async function updateProductData() {
  console.log('📝 Updating product data with new image paths...');
  
  try {
    // Read the current page.tsx file
    const filePath = './app/page.tsx';
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Find the products array and replace it
    const productArrayRegex = /const products: Product\[\] = \[[\s\S]*?\]/;
    
    if (productArrayRegex.test(fileContent)) {
      const updatedContent = fileContent.replace(productArrayRegex, updatedProductsData);
      
      // Write the updated content back to the file
      await fs.writeFile(filePath, updatedContent, 'utf8');
      
      console.log('✅ Successfully updated product data in app/page.tsx');
      console.log('🎯 Product images now properly mapped:');
      console.log('   - Main images: Each product has its own dedicated main image');
      console.log('   - Additional images: Show different views of the same product');
      console.log('   - No more duplicate or mismatched images');
      
    } else {
      console.error('❌ Could not find products array in the file');
    }
    
  } catch (error) {
    console.error('❌ Error updating product data:', error.message);
  }
}

// Check if running directly
if (require.main === module) {
  updateProductData().catch(console.error);
}

module.exports = { updateProductData };