const cds = require("@sap/cds");
const AIAgent = require("./AIAgentController")

class ProcessController {
    constructor() {
      this.AIAgent = new AIAgent();
    }

    //procesar archivo
    async procesarArchivo(file, tracking_id) {
    
            //tendremos que recibir el archivo? Preguntar en que formato viene, base64? o como un file.

            
            let re = await this.AIAgent.generarResumen(file);

            console.log(re);


            //segun tipo de archivo procederemos a leer el contenido del archivo

            //con el contenido del doc vamos a consumir controlador para obtener resumen

            //debemos guardar resumen en la base de datos



    }

}

module.exports = ProcessController;