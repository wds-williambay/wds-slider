<?php
/**
 * Plugin Name:       Wds Slider
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wds-slider
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_wds_slider_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_wds_slider_block_init' );


function enqueue_slider() {
	wp_enqueue_script( 'swiper-scripts', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js', [], 10, true );
	// wp_enqueue_style( 'swiper-styles', 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css', [], 10 );
}
add_action( 'init', 'enqueue_slider' );
