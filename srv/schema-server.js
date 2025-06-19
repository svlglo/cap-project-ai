import cds from '@sap/cds';
import AIAgent from './controllers/AIAgentController.js';
import Proceso from './controllers/ProcessController.js';
import Helpers from './helpers/Helpers.js';

export default cds.service.impl(async (srv) => {


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
