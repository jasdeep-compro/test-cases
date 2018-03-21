import * as utils from "../../src/scripts/utils/utilities";
import { expect } from 'chai';
import 'mocha';
import { JSONManipulator } from "../../src/scripts/widget/widget-json-manipulator";
var inputJson = require('./jsons/input.json');
var expectedJson = require('./jsons/expected.json');
import * as internalTest from "./json-manipulator-internal";

describe('Json Manipulator Test', function() {

    afterEach(function(){
        
    });

    it('Should give Spreadsheet Config - display Range',function(){

        let actual = JSONManipulator.getSpreadsheetConfig(inputJson["inputJson"]);

        let actualOutput = JSON.stringify(actual);

        let expectedOutput = JSON.stringify(expectedJson["expected_displayRange"]);

        expect(expectedOutput).to.equal(actualOutput);
    });

    it('Should give Spreadsheet Config - wo display Range',function(){

        let actual = JSONManipulator.getSpreadsheetConfig(inputJson["inputJson_wo_displayRange"]);

        let actualOutput = JSON.stringify(actual);

        let expectedOutput = JSON.stringify(expectedJson["expected_wo_displayRange"]);

        expect(expectedOutput).to.equal(actualOutput);

    });

});

describe('Json Manipulator Test Scoring Rules', function() {

    it('Should give Scoring Rules',function(){

        let actual = JSONManipulator.getScoringRules(inputJson["inputJson"]);

        let expectedOutput = {
            "tolerance":10,
            "precision":false
        };

        expect(expectedOutput).to.deep.equal(actual);
    });
});

describe('Json Manipulator Test Correct Data', function() {

    it('Should give Correct Data',function(){

        let actual = JSONManipulator.getCorrectData(inputJson["inputJson"]);

        let expectedOutput = inputJson["inputJson"]["resources"]["ryWJlHiXG"]["spreadsheet"]["data"];

        expect(expectedOutput).to.deep.equal(actual);
    });
});

describe('Json Manipulator Test Get Item Config', function() {

    it('Should give Item Config',function(){

        let actual = JSONManipulator.getItemConfig(inputJson["input_widget_data"],inputJson["inputJson"]);

        let actualOutput = JSON.stringify(actual);

        let expectedOutput = JSON.stringify(expectedJson["expected_item_config"]);

        expect(expectedOutput).to.equal(actualOutput);
    });
});

describe('Json Manipulator Test Get Widget Mode', function() {

    it('Should give Widget Mode',function(){

        let actual = JSONManipulator.getWidgetMode(inputJson["inputJson"]);

        let expectedOutput = "question";

        expect(expectedOutput).to.equal(actual);
    });
});

describe('Json Manipulator Test Get User Data', function() {

    it('Should give User Data',function(){

        let actual = JSONManipulator.getUserData(inputJson["input_widget_data"]);

        let expectedOutput = inputJson["input_widget_data"].grid;

        expect(expectedOutput).to.equal(actual);
    });
});
