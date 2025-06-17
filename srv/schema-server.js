const cds = require("@sap/cds");
const AIAgent = require("./controllers/AIAgentController")
const Proceso = require("./controllers/ProcessController")
const Helpers = require("./helpers/Helpers")

module.exports = cds.service.impl(async (srv) => {


    srv.on("uploadDocumento", async (req) => {

            const pro = new Proceso();
            const help = new Helpers();

            const header = req.data.HeaderData;
            const files = req.data.Files;

            const trackingId = help.generateTrackingId();

            Promise.resolve().then(async () => {
                await pro.procesarDocumento(header, files, trackingId);
            });

            // Responder inmediatamente
            return { 
                message: "Documento recibido exitosamente",
                trackingId: trackingId 
            };
        
    });


});