const { v4: uuidv4 } = require('uuid');

class Helpers {
    constructor() {
      //cargar settings agente
    }

    async generateTrackingId() {
        return uuidv4();
    }



}

module.exports = Helpers;
