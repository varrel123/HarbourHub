import express from "express";

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    if(req.user){
        res.send(req.user);and
    }else{
        res.send('Not logged in');
    }
    //res.json({ message: 'Welcome to the mm backend' }); 
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
