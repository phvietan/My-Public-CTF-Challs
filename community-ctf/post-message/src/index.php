<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="/static/css/index.css">
  <title>Personal manager</title>
</head>
<body>
  <iframe id="worker" src="/worker.php" style="display: none;"></iframe>

  <div class="main">
    <h1>Your secret is: </h1>
    <textarea id="secret" rows="10" ></textarea>
    <br>
    <button class="green" onclick="storeSecret()">Store secret</button>
    <br><br><br>
    <button class="red" onclick="alertSecret()">Alert secret</button>
    <br><br><br>
    <a href="/bot/">Talk to admin</a>
  </div>

  <script src="/static/js/main.js"></script>
</body>
</html>
