import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: "Name is required"
    },
    email:{
        type: String,
        trim: true,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {}
}, {timestamps: true});
// Password is Hashed while saving user 
 userSchema.pre("save", function(next) {
    let user = this;
    if(user.isModified('password')) {
        return bcrypt.hash(user.password, 12, function(err, hash){
            console.log("user.password: ", user.password)
            if(err) {
                console.error("BCRYPT HASH ERR",err);
                return next(err);
            }
            user.password = hash;
            return next();
        });
    } else {
        return next();
    }
 });

userSchema.methods.comarePassword = function (password, next) {
    bcrypt.compare(password, this.password, function(err, match) {
        console.log("passwordzzzz: ",password);
        if(err) {
            console.log('COMPARE PASSWORD ERROR', err);
            return next(err, false); 
        }
        // if no error, we'll get null
        console.log("MATCH PASSWORD", match);
        return next(null, match); // true
    })
} 


export default mongoose.model("User", userSchema);