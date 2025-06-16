const cds = require("@sap/cds");
const AIAgent = require("./controllers/AIAgentController")
const Proceso = require("./controllers/ProcessController")
const Helpers = require("./helpers/Helpers")

module.exports = cds.service.impl(async (srv) => {


    srv.on("uploadFile", async (req) => {

            const pro = new Proceso();
            const help = new Helpers();

           // const file = req.data.files[0];
            const file = "este es un texto que se debe generar por resumen"
            const trackingId = help.generateTrackingId();


            Promise.resolve().then(async () => {
                await pro.procesarArchivo(file, trackingId);
            });

            // Responder inmediatamente
            return { 
                message: "Archivo recibido exitosamente",
                trackingId: trackingId 
            };

        
    });


});