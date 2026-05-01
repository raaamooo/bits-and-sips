document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Menu Items
    const renderMenu = (categoryId, items) => {
        const container = document.getElementById(categoryId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="menu-card reveal" id="item-${item.id}">
                <img src="${item.image}" alt="${item.name}" class="menu-image" loading="lazy">
                <div class="menu-content">
                    <div class="menu-header">
                        <h4 class="menu-title">${item.name}</h4>
                        <span class="menu-price">${item.price} EGP</span>
                    </div>
                    <p class="menu-desc">${item.description}</p>
                </div>
            </div>
        `).join('');
    };

    renderMenu('food-grid', menuData.food);
    renderMenu('drinks-grid', menuData.drinks);
    renderMenu('desserts-grid', menuData.desserts);

    // 2. Theme Switcher
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }



    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Give DOM time to render injected menu items
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }, 100);
});
