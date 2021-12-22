# On-device SMS sending application

The purpose of this application is to send an SMS by using your mobile device from your PHP, Node or any application that can make an HTTP Request. I cannot consider this as a replacement for any SMS Api as this needs a lot of improvement and considering that this can be used within the same network only.

## Resources

[Apache Cordova - Android](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/index.html)

## PLUGINS

[Cordova Webserver](https://github.com/bykof/cordova-plugin-webserver)

[Cordova SMS Plugin](https://github.com/cordova-sms/cordova-sms-plugin)

## To Run

```bash

 #Install Cordova for windows globally
 > npm install -g cordova

 # Run application - (Platform: android or ios)
 > cordova run <platform>

```

## Sample Usage for PHP
```php
<?php
	$url = "http://<IPAddress>:8080?num=<number>&msg=";
	$data = urlencode("Hello World! This is a sample message for this application =>");
	echo json_decode(file_get_contents($url.$data));
?>
```
