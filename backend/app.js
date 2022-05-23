
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

require ("dotenv").config();

//swagger dependencies
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')

//setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml')
//create out express app
const app = express()

//Handle CORS + middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); //If using .fetch not axios
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-Width, Content-Type, Accept");
    next();
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition))


// database stuff
const uri = "mongodb+srv://dbuser:W1x0nMani12@cluster0.hvicc.mongodb.net/db_management_tool?retryWrites=true&w=majority"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected")
})
.catch(err=> console.log(err))

app.use(bodyParser.json())

//routes
// app.get("/", (res, req) => {
//     res.send("Home page")
// })

const ProjectsRoute = require ('./routes/Projects');
app.use('/projects', ProjectsRoute)
const UsersRoute = require ('./routes/Users');
app.use('/users', UsersRoute)
const TasksRoute = require ('./routes/Tasks');
app.use('/tasks', TasksRoute)
const AuthRoute = require ('./routes/auth');
app.use('/user', AuthRoute)


//start server, 8080 is used by vue
const PORT = process.env.PORT || 3000;
const SECRET = process.env.TOKEN_SECRET;

app.listen(PORT, function() {
    console.log("Server is running on port: " +PORT);
    console.log("Server secret: " +SECRET);
})