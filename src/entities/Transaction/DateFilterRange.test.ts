import { getDate } from 'date-fns';
import startOfMonth from 'date-fns/start_of_month';

describe('firstDayOfThisMonth function test', () => {
    it('should return the first day of the month', () => {
        const currentDate = new Date();

        const startOfMonth1 = startOfMonth(currentDate);
        const startOfMonth2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        expect(startOfMonth1).toEqual(startOfMonth2);

    });
});