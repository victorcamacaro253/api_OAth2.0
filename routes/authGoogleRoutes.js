import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)


router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req,res)=>{
        res.redirect('http://localhost:5173/profile')
    }
)

// Ruta para obtener los datos del usuario autenticado
router.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Enviar los datos del usuario si está autenticado
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
});


router.get('/profile',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/')
    }
    res.json({
        user:req.user
        

    })
})


router.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  });

  export default router