import express from 'express';

const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
//controllers 
import { register , login} from '../controllers/auth';

router.post("/register", register);
router.post("/login",jsonParser, login);

module.exports = router;