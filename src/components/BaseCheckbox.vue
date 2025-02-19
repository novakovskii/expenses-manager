<template>
  <div class="base-checkbox">
    <input 
      type="checkbox" 
      :id="this.$.uid"
      :checked="value"
      @change="onChange"
    >
    <label :for="this.$.uid">
      <img src="/icon-check.svg" alt="check" />
    </label>
  </div>
</template>
<script>
export default {
  name: "BaseCheckbox",
  props: ['value'],
  emits: ['change'],
  methods: {
    onChange(e) {
      this.$emit('change', e);
    }
  }
}
</script>
<style lang="scss">
.base-checkbox {

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    border: 1px solid var(--color-grey-2);
    cursor: pointer;

    img {
      display: none;
    }
  }

  input {
    display: none;

    &:checked + label {
      border-color: var(--color-green-1);
      background-color: var(--color-green-1);

      img {
        display: block;
      }
    }
  }
}
</style>
