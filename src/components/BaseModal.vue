<template>
  <div class="base-modal">
    <div class="base-modal__inner" ref="inner">
      <div class="base-modal__header">
        <div class="base-modal__prepend" />
        <div class="title">
          <slot name="title" />
        </div>
        <div class="base-modal__append" @click="$emit('close')">
          <img src="/icon-cross.svg" alt="close" />
        </div>
      </div>
      <BaseDivider />
      <div class="base-modal__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script>
import BaseDivider from './BaseDivider.vue';
import { onClickOutside } from '@vueuse/core';

export default {
  name: "BaseModal",
  components: {
    BaseDivider
  },
  mounted() {
    onClickOutside(this.$refs.inner, () => {
      this.$emit('close');
    });
  }
}
</script>
<style lang="scss">
.base-modal {
  position: fixed;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: var(--color-black-30);
  padding: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background-color: var(--color-white);
    border-radius: 16px;
    padding: 0 16px 16px;
    width: 100%;
    max-height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__prepend, &__append {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__content {
    overflow: auto;
  }
}
</style>
