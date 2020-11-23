const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation({debug: true});

const optionsNeedA = new Set();
optionsNeedA.add('escuela');

app.handle('unavailable_options', conv => {
  
  const option = conv.intent.params.chosenUnavailableOption.original;
  
  const optionKey = conv.intent.params.chosenUnavailableOption.resolved;
  
  let message = `Sobre ${option} no sé, ni que fuera google`;
  
  if(optionsNeedA.has(optionKey)){
    	message = `Sobre la ${optionKey} no sé, ni que fuera adivina`;
  }
  
  conv.add(message);
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
