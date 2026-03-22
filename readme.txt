=== Alt Tag Healer ===
Contributors: tradesouthwestgmailcom
Donate link:
Tags: images, list, software, packages, subpackages
Requires at least: 4.9
Tested up to: 6.5
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

== Description ==

- Bypasses PHP Latency: Large sites with high product counts often struggle with preg_replace functions inside the_content. This script offloads that work to the user's browser.

- Highly Accurate: By querying the WordPress REST API Reference, we get the actual metadata assigned in the Media Library rather than guessing.

- Vanilla JS Performance: There are zero dependencies on jQuery, keeping your site's Core Web Vitals optimized.

== Features ==

Scans the DOM for <img> tags missing the alt attribute or containing an empty string.

Identifies the image ID via WordPress standard classes (e.g., wp-image-123).

Fetches missing data (Caption or Post Title) using a single batched REST API call or localized data.

Injects the missing alt text immediately via JavaScript.

== Installing ==

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/alt-tag-healer` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. This is a plug and play plugin and requires no additional settings or options.

