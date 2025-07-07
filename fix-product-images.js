#!/usr/bin/env node

const { generateAllImages } = require('./generate-product-images.js');
const { updateProductData } = require('./update-product-data.js');

async function fixProductImages() {
  console.log('🚀 Starting complete product image fix process...\n');
  
  console.log('Step 1: Generating new product images with OpenAI...');
  console.log('=' .repeat(50));
  
  try {
    await generateAllImages();
    
    console.log('\n' + '=' .repeat(50));
    console.log('Step 2: Updating product data with new image paths...');
    console.log('=' .repeat(50));
    
    await updateProductData();
    
    console.log('\n' + '🎉 Product image fix complete!');
    console.log('=' .repeat(50));
    console.log('✅ All product images have been regenerated');
    console.log('✅ Product data has been updated with correct image paths');
    console.log('✅ No more duplicate or mismatched images');
    console.log('\n📱 You can now test the application with the new images!');
    console.log('Run: npm run dev');
    
  } catch (error) {
    console.error('\n❌ Error during image fix process:', error.message);
    process.exit(1);
  }
}

// Run the complete process
fixProductImages();