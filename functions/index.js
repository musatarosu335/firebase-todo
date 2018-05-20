const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);
// Expressのインスタンス化と、CORSモジュールのロード
const app = express();
app.use(cors);

/* ==================================
RESTful API
================================== */
// Todo一覧取得
app.get('/todos', (req, res) => {
  const db = admin.firestore();
  const todos = [];

  db.collection('todos').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const todo = doc.data();
        todos.push(todo);
      });
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send({ todos });
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
      res.send(err);
    });
});

// RESTful API を利用
exports.v1 = functions.https.onRequest(app);
