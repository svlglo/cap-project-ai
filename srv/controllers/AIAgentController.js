const cds = require("@sap/cds");
const { AzureOpenAiChatClient } = require('@sap-ai-sdk/langchain');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { ChatPromptTemplate } = require('@langchain/core/prompts');

class AIAgent {
    constructor() {
      //cargar settings agente
      this.agente = "";
    }

    async ejemploCall(campo) {

      try {
        console.log("Estamos ok");
      } catch (error) {
          console.error("Error ", error);
      }
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

            console.log(respuesta);

          
        } catch (error) {
          console.log(error);
        }
       
    
        }
           

}

module.exports = AIAgent;
