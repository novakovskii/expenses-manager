<template>
  <TheHeader
    append-route-name="settings"
  >
    <template #title>
      {{ getPeriodString }} 
    </template>
    <template #append>
      <img src="/icon-settings.svg" alt="settings" />
    </template>
  </TheHeader>
  <div class="the-dashboard">
    <div class="the-dashboard__subtitle">Expenses</div>
    <div class="the-dashboard__card-wrapper">
      <BaseDashboardCard 
        v-for="(expense, idx) in stateStore.expenses"
        :key="idx"
        :name="expense.name"
        :display-name="expense.displayName"
        type="expense"
        :limit="expense.limit"
        :spent="expensesByCategories[expense.name] || 0"
      />
    </div>
    <div class="the-dashboard__subtitle">Deposits</div>
    <div class="the-dashboard__card-wrapper">
      <BaseDashboardCard 
        v-for="(deposit, idx) in stateStore.deposits"
        :key="idx"
        :name="deposit.name"
        :display-name="deposit.displayName"
        type="payment"
        :limit="deposit.limit"
        :payed="deposit.payed"
        @paymentStatusChange="onPaymentStatusChange($event, 'deposits', idx)"
      />
    </div>
    <div class="the-dashboard__subtitle">Mandatory payments</div>
    <div class="the-dashboard__card-wrapper">
      <BaseDashboardCard 
        v-for="(mandatoryPayment, idx) in stateStore.mandatoryPayments"
        :key="idx"
        :name="mandatoryPayment.name"
        :display-name="mandatoryPayment.displayName"
        type="payment"
        :limit="mandatoryPayment.limit"
        :payed="mandatoryPayment.payed"
        @paymentStatusChange="onPaymentStatusChange($event, 'mandatoryPayments', idx)"
      />
    </div>
    <div class="spacer"></div>
    <BaseButton 
      class="the-dashboard__button"
      @click="showSelectDayModal = true"
    >Manage expenses</BaseButton>
  </div>
  <TheSelectDayModal 
    v-if="showSelectDayModal"
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

export default {
  name: "DashboardView",
  components: {
    TheHeader,
    BaseDashboardCard,
    BaseButton,
    TheSelectDayModal,
  },
  data () {
    return {
      showSelectDayModal: false,
      currentPeriodDates: [],
      expensesByCategories: {},
    }
  },
  computed: {
    ...mapStores(useStateStore),
    getPeriodString() {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const {start, end} = this.stateStore.period;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      let startYear;
      let endYear;
      let startMonthIndex;
      let endMonthIndex;

      if (currentDay >= start) {
        startMonthIndex = currentMonth;
      } else {
        startMonthIndex = currentMonth > 0 ? currentMonth - 1 : 11;
      }
      const startMonth = months[startMonthIndex];

      if (currentDay <= end) {
        endMonthIndex = currentMonth;
      } else {
        endMonthIndex = currentMonth < 11 ? currentMonth + 1 : 0;
      }
      const endMonth = months[endMonthIndex];

      if (startMonthIndex === 11 || endMonthIndex === 0) {
        if (currentMonth === startMonthIndex) {
          startYear = currentYear
          endYear = startYear + 1
        } else {
          endYear = currentYear
          startYear = endYear - 1
        }
      } else {
        startYear = currentYear;
        endYear = currentYear;
      }
      
      let startPeriodDate = new Date(`${startMonthIndex + 1}/${start}/${startYear}`)
      let endPeriodDate = new Date(`${endMonthIndex + 1}/${end}/${endYear}`)
      let currentPeriodDates = [];

      while (startPeriodDate <= endPeriodDate) {
        currentPeriodDates.push(startPeriodDate.toLocaleDateString('en-US'));
        startPeriodDate = new Date(startPeriodDate.setDate(startPeriodDate.getDate() + 1));
      }
      this.currentPeriodDates = currentPeriodDates;

      if (startYear === endYear) {
        return `${startMonth} ${start} - ${endMonth} ${end}, ${currentYear}`;
      } else {
        return `${startMonth} ${start} - ${endMonth} ${end}, ${startYear} - ${endYear}`;
      }
    }
  },
  watch: {
    currentPeriodDates(newValue) {
      const expensesByCategories = {}
      newValue.forEach(date => {
        const expensesByDate = this.stateStore.expensesByDates?.[date]
        if (expensesByDate) {
          expensesByDate.forEach(expense => {
            let sum = 0;
            if (expense.expenses.length > 0) {
              sum += expense.expenses.reduce((acc, current) => acc += Number(current.value), 0);
            }
            if (expensesByCategories[expense.name]) {
              expensesByCategories[expense.name] += sum;
            } else {
              expensesByCategories[expense.name] = sum;
            }
          })
        }
      });
      this.expensesByCategories = expensesByCategories;
    }
  },
  methods: { 
    onPaymentStatusChange(event, category, index) {
      const newValue = event.target.checked;
      this.stateStore.changePaymentStatus(category, index, newValue);
    }
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
}
</style>
