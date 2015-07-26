<?php 
$myemail = 'secretary@ieeecs.ece.utexas.edu';//<-----Put Your email address here.

$name = $_POST['name']; 
$company = $_POST['company'];
$email_address = $_POST['email']; 
$message = $_POST['message']; 
$packet = $_POST['packet'];

	$to = $myemail; 
	$email_subject = "Corporate Contact Form: $name";
	$email_body = "\n
    Name: $name \n 
    Company: $company \n
    Email: $email_address \n 
    Message:\n
        $message \n
    Receive Corporate Packet?: $packet"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	mail($to,$email_subject,$email_body,$headers);

	//redirect to the 'thank you' page
	header('Location: thank-you.html');

?>

</body>
</html>
$errors = '';

if(empty($_POST['name'])  || 
   empty($_POST['company'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}