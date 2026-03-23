/* alt-healer-ajax.js */
(function() {
    'use strict';

    const saveAltToDB = (id, altText) => {
        fetch(`${altHealerData.root}alt-healer/v1/update-alt`, {
            method: 'POST',
            headers: { 
                'X-WP-Nonce': altHealerData.nonce,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, alt: altText })
        })
        .then(res => res.json())
        .then(response => console.log(`Database updated for Image ID ${id}`))
        .catch(err => console.error('DB Update Failed:', err));
    };

    const healImages = () => {
        const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        
        images.forEach(img => {
            const match = img.className.match(/wp-image-(\d+)/);
            const attachmentId = match ? match[1] : null;

            if (attachmentId) {
                // Step 1: Get Metadata
                fetch(`${altHealerData.root}wp/v2/media/${attachmentId}`, {
                    method: 'GET',
                    headers: { 'X-WP-Nonce': altHealerData.nonce }
                })
                .then(response => response.json())
                .then(data => {
                    // Logic: Use Caption, or fallback to Post Title
                    let newAlt = data.caption?.rendered 
                        ? data.caption.rendered.replace(/<[^>]*>?/gm, '') 
                        : altHealerData.postTitle;
                    
                    newAlt = newAlt.trim();
                    img.setAttribute('alt', newAlt);

                    // Step 2: Save to Database permanently
                    saveAltToDB(attachmentId, newAlt);
                });
            } else {
                // If no ID (like an external image), just fix DOM temporarily
                img.setAttribute('alt', altHealerData.postTitle);
            }
        });
    };

    document.addEventListener('DOMContentLoaded', healImages);
})();
