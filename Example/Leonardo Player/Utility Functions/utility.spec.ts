import * as utils from "../../src/scripts/utils/utilities";
import { expect } from 'chai';
import 'mocha';

describe('Utility Test', function() {

    it('Should Convert Range', function() {

        let expected = {
            startRow: 1,
            startCol: 1,
            endRow: 5,
            endCol: 5
        };

        let actual = utils.convertCellRangeToObject("A1:E5");

        expect(expected.startRow).to.equal(actual.startRow);
        expect(expected.startCol).to.equal(actual.startCol);
        expect(expected.endRow).to.equal(actual.endRow);
        expect(expected.endCol).to.equal(actual.endCol);
    });

    it('Should Transform Cell', function() {

        let expected = {
            row: 3,
            column: 4,
        };

        let actual = utils.transformCell("D3");

        expect(expected.row).to.equal(actual.row);
        expect(expected.column).to.equal(actual.column);
    });

    it('Should Deep Clone -1', function() {

        let target = {
            row: 3,
            dummy:{
                column:5
            }
        };

        let source = {
            column: 4,
        };

        let expected = {
            row: 3,
            dummy:{
                column:5
            },
            column: 4,
        };

        let result = utils.cloneUtil(target,source);

        expect(result).to.contain.all.keys('row','column','dummy');
        expect(expected).to.deep.equal(result);
    });

    it('Should Deep Clone -2', function() {

        let target = {
            row: 3,
            dummy:{
                column:5
            }
        };

        let expected = {
            row: 3,
            dummy:{
                column:5
            }
        };

        let result = utils.cloneUtil(target);

        expect(result).to.contain.all.keys('row','dummy');
        expect(expected).to.deep.equal(result);
    });

    it('Should Get Cell Col Ref -1', function() {

        let expected = 'AC';

        let actual = utils.getCellColRef("28");

        expect(expected).to.equal(actual);
    });

    it('Should Get Cell Col Ref -2', function() {

        let expected = 'BE';

        let actual = utils.getCellColRef("56");

        expect(expected).to.equal(actual);
    });

});