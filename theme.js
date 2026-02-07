// Theme toggle - creates floating button, manages localStorage
(function() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');

    function updateIcon() {
        const isDark = document.documentElement.dataset.theme === 'dark';
        btn.textContent = isDark ? '\u2600' : '\u263D';
    }

    btn.addEventListener('click', function() {
        const current = document.documentElement.dataset.theme || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem('theme', next);
        updateIcon();
        window.dispatchEvent(new CustomEvent('themechange'));
    });

    // Inject toggle styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            top: 16px;
            right: 16px;
            z-index: 1000;
            background: var(--text-color);
            color: var(--bg-color);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s, color 0.3s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .theme-toggle:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(btn);
    updateIcon();
})();
