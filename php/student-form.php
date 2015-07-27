/* Created by Jenny Plunkett on 2015-07-25 */

<?php 
    $myemail = 'secretary@ieeecs.ece.utexas.edu';

    $name = $_POST['name']; 
    $EID = $_POST['EID'];
    $email_address = $_POST['email']; 
    $classification = $_POST['classification'];
    $message = $_POST['message']; 
    $role = $_POST['role'];
    $availability = $_POST['availability'];

	$to = $myemail; 
	$email_subject = "Student Contact Form: $name";
	$email_body = "\n
    Name: $name \n 
    UT EID: $EID \n
    Email: $email_address \n 
    Student Classification: $classification \n
    Message:\n
        $email_body \n
    Role Interested In: $role \n
    Availability: $availability \n";

	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";

	mail($to,$email_subject,$email_body,$headers);

	//redirect to the 'thank you' page
	header('Location: /thank-you.html');

?>