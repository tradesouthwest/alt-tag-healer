/* alt-healer.js */
(function() {
    'use strict';

    const healImages = () => {
        const images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        
        images.forEach(img => {
            // 1. Try to find the Attachment ID from WP classes (wp-image-XXXX)
            const match = img.className.match(/wp-image-(\d+)/);
            const attachmentId = match ? match[1] : null;

            if (attachmentId) {
                // Fetch Media metadata from REST API
                fetch(`${altHealerData.root}wp/v2/media/${attachmentId}`, {
                    method: 'GET',
                    headers: { 'X-WP-Nonce': altHealerData.nonce }
                })
                .then(response => response.json())
                .then(data => {
                    // Priority: 1. Caption, 2. Post Title (Fallback)
                    const newAlt = data.caption?.rendered 
                        ? data.caption.rendered.replace(/<[^>]*>?/gm, '') 
                        : altHealerData.postTitle;
                    
                    img.setAttribute('alt', newAlt.trim());
                })
                .catch(err => console.error('Alt Healer Error:', err));
            } else {
                // No ID found? Use Post Title as global fallback
                img.setAttribute('alt', altHealerData.postTitle);
            }
        });
    };

    // Run on initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', healImages);
    } else {
        healImages();
    }
})();