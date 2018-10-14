<?php
/*
Plugin Name: Smart-Forms-On-Demand
*/

function read_param($paramName, $defaultValue) {
    foreach (scandir(plugin_dir_path( __FILE__ ) . 'db') as $dbFile) {
        if (strlen($dbFile) > 2) {
            $db = new SQLite3(plugin_dir_path( __FILE__ ) . 'db/' . $dbFile);
            $statement = $db->prepare('SELECT Parameter FROM App_Config WHERE Name = :name;');
            $statement->bindValue(':name', $paramName);

            $result = $statement->execute();
            if (!$result) {
                error_log('Smart-Forms-On-Demand: Can not open SqlLite');
                return $defaultValue;
            }

            while ($res = $result->fetchArray(SQLITE3_NUM)) {
                $db->close();

                return $res[0];
            }

            $db->close();
        }
    }

    error_log('Smart-Forms-On-Demand: Parameter "' . paramName . ' is not found"');
    return $defaultValue;
}

function update_form($params) {
    // default port
    $service_port = read_param('iTextPort', 8086); 

    $address = 'localhost';

    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    if (!$socket) {
        $msg = socket_strerror(socket_last_error($socket));
        error_log('Smart-Forms-On-Demand: ' . $msg);
        return '';
    }

    $result = socket_connect($socket, $address, $service_port);
    if (!$result) {
        $msg = socket_strerror(socket_last_error($socket));
        error_log('Smart-Forms-On-Demand: ' . $msg);

        $to = 'smartformsondemand@gmail.com';
        $subject = 'iText service is not running';
        $body = '<p style="font-color:red"><b>Please start iText service</b><p>';
        $headers = array('Content-Type: text/html; charset=UTF-8');
 
        wp_mail( $to, $subject, $body, $headers );

        return '';
    }

    $in = json_encode($params) . PHP_EOL;

    $out = '';

    $result = socket_write($socket, $in, strlen($in));
    if (!$result) {
        $msg = socket_strerror(socket_last_error($socket));
        error_log('Smart-Forms-On-Demand: ' . $msg);
        return '';
    }

    while ($buf = socket_read($socket, 2048)) {
        $out .= $buf;

        if (strlen($buf) > 0 && $buf[strlen($buf) - 1] === PHP_EOL) {
            break;
        }
    }

    socket_close($socket);

    if (strlen($out) > 0) {
        return substr($out, 0, strlen($out) - 1);
    } else {
        return '';
    }
}

function process_data($data, $pdf) {
    if ($data['data'] !== null) {
        $fields = [];
        $fields['file'] = '/data/' . $pdf;
        $fields['operation'] = $data['mode'] === 'view' ? 'f' : '';

        $entries = [];
        foreach ($data['data'] as $entry) {
            $e = [];
            $e['name'] = $entry['name'];
            $e['value'] = $entry['value'];
            $e['operation'] = 's';

            array_push($entries, $e);
        }

        $fields['entries'] = $entries;

        $out = update_form($fields);
        if ($out === '') {
            return false;
        }

        $f = fopen(plugin_dir_path( __FILE__ ) . 'data/uuid' . $pdf, 'w');
        fwrite($f, base64_decode($out.content));
        fclose($f);
    }

    return true;
}

function generate_uuid() {
    return 
        // 32 bits for "time_low"
        bin2hex(openssl_random_pseudo_bytes(4)) .

        // 16 bits for "time_mid"
        bin2hex(openssl_random_pseudo_bytes(2)) .

        // 16 bits for "time_hi_and_version",
        // four most significant bits holds version number 4
        bin2hex(openssl_random_pseudo_bytes(2)) .

        // 16 bits, 8 bits for "clk_seq_hi_res",
        // 8 bits for "clk_seq_low",
        // two most significant bits holds zero and one for variant DCE1.1
        bin2hex(openssl_random_pseudo_bytes(2)) .

        // 48 bits for "node"
        bin2hex(openssl_random_pseudo_bytes(4)) .
        bin2hex(openssl_random_pseudo_bytes(4)
    );
}

function generate_session_id() {
    $cipher = 'AES-128-CBC';
    $ivlen = openssl_cipher_iv_length($cipher);

    $key = read_param('tokenSecret', '');
    $iv = openssl_random_pseudo_bytes($ivlen);
    $ciphertext = openssl_encrypt(time(), $cipher, $key, OPENSSL_RAW_DATA, $iv);
    $hmac = hash_hmac('sha256', $ciphertext, $key, true);
    return base64_encode($iv.$hmac.$ciphertext);
}

add_action('rest_api_init', function ($server) {
    $server->register_route('SmartForms', '/PDFEditor', array(
        'methods'  => 'POST',
        'callback' => function ($request) {
            $cookie = $_COOKIE['wordpress_logged_in_' . COOKIEHASH];

            $data = $request->get_json_params();

            if ($cookie === null || $cookie === '') {
                if (!($data['type'] === 'application/pdf' && $data['templateid'] !== null &&
                     ($data['mode'] === 'view' || $data['mode'] === 'edit'))) {
                    error_log('Smart-Forms-On-Demand: Non-authorized anonymous call');
                    return '{"editorUrl": ""}';
                }

                $readOnly = 1;
                $pdf = $data['templateid'] . '_' . $data['locale'] . '.pdf';
            } else {
                if (!wp_validate_auth_cookie($cookie, 'logged_in')) {
                    error_log('Smart-Forms-On-Demand: Non-authorized call');
                    return '{"editorUrl": ""}';
                }

                $pdf = generate_uuid();

                $readOnly = 0;
            }

            $url = '/pdf.js/web/viewer.html?file=/data/' . $pdf . '&session_id=' . generate_session_id() . '#locale=' . $data['locale'];
            $pluginPath = plugin_dir_path( __FILE__ );

            if ($data['type'] === 'application/pdf' && $data['templateid'] !== null &&
               ($data['mode'] === 'view' || $data['mode'] === 'edit')) {

                if ($readOnly === 0) {
                    if (!copy($pluginPath . 'templates/forms/' . $data['locale'] . '/' . $data['templateid'] . '.pdf',
                       $pluginPath . 'data/' . $pdf)) {
                        $errors = error_get_last();
                        error_log('Smart-Forms-On-Demand: ' . $errors['type'] . ', ' . $errors['message']);
                        return '{"editorUrl": ""}';
                    }
                }

                $editorUrl = $url . '&mode=' . $data['mode'] . '&templateid=' . $data['templateid'];

                if ($readOnly === 0) {
                    if (!process_data($data, $pdf)) {
                       return '{"editorUrl": ""}';
                    }
                }

                return '{"editorUrl": "' . $editorUrl . '"}';
            } else if ($data['type'] === 'application/pdf' && $data['content'] !== null &&
               ($data['mode'] === 'view' || $data['mode'] === 'edit' || $data['mode'] === 'design')) {
                $f = fopen($pluginPath . 'data/' . $pdf, 'w');
                fwrite($f, base64_decode($data['content']));
                fclose($f);

                $editorUrl = $url . '&mode=' . $data['mode'];

                if (!process_data($data, $pdf)) {
                    return '{"editorUrl": ""}';
                }

                return '{"editorUrl": "' . $editorUrl . '"}';
            } 

            return '{"editorUrl": ""}';
        },
    ) );

    $server->register_route('SmartForms', '/UpdateForm', array(
        'methods'  => 'POST',
        'callback' => function ($request) {
            $params = $request->get_json_params();

            $result = [];

            if ($params['session_id'] === null) {
                return $result;
            }

            $cipher = 'AES-128-CBC';
            $ivlen = openssl_cipher_iv_length($cipher);
            $key = read_param('tokenSecret', '');
            $sha2len = 32;

            $c = base64_decode($params['session_id']);

            if (strlen($c) < $ivlen + $sha2len) {
                return $result;
            }

            $iv = substr($c, 0, $ivlen);
            $hmac = substr($c, $ivlen, $sha2len);
            $ciphertext = substr($c, $ivlen + $sha2len);
            $time_stamp = openssl_decrypt($ciphertext, $cipher, $key, OPENSSL_RAW_DATA, $iv);
            $calcmac = hash_hmac('sha256', $ciphertext, $key, true);

            if (!hash_equals($hmac, $calcmac)) //PHP 5.6+ timing attack safe comparison
            {
                return result;
            }

            $time_diff = time() - (int)$time_stamp;
            // 3 seconds delay in order to prevent DDoS
            if ($time_diff <= 3 || $time_diff > 60 * 60 * 24) {
                return $result;
            }

            $result['form'] = update_form($params);
            $result['session_id'] = generate_session_id();

            return $result;
        },
    ) );
} );

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'smartformsondemand',
        plugin_dir_url( __FILE__ ) . 'smartformsondemand.js?v=1',
        array('jquery')
    );
} );