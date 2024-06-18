const exp = require('express');
const app = exp();
require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const path=require('path')
//deplao react build in this server
app.use(exp.static(path.join(__dirname,'../client/build')))
// to parse body of the req
app.use(exp.json());

// import Api routes
const userApp = require('./Apis/user-api');
const adminApp = require('./Apis/admin-api');
const authorApp = require('./Apis/author-api');

// connect mongo client
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    const Blogdb = client.db('Blogdb');
    // get collections
    const blogusersCollection = Blogdb.collection('blogusersCollection');
    const articles = Blogdb.collection('articles');
    const authorCollection = Blogdb.collection('authorCollection');

    app.set('blogusersCollection', blogusersCollection);
    app.set('articles', articles);
    app.set('authorCollection', authorCollection);
    console.log("Database connection success");

    // start the server after successful DB connection
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

// if path starts with user-api send req to userApp
app.use('/user-api', userApp);
// if path starts with author-api send req to authorApp
app.use('/author-api', authorApp);
// if path starts with admin-api send req to adminApp
app.use('/admin-api', adminApp);

//For refreshing webpage and should kept always top of the error handler

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,'../client/build/index.html'))
})
// express error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An error occurred", error: err });
});
