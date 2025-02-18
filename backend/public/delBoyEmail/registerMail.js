const registerMail = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gmail</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .body-upper{
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #4285F4;
        }
        h2 {
            color: tomato;
            margin-top: 10px;
        }
        
        .message {
            color: #333;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .body-lower {
            padding: 2%;
        }
       
    </style>
</head>
<body>
    <div class="container">
        <div class="body-upper">
            <div class="logo-mail">
                <p>foodies.0905@gmail.com</p>
            </div>
        </div>
        <hr>
        <div class="body-lower">
            <div class="message">
            <h4>
            Dear {{name}},<br><br>
            Congratulations! Your registration with FOODIES has been successfully completed. We are excited to have you on board as a valued member of our delivery team.<br><br>

            What’s Next?<br>
            Our team will review your details and activate your profile shortly.<br>
            You will receive further instructions regarding your deliveries, schedules, and app usage soon.<br>
            If you have any questions, feel free to reach out to our support team at foodies.0905@gmail.com.<br>
            We look forward to working with you and ensuring a smooth and rewarding delivery experience.<br><br>

            Best regards,<br>
            FOODIES
        </h4>    
        </div>
        </div>
    </div>
</body>
</html>`


export {registerMail}