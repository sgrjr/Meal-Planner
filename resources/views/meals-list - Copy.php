<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
	<meta name="csrf-token" content="<?php echo $encrypted_csrf_token; ?>" />
    <title>Easy Eating</title>
	
	<!-- Auth0Lock script
	<script src="//cdn.auth0.com/js/lock-7.12.min.js"></script>
 -->
 
	<!-- Setting the right viewport -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		
	<link rel="stylesheet" type="text/css" href="styles/app.css">
	
  </head>
  <body>
    <div id="example"></div>	
	
	<script src="js/jquery.min.js"></script>
    <script src="js/react.js"></script>
    <script src="js/react-dom.min.js"></script>
    <script src="js/browser.min.js"></script>
	<script src="js/marked.min.js"></script>
	
	<script async type="text/babel" src="js/app.js"></script>
	
  </body>
</html>