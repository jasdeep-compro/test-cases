import * as utils from "../../src/scripts/utils/utilities";
import { expect } from 'chai';
import 'mocha';
import { JSONManipulator } from "../../src/scripts/widget/widget-json-manipulator";
var inputJson = require('./jsons/input.json');
var expectedJson = require('./jsons/expected.json');

export function testSpreadSheetData(){

    describe('Spreadsheet Data Test', function() {

        it('Should give Spreadsheet Data',function(){

            let actual = JSONManipulator.getSpreadsheetData(inputJson["inputJson"]["resources"]["SkeygBsmz"]["spreadsheet"]["data"]);

            let actualOutput = JSON.stringify(actual);

            let expectedOutput = JSON.stringify(expectedJson["expected_spreadshsetData"]);

            expect(expectedOutput).to.equal(actualOutput);

        });

    });
};

export function testSheetRowColCount(){

    describe('Sheet Row Col Count Test', function() {

        it('Should Give Row Col Count - 1', function() {

            let expected = {
                row: 4,
                col: 4,
            };
            let actual = JSONManipulator.getSheetRowColCount(inputJson["inputJson"]["resources"]["SkeygBsmz"]["spreadsheet"]["data"]["sheets"]["0"]);

            expect(expected.row).to.equal(actual.row);
            expect(expected.col).to.equal(actual.col);
        });

        it('Should Give Row Col Count - 2', function() {

            let expected = {
                row: 8,
                col: 8,
            };

            let actual = JSONManipulator.getSheetRowColCount(inputJson["inputJson"]["resources"]["SkeygBsmz"]["spreadsheet"]["data"]["sheets"]["1"]);

            expect(expected.row).to.equal(actual.row);
            expect(expected.col).to.equal(actual.col);
        });

    });
};

export function testUpdateJSONForPartialData(){

    describe('Test update JSON For Partial Data', function() {

        it('Should Update Row visibility', function() {

            let sheet = inputJson["inputJson"]["resources"]["SkeygBsmz"]["spreadsheet"]["data"]["sheets"]["0"];

            let sheetRowColCount = JSONManipulator.getSheetRowColCount(sheet);
            let sheetDisplayRange = {
                "startCell" : "A2",
                "endCell" : "B3"
            };

            let sheetDisplayRangeObj = utils.convertCellRangeToObject(sheetDisplayRange.startCell + ":" + sheetDisplayRange.endCell);

            JSONManipulator.updateJSONForPartialData(sheet["rows"],sheetRowColCount.row, sheetDisplayRangeObj.startRow, sheetDisplayRangeObj.endRow);

            expect(sheet.rows["0"].visible).to.equal(false);
            expect(sheet.rows["1"].visible).to.equal(true);
            expect(sheet.rows["2"].visible).to.equal(true);
            expect(sheet.rows["3"].visible).to.equal(false);

        });

        it('Should Update Column visibility', function() {

            let sheet = inputJson["inputJson"]["resources"]["SkeygBsmz"]["spreadsheet"]["data"]["sheets"]["1"];

            let sheetRowColCount = JSONManipulator.getSheetRowColCount(sheet);
            let sheetDisplayRange = {
                "startCell" : "B3",
                "endCell" : "E3"
            };

            let sheetDisplayRangeObj = utils.convertCellRangeToObject(sheetDisplayRange.startCell + ":" + sheetDisplayRange.endCell);

            JSONManipulator.updateJSONForPartialData(sheet["columns"],sheetRowColCount.col, sheetDisplayRangeObj.startCol, sheetDisplayRangeObj.endCol);

            expect(sheet.columns["0"].visible).to.equal(false);
            expect(sheet.columns["1"].visible).to.equal(true);
            expect(sheet.columns["2"].visible).to.equal(true);
            expect(sheet.columns["3"].visible).to.equal(true);
            expect(sheet.columns["4"].visible).to.equal(true);
            expect(sheet.columns["5"].visible).to.equal(false);
            expect(sheet.columns["6"].visible).to.equal(false);
            expect(sheet.columns["7"].visible).to.equal(false);

        });
    });
};
export function testUpdatePropertyValue(){

    describe('Test Update Property Value', function() {

        afterEach(function(){
           if (this.currentTest.state == 'failed'){
                testAddPropertyIfNotPresent();
           }
        });

        it('Should Update Property', function() {
            let dummy = {};
            JSONManipulator.updatePropertyValue(dummy, "locked",true,"defaults.cellStyle")
            expect(dummy["defaults"]["cellStyle"].locked).to.equal(true);
            expect(dummy).to.have.any.keys('defaults','cellStyle','locked');
        });

        it('Should Update Property - 2', function() {
            let dummy = {};
            JSONManipulator.updatePropertyValue(dummy, "locked",true)
            expect(dummy["locked"]).to.equal(true);
            expect(dummy).to.have.any.keys('locked');
        });

        it('Should Update Property - 3', function() {
            let dummy = {
                "defaults":{}
            };
            JSONManipulator.updatePropertyValue(dummy, "locked",true,"defaults.cellStyle")
            expect(dummy["defaults"]["cellStyle"].locked).to.equal(true);
            expect(dummy).to.have.any.keys('defaults','cellStyle','locked');
        });

        it('Should Update Property - 4', function() {
            let dummy = {
                "defaults":{
                    "cellStyle":{
                        "locked":false
                    }
                }
            };
            JSONManipulator.updatePropertyValue(dummy, "locked",true,"defaults.cellStyle")
            expect(dummy["defaults"]["cellStyle"].locked).to.equal(true);
            expect(dummy).to.have.any.keys('defaults','cellStyle','locked');
        });

    });
};

export function testAddPropertyIfNotPresent(){

    describe('Test Add Property if Missing', function() {

        it('Should Add Property', function() {
            let dummy = {};
            JSONManipulator.addPropertyIfNotPresent(dummy, "locked");
            expect(dummy).to.have.any.keys('locked');
        });

        it('Should Add Property - 2', function() {
            let dummy = {
                "defaults":"hello"
            };
            JSONManipulator.addPropertyIfNotPresent(dummy, "defaults");
            expect(dummy["defaults"]).to.equal("hello");
            expect(dummy).to.have.any.keys('defaults');
        });
    });
};

export function testRemovePreferencesFromGrid(){

    describe('Test Remove Preferences From Grid', function() {

        it('Should Remove Properties From Grid', function() {
            let actual = JSONManipulator.removePreferencesFromGrid(inputJson["input_widget_data"].grid);
            expect(actual).to.not.have.all.keys('activeSheet','rowHeader','colHeader');
            expect(actual).to.contain.all.keys('defaults','sheets');
        });
    });
};