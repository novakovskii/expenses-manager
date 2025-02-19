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
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.stateStore.setAccessToken(accessToken);
      this.checkTokenValidity(accessToken)
        .then(() => {
          this.$router.push({name: 'dashboard'})
          this.stateStore.fetchUser();
        })
        .catch(() => {
          this.$router.push({name: 'signin'})
        });
    } else {
      this.$router.push({name: 'signin'})
    }
  },
  watch: {
    'stateStore.accessToken'(newValue) {
      if (!newValue) this.$router.push({name: 'signin'});
    }
  },
  methods: {
    async checkTokenValidity(accessToken) {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Токен недействителен');
        }
      } catch (error) {
        throw error;
      }
    },
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
