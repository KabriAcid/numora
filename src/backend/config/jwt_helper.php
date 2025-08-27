<?php
// =====================================================
// JWT Helper Functions (HS256)
// =====================================================

// Your secret key (keep it safe, do NOT push to GitHub)
const JWT_SECRET = "super_secret_key_change_this";

// -----------------------------------------------------
// 1. Base64Url Encode
// -----------------------------------------------------
function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// -----------------------------------------------------
// 2. Base64Url Decode
// -----------------------------------------------------
function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

// -----------------------------------------------------
// 3. Generate JWT
// -----------------------------------------------------
function generate_jwt($payload, $expirySeconds = 3600) {
    $header = ['typ' => 'JWT', 'alg' => 'HS256'];

    // Add expiry to payload
    $payload['exp'] = time() + $expirySeconds;

    // Encode header & payload
    $base64Header = base64UrlEncode(json_encode($header));
    $base64Payload = base64UrlEncode(json_encode($payload));

    // Create signature
    $signature = hash_hmac('sha256', "$base64Header.$base64Payload", JWT_SECRET, true);
    $base64Signature = base64UrlEncode($signature);

    // Return token
    return "$base64Header.$base64Payload.$base64Signature";
}

// -----------------------------------------------------
// 4. Verify JWT
// -----------------------------------------------------
function verify_jwt($jwt) {
    $parts = explode('.', $jwt);
    if (count($parts) !== 3) {
        throw new Exception("Invalid token structure");
    }

    list($base64Header, $base64Payload, $base64Signature) = $parts;

    // Recreate signature
    $signature = hash_hmac('sha256', "$base64Header.$base64Payload", JWT_SECRET, true);
    $validSignature = base64UrlEncode($signature);

    if (!hash_equals($validSignature, $base64Signature)) {
        throw new Exception("Invalid token signature");
    }

    // Decode payload
    $payload = json_decode(base64UrlDecode($base64Payload), true);

    // Check expiry
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        throw new Exception("Token expired");
    }

    return $payload; // return user info (userId, role, etc.)
}
