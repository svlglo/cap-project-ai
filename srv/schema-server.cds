using { meli.index.test.db as db } from '../db/schema';

service Servicios {

    //compartir la info de cada resumen
    entity resumen as projection on db.Documento;

    //esta como funcion para testear desde navegador
    function uploadDocumento(header: db.HeaderData, files: array of db.FileData )       returns String;


}