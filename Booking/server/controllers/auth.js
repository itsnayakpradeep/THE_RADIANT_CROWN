import User from "../modules/user";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;
    //validation
    if(!name) return res.status(400).send('Name is requre');
    if(!password || password.length < 6)  
        return res
            .status(400)
            .send('Password is requre and should be min 6 characters long');
    let userExist = await User.findOne({email}).exec();
    if(userExist) return res.status(400).send("Email is alredy taken");
    //register
    const user = new User(req.body)
    try {
        await user.save();
        console.log('USER CREATED', user);
        return res.json({ ok: true });
    } catch (err) {
        console.log("CREATE USER FAILED",  err);
        return res.status(400).send('Error, Try again.')
    }
};

export const login =  async (req, res) => {
   // console.log(req.body);
    const { email, password } = req.body;
    console.log("Password: ", password);
    try {
        //check if the user that email exist
        let user =  await User.findOne({ email }).exec()
        console.log('USER EXIST', user);
        if(!user) res.status(400).send('User email not found');
        // compare password
        user.comarePassword(password, (err, match) => {
        console.log('COMPARE PASSWORD ', password);
        console.log("match", match)
        console.log('COMPARE PASSWORD IN LOGIN ERR ', err);
        if(match || err) return res.status(400).send("Wrong Password");
        console.log("GENERATE A TOKEN THEN SEND RESPONSE TO CLIENT");
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET , {
            expiresIn: "7d"
        });
        res.json({ 
            token, 
            user: {
            _id: user._id,
            name: user.name, 
            email: user.email, 
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, });
    });
    } catch(err) {
        console.log('LOGIN ERROR', err);
        res.status(400).send('Signin failed');
    }
}