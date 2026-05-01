# Bites & Sips — Interactive Egyptian Menu

Bites & Sips is a complete, production-ready, mobile-first restaurant menu website featuring authentic Egyptian cuisine. It includes an interactive recommendation game to help users decide what to order based on their current cravings.

## Features
- **Mobile-Optimized**: Designed mobile-first for small screens (360px+) scaling up smoothly.
- **Theme Switcher**: Dark and Light mode toggle with `localStorage` persistence.
- **Dynamic Menu**: Populated via JavaScript, categorized into Food, Drinks, and Desserts.
- **Interactive Game**: "Play With Us" quiz algorithm that matches user preferences to a menu item.
- **Animations**: Intersection Observer for scroll fades, smooth transitions, and hover effects.

## Setup & Local Development
1. Clone the repository.
2. Open `index.html` in your web browser. No local server is strictly required, though using a live server extension (like in VS Code) is recommended for best results.
3. Assets (images) are referenced via placeholder paths. Please add actual images to `assets/images/`.

## Deployment Guide (GitHub Pages)
1. Initialize a git repository in this folder: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Create a new repository on GitHub and link it: `git remote add origin <your-repo-url>`
5. Push your code: `git push -u origin main`
6. On GitHub, navigate to **Settings > Pages**.
7. Under "Source", select the `main` branch and `/ (root)` folder.
8. Save. Your site will be published at `https://<your-username>.github.io/<repository-name>/`.
