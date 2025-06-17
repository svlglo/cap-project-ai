namespace meli.index.test.db;

using {cuid, managed} from '@sap/cds/common';

type FileData {
    tipo_doc: TipoDoc;
    mimeType: String;
    content: String //podria ser base64 o binario
}

type HeaderData {
    id_sap: String;
    type_documento: String;
    created_by: String;
    created_date : Date
}

type TipoDoc  : String enum {
  OrdenCompra;
  Contrato;
  DocFinanciero;
}

//documento creado en esquema
entity Documento: cuid, managed {
    id_sap              : String;  
    resume             : String;
    settings_llm      : Association to one Settings;
    prompt : Association to one PromptSettings;
    tracking_id: UUID;
}

//almacenar los archivos asociados al documento, aqui estara en resumen por archivo
entity File: cuid, managed {
    id_sap              : String;  
    documento      : Association to one Documento;
    tipo_doc : TipoDoc;
    mimeType : String;
    resume : LargeString;
}

//almacenar datos de configuracion del llm
entity Settings : cuid, managed {
  resume : Association to Documento;
  llmName      : String;
  textContent : LargeString;
}    

//Manejar el prompt 
entity PromptSettings : cuid, managed{
    prompt : LargeString;
}

//indicar palabras claves que debe tener el prompt para buscar en cada documento
entity KeyWords : cuid, managed{
    word : String;
}