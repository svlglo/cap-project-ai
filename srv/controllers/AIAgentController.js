const cds = require("@sap/cds");
const { AzureOpenAiChatClient } = require('@sap-ai-sdk/langchain');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
const fs = require('fs');
const path = require('path')

class AIAgent {
    constructor(tipoAgente) {

      //obtener prompt segun tarea
      const promptPath = path.join(__dirname, '../agentes/prompt.json');
      const promptData = JSON.parse(fs.readFileSync(promptPath, 'utf8'));

      this.promptAgente = promptData[tipoAgente]; // Acceder directamente usando el tipoAgente


      //cargar settings agente
      const llmName = new AzureOpenAiChatClient({ modelName: promptData.modelName, destinationName: 'SAP_AI_CORE' });
      
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ['system', this.promptAgente.prompt],
        ['user', '{text}']
      ]);

      const parser = new StringOutputParser();
      this.agente = promptTemplate.pipe(llmName).pipe(parser);
    }


    async generarResumen(texto){

      let respuesta = await this.agente.invoke({
        key_words: this.promptAgente.keyWords,
        text: texto
       });
       

       return respuesta;

    }

 
    async aitest() {

      let llmChain;

        try {

           // Initialize the client
            //const chatClient = new AzureOpenAiChatClient({ modelName: 'gpt-4o' });
            const chatClient = new AzureOpenAiChatClient({ modelName: 'gpt-4.1-nano' });
            //const chatClient = new AzureOpenAiChatClient({ modelName: 'amazon--nova-micro' });
            
            const response = await chatClient.invoke("What's the capital of France?");
            console.log(response.content);
            // Create a prompt template
            const promptTemplate = ChatPromptTemplate.fromMessages([
                ['system', 'Answer the following in {language}:'],
                ['user', '{text}']
            ]);
    
            console.log('reaching this point');
    
            // Create an output parser
            const parser = new StringOutputParser();
    
            // Chain together template, client and parser
            llmChain = promptTemplate.pipe(chatClient).pipe(parser);
          
        } catch (error) {
          console.log(error);
        }
           
    
        try {
               // Invoke the chain
               let respuesta = await llmChain.invoke({
                language: 'Spanish',
                text: 'Are you aware about your context window size?'
            });

            
            console.log(respuesta.content);

          
        } catch (error) {
          console.log(error);
        }
       
    
        }
           

}

module.exports = AIAgent;
