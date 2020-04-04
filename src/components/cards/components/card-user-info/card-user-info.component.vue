<script lang="ts">
  import { get } from 'lodash';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import ParallaxImage from '@/components/parallax-image';
  import { WrapperButtons } from '@/components/wrappers';
  import { getGravatar, openNewWindow } from '@/utils';

  @Component<CardUserInfo>({
    components: {
      WrapperButtons,
      ParallaxImage,
    },
  })
  export default class CardUserInfo extends Vue {
    getGravatar = getGravatar;

    openNewWindow = openNewWindow;

    /**
     * Отображение футера
     */
    @Prop({ type: Boolean, default: false })
    showFooter!: boolean;

    /**
     * Размер аватара, px
     */
    avatarSize: number = 100;

    get = get;
  }
</script>

<template>
  <el-card
    class="card-user-info"
    :style="{ '--avatar-size': `${avatarSize}px` }"
  >
    <parallax-image ignore-darkmode height="180px"></parallax-image>

    <article class="card-user-info__content">
      <figure class="card-user-info__short-promo">
        <div class="card-user-info__avatar">
          <el-tooltip effect="dark" content="Изменить аватар" :open-delay="300">
            <button
              class="card-user-info__avatar-overlay"
              @click="openNewWindow('//ru.gravatar.com/')"
            >
              <i class="el-icon-plus"></i>
            </button>
          </el-tooltip>

          <el-avatar
            :src="getGravatar('alex.lit@outlook.com', { size: avatarSize })"
            :size="avatarSize"
          ></el-avatar>
        </div>
        <figcaption class="card-user-info__caption">
          <p class="card-user-info__name">
            Алексей Литовченко
          </p>
          <p class="card-user-info__role">
            <i class="el-icon-user"></i>
            Front-end developer
          </p>
        </figcaption>
      </figure>

      <table class="card-user-info__table typography">
        <tbody>
          <tr>
            <th>
              Компания
            </th>
            <td>
              <a href="https://softmedialab.com/ru/" target="_blank"
                >SoftMediaLab</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </article>
    <footer v-if="showFooter" class="card-user-info__footer">
      <wrapper-buttons direction="right"> </wrapper-buttons>
    </footer>
  </el-card>
</template>

<style lang="postcss" scoped>
  .card-user-info.el-card {
    position: relative;
    min-width: 320px;

    @media screen and (--mobile) {
      max-width: initial;
    }

    & >>> .el-card__body {
      padding: 0;
    }
  }

  .card-user-info__content {
    position: relative;
    z-index: 1;
    padding: 0 20px 20px;
    margin-top: calc(-1 * var(--avatar-size) / 2);
  }

  .card-user-info__short-promo {
    display: grid;
    margin-bottom: 20px;
    grid-column-gap: 10px;
    grid-template-areas:
      'avatar empty'
      'avatar caption';
    grid-template-columns: var(--avatar-size) 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .card-user-info__avatar {
    position: relative;
    overflow: hidden;
    width: var(--avatar-size);
    height: var(--avatar-size);
    border: 2px solid var(--white);
    border-radius: 50%;
    grid-area: avatar;
  }

  .card-user-info__avatar-overlay {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--gray--900);
    color: var(--white);
    cursor: pointer;
    opacity: 0;
    transition-duration: 0.3s;

    @nest .card-user-info__avatar:hover & {
      opacity: 0.6;
    }
  }

  .card-user-info__caption {
    overflow: hidden;
    grid-area: caption;
  }

  .card-user-info__name {
    overflow: hidden;
    color: var(--gray--800);
    font-weight: 400;
    line-height: calc(var(--avatar-size) / 2 * (2 / 3));
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-user-info__role {
    overflow: hidden;
    color: var(--gray--600);
    font-size: 12px;
    font-weight: 400;
    line-height: calc(var(--avatar-size) / 2 * (1 / 3));
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-user-info__table {
    width: 100%;
    font-size: 14px;
    text-align: left;

    & th {
      padding: 5px 10px 5px 0;
      font-weight: 400;
      vertical-align: top;
    }

    & td {
      padding: 5px 0 5px 0;
      color: var(--gray--700);
    }
  }

  .card-user-info__footer {
    padding: 10px 20px;
    border-top: 1px solid var(--gray--200);
  }
</style>
