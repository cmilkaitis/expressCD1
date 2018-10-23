const express = require("express");
const app = express();
const bp = require("body-parser");
const path = require("path");

const port = 8080;

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ msg: "Working" });
});

// Create a get route that displays your personal name
app.get("/name/", (req, res) => {
  res.send("Chris Milkaitis");
});

// Create a dynamic route that says something using the parameter
app.get("/input/:input", (req, res) => {
  res.send(req.params.input);
});

// Create a dynamic route a word and should spell the word back one line at a time
app.get("/word/:word", (req, res) => {
  let word = req.params.word;
  let split_word = word.split("");

  res.writeHead(200, { "Content-Type": "text/html" });

  split_word.forEach(letter => {
    res.write(`${letter} <br>`);
  });
  res.end();
});

/* Create a post route that accepts a username and password. in your route have a static user name and password and then check to see if the username and password send match. if they match send a json with a status of "logged in" or respond with a json that has a status of "invalid credentials" */
let users = [
  {
    username: "testuser1",
    password: "testpassword"
  }
];
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  users.forEach(user => {
    if (user.username === username && user.password === password) {
      res.send("Logged In");
    } else {
      res.send("Invaild credentials");
    }
  });
});

/* Final item
in your server.js file create a global variable array. you can fill this with random strings to start if you like.
Create a post request that has an item attribute. Add the item to the array.
create a delete request (works like post) that has an item attribute. remove the item from the array.

the routes should respond back with an error if the user tries to add an item that already exists in the array
the routes should respond back with an error if the item does not exist in the array.

extra credit. Find out how to respond with the correct http status code for the two errors.
 */
let id_count = 4;
let items = [
  {
    id: 0,
    content: "Random words"
  },
  {
    id: 1,
    content: "Is this a todo list?"
  },
  {
    id: 2,
    content: "Maybe it is"
  },
  {
    id: 3,
    content: "Maybe it isnt"
  }
];

app.get("/add", (req, res) => {
  res.render("add", {
    title: "Items",
    items
  });
});

app.post("/add", (req, res) => {
  let item = req.body.item;
  console.log(items.indexOf(item));
  if (items.indexOf(item) !== -1) {
    return res.json({ error: "item already exists" });
  }
  items.push({ id: id_count, content: item });
  id_count++;

  res.redirect("/add");
});

app.delete("/add/:id", (req, res) => {
  let id = req.params.id;
  res.send("hello");
});

app.listen(port, console.log(`Listening on ${port}`));
