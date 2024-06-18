const exp = require('express');
const authorApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const TokenVerify = require('../middlewares/TokenVerify');
let authorCollection, articles;

authorApp.use((req, res, next) => {
    authorCollection = req.app.get('authorCollection');
    articles = req.app.get('articles');
    next();
});

// Author register
authorApp.post('/author', expressAsyncHandler(async (req, res, next) => {
    const newAuthor = req.body;
    const dbauthor = await authorCollection.findOne({ username: newAuthor.username });

    if (dbauthor !== null) {
        res.send({ message: "Author name already exists" });
    } else {
        let hashedPassword = await bcryptjs.hash(newAuthor.password, 6);
        newAuthor.password = hashedPassword;
        await authorCollection.insertOne(newAuthor);
        res.send({ message: "Author created" });
    }
}));

// Author login
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const authorCred = req.body;
    const dbauthor = await authorCollection.findOne({ username: authorCred.username });
    if (dbauthor == null) {
        res.send({ message: "Invalid authorname" });
    } else {
        const status = await bcryptjs.compare(authorCred.password, dbauthor.password);
        if (status == false) {
            res.send({ message: "Invalid password" });
        } else {
            const signedToken = jwt.sign({ username: dbauthor.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login done!", token: signedToken, user: dbauthor });
        }
    }
}));

// Adding new article by author
authorApp.post('/articles', TokenVerify, expressAsyncHandler(async (req, res) => {
    const newArticle = req.body;
    await articles.insertOne(newArticle);
    res.send({ message: "new article added", payload: newArticle });
}));

// Modifying article
authorApp.put('/articles', TokenVerify, expressAsyncHandler(async (req, res) => {
    const updatedArticle = req.body;
    await articles.updateOne({ articleId: updatedArticle.articleId }, { $set: updatedArticle });
    let latestArticle=await articles.findOne({})
    res.send({ message: "Article updated",article:latestArticle });
}));

// Soft delete (update operation)
authorApp.put('/articles/:articleId', TokenVerify, expressAsyncHandler(async (req, res) => {
    const idFromUrl = req.params.articleId;
    const ArticleToDelete = req.body;

    try {
        let modifiedArticle;
        if (ArticleToDelete.status === true) {
            modifiedArticle = await articles.findOneAndUpdate(
                { articleId: idFromUrl },
                { $set: { status: false } },
                { returnDocument: "after" }
            );
            res.send({ message: "Article deleted", payload: modifiedArticle });
        } else if (ArticleToDelete.status === false) {
            modifiedArticle = await articles.findOneAndUpdate(
                { articleId: idFromUrl },
                { $set: { status: true } },
                
                { returnDocument: "after" }
            );
            res.send({ message: "Article restored", payload: modifiedArticle });
        } else {
            res.status(400).send({ message: "Invalid request body" });
        }
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).send({ message: "Error updating article" });
    }
}));




// Read articles of author
authorApp.get('/articles/:username', TokenVerify, expressAsyncHandler(async (req, res) => {
    const usernameFromUrl = req.params.username;
    //console.log(usernameFromUrl)
    try {
        const articlesList = await articles.find({ status: true, username: usernameFromUrl }).toArray();
        //console.log(articlesList)
        res.send({ message: "Articles", payload: articlesList });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send({ message: "Error fetching articles" });
    }
}));

module.exports = authorApp;
