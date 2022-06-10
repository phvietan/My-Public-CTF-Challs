<?php
  $time = ceil(time() / 120);
  $secret = hash("md5", $_ENV['SECRET'] . "$time");
  $challenge = $secret . "_HCMUS_CTF_2022_";

  function toHtmlEntityTroll($s) {
    $array = str_split($s);
    $res = "";
    foreach ($array as $char) {
      $res .= "&#" . ord($char);
    }
    return $res;
  }

  if (isset($_POST['s'])) {
    if (strlen($_POST['s']) > 50) die("Tooooo long get out!!!");
    $s = $challenge . $_POST['s'];
    $hashed = hash("sha512", $s);
    if ($hashed[0] == "0" && $hashed[1] == "0" && $hashed[2] == "0") {
      die($_ENV['FLAG']);
    } else {
      die("Wrooooooooooong!!!");
    }
  }

  $description = toHtmlEntityTroll("To get flag, please find a string such that SHA512(\"$challenge\" + <user_input>) have the 3 bytes of zero at the start. Warning: server will reset every 2 minutes.");
  echo $description;
?>

<form method="POST">
  <input type="text" name="s">
  <input type="submit" value="Submit">
</form>
