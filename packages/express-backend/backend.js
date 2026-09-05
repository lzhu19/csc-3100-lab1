import express from "express";

const app = express();
const port = 8000;

const users = {
    users_list : [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
}

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
}

const findUserById = (id) => users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}


////////// GET //////////

app.use(express.json());

app.get("/", (req, res) => { // HTTP GET request
    res.send("Hello, world!!!!");
});

app.get("/users", (req, res) => { // /users?name=Name
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => { // /users/idValue
    const id = req.params["id"]; // or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});


////////// POST //////////
/* Example of curl POST HTTP request:
 * curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "age": 30}' https://example.com */

app.post("/users", (req, res) => {
    const userToAdd = req.body; // access incoming data in request
    addUser(userToAdd);
    res.send();
})


////////// listen//////////

app.listen(port, () => { // listen to HTTP requests on this port
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});