<?php
$allowedHosts = ['127.0.0.', '172.','192.'];

$targetUrl = $_GET['kepurl'];

// Input Validation
if (!filter_var($targetUrl, FILTER_VALIDATE_URL)) {
    die("Invalid URL.");
}

// Whitelisting
$host = parse_url($targetUrl, PHP_URL_HOST);
$allowed = false;
foreach ($allowedHosts as $allowedHost) {
    if (strpos($host, $allowedHost) === 0) {
        $allowed = true;
        break;
    }
}
if (!$allowed) {
    die("Host not allowed.");
}

$headers = getallheaders();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $response = proxyRequest($targetUrl, $method, $headers);
    echo $response;
} elseif (in_array($method, ['POST', 'PUT', 'DELETE'])) {
    $requestBody = file_get_contents('php://input');
    $response = proxyRequest($targetUrl, $method, $headers, $requestBody);
    echo $response;
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Method Not Allowed";
}

function proxyRequest($url, $method, $headers, $data = null) {
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, formatHeaders($headers));
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // timeout in seconds
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); // connection timeout in seconds

    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    $response = curl_exec($ch);

    // Handle response headers
    $responseHeaders = curl_getinfo($ch);
    header('HTTP/1.1 ' . $responseHeaders['http_code']);

    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        return "CURL Error: $error";
    }

    curl_close($ch);
    return $response;
}

function formatHeaders($headers) {
    $formattedHeaders = array();
    foreach ($headers as $key => $value) {
        if (strtolower($key) === 'host' || strtolower($key) === 'content-length') {
            continue;
        }
        $formattedHeaders[] = "$key: $value";
    }
    return $formattedHeaders;
}
?>
