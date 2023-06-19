const { json } = require("express")
const http = require("http")

const Users = [
    {
        name: "Abhishek",
        age: 20
    },
    {
        name: "jyant",
        age: 28
    },
    {
        name: "Kishore",
        age: 25
    }
]

const server = http.createServer(function (request, response) {

    const paths = request.url.split("/")
    console.log("methods---", request.method)

    // GET Method

    if (request.method === "GET" && paths[1] === "users" && paths.length === 2) {
        response.write(JSON.stringify(Users))
    }

    // POST Method
    else if (request.method === "POST" && paths[1] === "users") {

        let data = ""
        request.on("data", function (chunk) {
            data += chunk
        })
        request.on("end", function () {
            const obj = JSON.parse(data.toString())
            Users.push(obj)
        })

        response.statusCode = 201
        response.write("User data created.")
    }

    // PUT Method
    else if (request.method === "PUT" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        let data = ""
        console.log(Users[idx])

        if (Users[idx]) {
            request.on("data", function (chunk) {
                data += chunk
            })
            request.on("end", function () {
                const obj = JSON.parse(data.toString())
                // Users[idx].name = obj.name
                // Users[idx].age = obj.age
                Users[idx] = {
                    ...Users[idx],
                    ...obj
                }
            })

            response.write("User Updated Suceessfully.")
        }
        else {
            response.write("User Not Found")
        }

    }

    // DELETE Method
    else if (request.method === "DELETE" && paths[1] === "users" && paths[2]) {
        const name = paths[2]
        const idx = Users.findIndex(element => element.name.toLowerCase() === name.toLowerCase())
        if (idx === -1) {
            response.write("User not found.")
        }
        else {
            Users.splice(idx, 1)
            response.write("User deleted Successfully")
        }

    }

    else if (request.method === "GET" && paths[1] === "users" && paths[2]) {
        const idx = paths[2]
        const user = Users[idx]
        if (user) {
            response.write(JSON.stringify(user))
        }
        else {
            response.write("Not Found")
        }
    }

    else {
        response.write("Not Found")
    }

    response.end()
})

server.listen(3000, function () {
    console.log("Server id running on port number 3000")
})