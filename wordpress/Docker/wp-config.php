<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpress@smarti9');

/** MySQL database password */
define('DB_PASSWORD', 'Spark384');

/** MySQL hostname */
define('DB_HOST', 'smarti9.mariadb.database.azure.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'Yk@e&1|HZKW~$e*$$?l2.dm7VA;#`r+Ig[kH<-l>`YHL_.B4B^CcHYRP{|+GAn$e');
define('SECURE_AUTH_KEY',  'Y8esrcmEgN~Q)R gchuK`|q/o_,)8^?/YxS^Grp$+vNYlLbn-X=Aii]Tt+nRnNK3');
define('LOGGED_IN_KEY',    'p}Ov|zpmc{<wMoJl=t,j#}Upp--td0Vs3-$fx!Y-(Ab &{K^]2iDpvDVtGk|JRQ;');
define('NONCE_KEY',        'UH^49Z6DTEjs]{Y_/e|h.eA3KajvJA8&GI-M|PKKV}<eZ0l+,)oWbIuDV9iV2c0_');
define('AUTH_SALT',        '?wv}8E@-C,*-GkZ=p=<2fk|?^E/6H*XUBk70k`/a=#}o!~N C6!v9|h`3tLk+buG');
define('SECURE_AUTH_SALT', '_*[>hB:x,Oz@>E5S~[te a-FK+]Y.1<m-e.-Vii]1b(/p)%K/;TQM-B[jjey}E[y');
define('LOGGED_IN_SALT',   'BHm+`d4.a}Ns`O:{6Trp]]@=|6S+GkQ z+|%QhGyd0]_=Pu&Xut(Q(:%^1ey:rw%');
define('NONCE_SALT',       'V~+%_eudtO~EC{usZrP8la{$?~Y|3uwzf5;9::W1s@a J%Ij`NAEy- i+U`6X5@t');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Multisite */
define('WP_ALLOW_MULTISITE', true);
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', 'smarti9.org');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
