// Dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// creates random ID for note
var ID = function () {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 9)
    );
};

// Routes
// If no matching route is found default to home
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    var db = fs.readFileSync("./db/db.json", "utf8");
    return res.json(JSON.parse(db));
})

//create the array to save all notes
var notesArray = [];

// recieve a new note to save on the request body, add it to the db.json file...  
// and then return the new note to the client.
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = ID();

    var data = fs.readFileSync("./db/db.json", "utf8");
    notesArray = JSON.parse(data);

    notesArray.push(newNote);
    var noteJSON = JSON.stringify(notesArray);

    fs.writeFile("./db/db.json", noteJSON, "utf8", err => {
        if (err) throw err;
    });
});

// When thetrashcan icon is clicked...
// Deletes the targeted note by the object's id in the db json file after a user deletes a note.
app.delete("/api/notes/:id", function (req, res) {
    var deleteNote = req.params.id;

    notesArray = notesArray.filter(function (note) {
        return note.id != deleteNote;
    });
    console.log(notesArray);
    var deletedNotes = JSON.stringify(notesArray);

    fs.writeFileSync("./db/db.json", deletedNotes, "utf8", err => {
        if (err) throw err;
    });

})

// Starts the server to begin listening
// ==============================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});