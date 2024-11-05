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



    
const app =  express();


app.use(session({
    secret:'victorcamacaro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambia a true en producción con HTTPS
    
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(cors())

app.use(morgan('dev'));  // 'dev' es para formato de desarrollo

app.disable('x-powered-by')

app.use(cookieParser());

app.use(json())

app.use(routes)


const PORT = process.env.PORT ?? 3009


app.listen(PORT,()=>{
console.log(`Server running on  ${PORT}`)
})
