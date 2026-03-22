<?php
/**
 * Plugin Name: Vanilla JS Alt Tag Healer
 * Description: Fixes missing alt tags using Vanilla JS and REST API instead of the_content filters.
 * Version: 1.0
 * Author: Trade Southwest
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'wp_enqueue_scripts', function() {
    if ( is_singular() ) {
        wp_enqueue_script( 'alt-healer-js', plugin_dir_url( __FILE__ ) . 'alt-healer.js', [], '1.0', true );

        // Pass the current post title as a fallback
        wp_localize_script( 'alt-healer-js', 'altHealerData', [
            'root' => esc_url_raw( rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' ),
            'postTitle' => get_the_title()
        ]);
    }
});