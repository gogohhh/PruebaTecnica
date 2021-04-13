const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

//Configuraciones
app.set('port', process.env.PORT || 4000);

//MIDDLEWARE PARA BODYPARSER, LOS MIDDLEWARE SON FUNCIONES QUE SE UTILIZAN EN EL ENTORNO DE TRABAJO
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }));

//parse application/json
app.use(bodyParser.json({ limit:'10mb', extended: true }));

//ESQUEMA PARA EL MODELO CONECTOR A MONGODB
let esquema = mongoose.Schema;

let ticketsEsquema = new esquema({
    tickettype: {
        type: String,
        require: ["type of ticked is required"]
    },
    createon:{
        type: Date,
        require: false
    },
    priority:{
        type: String,
        require: false
    },
    assigned_to:{
        type: String,
        require: false
    },
    status:{
        type: String,
        require: false
    }

})

const Tickets = mongoose.model("tickets", ticketsEsquema);

//PETICIONES
app.get('/', (req, res)=>{

    ticketsEsquema.find({

    }).exec((err, data)=>{
        if(err){
            return res.json({
                status:500,
                mensaje: "Error en la peticion"
            })
        }

        res.json({
            status:200,
            data
        })


    })
    
});


//CONEXION A LA BASE DE DATOS
mongoose.connect('mongodb://localhost:27017/tickets', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, 
    (error, resp)=>{
        if(error) throw error;

        console.log("Conectado a la base de datos Tickets");
    }
);

//SALIDA DEL PUERTO
app.listen(4000, ()=>{
    console.log("Habilitado el puerto 4000");
})



