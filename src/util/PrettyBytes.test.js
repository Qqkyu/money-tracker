import PrettyBytes from './PrettyBytes'

describe('converts filesize to a human-readable string', () =>{
    it('filesize < 1kB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 267 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toEqual(267);
        expect(splitSize[1]).toEqual('B');
    });

    it('filesize: 1 kB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.1);
        expect(splitSize[1]).toEqual('kB');
    });

    it('filesize: 1 MB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.1);
        expect(splitSize[1]).toEqual('MB');
    });

    it('filesize: 1GB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.1);
        expect(splitSize[1]).toEqual('GB');
    });

    it('filesize: 1TB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.1);
        expect(splitSize[1]).toEqual('TB');
    });

    it('filesize: 1PB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.2);
        expect(splitSize[1]).toEqual('PB');
    });

    it('filesize: 1EB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024*1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.2);
        expect(splitSize[1]).toEqual('EB');
    });

    it('filesize: 1ZB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024*1024*1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.2);
        expect(splitSize[1]).toEqual('ZB');
    });

    it('filesize: 1YB', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: 1024*1024*1024*1024*1024*1024*1024*1024 })
        const splitSize = PrettyBytes(file.size).split(' ');
        
        expect(parseFloat(splitSize[0])).toBeGreaterThanOrEqual(1);
        expect(parseFloat(splitSize[0])).toBeLessThanOrEqual(1.3);
        expect(splitSize[1]).toEqual('YB');
    });

    // it('filesize negative', () => {
    //     const file = new File([""], 'billSheet.csv');
    //     Object.defineProperty(file, 'size', { value: -2442 });
        
    //     expect(() => {PrettyBytes(file.size)}).toThrow('File size error');
    // });

    it('filesize infinite', () => {
        const file = new File([""], 'billSheet.csv');
        Object.defineProperty(file, 'size', { value: Infinity });
        
        expect(() => {PrettyBytes(file.size)}).toThrow(`Expected a finite number, got ${typeof file.size}: ${file.size}`);
    });


});