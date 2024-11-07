import express,{json} from  'express';
import cors from 'cors'
import routes from  './routes/index.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import  session from 'express-session';
import morgan from 'morgan';
import './controllers/authGoogleController.js';  // Asegúrate de que se configure passport
import  './controllers/authFacebookController.js';  // Asegúrate de que se configure passport
import  './controllers/authTwitterController.js'; 
import   './controllers/authGithubController.js'; 
import  './controllers/loginController.js'; // Asegúrate de que se configure passport



    
const app =  express();


app.use(session({
    secret:'victorcamacaro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambia a true en producción con HTTPS
    
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(cors({
  origin: 'http://localhost:5173', // Allow only this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));


app.use(morgan('dev'));  // 'dev' es para formato de desarrollo

app.disable('x-powered-by')

app.use(cookieParser());

app.use(json())

app.use(routes)


// Middleware para manejar rutas no definidas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });
  
  // Middleware para manejar errores generales
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  });
  


const PORT = process.env.PORT ?? 3009


app.listen(PORT,()=>{
console.log(`Server running on  ${PORT}`)
})
