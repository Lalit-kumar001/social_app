const Client = require('../modals/signup');
const Post = require('../modals/Post');
const JWT = require('jsonwebtoken');
module.exports.signup = function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
        console.log('password should be equal to confirm password');
        return res.status(200).send({
            success: false,
            message: 'Password and confirm password should be equal',
        });
    }

    Client.findOne({ email: req.body.email }).then(async (user) => {
        if (!user) {
            try {
            Client.uploadedAvatar(req,res,async function(err){
                if(err){
                    console.log('Error in signup')
                }
                         // Hash the password
                         console.log(req.body)
        const hashedPassword = await hashPassword(req.body.password);
        const hashedConfirmPassword = await hashPassword(req.body.confirmpassword);
        const {firstname,lastname,email,zip,city,confirmpassword}=req.body
        // Save the new user

        const newUser = await new Client({firstname,lastname,email,password:hashedPassword,zip,city,confirm_password:hashedConfirmPassword,avatar:Client.avatarPath+'/'+req.file.filename}).save();

                // const newUser = await Client.create(req.body);
                console.log('success', newUser);
                return res.status(200).send({
                    success: true,
                    message: 'Successfully registered',
                });
            })
        
            } catch (error) {
                console.error('Error:', error);
                return res.status(500).send({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
            });
        }
    });
};


// ==============================================login controller ====================================================
const { hashPassword, comparePassword } = require('../helper/authHelper');
// const { use } = require('../routes/user');

module.exports.loginController = async function (req, res) {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: " user or password is Missing",
            });
        }

        const user = await Client.findOne({ email:req.body.email });
        console.log('user:',user);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid user or password",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = await JWT.sign({ _id: user._id }, 'ghvghghvg', { expiresIn: '5d' });
        console.log(token)
        const userData ={
            'name':user.firstname,
            'avatar':user.avatar,
            '_id': user._id,
        }
        return res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            userData,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};




// create-post-controller 

module.exports.createPost= async function(req,res){
    try{ 
        // console.log(req.headers)
        Post.uploadPost(req,res,async function(err){
            if(err){
                console.log('error occur')
            }
            const {description,caption}=req.body;

            // signup me id fetch karni hai user ki fir post create karni hai 
            // req.file.filename jo multer ke middle ware me naam rakha hai wo aata hai 
             // creating a new postt
            const newPost = await new Post({description,caption,signup:req.user._id,image:Post.postPath+'/'+req.file.filename}).save()
            // console.log(newPost);
            // console.log('success', newPost);
                return res.status(200).send({
                    success: true,
                    message: 'post created successfully',
                });
        })
    }

catch(err){
console.log('Error occur')
}
}


// posts  controller
// const Post = require('../models/Post'); // Import the Post model if not already imported

module.exports.posts = async function (req, res) {
    try {
        const posts = await Post.find({}).populate('signup').exec();

        return res.status(200).send({
            success: true,
            message: 'Posts retrieved successfully',
            posts: posts
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

 