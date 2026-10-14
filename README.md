# Chinmay Shandilya - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This portfolio showcases your skills, projects, and professional information in a clean and attractive design.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and mobile navigation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized for performance and quick loading times

## Sections

1. **Hero Section**: Introduction with your name, role, and call-to-action buttons
2. **About Section**: Personal information and statistics
3. **Skills Section**: Technical skills organized by category
4. **Projects Section**: Featured projects with descriptions and links
5. **Contact Section**: Contact information and social media links

## Customization

### Personal Information
Edit the following files to customize your portfolio:

#### `index.html`
- Update your name in the hero section
- Modify the about section content
- Add your actual projects and descriptions
- Update contact information and social media links

#### `styles.css`
- Change colors by modifying CSS variables
- Adjust fonts and spacing
- Customize animations and effects

### Key Areas to Update:

1. **Hero Section** (lines 47-65 in index.html):
   ```html
   <h1 class="hero-title">Hi, I'm <span class="highlight">Chinmay Shandilya</span></h1>
   <h2 class="hero-subtitle">Full Stack Developer</h2>
   ```

2. **About Section** (lines 75-95 in index.html):
   - Update the description paragraphs
   - Modify the statistics (years of experience, projects, technologies)

3. **Skills Section** (lines 105-140 in index.html):
   - Add or remove skills based on your expertise
   - Organize skills into appropriate categories

4. **Projects Section** (lines 150-220 in index.html):
   - Replace placeholder projects with your actual projects
   - Add real GitHub and live demo links
   - Update project descriptions and technologies used

5. **Contact Section** (lines 230-260 in index.html):
   - Update email, phone, and location
   - Add your actual social media profile links

## Deployment to Netlify

### Method 1: Drag and Drop (Easiest)

1. **Prepare your files**: Make sure you have all the files in your project folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - Any images or additional assets

2. **Go to Netlify**: Visit [netlify.com](https://netlify.com) and sign up/login

3. **Deploy**:
   - Click "New site from Git" or "Deploy manually"
   - If using "Deploy manually", simply drag and drop your project folder to the deployment area
   - Netlify will automatically detect your `index.html` file and deploy your site

4. **Get your URL**: Netlify will provide you with a random URL (e.g., `https://amazing-site-123.netlify.app`)

### Method 2: GitHub Integration (Recommended)

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow the instructions to push your local repository

3. **Connect to Netlify**:
   - In Netlify dashboard, click "New site from Git"
   - Choose GitHub and select your repository
   - Deploy settings will be automatic since you have an `index.html` file

4. **Custom Domain** (Optional):
   - In your Netlify dashboard, go to "Domain settings"
   - Add your custom domain or use the provided Netlify subdomain

### Method 3: Using Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy
   ```

4. **Publish** (after testing):
   ```bash
   netlify deploy --prod
   ```

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Optional: images and other assets
    ├── images/
    └── icons/
```

## Customization Tips

### Colors
The main color scheme uses:
- Primary Blue: `#2563eb`
- Accent Yellow: `#fbbf24`
- Dark Gray: `#1f2937`
- Light Gray: `#f8fafc`

To change colors, search for these hex values in `styles.css` and replace them.

### Fonts
The website uses Inter font from Google Fonts. To change:
1. Update the Google Fonts link in `index.html`
2. Modify the `font-family` property in `styles.css`

### Adding Images
1. Create an `assets/images/` folder
2. Add your images there
3. Update the HTML to reference your images instead of using placeholders

### Adding a Contact Form
You can add a contact form using services like:
- Netlify Forms (built-in)
- Formspree
- EmailJS

## Performance Optimization

- Images are optimized and compressed
- CSS and JavaScript are minified for production
- Fonts are loaded efficiently
- Smooth animations are hardware-accelerated

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help with customization or deployment, feel free to:
1. Check the Netlify documentation
2. Review the code comments for guidance
3. Test your changes locally before deploying

## Updates and Maintenance

To update your portfolio:
1. Make changes to your local files
2. Test locally by opening `index.html` in a browser
3. Deploy the updated files to Netlify
4. Your site will automatically update

---

**Happy coding! 🚀** 