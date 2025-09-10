const fs = require('fs-extra');
const path = require('path');

async function build() {
    try {
        // Create dist directory
        await fs.ensureDir('dist');
        
        // Copy public files to dist
        await fs.copy('public', 'dist');
        
        console.log('✅ Build completed successfully!');
        console.log('📁 Files copied to dist/ directory');
        console.log('🚀 Ready for deployment to GitHub Pages');
        
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

build();