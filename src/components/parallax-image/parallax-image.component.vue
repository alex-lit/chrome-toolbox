<script lang="ts">
  import { jarallax } from 'jarallax';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component<ParallaxImage>({})
  export default class ParallaxImage extends Vue {
    /**
     * Ширина
     */
    @Prop({ type: String, default: '100%' })
    width!: string;

    /**
     * Высота
     */
    @Prop({ type: String, default: '300px' })
    height!: string;

    /**
     * Фоновое изображение
     */
    @Prop({
      type: String,
      default() {
        return require('@/assets/media/images/sidebar-background.jpg');
      },
    })
    image!: string;

    /**
     * Отображение оверлея
     */
    @Prop({ type: Boolean, default: true })
    showOverlay!: boolean;

    /**
     * CSS стиль оверлея
     */
    @Prop({
      type: Object,
      default() {
        return {
          'background-image':
            'linear-gradient(45deg, var(--deep-orange), var(--amber))',
          opacity: '0.8',
        };
      },
    })
    overlayStyle!: { [key: string]: string };

    /**
     * Параметры параллакса
     */
    @Prop({
      type: Object,
      default() {
        return {
          speed: 0.6,
        };
      },
    })
    config!: { [key: string]: any };

    /**
     * Инициализация параллакса
     */
    initParallax(): void {
      try {
        jarallax(this.$el, this.config);
      } catch (error) {
        console.warn(error);
      }
    }

    mounted() {
      this.initParallax();
    }
  }
</script>

<template>
  <figure
    class="parallax-image"
    :style="{
      '--width': width,
      '--height': height,
      '--image': `url('${image}')`,
    }"
  >
    <div
      v-if="showOverlay"
      class="parallax-image__overlay"
      :style="overlayStyle"
    ></div>
    <figcaption class="parallax-image__caption">
      <!-- slot:default -->
      <slot></slot>
      <!-- /slot:default -->
    </figcaption>
  </figure>
</template>

<style lang="postcss" scoped>
  .parallax-image {
    position: relative;
    width: var(--width);
    height: var(--height);
    background-image: var(--image);
    background-size: 0;
  }

  .parallax-image__overlay {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
  }

  .parallax-image__caption {
    position: relative;
    z-index: 1;
  }
</style>
