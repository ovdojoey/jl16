<?php
$access_token_array = file('instakey');
$access_token = trim($access_token_array[0]);
try {
  $insta_feed = file_get_contents("https://api.instagram.com/v1/users/self/media/recent/?access_token=".$access_token."&count=13");
}catch (Exception $e) {
  header("HTTP/1.0 204 No Content"); 
}
echo $insta_feed;
