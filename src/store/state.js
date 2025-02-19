import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({ 
    expenses: [],
    deposits: [],
    mandatoryPayments: [],
    totalBudget: 100000,
    expensesByDates: {},
    accessToken: null,
    user: {},
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken;
      localStorage.setItem('access_token', accessToken);
    },
    removeAccessToken() {
      this.accessToken = null;
      localStorage.removeItem('access_token');
    },
    logout() {
      this.removeAccessToken();
    },

    changePaymentStatus(category, index, value) {
      this[category][index].paid = value;
      // Telegram.WebApp.CloudStorage.setItem(category, JSON.stringify(this[category]));
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
    },
  },
})
