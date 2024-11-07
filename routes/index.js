import { Router } from "express";
import authGoogle from './authGoogleRoutes.js';
import authFacebook from  './authFacebookRoutes.js';
import authTwitter from './authTwitterRoutes.js';
import authGithub from './authGithubRoutes.js'

const  router = Router();


router.use(authGoogle)

router.use(authFacebook)

router.use(authTwitter)

router.use(authGithub)


export default router;
