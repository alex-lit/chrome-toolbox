<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component<WrapperButtons>({})
  export default class WrapperButtons extends Vue {
    /**
     * Расположение кнопок
     */
    @Prop({ type: String, default: 'left' })
    direction!: 'left' | 'right';
  }
</script>

<template>
  <nav :class="['wrapper-buttons', `wrapper-buttons--direction--${direction}`]">
    <!-- slot:default -->
    <slot></slot>
    <!-- /slot:default -->
  </nav>
</template>

<style lang="postcss" scoped>
  .wrapper-buttons {
    position: relative;
    display: flex;
    width: calc(100% + 10px);
    flex-wrap: wrap;
    align-items: flex-start;
    margin: -5px;

    @media screen and (--mobile) {
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;

      & >>> * {
        & .el-button {
          width: 100%;
        }
      }
    }

    &--direction {
      &--left {
        justify-content: flex-start;

        @media screen and (--mobile) {
          justify-content: stretch;
        }
      }

      &--right {
        justify-content: flex-end;

        @media screen and (--mobile) {
          flex-direction: column-reverse;
        }
      }
    }

    & > *,
    & > .el-button {
      margin: 5px;

      @media screen and (--mobile) {
        margin: 5px 5px;
      }
    }
  }
</style>
