<template>
  <RouterView />
</template>
<script>
export default {
  name: "App",
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
