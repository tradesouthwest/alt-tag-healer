<?php
/**
 * Plugin Name: Alt Tag Healer
 * Description: Dynamically detects and permanently saves missing alt tags to the database.
 * Version: 1.0.1
 * Text domain: alt-tag-healer-ajax
 * Author: TradeSouthwest
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Register the custom endpoint to update alt text
add_action( 'rest_api_init', function () {
    register_rest_route( 'alt-healer/v1', '/update-alt', [
        'methods' => 'POST',
        'callback' => 'ts_update_alt_callback',
        'permission_callback' => function () {
            // Only allow logged-in users with 'edit_posts' capability
            return current_user_can( 'edit_posts' );
        }
    ]);
});

function ts_update_alt_callback( $request ) {
    $attachment_id = absint( $request->get_param( 'id' ) );
    $new_alt       = sanitize_text_field( $request->get_param( 'alt' ) );

    if ( ! $attachment_id || ! $new_alt ) {
        return new WP_Error( 'invalid_data', 'Missing ID or Alt text', [ 'status' => 400 ] );
    }

    // Update the post meta in the SQL table
    $updated = update_post_meta( $attachment_id, '_wp_attachment_image_alt', $new_alt );

    return rest_ensure_response( [ 'success' => (bool)$updated, 'id' => $attachment_id ] );
}

add_action( 'wp_enqueue_scripts', function() {
    if ( is_singular() && current_user_can( 'edit_posts' ) ) {
        wp_enqueue_script( 'alt-healer-js', 
            plugin_dir_url( __FILE__ ) 
            . 'alt-healer.js', [], '1.2', true );

        wp_localize_script( 'alt-healer-js', 'altHealerData', [
            'root'      => esc_url_raw( rest_url() ),
            'nonce'     => wp_create_nonce( 'wp_rest' ),
            'postTitle' => get_the_title()
        ]);
    }
});
