<template>
  <div class="base-settings-option">
    <div class="base-settings-option__icon">
      <img :src="`/icon-${name}-mono.svg`" />
    </div>
    <div class="base-settings-option__name">{{ displayName }}</div>
    <div class="base-settings-option__value" :class="{'base-settings-option__value--readonly' : readonly}">
      <input 
        v-if="type === 'number'" 
        type="text" 
        class="base-settings-option__number"
        v-model="innerValue"
        :readonly="readonly"
        @change="onValueChange"
      >
      <template v-else-if="type === 'range'">
        <input 
          type="text" 
          class="base-settings-option__number  base-settings-option__number--day"
          v-model="innerValue.start"
        >
        <span class="base-settings-option__suffix">-</span>
        <input 
          type="text" 
          class="base-settings-option__number  base-settings-option__number--day"
          v-model="innerValue.end"
        >
      </template>
      <span class="base-settings-option__suffix">{{ suffix }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseSettingsOption",
  props: {
    name: String,
    displayName: String,
    type: {
      type: String,
      default: 'number'
    },
    value: [Number, Object],
    suffix: {
      type: String,
      default: '₽'
    },
    readonly: Boolean
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      }
    }
  },
  methods: {
    onValueChange(e) {
      this.$emit('optionChange', e)
    }
  }
}
</script>
<style lang="scss">
.base-settings-option {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;

    img {
      width: 70%;
      height: 70%;
    }
  }

  &__name {
    flex: 1;
    font-size: 14px;
    color: var(--color-grey-1);
  }

  &__value {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 500;

    &--readonly {
      .base-settings-option__number {
        color: var(--color-grey-1);
        pointer-events: none;
      }
    }
  }

  &__number {
    cursor: pointer;
    color: var(--color-black);
    font-size: 14px;
    font-weight: 500;
    width: 70px;
    background: none;
    border: none;
    text-align: right;
    font-family: 'Inter';
    border-radius: 4px;

    &--day {
      width: 18px;
    }

    &:focus {
      outline: 1px solid var(--color-grey-1);
    }
  }

  &__suffix {
    color: var(--color-grey-1);
  }
}
</style>
