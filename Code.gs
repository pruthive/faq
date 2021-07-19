function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doGet(){
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var results =  spreadSheet.getSheetByName("Results");
  
  var resultsPos = results.getDataRange().getValues().length;

  var questionRange = results.getRange("A1:A"+resultsPos);
  var answerRange = results.getRange("B1:B"+resultsPos);
  var questionValues = questionRange.getValues();
  var answerValues = answerRange.getValues();


  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.question = questionValues[0].toString();
  htmlTemplate.answer = answerValues[0].toString();
  return htmlTemplate.evaluate();
  //return HtmlService.createHtmlOutputFromFile("index");
}

function num(x){
  
  return x;
}

function search(runFunction, pos) {
 
  
  var list = [];

  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet =  spreadSheet.getSheetByName("Script");

  var results =  spreadSheet.getSheetByName("Results");
  results.clear();
  var pos = 1;
 

  var query = sheet.getRange("N3:N7");
  var answer = sheet.getRange("O3:O7");
  var values = query.getValues();
  var ansvalues = answer.getValues();

  for(var i = 0; i < values.length; i++){
      
      var qRange = results.getRange(pos,1);
      var aRange = results.getRange(pos,2);

      var ansvals = ansvalues[i].toString();
      var vals = values[i].toString();

  
      if(vals.includes("token")){
      
       qRange.setValue(vals);
       aRange.setValue(ansvals);
       list.push(vals);
        
       // Logger.log("Question: "+vals);
        //Logger.log("Answer: "+ansvals);
        for(var x = 0; x < 4; x++){
     
           runFunction(pos);
           
        }
        Logger.log(pos);
        pos = pos+1;
    
        
  
      }
    }

}
