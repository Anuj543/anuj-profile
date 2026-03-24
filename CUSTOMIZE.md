# Quick Customization Guide

This guide will help you customize the portfolio with your information in 5 minutes!

## Step 1: Update Personal Information

Open `index.html` and find these lines (around line 15):

```html
<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
    <i class="fas fa-code mr-2"></i>Anuj
</h1>
```

Replace **"Anuj"** with your name.

---

## Step 2: Update Hero Section Text

Find this section (around line 63):

```html
<h2 class="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
    <span class="block">Welcome to My</span>
    <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Digital Portfolio
    </span>
</h2>
<p class="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
    With expertise in modern web technologies, I create stunning digital experiences that captivate users and drive results.
</p>
```

Update the heading and subtitle with your own tagline.

---

## Step 3: Update About Section

Find this section (around line 112):

```html
<h3 class="text-4xl md:text-5xl font-bold mb-8 text-center">
    <span class="gradient-text">About Me</span>
</h3>
```

Below this, update:
- The image URL: `https://picsum.photos/400/450?random=2` → your image
- The about text paragraphs
- Update stats values (50+, 5+, 100%)

---

## Step 4: Update Projects

Find the project cards (around line 175):

```html
<h4 class="text-2xl font-bold mb-2">E-Commerce Platform</h4>
<p class="text-gray-400 mb-4">A full-stack e-commerce solution...</p>
<span class="badge">React</span>
<span class="badge">Node.js</span>
```

For each project:
1. Change the title
2. Change the description
3. Update technologies
4. Update image URL
5. Update live demo and GitHub links

---

## Step 5: Update Skills

Find the skills section (around line 230):

```html
<h4 class="text-xl font-bold mb-6 flex items-center">
    <i class="fas fa-palette text-blue-400 mr-3"></i>Frontend
</h4>
```

For each skill, update:
1. Skill name
2. Proficiency percentage: `style="width: 95%"`

Example:
```html
<div class="skill-item">
    <span class="text-sm font-semibold">React.js</span>
    <div class="w-full bg-slate-700 rounded-full h-2 mt-1">
        <div class="bg-blue-500 h-2 rounded-full" style="width: 95%"></div>
    </div>
</div>
```

---

## Step 6: Update Contact Information

Find the contact section (around line 348):

```html
<input type="text" placeholder="Your Name" class="..." required>
<input type="email" placeholder="Your Email" class="..." required>
<input type="text" placeholder="Subject" class="..." required>
<textarea placeholder="Your Message" rows="5" class="..." required></textarea>
```

Update contact info below:

```html
<a href="mailto:anuj@example.com" class="...">anuj@example.com</a>
<a href="tel:+91234567890" class="...">+91 (123) 456-7890</a>
<p class="...">New Delhi, India</p>
```

Update social links at the bottom:

```html
<a href="https://linkedin.com/in/yourprofile" class="...">
    <i class="fab fa-linkedin-in"></i>
</a>
<a href="https://github.com/yourprofile" class="...">
    <i class="fab fa-github"></i>
</a>
```

---

## Color Customization

To change colors, edit `styles.css`:

```css
:root {
    --primary: #3b82f6;      /* Change this for primary color */
    --secondary: #a855f7;    /* Change this for secondary color */
    --accent: #ec4899;       /* Change this for accent color */
}
```

Popular color codes:
- Blue: `#3b82f6`
- Purple: `#a855f7`
- Pink: `#ec4899`
- Green: `#10b981`
- Orange: `#f97316`
- Red: `#ef4444`

---

## Image Updates

Replace all image URLs:

1. **About section:**
   ```
   https://picsum.photos/400/450?random=2
   ```

2. **Project images:**
   ```
   https://picsum.photos/400/300?random=3
   https://picsum.photos/400/300?random=4
   https://picsum.photos/400/300?random=5
   ```

Free image services:
- [Unsplash](https://unsplash.com) - Professional photos
- [Pexels](https://pexels.com) - Free stock photos
- [Picsum](https://picsum.photos) - Random images
- [Placeholder.com](https://placeholder.com) - Placeholder images

---

## Icons

The portfolio uses Font Awesome icons. Browse available icons at:
https://fontawesome.com/icons

Example:
```html
<i class="fas fa-code"></i>           <!-- Code icon -->
<i class="fas fa-palette"></i>        <!-- Palette icon -->
<i class="fas fa-server"></i>         <!-- Server icon -->
<i class="fab fa-github"></i>         <!-- GitHub icon -->
<i class="fab fa-linkedin"></i>       <!-- LinkedIn icon -->
```

---

## Font Awesome Free Icons List

### Solid Icons (fas)
- `fa-code` - Code/Programming
- `fa-palette` - Design
- `fa-server` - Backend/Server
- `fa-database` - Database
- `fa-tools` - Tools
- `fa-envelope` - Email
- `fa-phone` - Phone
- `fa-map-marker-alt` - Location
- `fa-lightbulb` - Idea
- `fa-check` - Checkmark
- `fa-arrow-right` - Arrow

### Brand Icons (fab)
- `fab-github` - GitHub
- `fab-linkedin-in` - LinkedIn
- `fab-twitter` - Twitter
- `fab-facebook` - Facebook
- `fab-instagram` - Instagram

---

## Test Your Changes

1. Save `index.html`
2. Refresh your browser (Ctrl+R or Cmd+R)
3. Check mobile view (press F12, then device toolbar)

---

## Before Going Live

- [ ] Update all personal information
- [ ] Add real project information
- [ ] Update contact email
- [ ] Change all placeholder images
- [ ] Test on mobile and tablet
- [ ] Check all links work
- [ ] Test form (set up backend)
- [ ] Optimize images for speed
- [ ] Test on multiple browsers

---

## Need More Help?

Refer to:
- `README.md` - Complete documentation
- `data.json` - Structured content
- Original HTML comments for guidance

Good luck with your portfolio! 🚀
