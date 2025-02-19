<template>
  <div class="base-dashboard-card">
    <div class="base-dashboard-card__icon">
      <img :src="`/icon-${iconName}.png`" />
    </div>
    <div class="base-dashboard-card__text">
      <div class="base-dashboard-card__name">{{ `${name[0].toUpperCase()}${name.slice(1)}` }}</div>
      <div class="base-dashboard-card__number">
        {{ type === 'expense' ? getFormatedNumber(limit - spent) : getFormatedNumber(limit) }} 
        <span class="base-dashboard-card__suffix">₽</span>
      </div>
    </div>
    <div class="base-dashboard-card__status">
      <div v-if="type === 'expense'" class="base-dashboard-card__progressbar">
        <BaseProgressbar 
          :max="limit"
          :used="limit - spent"
        />
      </div>
      <div v-else class="base-dashboard-card__checkbox">
        <BaseCheckbox 
          :value="innerValue"
          @change="onPaymentStatusChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BaseProgressbar from './BaseProgressbar.vue';
import BaseCheckbox from './BaseCheckbox.vue';

export default {
  name: "BaseDashboardCard",
  props: {
    name: String,
    iconName: String,
    type: String,
    limit: Number,
    spent: Number,
    paid: Boolean,
  },
  components: {
    BaseProgressbar,
    BaseCheckbox,
  },
  computed: {
    innerValue: {
      get() {
        return this.paid;
      }
    }
  },
  methods: {
    getFormatedNumber(num) {
      return Intl.NumberFormat("ru-RU").format(num)
    },
    onPaymentStatusChange(e) {
      this.$emit('paymentStatusChange', e);
    }
  }
}
</script>
<style lang="scss">
.base-dashboard-card {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
  // display: flex;
  // align-items: center;
  padding: 16px;
  gap: 16px;
  background-color: var(--color-white);
  border-radius: 16px;

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
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    font-size: 14px;
    color: var(--color-grey-1);
  }

  &__number {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-black);
  }

  &__suffix {
    color: var(--color-grey-1);
  }

  &__status {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__progressbar {
    width: 100%;
  }

  &__checkbox {
    
  }
}
</style>
