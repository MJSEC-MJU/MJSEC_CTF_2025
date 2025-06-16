<?php
include './db/lib.php';
session_start();
$flag = file_get_contents('/flag');

if (!isset($_COOKIE['key'])) {
    header("Location: generate_badge.php");
    exit();
}

$key = $_COOKIE['key'];
$stmt = $pdo->prepare("SELECT badge_name, username FROM mjsecbadge WHERE badge_key = ?");
$stmt->execute([$key]);
$mjsecBadge = $stmt->fetch(PDO::FETCH_ASSOC);

if ($mjsecBadge['badge_name']) {
    ?>
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MJSEC Badge</title>
        <link rel="stylesheet" href="/static/css/view_badge.css">
    </head>
    <body>
        <div class="badge-text">
            <?php echo htmlspecialchars($_SESSION['username']); ?>'s MJSEC Badge
        </div>
        <div class="badge-image-container sparkle-effect">
            <img src="/static/png/badge.png" alt="MJSEC Logo" class="badge-logo">
        </div>
        <?php 
        if ($mjsecBadge['username'] === 'admin') {
            echo $flag;
        } ?>
    </body>
    </html>
    <?php
} else {
    echo "<script>alert('Invalid key or badge does not exist'); location.href='/';</script>";
}
?>