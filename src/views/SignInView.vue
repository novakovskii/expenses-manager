<template>
  <div class="the-sign-in">
    <div 
      class="the-sign-in__button"
      @click="handleAuthClick"
    >
      <div class="the-sign-in__button-icon">
        <img src="/icon-google.svg" alt="google" />
      </div>
      Sign in with Google
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStateStore } from '../store/state'

export default {
  name: "SignInView",
  data() {
    return {
      tokenClient: null,
    };
  },
  computed: {
    ...mapStores(useStateStore),
  },
  mounted() {
    this.initializeGis();
  },
  methods: {
    initializeGis() {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: '39038424307-hpllf1i3r7ulut6nt5429uk2qqbmef63.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        callback: (tokenResponse) => {
          if (tokenResponse && tokenResponse.access_token) {
            this.stateStore.setAccessToken(tokenResponse.access_token);
            this.stateStore.fetchUser();
            this.$router.push({name: 'dashboard'});
          }
        },
      });
    },
    handleAuthClick() {
      this.tokenClient.requestAccessToken({ prompt: '' });
    },
    
    // async fetchSheetData() {
    //   try {
    //     const response = await fetch(
    //       'https://sheets.googleapis.com/v4/spreadsheets/1YixRyyeL50Z5ZeN3hL3D4qe-W0zU3PRlocO8gWdYcl0/values/B2:G32',
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.accessToken}`,
    //         },
    //       }
    //     );
    //     const data = await response.json();
    //     this.sheetData = data.values;
    //   } catch (error) {
    //     console.error('Ошибка при получении данных из Google Sheets:', error);
    //   }
    // },
  },
};
</script>

<style lang="scss">
.the-sign-in {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__button {
    display: inline-flex;
    align-items: center;
    padding: 16px 32px 16px;
    background-color: var(--color-white);
    gap: 32px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    color: var(--color-grey-1);
  }
}
</style>
