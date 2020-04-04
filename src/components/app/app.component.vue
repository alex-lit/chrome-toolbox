<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';

  import { CardLocation, CardUserInfo } from '@/components/cards';

  @Component({
    components: {
      CardUserInfo,
      CardLocation,
    },
  })
  export default class App extends Vue {
    /**
     * Информация о текущей геолокации пользователя
     */
    info: { [key: string]: any } = {};

    /**
     * Предупреждение о том что локация пользователя находится в России
     */
    get isDanger(): boolean {
      // eslint-disable-next-line camelcase
      return this.info?.country_code2 === 'RU';
    }

    @Watch('isDanger')
    onDanger(newValue) {
      if (newValue) {
        this.$alert(
          'Ваш IP находится в России, проверьте VPN подключение',
          'Внимание!',
          {
            confirmButtonText: 'Вот черт...',
            type: 'error',
          },
        );
      }
    }

    created() {
      fetch(
        'https://api.ipgeolocation.io/ipgeo?apiKey=867fb994ce904555b8ab1d42e1b1a59b&lang=ru',
      )
        .then(response => response.json())
        .then(data => {
          this.info = data;
        });
    }
  }
</script>

<template>
  <div id="app" class="app">
    <card-user-info></card-user-info>

    <card-location
      :info="{
        Страна: info.country_name,
        Город: info.city,
        Район: info.district,
        'Код страны': info.country_code2,
        country_flag: info.country_flag,
      }"
    ></card-location>
  </div>
</template>

<style lang="postcss">
  .app {
    display: grid;
    min-height: 100vh;
    align-items: flex-start;
    padding: 40px;
    background-color: var(--gray--100);
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
</style>
