<template>
  <div class="base-expense-card">
    <div class="base-expense-card__header">
      <div class="base-expense-card__icon">
        <img :src="`/icon-${name}.png`" />
      </div>
      <div class="base-expense-card__text">
        <div class="base-expense-card__name">{{ displayName }}</div>
        <div class="base-expense-card__number">
          - {{ getFormatedNumber(sum) }} 
          <span class="base-expense-card__suffix">₽</span>
        </div>
      </div>
    </div>
    <BaseDivider v-if="expenses.length" />
    <div class="base-expense-card__content">
      <div 
        v-for="(expense, idx) in expenses"
        :key="idx"
        class="base-expense-card__expense"
      >
        <div class="base-expense-card__expense-name">{{ expense.name }}</div>
        <div class="base-expense-card__expense-value">
          - {{ expense.value }} 
          <span class="base-expense-card__expense-suffix">₽</span>
        </div>
      </div>
      <div
        v-if="inEditing"
        class="base-expense-card__expense"
      >
        <div class="base-expense-card__expense-name">
          <input 
            type="text"
            ref="name"
            v-model="expenseName"
            @blur="handleBlur"
          >
        </div>
        <div class="base-expense-card__expense-value">
          <input 
            type="text" 
            ref="value"
            v-model="expenseValue"
            @blur="handleBlur"
          >
          <span class="base-expense-card__expense-suffix">₽</span>
        </div>
      </div>
    </div>
    <div 
      class="base-expense-card__add-button"
      @click="startEditing"
    >
      <img src="/icon-plus.svg" alt="add" />
    </div>
  </div>
</template>
<script>
import BaseDivider from './BaseDivider.vue';

export default {
  name: "BaseExpenseCard",
  props: {
    name: String,
    displayName: String,
    expenses: Array,
  },
  components: {
    BaseDivider
  },
  data () {
    return {
      inEditing: false,
      expenseName: '',
      expenseValue: 0,
    }
  },
  computed: {
    sum() {
      return this.expenses.reduce((acc, expense) => acc += Number(expense.value), 0);
    }
  },
  methods: {
    getFormatedNumber(num) {
      return Intl.NumberFormat("ru-RU").format(num)
    },
    startEditing() {
      this.inEditing = true;
      this.$nextTick(() => {
        this.$refs.name.focus();
      })
    },
    handleBlur(e) {
      if (e.relatedTarget === this.$refs.name || e.relatedTarget === this.$refs.value) return
      if (this.expenseName) {
        this.$emit('addExpense', {
          name: this.expenseName,
          value:  this.expenseValue
        });
      }
      this.expenseName = '';
      this.expenseValue = 0;
      this.inEditing = false;
    }
  }
}
</script>
<style lang="scss">
.base-expense-card {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  background-color: var(--color-white);
  border-radius: 16px;

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
  }

  &__icon {
    width: 42px;
    height: 42px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  &__name {
    font-size: 14px;
    color: var(--color-grey-1);
    flex: 1;
  }

  &__number {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-black);
  }

  &__suffix {
    color: var(--color-grey-1);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__expense {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--color-black);
    gap: 16px;
  }

  &__expense-name {
    flex: 1;

    input {
      font-size: 14px;
      color: var(--color-black);
      font-family: 'Inter';
      border: none;
      background: none;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--color-grey-2);
      border-radius: 4px;
      &:focus {
        outline: none;
      }
    }
  }

  &__expense-value {

    input {
      font-size: 14px;
      color: var(--color-black);
      font-family: 'Inter';
      border: none;
      background: none;
      text-align: right;
      width: 80px;
      box-sizing: border-box;
      border: 1px solid var(--color-grey-2);
      border-radius: 4px;
      &:focus {
        outline: none;
      }
    }
  }

  &__expense-suffix {
    color: var(--color-grey-1);
  }

  &__add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    cursor: pointer;
    align-self: center;
  }
}
</style>
