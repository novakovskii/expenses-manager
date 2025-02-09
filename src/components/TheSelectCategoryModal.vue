<template>
  <BaseModal 
    @close="$emit('close')"
    class="the-select-category-modal"
  >
    <template #title>Select category</template>
    <template #content>
      <div class="the-select-category-modal__category-list">
        <div 
          class="the-select-category-modal__category-item"
          v-for="(category, idx) in restCategories"
          :key="idx"
          @click="onCategoryClick(category)"
        >
          <div class="the-select-category-modal__category-item-icon">
            <img :src="`/icon-${category.name}.png`" />
          </div>
          <div class="the-select-category-modal__category-item-name">{{ category.displayName }}</div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
<script>
import BaseModal from '../components/BaseModal.vue';

export default {
  name: "TheSelectCategoryModal",
  props: {
    categories: Array,
    usedCategories: Array
  },
  components: {
    BaseModal
  },
  computed: {
    restCategories() {
      const usedCategoriesNames = this.usedCategories?.map(category => category.name) || [];
      return this.categories.filter(category => !usedCategoriesNames.includes(category.name));
    }
  },
  methods: {
    onCategoryClick(category) {
      this.$emit('addCategory', {category});
      this.$emit('close');
    }
  }
}
</script>
<style lang="scss">
.the-select-category-modal {


  &__category-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  &__category-item {
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    padding: 8px;
    background-color: var(--color-grey-4);
    cursor: pointer;
  }

  &__category-item-icon {
    width: 42px;
    height: 42px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__category-item-name {
    font-size: 14px;
    color: var(--color-black);
  }
}
</style>
