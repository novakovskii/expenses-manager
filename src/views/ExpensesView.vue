<template>
  <TheHeader
    prepend-route-name="dashboard"
  >
    <template #prepend>
      <img src="/icon-chevron-left.svg" alt="back" />
    </template>
    <template #title>
      {{ getDateString }}
    </template>
  </TheHeader>
  <div class="the-expenses" :class="{'the-expenses--full-height': !categoriesExist}">
    <template v-if="categoriesExist">
      <BaseExpenseCard 
        v-for="(category, idx) in categories"
        :key="idx"
        :name="category.name"
        :display-name="category.displayName"
        :expenses="category.expenses"
        @addExpense="onAddExpense($event, category.name)"
      />
    </template>
    <div v-else class="the-expenses__empty-state-text">No categories have been added yet</div>
  </div>
  <div class="spacer"></div>
  <BaseButton 
    class="the-expenses__button"
    @click="showSelectCategoryModal = true"
  >Add category</BaseButton>
  <TheSelectCategoryModal 
    v-if="showSelectCategoryModal"
    :categories="stateStore.expenses"
    :used-categories="categories"
    @close="showSelectCategoryModal = false"
    @addCategory="onAddCategory($event)"
  />
</template>
<script>
import TheHeader from '../components/TheHeader.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseExpenseCard from '../components/BaseExpenseCard.vue';
import TheSelectCategoryModal from '../components/TheSelectCategoryModal.vue';
import { mapStores } from 'pinia'
import { useStateStore } from '../store/state'

export default {
  name: "ExpensesView",
  components: {
    TheHeader,
    BaseButton,
    BaseExpenseCard,
    TheSelectCategoryModal
  },
  props: {
    date: String
  },
  data () {
    return {
      showSelectCategoryModal: false
    }
  },
  computed: {
    ...mapStores(useStateStore),
    getDateString() {
      const currentDate = new Date(this.date);
      const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); 
      return formattedDate;
    },
    dateKey() {
      const currentDate = new Date(this.date);
      return currentDate.toLocaleDateString('en-US');
    },
    categories() {
      return this.stateStore.expensesByDates?.[this.dateKey];
    },
    categoriesExist() {
      return this.categories && Object.keys(this.categories).length > 0;
    }
  },
  methods: {
    onAddExpense(e, categoryName) {
      this.stateStore.addExpense(this.dateKey, categoryName, e);
    },
    onAddCategory(e) {
      this.stateStore.addCategory(this.dateKey, e.category);
    }
  }
}
</script>
<style lang="scss">
.the-expenses {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &--full-height {
    min-height: calc(100vh - 144px);
    align-items: center;
    justify-content: center;
  }

  &__empty-state-text {
    font-size: 14px;
    color: var(--color-grey-1);
  }

  &__button {
    position: fixed;
    bottom: 16px;
    width: calc(100% - 32px);
    box-sizing: border-box;
  }
}
</style>
