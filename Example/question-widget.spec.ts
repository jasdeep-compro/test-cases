import { expect } from 'chai';
import 'mocha';
import { QuestionWidget } from "../../src/scripts/widget/question/question-widget";
var inputJson = require('./jsons/input.json');

describe('Question Widget Test', function() {


   let questionWidget ;

   beforeEach(function(){

       let div = '';
       
       let callbacks = {onChange:function(range,data){console.log("Range is "+range +"and value is " + data)}};
       let uiStyle = {widgetStyles: '{"box-shadow": "6px 6px 9px #ddd", "border": "1px solid #ddd"}',horizontalAlignment: "center"};
       questionWidget = new QuestionWidget("WB1", div, {config:inputJson["inputJson"],events:callbacks, uiStyle:uiStyle});
   });

   it('demo',function(){

       questionWidget.init();
    
   });
});