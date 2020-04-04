<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class CardLocation extends Vue {
    /**
     * Входные данные
     */
    @Prop({
      type: Object,
      default() {
        return {};
      },
    })
    info!: { [key: string]: any };
  }
</script>

<template>
  <el-card class="card-location">
    <template #header>
      <header class="card-location__header">
        <p class="card-location__title">
          Текущее расположение
        </p>
        <el-avatar :size="32" :src="info.country_flag"></el-avatar>
      </header>
    </template>
    <article
      v-if="Object.keys(info).length"
      class="card-location__content typography"
    >
      <dl>
        <template v-for="(value, key) in info">
          <div
            v-if="key !== 'country_flag'"
            :key="key"
            class="card-location__content-item"
          >
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </template>
      </dl>
    </article>

    <el-alert
      v-else
      title="Нет данных"
      show-icon
      type="warning"
      :closable="false"
    >
    </el-alert>
  </el-card>
</template>

<style lang="postcss" scoped>
  .card-location.el-card {
    position: relative;
    min-width: 320px;
  }

  .card-location__header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .card-location__title {
  }

  .card-location__content {
    font-size: 14px;
  }

  .card-location__content-item {
  }
</style>
