import sortByName from './sortByName';
import EntityMap from '../entities/EntityMap';
import { getAccountsNameMap } from 'selectors/entities/accounts';


fdescribe('check if function sorts by name correctly', () => {
    fit('sorts multiple accounts', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12345',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                },
                {
                    id: 'A12346',
                    name: 'Zed',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                },
                {
                    id: 'A12347',
                    name: 'Bob',
                    group: 'bank',
                    balance: { USD: 200, JPY: 100 },
                    currencies: ['USD', 'JPY'],
                    on_dashboard: false
                },
                {
                    id: 'A12547',
                    name: 'Shemona',
                    group: 'cash',
                    balance: { USD: 100, JPY: 2100 },
                    currencies: ['USD', 'JPY'],
                    on_dashboard: false
                }
              ])
            }
          };


        const expectedAccounts = [
            {
                id: 'A12345',
                name: 'Amanda',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            {
                id: 'A12347',
                name: 'Bob',
                group: 'bank',
                balance: { USD: 200, JPY: 100 },
                currencies: ['USD', 'JPY'],
                on_dashboard: false
            },
            {
                id: 'A12547',
                name: 'Shemona',
                group: 'cash',
                balance: { USD: 100, JPY: 2100 },
                currencies: ['USD', 'JPY'],
                on_dashboard: false
            },
            {
                id: 'A12346',
                name: 'Zed',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            }];

        const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
        expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts two accounts: first account name > second account name', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12346',
                    name: 'Zed',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                },
                {
                    id: 'A12345',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                }              
              ])
            }
          };

          const expectedAccounts = [
            {
                id: 'A12345',
                name: 'Amanda',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            {
                id: 'A12346',
                name: 'Zed',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            }];

            const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
            expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts two accounts: first account name < second account name', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12345',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                },
                {
                    id: 'A12346',
                    name: 'Zed',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                }              
              ])
            }
          };

          const expectedAccounts = [
            {
                id: 'A12345',
                name: 'Amanda',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            {
                id: 'A12346',
                name: 'Zed',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            }];

            const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
            expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts two accounts: first account name == second account name', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12346',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                },              ,
                {
                    id: 'A12345',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                }
              ])
            }
          };

          const expectedAccounts = [
            {
                id: 'A12346',
                name: 'Amanda',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            },
            {
                id: 'A12345',
                name: 'Amanda',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            }];

            const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
            expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts two accounts where one has no name value', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12346',
                    name: 'Amanda',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                },              ,
                {
                    id: 'A12345',
                    name: '',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                }
              ])
            }
          };

          const expectedAccounts = [
            {
                id: 'A12345',
                name: '',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            {
                id: 'A12346',
                name: 'Amanda',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            }
            ];

            const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
            expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts two accounts with very long names', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12345',
                    name: 'Qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwf',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                },
                {
                    id: 'A12346',
                    name: 'Qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                }
              ])
            }
          };

          const expectedAccounts = [
            {
                id: 'A12346',
                name: 'Qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            },
            {
                id: 'A12345',
                name: 'Qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwf',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            ];

            const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
            expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

    fit('sorts multiple accounts with characters other than letters', () => {
        const state = {
            settings: {
              currency: {
                base: 'USD'
              },
              exchangeRate: {
                USD: 1,
                JPY: 110,
                EUR: 0.75
              }
            },
            entities: {
              accounts: EntityMap.fromArray([
                {
                    id: 'A12345',
                    name: 'A!manda',
                    group: 'cash',
                    balance: { USD: 100, EUR: 200 },
                    currencies: ['USD', 'EUR'],
                    on_dashboard: true
                },
                {
                    id: 'A12346',
                    name: 'Z#ed',
                    group: 'cash',
                    balance: { JPY: 1000 },
                    currencies: ['JPY'],
                    on_dashboard: false
                },
                {
                    id: 'A12347',
                    name: 'Z@ed',
                    group: 'bank',
                    balance: { USD: 200, JPY: 100 },
                    currencies: ['USD', 'JPY'],
                    on_dashboard: false
                },
                {
                    id: 'A12547',
                    name: '4Shemona*',
                    group: 'cash',
                    balance: { USD: 100, JPY: 2100 },
                    currencies: ['USD', 'JPY'],
                    on_dashboard: false
                }
              ])
            }
          };


        const expectedAccounts = [
            {
                id: 'A12547',
                name: '4Shemona*',
                group: 'cash',
                balance: { USD: 100, JPY: 2100 },
                currencies: ['USD', 'JPY'],
                on_dashboard: false
            },
            {
                id: 'A12345',
                name: 'A!manda',
                group: 'cash',
                balance: { USD: 100, EUR: 200 },
                currencies: ['USD', 'EUR'],
                on_dashboard: true
            },
            {
                id: 'A12346',
                name: 'Z#ed',
                group: 'cash',
                balance: { JPY: 1000 },
                currencies: ['JPY'],
                on_dashboard: false
            },
            {
                id: 'A12347',
                name: 'Z@ed',
                group: 'bank',
                balance: { USD: 200, JPY: 100 },
                currencies: ['USD', 'JPY'],
                on_dashboard: false
            }
            ];

        const accounts = EntityMap.map(state.entities.accounts, account => ({ ...account }));
        expect((accounts).sort(sortByName)).toEqual(expectedAccounts);
    });

   
});