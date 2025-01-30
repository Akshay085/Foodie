const loginMail = 
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
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            
        }
        .body-upper{
            text-align: center;
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
            <div class="title">
                <p>{{name}} Thank you for login<br></p>
                <h2>🎉 Welcome to FOODIES! 🍽️</h2>
            </div>
            <div class="logo-mail">
                <p>foodies.0905@gmail.com</p>
            </div>
        </div>
        <hr>
        <div class="body-lower">
            <div class="message">
            <h4>
                Your LOGIN was successful! Hey there, fellow food lover! Whether you're here to discover mouthwatering foods, explore hidden foodie gems, or just indulge in delicious inspiration, you've come to the right place. At FOODIES, we celebrate the love of good food, great company, and unforgettable flavors.<br><br>

                So grab a seat, take a bite, and let's embark on this tasty journey together! 🍕🍰🥗<br><br>
                
                Bon appétit & happy exploring! 😋🎉</h4>    
        </div>
        </div>
    </div>
</body>
</html>`


export {loginMail}