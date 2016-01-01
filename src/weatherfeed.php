<?php
$access_token_array = file('weatherkey');
$access_token = trim($access_token_array[0]);
try {
  $insta_feed = file_get_contents("http://api.openweathermap.org/data/2.5/weather?zip=32820,us&appid=".$access_token."&units=imperial");
}catch (Exception $e) {
  header("HTTP/1.0 204 No Content");
}
echo $insta_feed;
