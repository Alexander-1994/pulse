<?php 

$name = $_POST['name'];							 	  // берется инпут, у которого атрибут name = 'name' и его значение помещается в переменную $name
$phone = $_POST['phone'];							  // берется инпут, у которого атрибут name = 'phone' и его значение помещается в переменную $phone
$email = $_POST['email'];							  // берется инпут, у которого атрибут name = 'email' и его значение помещается в переменную $email

require_once('phpmailer/PHPMailerAutoload.php');	  // здесь идет запуск php-скрипта
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                              // Enable verbose debug output


// "этот скрипт возьмёт нашу почту, залогинится и как-будто от неё будет отправлять письма на сервер с данными пользователей из отправленых форм с сайта"


// настройки скрипта:
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  					  // ОБЯЗАТЕЛЬНОЕ ПОЛЕ. SMTP server почтового ресурса, коророго мы будем использовать
$mail->SMTPAuth = true;                               // выполнится вход в почту при помощи аккаунта
$mail->Username = 'web01return@gmail.com';            // ОБЯЗАТЕЛЬНОЕ ПОЛЕ. Наш логин
$mail->Password = 'xraybvelhgfycdby';                 // ОБЯЗАТЕЛЬНОЕ ПОЛЕ. Наш пароль от приложения
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('web01return@gmail.com', 'Pulse'); 	  // От кого письмо (как вариант: host(дублируем значение)|наименование ресурса)
$mail->addAddress('sanya_win01@icloud.com'); 		  // КУДА будет приходить это письмо (почта)
//$mail->addAddress('ellen@example.com');             // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');       // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');  // Optional name
$mail->isHTML(true);                                  // Письмо придет в формате HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>