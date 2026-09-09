import express from "express";
import cors from "cors";

const app = express(); // setup api
const port = 8000; // port number

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

const findAllUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    );
}

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const deleteUser = (id) => {
    let index = users["users_list"].findIndex((user) => user["id"] === id);
    if (index === -1) return undefined;
    return users["users_list"].splice(index, 1)[0];
}


////////// SETUP //////////

app.use(cors());
app.use(express.json());

////////// GET //////////

app.get("/", (req, res) => { // HTTP GET request
    // main page
    res.send("Hello, world!!!!");
});

app.get("/users", (req, res) => { // /users?name=Name&job=Job
    // sends list of users, filtered by a query if given one
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined) {
        let result = (job != undefined) ? findAllUsersByNameAndJob(name, job) : findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => { // /users/idValue
    // direct endpoint for resource
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
    // add a user to the users list with a POST HTTP request
    const userToAdd = req.body; // access incoming data in request
    addUser(userToAdd);
    res.status(201).send();
})


////////// DELETE //////////

app.delete("/users/:id", (req, res) => { // curl -X DELETE http://localhost:8000/users/abc123
    // delete a user from the users list if it exists
    const id = req.params["id"];
    let result = deleteUser(id);
    if (result === undefined) {
        res.status(404).send("Resource not found. Cannot delete.");
    } else {
        res.status(204).send();
    }
})


////////// listen //////////

app.listen(port, () => { // listen to HTTP requests on this port
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});