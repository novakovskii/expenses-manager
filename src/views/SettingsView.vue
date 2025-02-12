<template>
  <TheHeader
    prepend-route-name="dashboard"
  >
    <template #prepend>
      <img src="/icon-chevron-left.svg" alt="back" />
    </template>
    <template #title>
      Settings
    </template>
  </TheHeader>
  <div class="the-settings">
    <div class="the-settings__subtitle">Common</div>
    <div class="the-settings__card">
      <BaseSettingsOption
        name="period"
        display-name="Period"
        type="range"
        suffix="day"
        :value="stateStore.period"
        @optionChange="onPeriodChange"
      />
      <BaseSettingsOption
        name="total-budget"
        display-name="Total budget"
        :value="stateStore.totalBudget"
        @optionChange="onTotalBudgetChange"
      />
      <BaseSettingsOption
        name="remainder"
        display-name="Remainder"
        :value="remainderValue"
        readonly
      />
    </div>
    <div class="the-settings__subtitle">Expenses budget</div>
    <div class="the-settings__card">
      <BaseSettingsOption
        v-for="(expense, idx) in stateStore.expenses"
        :key="idx"
        :name="expense.name"
        :display-name="expense.displayName"
        :value="expense.limit"
        @optionChange="onOptionChange($event, 'expenses', idx)"
      />
    </div>
    <div class="the-settings__subtitle">Deposits budget</div>
    <div class="the-settings__card">
      <BaseSettingsOption
        v-for="(deposit, idx) in stateStore.deposits"
        :key="idx"
        :name="deposit.name"
        :display-name="deposit.displayName"
        :value="deposit.limit"
        @optionChange="onOptionChange($event, 'deposits', idx)"
      />
    </div>
    <div class="the-settings__subtitle">Mandatory payments budget</div>
    <div class="the-settings__card">
      <BaseSettingsOption
        v-for="(mandatoryPayment, idx) in stateStore.mandatoryPayments"
        :key="idx"
        :name="mandatoryPayment.name"
        :display-name="mandatoryPayment.displayName"
        :value="mandatoryPayment.limit"
        @optionChange="onOptionChange($event, 'mandatoryPayments', idx)"
      />
    </div>
  </div>
</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import BaseSettingsOption from '../components/BaseSettingsOption.vue';
import { mapStores } from 'pinia'
import { useStateStore } from '../store/state'

export default {
  name: "SettingsView",
  components: {
    TheHeader,
    BaseSettingsOption,
  },
  mounted() {
    
  },
  computed: {
    ...mapStores(useStateStore),
    remainderValue() {
      const totalBudget = this.stateStore.totalBudget;
      const expensesBudget = this.stateStore.expenses.reduce((acc, item) => {
        acc += Number(item.limit)
        return acc
      }, 0)
      const depositsBudget = this.stateStore.deposits.reduce((acc, item) => {
        acc += Number(item.limit)
        return acc
      }, 0)
      const mandatoryPaymentsBudget = this.stateStore.mandatoryPayments.reduce((acc, item) => {
        acc += Number(item.limit)
        return acc
      }, 0)
      return totalBudget - expensesBudget - depositsBudget - mandatoryPaymentsBudget;
    }
  },
  methods: {
    onOptionChange(event, category, index) {
      const newValue = +event.target.value;
      this.stateStore.changeOption(category, index, newValue);
    },
    onTotalBudgetChange(event) {
      const newValue = +event.target.value;
      this.stateStore.changeTotalBudget(newValue);
    },
    onPeriodChange(value) {
      const newValue = {start: +value.start, end: +value.end};
      this.stateStore.changePeriod(newValue);
    }
  }
}
</script>
<style lang="scss">
.the-settings {
  margin-top: 16px;

  &__subtitle {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-black);
  }

  &__card {
    background-color: var(--color-grey-3);
    border-radius: 16px;
    margin-top: 12px;

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}
</style>
