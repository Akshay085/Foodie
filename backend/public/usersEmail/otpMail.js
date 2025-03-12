const otpMail = 
`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>Use the OTP below to reset your password. This OTP is valid for 5 minutes.</p>
        <div class="otp">{{otp}}</div>
        <p>If you didn't request a password reset, please ignore this email.</p>
    </div>
</body>
</html>`

export { otpMail }