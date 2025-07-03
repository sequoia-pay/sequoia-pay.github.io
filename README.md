# Sequoia Pay Landing Page

Standalone landing page for Sequoia Pay - Crypto billing for your SaaS without gas fees.

## 🚀 Quick Start

### Development

```bash
# Install dependencies (optional - for dev server)
npm install

# Start development server
npm run dev
# or simply open index.html in your browser
```

### Production Deployment

#### Option 1: Static File Server
```bash
# Using Node.js serve
npm run start

# Using Python
python -m http.server 3000

# Using PHP
php -S localhost:3000
```

#### Option 2: Deploy to Cloud Platforms

**Netlify:**
```bash
npm run deploy-netlify
```

**Vercel:**
```bash
npm run deploy-vercel
```

**Surge.sh:**
```bash
npm run deploy
```

**GitHub Pages:**
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/repo-name`

#### Option 3: Traditional Web Hosting
Simply upload all files to your web hosting provider's public_html or www folder.

## 📁 Project Structure

```
landing-standalone/
├── index.html          # Main HTML file
├── style.css           # All CSS styles
├── script.js           # JavaScript functionality
├── package.json        # NPM configuration
├── README.md          # This file
├── .gitignore         # Git ignore rules
└── assets/            # Assets folder (optional)
    ├── favicon.ico
    └── apple-touch-icon.png
```

## 🛠 Features

- ✅ Fully responsive design
- ✅ Modern CSS animations
- ✅ Interactive JavaScript effects
- ✅ SEO optimized
- ✅ No build process required
- ✅ Fast loading
- ✅ Cross-browser compatible

## 🎨 Customization

### Colors
Update CSS variables in `style.css`:
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --text-color: #1e293b;
}
```

### Content
Edit `index.html` to update:
- Text content
- Links
- Images
- Contact information

### Styling
Modify `style.css` for:
- Layout changes
- Color schemes
- Typography
- Animations

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Dependencies

This project has zero runtime dependencies. Development dependencies (optional):

- `live-server` - Development server with live reload
- `serve` - Production-ready static file server

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## 📞 Support

For questions about Sequoia Pay:
- Website: https://sequoia-pay.com
- Email: support@sequoia-pay.com
- Telegram: @sequoia-pay

---

Built with ❤️ for the crypto community 