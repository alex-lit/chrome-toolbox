import md5 from 'js-md5';
import qs from 'qs';

type DefaultImage =
  | '404'
  | 'mp'
  | 'identicon'
  | 'monsterid'
  | 'wavatar'
  | 'retro'
  | 'robohash'
  | 'blank';

type Rating = 'g' | 'pg' | 'r' | 'x';

interface IOptions {
  /** Size */
  size?: number;

  /** Default Image */
  default?: string | DefaultImage;

  /** Force Default */
  forcedefault?: 'y';

  /** Rating */
  rating?: Rating;
}

/**
 * Возвращает ссылку на аватар пользователя на сервисе gravatar.com
 *
 * @example getGravatar('alex.lit@outlook.com') => '//www.gravatar.com/avatar/24d5308d195c169efe06f521be8689c3'
 * @param email Email пользователя
 * @param options Параметры запроса
 */
export default function getGravatar(
  email: string,
  options: IOptions = {},
): string {
  const defaultOptions: IOptions = {
    default: 'robohash',
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  return `//www.gravatar.com/avatar/${md5(email)}?${qs.stringify(
    mergedOptions,
  )}`;
}
