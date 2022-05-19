const express = require('express');   //EXPRESS
const jwt = require('jsonwebtoken');  //JWT Token

const app = express();                //app variable

// path for the api.
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'    //Welcome msg
  });
});

// api post path
app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403); 
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

//api login path.
app.post('/api/login', (req, res) => {
  // Test user
  const user = {
    id: 1, 
    username: 'aliyan',
    email: 'aliyan@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden error msg
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));
