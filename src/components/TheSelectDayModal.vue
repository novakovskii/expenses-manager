<template>
  <BaseModal 
    @close="$emit('close')"
  >
    <template #title>Select day</template>
    <template #content>
      <div id="datepicker-wrapper" class="datepicker-wrapper" />
    </template>
  </BaseModal>
</template>
<script>
import BaseModal from '../components/BaseModal.vue';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

export default {
  name: "TheSelectDayModal",
  components: {
    BaseModal
  },
  props: {
    minDate: String,
    maxDate: String,
  },
  mounted() {
    new AirDatepicker('#datepicker-wrapper', {
      locale: localeEn,
      firstDay: 1,
      minDate: this.minDate,
      maxDate: this.maxDate,
      onSelect: ({date}) => {
        this.$router.push({name: 'expenses', query: { date }})
      }
    })
  }
}
</script>
<style lang="scss">
.datepicker-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
  zoom: 1.2;
}

.air-datepicker {
  border: none;
  font-family: 'Inter';
}

.air-datepicker-nav {
  border-bottom: none;
}

.air-datepicker-body--day-name {
  color: var(--color-black);
  font-weight: 700;
}

.-selected-  {
  background-color: var(--color-red) !important;
}

.-current- {
  background-color: var(--color-red) !important;
  color: var(--color-white) !important;
}

.-selected-.-current- {
  color: var(--color-white) !important;
}
</style>
