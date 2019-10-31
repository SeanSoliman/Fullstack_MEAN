const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

/* ============================== STEP 1 ==============================
   INSTALL MONGOOSE
   Install the Mongoose library using the Add Dependency button and 
   create a constant to hold the module using require("mongoose")
   ====================================================================*/

/* ============================== STEP 2 ==============================
   CONNECT TO THE DATABASE
   use mongoose's connect() method to make a connection to your MongoDB
   instance. Name the database "EmployeeApp" in the connection string.
   (See "Step 6 (Getting Your Connection String)": https://ilearn.laccd.edu/courses/84651/pages/module-8-registering-a-mongodb-atlas-account)
   (See "Making The Connection": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://cs463:cs463@cs463-f0twz.mongodb.net/EmployeeApp?retryWrites=true&w=majority",
  {
    //Options
    //new format string
    //need these flags/optins to use new format- compatibility

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

/* ============================== STEP 3 ==============================
   CREATE THE SCHEMA
   use mongoose's Schema method to create a schema for an employee document.
   The schema should have 4 fields with the data type of String for all.
   Make sure the name and email are required in the schema.

   name (String) (Required)
   email (String) (Required)
   address (String)
   phone (String)
   (See "Defining the Schema": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String }
});

/* ============================== STEP 4 ==============================
   CREATE THE MODEL
   Use mongooose's model method to create a Employee model. Name the 
   model "Employee"
   (See "Creating the Model": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/

const Employee = mongoose.model("Employee", employeeSchema);

/* ============================== STEP 5 ==============================
   INSERT
   Use the Employee model created in step 4 to create a new document
   based on the requests posted body object in the POST endpoint below.
   If the insert is successful return a status of 200 along with the new document object
   in the response. if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - CREATE": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/

app.post("/api/employees", (req, res) => {
  var newEmployee = new Employee({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  });

  newEmployee.save(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  });
  //res.status(404).send("Not Implemented");
});

/* ============================== STEP 6 ==============================
   READ ALL DOCUMENTS
   Use the Employee model created in step 4 to return all documents in
   the Employees collection. If the query is successful return a status
   of 200 along with the array of document objects in the response.
   if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - READ (all documents)": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/

app.get("/api/employees", (req, res) => {
  Employee.find().exec(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  });
  //res.status(404).send("Not Implemented");
});

/* ============================== STEP 7 ==============================
   READ A SINGLE DOCUMENT
   Use the Employee model created in step 4 to return a single document in
   the Employees collection. Use the id parameter in the URL to run the query.
   If the query is successful return a status of 200 along with the document object in the response.
   if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - READ (single document)": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/
app.get("/api/employees/:id", (req, res) => {
  //res.status(404).send("Not Implemented");
});

/* ============================== STEP 8 ==============================
   UPDATE A DOCUMENT
   Use the Employee model created in step 4 to update a single document in
   the Employees collection based on the requests body object. Use the id
   parameter in the URL to run the query. If the update is successful return
   a status of 200 along with the document object in the response.
   if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - UPDATE (findByIdAndUpdate)": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/
app.put("/api/employees/:id", (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      task: req.body.task
    },
    {
      new: true,
      runValidators: true
    },
    function(err, result) {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send(err);
      }
    }
  );
  //res.status(404).send("Not Implemented");
});

/* ============================== STEP 9 ==============================
   DELETE A DOCUMENT
   Use the Employee model created in step 4 to delete a single document in
   the Employees collection. Use the id parameter in the URL to run the query.
   If the delete is successful return a status of 200 along with the document object in the response.
   if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - DELETE (single document)": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/
app.delete("/api/employees/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id, function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  });
  //res.status(404).send("Not Implemented");
});

/* ============================== STEP 10 ==============================
   DELETE All DOCUMENT
   Use the Employee model created in step 4 to delete all documents in
   the Employees collection. If the delete is successful return a status of 200 along with an empty response.
   if there is an error, return a status of 500 along with the error.
   (See "CRUD with Mongoose - DELETE (all documents)": https://ilearn.laccd.edu/courses/84651/pages/module-8-introduction-to-mongodb-and-mongoose)
   ====================================================================*/
app.delete("/api/employees", (req, res) => {
  //res.status(404).send("Not Implemented");
});

app.listen(8080, () => console.log("server started"));
