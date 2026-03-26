=== Alt Tag Healer ===
Contributors: tradesouthwestgmailcom
Donate link:  https://paypal.me/tradesouthwest
Tags: images, alt, tags, ajax
Requires at least: 4.9
Tested up to: 6.8
Version: 1.1.0
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

- Bypasses PHP Latency: Large sites with high product counts often struggle with preg_replace functions inside the_content. This script offloads that work to the user's browser. This script now performs a "Double Fetch": first it gets the data, then it sends a POST back to save it permanently.

- Highly Accurate: By querying the WordPress REST API Reference, we get the actual metadata assigned in the Media Library rather than guessing.

- Vanilla JS Performance: There are zero dependencies on jQuery, keeping your site's Core Web Vitals optimized.

Since you often deal with large product databases, this method is significantly safer than running a bulk SQL query. It fixes images "on-demand" as you browse the site, ensuring you don't hit PHP memory limits by processing 90,000 images at once.

== Features ==

Database Integrity: Once a page is visited by an editor or admin, those images are fixed in the wp_postmeta table forever. Subsequent visitors (and Googlebot) will see the alt tag rendered directly in the HTML without needing JavaScript.

Security: The permission_callback ensures that only authorized users (like you or an editor) can trigger a database write, preventing unauthorized API spam.

Selective Processing: Because the script only runs for users who can edit_posts, it won't add any extra REST overhead for your regular customers or site visitors.

== Installing ==

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/alt-tag-healer-ajax` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. This is a plug and play plugin and requires no additional settings or options.

== ChangeLog ==
1.0.1
* fixed ensure compatibility across more environments
