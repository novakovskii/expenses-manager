<template>
  <div 
    class="base-progressbar"
    :style="{backgroundColor: backgroundColor}"
  >
    <div 
      class="base-progressbar__bar"
      :class="{
        'base-progressbar__bar--yellow': usedPercent > 25 && usedPercent <= 50,
        'base-progressbar__bar--red': usedPercent <= 25 || used <= 0
      }"
      :style="{
        width: used > 0 ? `${used * 100 / max}%` : showEmptyBar ? '0' : '100%',
        backgroundColor: barColor
      }" 
      ref="bar"
    />
  </div>
</template>
<script>
export default {
  name: "BaseProgressbar",
  props: {
    max: Number,
    used: Number,
    backgroundColor: {
      type: String,
      default: 'var(--color-grey-4)'
    },
    barColor: String,
    showEmptyBar: Boolean
  },
  computed: {
    usedPercent() {
      return this.used * 100 / this.max;
    }
  }
}
</script>
<style lang="scss">
.base-progressbar {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;

  &__bar{
    height: 100%;
    background-color: var(--color-green-2);

    &--yellow {
      background-color: var(--color-yellow);
    }

    &--red {
      background-color: var(--color-red);
    }
  }
}
</style>
