// Create an IntersectionObserver with a callback function.
const observer = new IntersectionObserver((entries) => {
    // Iterate through each entry (element) in the entries array.
    entries.forEach((entry) => {
        // Add the "show" class to the element's class list when it becomes visible.
        entry.target.classList.add('show');
    });  
});
// Select all elements with the "hidden" class.
const hiddenElement = document.querySelectorAll('.hidden');
// Iterate through each element with the "hidden" class.
// Instruct the observer to watch (observe) each element.
hiddenElement.forEach((el) => observer.observe(el)); 

document.addEventListener('visibilitychange', () => {
    document.hidden ? document.body.style.animationPlayState = 'paused'
                   : document.body.style.animationPlayState = 'running';
  });

// ========== TYPING ANIMATION ==========
(function() {
    const typeEls = document.querySelectorAll('section.hidden p');
    if (!typeEls.length) return;

    // Store original HTML content and clear elements
    typeEls.forEach(el => {
        el.dataset.typeHtml = el.innerHTML;
        el.innerHTML = '';
    });

    function typeHTML(el) {
        const html = el.dataset.typeHtml;
        if (!html) return;
        delete el.dataset.typeHtml;

        // Adaptive speed: longer text types faster, capped between 5-25ms per character
        const textLen = html.replace(/<[^>]*>/g, '').length;
        const speed = Math.max(5, Math.min(25, Math.floor(1500 / (textLen || 1))));
        let i = 0;
        let output = '';
        el.classList.add('typing');

        function step() {
            if (i >= html.length) {
                el.classList.remove('typing');
                el.classList.add('typed');
                return;
            }

            // HTML tags are added instantly (no delay)
            if (html[i] === '<') {
                const end = html.indexOf('>', i);
                if (end !== -1) {
                    output += html.substring(i, end + 1);
                    i = end + 1;
                    step();
                    return;
                }
            }

            // HTML entities (e.g. &amp;) are added as one unit
            if (html[i] === '&') {
                const semi = html.indexOf(';', i);
                if (semi !== -1 && semi - i < 10) {
                    output += html.substring(i, semi + 1);
                    i = semi + 1;
                } else {
                    output += html[i];
                    i++;
                }
            } else {
                output += html[i];
                i++;
            }

            el.innerHTML = output;
            setTimeout(step, speed);
        }

        step();
    }

    // Observe paragraphs - type when they scroll into view
    const typeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.dataset.typeHtml != null) {
                typeObserver.unobserve(entry.target);
                // Small delay so the section slide-in can settle first
                setTimeout(() => typeHTML(entry.target), 300);
            }
        });
    }, { threshold: 0.1 });

    typeEls.forEach(el => typeObserver.observe(el));
})();