const cds = require("@sap/cds");
const AIAgent = require("./AIAgentController")

class ProcessController {
    constructor() {
    
    }

    //procesar archivo
    async procesarDocumento(header, files, trackingId) {
    
            //tendremos que recibir el archivo? Preguntar en que formato viene, base64? o como un file.
            //recorrer files para procesar cada archivo por separado.
            //ver que tipo de agente se debe instanciar
            //ver que tipo de archivo es y que controlador usar para leer contenido

            //ejecutar controlador de agente para pedir resumen


            //despues de loop, instanciar controlador para ejecutar resumen final y guardar en registro en tabla hana

            this.AIAgent = new AIAgent("tipoFile");
            let re = await this.AIAgent.generarResumen(file);

            console.log(re);



    }

}

module.exports = ProcessController;