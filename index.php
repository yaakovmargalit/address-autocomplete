<?php
/*
Plugin Name: IL Address Autocomplete
Description: השלמת ערים ורחובות בישראל לחנות ווקומרס
Version: 1.0
Author: Yaakov Margalit
 License URI:       https://www.gnu.org/licenses/gpl-2.0.html
  Author URI:        mailto:yaakovmargalit@gmail.com
*/

function enqueue_address_il_autocomplete_script() {
    if (is_checkout()) {
        $script_url = plugin_dir_url(__FILE__) . 'address-autocomplete.js';
        wp_enqueue_script('address-il-autocomplete', $script_url, array('jquery'), '1.0', true);
        wp_enqueue_style( 'il-address-style', plugins_url( '/', __FILE__ ) . 'address-il-style.css' );

    }
}
add_action('wp_enqueue_scripts', 'enqueue_address_il_autocomplete_script');


function set_default_checkout_country() {
    return 'IL';
}
add_filter( 'default_checkout_billing_country', 'set_default_checkout_country' );
add_filter( 'default_checkout_shipping_country', 'set_default_checkout_country' );



