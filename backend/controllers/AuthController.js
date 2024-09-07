import { User } from "../models/Database.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export class AuthController {
  static async checkCredentials(req, res){
    let user = await User.findOne({ where: {userName: req.body.usr}});
    if (!user || !(await bcrypt.compare(req.body.pwd, user.password))){
      return false
    }
    return true;
  }
  
  static async saveUser(req, res){
    const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
    let user = new User({
      userName: req.body.usr, 
      password: hashedPassword
    });
    return user.save();
  }

  static issueToken(username){
    return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
  }

  static isTokenValid(token, callback){
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }
}