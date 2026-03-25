<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Simple security: You can add a secret key check here
// if ($_POST['key'] !== 'YOUR_SECRET_KEY') { die('Unauthorized'); }

$target_dir = "../uploads/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if (isset($_FILES["file"])) {
    $file_extension = pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
    $new_filename = uniqid() . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        // Return the full URL to the file
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
        $host = $_SERVER['HTTP_HOST'];
        echo json_encode([
            "success" => true,
            "url" => $protocol . "://" . $host . "/uploads/" . $new_filename
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
}
?>
