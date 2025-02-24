
const loginAdmin = (req , res) => {
    const {email , password} = req.body;
    try {
        if(email==='foodies.0905@gmail.com' && password==='foodies@09'){
            return res.status(200).json({success: true , message: "Admin Login"})
        }
        else{
            return res.status(401).json({success: false , message: "Invalid Credentials"});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({success: false , message: "Error"});  
    }
}

export { loginAdmin };