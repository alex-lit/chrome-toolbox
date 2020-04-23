<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    /**
     * Информация о текущей геолокации пользователя
     */
    info: { [key: string]: any } = {};

    /**
     * Статус опроса
     */
    status: 'notInit' | 'pending' | 'end' = 'notInit';

    /**
     * Предупреждение о том что локация пользователя находится в России
     */
    get isDanger(): boolean {
      // eslint-disable-next-line camelcase
      return ['Севастополь', 'Sevastopol', 'Sebastopol'].includes(
        this.info?.city,
      );
    }

    /**
     * Цвет заливки фона
     */
    get background(): string {
      const neutral = 'linear-gradient(45deg, var(--gray), var(--blue-gray))';
      const danger = 'linear-gradient(45deg, var(--red), var(--deep-orange))';
      const success = 'linear-gradient(45deg, var(--green), var(--lime))';

      switch (this.status) {
        case 'notInit':
          return neutral;
        case 'pending':
          return neutral;
        case 'end':
          return this.isDanger ? danger : success;

        default:
          return neutral;
      }
    }

    /**
     * Получает данные
     */
    getData() {
      this.status = 'pending';
      fetch(
        'https://api.ipgeolocation.io/ipgeo?apiKey=867fb994ce904555b8ab1d42e1b1a59b&lang=ru',
      )
        .then((response) => response.json())
        .then((data) => {
          this.info = data;
        })
        .finally(() => {
          this.status = 'end';
        });
    }

    created() {
      this.getData();
    }
  }
</script>

<template>
  <div
    id="app"
    v-loading="status !== 'end'"
    class="app"
    :style="{ backgroundImage: background }"
  >
    <header v-if="status !== 'end'" class="app__heading">
      <i class="app__heading-smile">
        ...
      </i>
      <p class="app__heading-title">
        Проверка VPN подключения...
      </p>
      <p class="app__heading-subtitle">
        ...
      </p>
    </header>
    <header v-else class="app__heading">
      <i class="app__heading-smile">
        {{ isDanger ? ':(' : ':)' }}
      </i>
      <p class="app__heading-title">
        {{ isDanger ? 'VPN не подключен' : 'VPN подключен' }}
      </p>
      <p class="app__heading-subtitle">
        <i class="el-icon-map-location"></i>
        {{ info.country_name }}, {{ info.city }}
      </p>
    </header>
  </div>
</template>

<style lang="postcss">
  .app {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: var(--gray--100);
    transition-duration: 0.3s;
  }

  .app__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--white);
  }

  .app__heading-smile {
    display: block;
    margin-bottom: 0.2em;
    font-size: 24vmin;
    font-style: normal;
  }

  .app__heading-title {
    margin-bottom: 0.3em;
    font-size: 8vmin;
  }

  .app__heading-subtitle {
    font-size: 1rem;
    opacity: 0.8;
  }
</style>
