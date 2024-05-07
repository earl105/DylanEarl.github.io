// index.js
const mailIcon = document.getElementById('mailIcon2');
const originalSrc = 'images/emailLogo.png'; // Path to the original mail icon
const checkmarkSrc = 'images/emailCheck.png'; // Path to the checkmark icon

mailIcon.addEventListener('click', () => {
    const email = 'earl.105@osu.edu';

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            mailIcon.src = checkmarkSrc; // Change to checkmark icon
            setTimeout(() => {
                mailIcon.src = originalSrc; // Revert to mail icon
            }, 2000); // Adjust time as needed
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    } else {
        // Fallback method using textarea
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            if (document.execCommand('copy')) {
                mailIcon.src = checkmarkSrc; // Change to checkmark icon
                setTimeout(() => {
                    mailIcon.src = originalSrc; // Revert to mail icon
                }, 2000); // Adjust time as needed
            } else {
                console.log('Fallback: Copying failed');
            }
        } catch (err) {
            console.error('Fallback: Unable to copy', err);
        }

        document.body.removeChild(textarea);
    }
});
