import { Router } from "express";
import passport from "passport";

const router = Router();

 
// Ruta para iniciar sesión con Twitter
router.get('/auth/twitter', passport.authenticate('twitter'));

// Ruta de callback de Twitter
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    // Redirige al usuario a su perfil o a donde necesites
    res.redirect('/profile');
  }
);


export default router;