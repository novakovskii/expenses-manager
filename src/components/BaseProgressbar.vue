<template>
  <div 
    class="base-progressbar"
    :class="{'base-progressbar--alert': used < 0}"
  >
    <div 
      class="base-progressbar__progress"
      :style="{width: `${used * 100 / max}%`}" 
    />
  </div>
</template>
<script>
export default {
  name: "BaseProgressbar",
  props: {
    max: Number,
    used: Number
  }
}
</script>
<style lang="scss">
.base-progressbar {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: var(--color-grey-4);
  overflow: hidden;

  &--alert {
    background-color: var(--color-red);
  }

  &__progress{
    height: 100%;
    width: 100%;
    background-color: var(--color-green-2);
  }
}
</style>
