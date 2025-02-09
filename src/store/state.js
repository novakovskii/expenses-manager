import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({ 
    expenses: [
      {
        name: 'food',
        displayName: "Food",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'junk-food',
        displayName: "Junk food",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'prepared-food',
        displayName: "Prepared food",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'transport',
        displayName: "Transport",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'consumables',
        displayName: "Consumables",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'entertainment',
        displayName: "Entertainment",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'beauty-and-health',
        displayName: "Beauty and health",
        limit: 5000,
        spent: 0,
      },
      {
        name: 'other',
        displayName: "Other",
        limit: 5000,
        spent: 0,
      },
    ],
    deposits: [
      {
        name: 'pillow',
        displayName: "Pillow",
        limit: 5000,
        payed: false,
      },
      {
        name: 'renovation',
        displayName: "Renovation",
        limit: 5000,
        payed: false,
      },
      {
        name: 'mortgage',
        displayName: "Mortgage",
        limit: 5000,
        payed: false,
      },
      {
        name: 'cryptocurrency',
        displayName: "Cryptocurrency",
        limit: 5000,
        payed: false,
      },
      {
        name: 'clothes',
        displayName: "Clothes",
        limit: 5000,
        payed: false,
      },
      {
        name: 'gifts',
        displayName: "Gifts",
        limit: 5000,
        payed: false,
      },
      {
        name: 'girlfriend',
        displayName: "Girlfriend",
        limit: 5000,
        payed: false,
      },
    ],
    mandatoryPayments: [
      {
        name: 'flat-rent',
        displayName: "Flat rent",
        limit: 5000,
        payed: false,
      },
      {
        name: 'mortgage',
        displayName: "Mortgage",
        limit: 5000,
        payed: false,
      },
      {
        name: 'mobile-communication',
        displayName: "Mobile communication",
        limit: 5000,
        payed: false,
      },
      {
        name: 'home-internet',
        displayName: "Home Internet",
        limit: 5000,
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
    },
    changeTotalBudget(value) {
      this.totalBudget = value;
    },
    changePeriod(value) {
      this.period = value;
    },
    changePaymentStatus(category, index, value) {
      this[category][index].payed = value;
    },
    addExpense(dateKey, categoryName, expense) {
      this.expensesByDates?.[dateKey]?.find(category => category.name === categoryName).expenses.push(expense);
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
    }
  },
})
