<?php
/*
Plugin Name: תוסף ל WooCommerce
Description: תוסף כתובת משלוח עם רשימת ערים
Version: 1.0
Author: השם שלך
*/

// טעינת הסקריפט בעמוד התשלום בוורדפרס
function enqueue_address_autocomplete_script() {
    // if (is_checkout()) {
        $script_url = plugin_dir_url(__FILE__) . 'address-autocomplete.js';
        wp_enqueue_script('address-autocomplete', $script_url, array('jquery'), '1.0', true);
        wp_enqueue_style( 'ilStyle', plugins_url( '/', __FILE__ ) . 'il-style.css' );

    // }
}
add_action('wp_enqueue_scripts', 'enqueue_address_autocomplete_script');

// הוסף את הפונקציה הבאה לקובץ functions.php של תבנית הנושא שלך

function set_default_checkout_country() {
    return 'IL'; // קוד המדינה של ישראל
}
add_filter( 'default_checkout_billing_country', 'set_default_checkout_country' );
add_filter( 'default_checkout_shipping_country', 'set_default_checkout_country' );



