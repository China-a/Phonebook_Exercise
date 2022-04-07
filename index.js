let express = require("express")
let entries = express()
let moment = require("moment-timezone")

entries.use(express.json())

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


entries.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

entries.get("/api/info", (request,response) => {
    let info = ('Phonebook has info for ' + persons.length + ' people' + '</br>' + moment().format('dddd, MMMM Do, YYYY, h:mm:ss a') )
    response.send(info)
})

entries.get('/api/persons', (request, response) => {
    response.json(persons)
  })

entries.get("/api/persons/:id", (request, response) => {
    let id = Number(request.params.id);
    let person = persons.find((person) => person.id === id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });

  entries.delete("/api/persons/:id", (request, response) => {
    let id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
  
    response.status(204).end();
  });

  entries.post("/api/persons", (request, response) => {
    let person = request.body;
    console.log(person);
    response.json(person);
  });

  let generateId = () => {
    let maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    return maxId + 1;
  };
  
 entries.post("/api/persons", (request, response) => {
    let error = request.body;
  
if (!error.body) {
      return response.status(400).json({
        error: "Must have name and phone number",
      });
    }
let person = {
        name: body.name,
        phone: body.important || false,
        date: new Date(),
        id: generateId(),
      };
    
      persons = persons.concat(person);
    
      response.json(person);
    });

const PORT = 3001
entries.listen(PORT)
console.log(`Server running on port ${PORT}`)