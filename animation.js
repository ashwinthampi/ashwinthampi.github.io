const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show');
    });
});
const hiddenElement = document.querySelectorAll('.hidden');
hiddenElement.forEach((el) => observer.observe(el));