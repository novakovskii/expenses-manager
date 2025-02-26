<template>
  <TheHeader>
    <template #title>
      {{ pageTitle }} 
    </template>
    <template #append>
      <BaseDropdown>
        <template #activator>
          <img class="the-header__avatar" :src="stateStore.user.picture" alt="avatar">
        </template>
        <template #menu>
          <div class="the-dashboard__user-menu">
            <div class="the-dashboard__user-email title">{{ stateStore.user.email }}</div>
            <BaseButton 
              class="the-dashboard__logout-button"
              @click="stateStore.logout"
            >Logout</BaseButton>
          </div>
        </template>
      </BaseDropdown>
    </template>
  </TheHeader>
  <div class="the-dashboard">
    <template v-if="expenses.length">
      <div class="the-dashboard__subtitle">Expenses</div>
      <div class="the-dashboard__card-wrapper">
        <BaseDashboardCard 
          v-for="(expense, idx) in expenses"
          :key="idx"
          :name="expense.name"
          :icon-name="`${expense.name}-expense`"
          type="expense"
          :limit="expense.limit"
          :spent="expense.spent"
        />
      </div>
    </template>
    <template v-if="deposits.length">
      <div class="the-dashboard__subtitle">Deposits</div>
      <div class="the-dashboard__card-wrapper">
        <BaseDashboardCard 
          v-for="(deposit, idx) in deposits"
          :key="idx"
          :name="deposit.name"
          :icon-name="`${deposit.name}-deposit`"
          type="payment"
          :limit="deposit.limit"
          :paid="deposit.paid"
          @paymentStatusChange="onPaymentStatusChange($event, 'deposits', idx)"
        />
      </div>
    </template>
    <template v-if="mandatoryPayments.length">
      <div class="the-dashboard__subtitle">Mandatory payments</div>
      <div class="the-dashboard__card-wrapper">
        <BaseDashboardCard 
          v-for="(mandatoryPayment, idx) in mandatoryPayments"
          :key="idx"
          :name="mandatoryPayment.name"
          :icon-name="`${mandatoryPayment.name}-mandatory-payment`"
          type="payment"
          :limit="mandatoryPayment.limit"
          :paid="mandatoryPayment.paid"
          @paymentStatusChange="onPaymentStatusChange($event, 'mandatoryPayments', idx)"
        />
      </div>
    </template>
    <div class="spacer"></div>
    <BaseButton 
      class="the-dashboard__button"
      @click="showSelectDayModal = true"
    >Manage expenses</BaseButton>
  </div>
  <TheSelectDayModal 
    v-if="showSelectDayModal"
    :min-date="minDate"
    :max-date="maxDate"
    @close="showSelectDayModal = false"
  />
</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import BaseDashboardCard from '../components/BaseDashboardCard.vue';
import BaseButton from '../components/BaseButton.vue';
import TheSelectDayModal from '../components/TheSelectDayModal.vue';
import { mapStores } from 'pinia'
import { useStateStore } from '../store/state'
import BaseDropdown from '../components/BaseDropdown.vue';

export default {
  name: "DashboardView",
  components: {
    TheHeader,
    BaseDashboardCard,
    BaseButton,
    TheSelectDayModal,
    BaseDropdown,
  },
  data () {
    return {
      showSelectDayModal: false,
      sheetTitle: '',
      pageTitle: '',
      pageValues: null,
      expenses: [],
      deposits: [],
      mandatoryPayments: [],
      minDate: null,
      maxDate: null,
      depositsStartRow: null,
      mandatoryPaymentsStartRow: null,
    }
  },
  computed: {
    ...mapStores(useStateStore),
  },
  mounted() {
    this.fetchSheets();
  },
  methods: { 
    async fetchSheets() {
      try {
        const response = await fetch(
          'https://sheets.googleapis.com/v4/spreadsheets/1YixRyyeL50Z5ZeN3hL3D4qe-W0zU3PRlocO8gWdYcl0',
          {
            headers: {
              Authorization: `Bearer ${this.stateStore.accessToken}`,
            },
          }
        );
        const data = await response.json();
        const currentDate = new Date().setHours(0,0,0,0);
        data?.sheets.forEach(sheet => {
          const title = sheet.properties.title;
          const [startDay, startMonth, startYear] = title.split('-')[0].split('.');
          const [endDay, endMonth, endYear] = title.split('-')[1].split('.');
          const startDate = new Date(`${startMonth}.${startDay}.${startYear}`);
          const endDate = new Date(`${endMonth}.${endDay}.${endYear}`);
          
          if (currentDate >= startDate && currentDate <= endDate) {
            this.minDate = startDate;
            this.maxDate = endDate;
            this.sheetTitle = title;
            this.pageTitle = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            this.fetchValues();
          }
        });
      } catch (error) {
        console.error('Ошибка при получении данных из Google Sheets:', error);
      }
    },
    async fetchValues() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/1YixRyyeL50Z5ZeN3hL3D4qe-W0zU3PRlocO8gWdYcl0/values/${this.sheetTitle}!A1:R378`,
          {
            headers: {
              Authorization: `Bearer ${this.stateStore.accessToken}`,
            },
          }
        );
        const data = await response.json();
        // this.pageValues = data?.values;
        const values = data?.values;
        this.parseDataFromValues(values);
      } catch (error) {
        console.error('Ошибка при получении данных из Google Sheets:', error);
      }
    },
    parseDataFromValues(values) {
      let expensesIndex = -1;
      let depositsIndex = -1;
      let mandatoryPaymentsIndex = -1;
      values.forEach((value, index) => {
        if (value.includes('expenses')) expensesIndex = index;
        if (value.includes('deposits')) depositsIndex = index;
        if (value.includes('mandatory payments')) mandatoryPaymentsIndex = index;
      })

      this.depositsStartRow = depositsIndex + 4;
      this.mandatoryPaymentsStartRow = mandatoryPaymentsIndex + 4;
      
      //expenses
      const expensesArray = values.slice(expensesIndex + 2, depositsIndex);
      const expensesTitles = expensesArray[0];
      this.expenses = expensesArray.slice(1, expensesArray.length).map(row => {
        let result = {};
        row.forEach((col, index) => {
          if (!expensesTitles[index]) return;
          if (['limit', 'spent', 'left'].includes(expensesTitles[index])) {
            result[expensesTitles[index]] = +col;
          } else {
            result[expensesTitles[index]] = col;
          }
        })
        return result;
      })

      //deposits
      const depositsArray = values.slice(depositsIndex + 2, mandatoryPaymentsIndex);
      const depositsTitles = depositsArray[0];
      this.deposits = depositsArray.slice(1, depositsArray.length).map(row => {
        let result = {};
        row.forEach((col, index) => {
          if (!depositsTitles[index]) return;
          if (['limit', 'spent'].includes(depositsTitles[index])) {
            result[depositsTitles[index]] = +col;
          } else if (depositsTitles[index] === 'paid') {
            result[depositsTitles[index]] = col === 'TRUE' ? true : false;
          } else {
            result[depositsTitles[index]] = col;
          }
        })
        return result;
      })

      //mandatory payments
      const mandatoryPaymentsArray = values.slice(mandatoryPaymentsIndex + 2, values.length);
      const mandatoryPaymentsTitles = mandatoryPaymentsArray[0];
      this.mandatoryPayments = mandatoryPaymentsArray.slice(1, mandatoryPaymentsArray.length).map(row => {
        let result = {};
        row.forEach((col, index) => {
          if (!mandatoryPaymentsTitles[index]) return;
          if (['limit', 'spent'].includes(mandatoryPaymentsTitles[index])) {
            result[mandatoryPaymentsTitles[index]] = +col;
          } else if (mandatoryPaymentsTitles[index] === 'paid') {
            result[mandatoryPaymentsTitles[index]] = col === 'TRUE' ? true : false;
          } else {
            result[mandatoryPaymentsTitles[index]] = col;
          }
        })
        return result;
      })
    },
    onPaymentStatusChange(event, category, index) {
      const newValue = event.target.checked;
      this.setPaymentStatus(newValue, category, index);
    },
    async setPaymentStatus(value, category, index) {
      try {
        const rowIndex = category === 'deposits' ? this.depositsStartRow + index : this.mandatoryPaymentsStartRow + index;
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/1YixRyyeL50Z5ZeN3hL3D4qe-W0zU3PRlocO8gWdYcl0/values/${this.sheetTitle}!E${rowIndex}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${this.stateStore.accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              range: `${this.sheetTitle}!E${rowIndex}`,
              majorDimension: 'ROWS',
              values: [[value ? 'TRUE' : 'FALSE']]
            })
          }
        );
        const data = await response.json();
      } catch (error) {
        console.error('Ошибка при получении данных из Google Sheets:', error);
      }
    }
  },
  getColumnLetterFromIndex(index) {
    return String.fromCharCode(index + 65);
  }
}
</script>
<style lang="scss">
.the-dashboard {
  margin-top: 16px;

  &__subtitle {
    color: var(--color-grey-1);
    font-size: 12px;
  }

  &__card-wrapper {
    display: grid;
    grid-template-columns: max-content max-content 1fr;
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 24px;
  }

  &__button {
    position: fixed;
    bottom: 16px;
    width: calc(100% - 32px);
    box-sizing: border-box;
  }

  &__user-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
