<template>
  <div class="the-header">
    <div class="the-header__main-content">
      <div 
        class="the-header__prepend"
        :class="{'the-header__prepend--disabled': !$slots.prepend}"
        @click="handlePrependClick"
      >
        <slot name="prepend" />
      </div>
      <div class="title">
        <slot name="title" />
      </div>
      <div 
        class="the-header__append" 
        :class="{'the-header__append--disabled': !$slots.append}"
        @click="handleAppendClick"
      >
        <slot name="append" />
      </div>
    </div>
    <div v-if="$slots.additional" class="the-header__additional-content">
      <slot name="additional" />
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  props: {
    prependRouteName: String,
    appendRouteName: String,
  },
  methods: {
    handlePrependClick() {
      if (this.prependRouteName) {
        this.$router.push({name: this.prependRouteName})
      }
    },
    handleAppendClick() {
      if (this.appendRouteName) {
        this.$router.push({name: this.appendRouteName})
      }
    },
  }
}
</script>
<style lang="scss">
  .the-header {
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    padding: 16px 0;
    background-color: var(--color-grey-4);
    z-index: 8999;
    gap: 16px;

    &__main-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    &__prepend, &__append {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &--disabled {
        pointer-events: none;
      }
    }

    &__avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
</style>
