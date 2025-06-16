const cds = require("@sap/cds");
const AIAgent = require("./controllers/AIAgentController")
const Proceso = require("./controllers/ProcessController")
const Helpers = require("./helpers/Helpers")

module.exports = cds.service.impl(async (srv) => {


    srv.on("uploadFile", async (req) => {

            const pro = new Proceso();


            const file = req.data.files[0];
            const trackingId = Helpers.generateTrackingId();
            // Iniciar procesamiento en background
            Promise.resolve().then(async () => {
                await pro.procesarArchivo(file, trackingId);
            });

            // Responder inmediatamente
            return { 
                message: "Archivo recibido exitosamente",
                trackingId: trackingId 
            };

            let { data } = req.data;

            let agente = new AIAgent();
            let response = agente.aitest();

            console.log(response);
        
    });


});