import difference from './SetDifference';
import { tagsDB } from './storage/pouchdb';

describe('set difference function test on Sets of Ints', () => {
    it('tests 2 nonempty sets of Ints, nonempty intersection', () => {
        let left = new Set();
        let right = new Set();
        let diff = new Set();
        
        left.add(1);
        left.add(2);
        left.add(3);
        left.add(4);
        left.add(5);

        right.add(5);
        right.add(6);
        right.add(7);
        right.add(8);
        right.add(9);

        diff.add(1);
        diff.add(2);
        diff.add(3);
        diff.add(4);

        expect(difference(left, right)).toEqual(diff);
    });

    it('tests 2 nonempty sets of Ints, empty intersection', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();
        
        left.add(1);
        left.add(2);
        left.add(3);
        left.add(4);
        left.add(5);

        right.add(6);
        right.add(7);
        right.add(8);
        right.add(9);

        expect(difference(left, right)).toEqual(left);
    });

    it('tests 2 sets of Ints, one of them being empty', () => {
        let left = new Set();
        let right = new Set();
        
        left.add(1);
        left.add(2);
        left.add(3);
        left.add(4);
        left.add(5);

        expect(difference(left, right)).toEqual(left);
    });

    it('tests 2 sets of Ints, one of them being empty (flipped order case)', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();
        
        right.add(1);
        right.add(2);
        right.add(3);
        right.add(4);
        right.add(5);

        expect(difference(left, right)).toEqual(empty);
    });

    it('tests 2 sets of Ints, both of them being empty', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();

        expect(difference(left, right)).toEqual(empty);
    });

    it('tests 2 sets of Ints, both of them being equal', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();
        
        left.add(1);
        left.add(2);
        left.add(3);
        left.add(4);
        left.add(5);

        right.add(1);
        right.add(2);
        right.add(3);
        right.add(4);
        right.add(5);

        expect(difference(left, right)).toEqual(empty);
    });   
});

describe('set difference function tests on Sets of Tags', () => {
    it('tests 2 nonempty sets of Tags, nonempty intersection', () => {
        let left = new Set();
        let right = new Set();
        let diff = new Set();
        
        left.add("car");
        left.add("house");
        left.add("holidays");
        left.add("bitcoin");
        left.add("bitcoin");    //should not add to set

        right.add("family");
        right.add("summerhouse");
        right.add("kids");
        right.add("kids");      //should not add to set
        right.add("bitcoin");

        diff.add("car");
        diff.add("house");
        diff.add("holidays");

        expect(difference(left, right)).toEqual(diff);
    });

    it('tests 2 nonempty sets of Tags, nonempty intersection (flipped order case)', () => {
        let left = new Set();
        let right = new Set();
        let diff = new Set();
        
        left.add("car");
        left.add("house");
        left.add("holidays");
        left.add("bitcoin");
        left.add("bitcoin");    //should not add to set

        right.add("family");
        right.add("summerhouse");
        right.add("kids");
        right.add("kids");      //should not add to set
        right.add("bitcoin");

        diff.add("family");
        diff.add("summerhouse");
        diff.add("kids");      

        expect(difference(right, left)).toEqual(diff);
    });

    it('tests 2 nonempty sets of Tags, empty intersection', () => {
        let left = new Set();
        let right = new Set();
        
        left.add("null");
        left.add("0_x1!3");
        left.add("0x1!333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333");
        left.add("x01!3");
        left.add("1_x1!3");

        right.add("null_");
        right.add(" null");
        right.add("0_x1!3 ");
        right.add("0_x1!3 ");
        right.add(" 1_x1!3");

        expect(difference(left, right)).toEqual(left);
    });

    it('tests 2 nonempty sets of Tags, empty intersection (flipped order case)', () => {
        let left = new Set();
        let right = new Set();
        
        left.add("null");
        left.add("0_x1!3");
        left.add("0x1!3");
        left.add("x01!3");
        left.add("1_x1!3");

        right.add("null_");
        right.add(" null");
        right.add("0_x1!3 ");
        right.add("0_x1!3 ");
        right.add(" 1_x1!3");

        expect(difference(right, left)).toEqual(right);
    });

    it('tests 2 sets of Tags, one of them being empty', () => {
        let left = new Set();
        let right = new Set();
        
        left.add("x");
        left.add("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        left.add("x");
        left.add("car");
        left.add("xx");

        expect(difference(left, right)).toEqual(left);
    });

    it('tests 2 sets of Tags, one of them being empty (flipped order case)', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();
        
        left.add("x");
        left.add("xx");
        left.add("x");
        left.add("car");
        left.add("xx");

        expect(difference(right, left)).toEqual(empty);
    });

    it('tests 2 sets of Tags, both of them being empty', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();

        expect(difference(left, right)).toEqual(empty);
    });

    it('tests 2 sets of Tags, both of them being equal', () => {
        let left = new Set();
        let right = new Set();
        let empty = new Set();
        
        left.add("bike");
        left.add("house");
        left.add("car");
        left.add("_id2");
        left.add("_id2");

        right.add("_id2");
        right.add("bike");
        right.add("car");
        right.add("house");
        right.add("_id2");

        expect(difference(left, right)).toEqual(empty);
    });   
});