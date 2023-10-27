const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const MemoryStore = require('session-memory-store')(session); // Impor MemoryStore
const app = express();
const HBService = require('./src/Services/hb.services');


// Konfigurasi store
const store = new MemoryStore();

const corsOptions = {
    origin: '*',
    Credentials: true,
    optionsSuccessStatus: 200
};

app.use(session({
    secret: 'secret',
    resave: false,
    cookie: {maxAge: 6000000},
    saveUninitialized: false,
    store
    }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if(req.user){
        res.send(req.user);and
    }else{
        res.send('Not logged in');
    }
    //res.json({ message: 'Welcome to the mm backend' }); 
});

                
              //Controller//

app.get('/check_all_account', (req, res) => {
    HBService.checkAllAccounts((err, accounts) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ accounts });
      }
    });
  });

  app.post('/login_fisherman', (req, res) => {
    const { Email, Password } = req.body;
  
    HBService.loginFisherman({ Email, Password }, (err, fishermanAccount) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (fishermanAccount) {
        res.json({ message: 'Login berhasil', fishermanAccount });
      } else {
        res.json({ message: 'Login gagal, akun tidak ditemukan atau password tidak sesuai.' });
      }
    });
  });
  
  app.post('/login_traders', (req, res) => {
    const { Email, Password } = req.body;
  
    HBService.loginTraders({ Email, Password }, (err, tradersAccount) => {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (tradersAccount) {
        res.json({ message: 'Login berhasil', tradersAccount });
      } else {
        res.json({ message: 'Login gagal, akun tidak ditemukan atau password tidak sesuai.' });
      }
    });
  });


  
////////////////
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
