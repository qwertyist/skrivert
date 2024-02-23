import { describe, it, expect } from 'vitest';
import { parser } from "$lib/captions/main"

describe("caption parser test 1", () => {
    const options = {
        chars: 37,  
        lines: 2 
    }
    const text = "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick"
    const captions = {
       blocks: [
           { 
               lines: [
                   "Mors lilla Olle i skogen gick, rosor",
                   "på kind och solsken i blick"
                ]
           }
       ]
    }
    it("parses" + text + " to two lines", () => {
        expect(parser(options, text)).toStrictEqual(captions)
    })
})

describe("caption parser test 2", () => {
    const options = {
        chars: 32,  
        lines: 2 
    }
    const text = "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick"
    const captions = {
       blocks: [
           { 
               lines: [
                   "Mors lilla Olle i skogen gick,",
                   "rosor på kind och solsken i",
                ]
           },
           { 
               lines: [
                   "blick",
                ]
           },
       ]
    }
    it("parses" + text + " to 2 Blocks with 2 Lines", () => {
        expect(parser(options, text)).toStrictEqual(captions)
    })
})
describe("caption parser test 3", () => {
    const options = {
        chars: 32,  
        lines: 3 
    }
    const text = "Mors lilla Olle i skogen gick, rosor på kind och solsken i blick"
    const captions = {
       blocks: [
           { 
               lines: [
                   "Mors lilla Olle i skogen gick,",
                   "rosor på kind och solsken i",
                   "blick"
                ]
           },
       ]
    }
    it("parses" + text + " to 1 Block with 3 Lines", () => {
        expect(parser(options, text)).toStrictEqual(captions)
    })
})
describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});
