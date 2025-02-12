<template>
  <RouterView />
</template>
<script>
import { mapStores } from 'pinia'
import { useStateStore } from './store/state'

export default {
  name: "App",
  computed: {
    ...mapStores(useStateStore),

  },
  mounted() {
    this.stateStore.loadSavedData();
  }
}
</script>
<style lang="scss">
  body {
    background-color: var(--color-grey-4);
  }

  #app {
    padding: 0 16px 16px;
  }

  .spacer {
    margin-bottom: 64px;
  }
</style>
