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