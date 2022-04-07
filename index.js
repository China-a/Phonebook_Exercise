let express = require("express")
let entries = express()
let moment = require("moment")
let morgan = require("morgan");

entries.use(express.json())

// const requestLogger = (request, response, next) => {
//     // console.log('Method:', request.method)
//     // console.log('Path:  ', request.path)
//     // console.log('Body:  ', request.body)
//     // console.log('---')
//     next()
//   }
//   entries.use(requestLogger)
morgan.token('sameline', (request) => {
    if (request.method == 'POST') return ' ' + JSON.stringify(request.body);
    else return ' ';
  });
  entries.use(morgan(":method :url :status :res[content-length] - :response-time ms :sameline"))
//   morgan('tiny')

// morgan(function (tokens, req, res) {
//     return [
//     //   tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//   })
//
// morgan.token ("sameline", function (req) {
//     return JSON.stringify(req.body)
//   })
  

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
    let body = request.body;
  
let person = {
        name: body.name,
        phone: body.phone,
        date: new Date(),
        id: generateId(),
      };
    if (!body.name || !body.phone ) {
        return response.status(400).json({
          error: "Must have name or phone number",
        });
      } if (body.name === body.name) {
        return response.status(400).json({
            error: "Name must be unique",
      })
    }
    
      persons = persons.concat(person);
    
      response.json(person);
    });

// let unknownEndpoint = (request, response) => {
//         response.status(404).send({ error: 'unknown endpoint' })
//       }
      
// entries.use(unknownEndpoint)

const PORT = 3001
entries.listen(PORT)
console.log(`Server running on port ${PORT}`)