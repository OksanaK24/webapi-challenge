const express = require("express");
const helmet = require("helmet");
const projectRouter = require("./routers/projectRouter");

const server = express()

server.use(helmet())

server.use(express.json())

server.get("/", (req, res) => {
    res.send("<h2>Welcome to this Sprint</h2>")
  })

server.use("/api/projects", projectRouter)

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "An internal error occurred, please try again later",
	})
})

const host = "127.0.0.1"
const port = 8080

server.listen(port, host, () => {
	console.log(`Running at http://${host}:${port}`)
})