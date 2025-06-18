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
    resume             : LargeString;
    prompt : LargeString;
    key_words : LargeString;
    tracking_id: UUID;
}

//almacenar los archivos asociados al documento, aqui estara en resumen por archivo
entity File: cuid, managed {
    id_sap              : String;  
    documento      : Association to one Documento;
    tipo_doc : TipoDoc;
    mimeType : String;
    resume : LargeString;
    prompt : String;
    key_words : String;
}



