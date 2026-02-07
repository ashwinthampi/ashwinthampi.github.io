(function() {
    const e = ['ashwin', 'thampi.com'];
    const p = ['720', '639', '1066'];
    const emailLink = document.getElementById('email-link');
    const phoneLink = document.getElementById('phone-link');
    if (emailLink) {
        emailLink.href = 'mailto:' + e[0] + '@' + e[1];
    }
    if (phoneLink) {
        phoneLink.href = 'tel:' + p.join('-');
    }
})();
