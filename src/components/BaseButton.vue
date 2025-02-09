<template>
  <div class="base-button">
    <slot />
  </div>
</template>
<script>
export default {
  name: "BaseButton"
}
</script>
<style>
.base-button {
  background-color: var(--color-black);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
}
</style>
