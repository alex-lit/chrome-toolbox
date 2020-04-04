<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
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
  <div
    id="app"
    class="app"
    :style="{
      'background-color': isDanger
        ? 'var(--color--danger)'
        : 'var(--color--success)',
    }"
  >
    test 3
    {{ info }}
    <img v-if="info.country_flag" :src="info.country_flag" />
  </div>
</template>

<style lang="postcss">
  .app {
    min-height: 100vh;
    color: var(--white);
  }
</style>
