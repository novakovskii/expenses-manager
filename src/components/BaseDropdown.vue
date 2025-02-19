<template>
  <div class="base-dropdown">
    <div 
      class="base-dropdown__activator" 
      ref="activator"
      @click="toggleMenu"
    >
      <slot name="activator" />
    </div>
    <div v-show="isVisible" ref="menu" class="base-dropdown__menu">
      <slot name="menu" />
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core';

export default {
  name: "BaseDropdown",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isVisible = !this.isVisible;
      if (this.isVisible) {
        this.$nextTick(() => {
          this.updatePosition();
          onClickOutside(this.$refs.menu, () => {
            this.isVisible = false;
          });
        });
      }
    },
    updatePosition() {
      this.$refs.menu.style.position = 'absolute';
      this.$refs.menu.style.right = `${0}px`;
      this.$refs.menu.style.top = `${this.$refs.activator.getBoundingClientRect().bottom + 16}px`;
    },
  },
};
</script>

<style lang="scss">
.base-dropdown {


  &__menu {
    padding: 16px;
    border-radius: 16px;
    background-color: var(--color-white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
  }
}
</style>
