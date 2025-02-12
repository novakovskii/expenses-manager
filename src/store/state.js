import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({ 
    expenses: [
      {
        name: 'food',
        displayName: "Food",
        limit: 0,
      },
      {
        name: 'junk-food',
        displayName: "Junk food",
        limit: 0,
      },
      {
        name: 'prepared-food',
        displayName: "Prepared food",
        limit: 0,
      },
      {
        name: 'transport',
        displayName: "Transport",
        limit: 0,
      },
      {
        name: 'consumables',
        displayName: "Consumables",
        limit: 0,
      },
      {
        name: 'entertainment',
        displayName: "Entertainment",
        limit: 0,
      },
      {
        name: 'beauty-and-health',
        displayName: "Beauty and health",
        limit: 0,
      },
      {
        name: 'other',
        displayName: "Other",
        limit: 0,
      },
    ],
    deposits: [
      {
        name: 'pillow',
        displayName: "Pillow",
        limit: 0,
        payed: false,
      },
      {
        name: 'renovation',
        displayName: "Renovation",
        limit: 0,
        payed: false,
      },
      {
        name: 'mortgage',
        displayName: "Mortgage",
        limit: 0,
        payed: false,
      },
      {
        name: 'cryptocurrency',
        displayName: "Cryptocurrency",
        limit: 0,
        payed: false,
      },
      {
        name: 'clothes',
        displayName: "Clothes",
        limit: 0,
        payed: false,
      },
      {
        name: 'gifts',
        displayName: "Gifts",
        limit: 0,
        payed: false,
      },
      {
        name: 'girlfriend',
        displayName: "Girlfriend",
        limit: 0,
        payed: false,
      },
    ],
    mandatoryPayments: [
      {
        name: 'flat-rent',
        displayName: "Flat rent",
        limit: 0,
        payed: false,
      },
      {
        name: 'mortgage',
        displayName: "Mortgage",
        limit: 0,
        payed: false,
      },
      {
        name: 'mobile-communication',
        displayName: "Mobile communication",
        limit: 0,
        payed: false,
      },
      {
        name: 'home-internet',
        displayName: "Home Internet",
        limit: 0,
        payed: false,
      },
    ],
    period: {
      start: 21,
      end: 20,
    },
    totalBudget: 100000,
    expensesByDates: {}
  }),
  actions: {
    changeOption(category, index, value) {
      this[category][index].limit = value;
      Telegram.WebApp.CloudStorage.setItem(category, JSON.stringify(this[category]));
    },
    changeTotalBudget(value) {
      this.totalBudget = value;
      Telegram.WebApp.CloudStorage.setItem('totalBudget', JSON.stringify(this.totalBudget));
    },
    changePeriod(value) {
      this.period = value;
      Telegram.WebApp.CloudStorage.setItem('period', JSON.stringify(this.period));
    },
    changePaymentStatus(category, index, value) {
      this[category][index].payed = value;
      Telegram.WebApp.CloudStorage.setItem(category, JSON.stringify(this[category]));
    },
    addExpense(dateKey, categoryName, expense) {
      this.expensesByDates?.[dateKey]?.find(category => category.name === categoryName).expenses.push(expense);
      Telegram.WebApp.CloudStorage.setItem(dateKey.replaceAll('/', '-'), JSON.stringify(this.expensesByDates[dateKey]));
    },
    addCategory(dateKey, category) {
      if (!this.expensesByDates?.[dateKey]) this.expensesByDates[dateKey] = [];
      if (!this.expensesByDates?.[dateKey]?.find(cat => cat.name === category.name)) {
        this.expensesByDates?.[dateKey].push({
          name: category.name,
          displayName: category.displayName,
          expenses: [],
        })
      }
      Telegram.WebApp.CloudStorage.setItem(dateKey.replaceAll('/', '-'), JSON.stringify(this.expensesByDates[dateKey]));
    },
    loadSavedData() {
      Telegram.WebApp.CloudStorage.getItem('expenses', (error, value) => {
        if (value) this.expenses = JSON.parse(value);
      })

      Telegram.WebApp.CloudStorage.getItem('deposits', (error, value) => {
        if (value) this.deposits = JSON.parse(value);
      })

      Telegram.WebApp.CloudStorage.getItem('mandatoryPayments', (error, value) => {
        if (value) this.mandatoryPayments = JSON.parse(value);
      })

      Telegram.WebApp.CloudStorage.getItem('period', (error, value) => {
        if (value) this.period = JSON.parse(value);
      })

      Telegram.WebApp.CloudStorage.getItem('totalBudget', (error, value) => {
        if (value) this.totalBudget = JSON.parse(value);
      })

      Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
        const expensesByDatesKeys = keys.filter(key => key.match(/^\d{1,2}\-\d{1,2}\-\d{4}$/));
        expensesByDatesKeys.forEach(key => {
          Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
            if (value) this.expensesByDates[key.replaceAll('-', '/')] = JSON.parse(value);
          })
        })
      })
    }
  },
})
