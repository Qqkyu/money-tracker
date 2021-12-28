import { toUtcTimestamp } from "./timezone";
import { toLocalTimestamp } from "./timezone";

describe('local time to UTC epoch time conversion', () => {
    it('converts date correctly', () => {
        const date1 = new Date('2015-5-27 16:50:37'); 
        expect(toUtcTimestamp(date1)).toEqual(1432741837000);
    });

    it('converts date correctly', () => {
        const date2 = new Date('2024-2-29 19:00:00'); 
        expect(toUtcTimestamp(date2)).toEqual(1709233200000);
    });

    it('converts date correctly', () => {
        const date3 = new Date('2010-3-11 10:25:12');
        expect(toUtcTimestamp(date3)).toEqual(1268303112000);
    });

    it('converts date correctly', () => {
        const date4 = new Date('2022-8-26 04:05:53');
        expect(toUtcTimestamp(date4)).toEqual(1661483153000);
    });
    
    it('converts date correctly', () => {
        const date5 = new Date('2020-2-29 00:00:00');
        expect(toUtcTimestamp(date5)).toEqual(1582934400000);
    });    
});

describe('UTC epoch time to local time conversion', () => {
    it('converts date correctly', () => {
        const date1 = new Date('2015-5-27 18:50:37'); 
        expect(toLocalTimestamp(date1)).toEqual(1432741837000);
    });

    it('converts date correctly', () => {
        const date2 = new Date('2024-2-29 21:00:00'); 
        expect(toLocalTimestamp(date2)).toEqual(1709233200000);
    });

    it('converts date correctly', () => {
        const date3 = new Date('2010-3-11 12:25:12');
        expect(toLocalTimestamp(date3)).toEqual(1268303112000);
    });

    it('converts date correctly', () => {
        const date4 = new Date('2022-8-26 06:05:53');
        expect(toLocalTimestamp(date4)).toEqual(1661483153000);
    });
    
    it('converts date correctly', () => {
        const date5 = new Date('2020-2-29 02:00:00');
        expect(toLocalTimestamp(date5)).toEqual(1582934400000);
    });    
});