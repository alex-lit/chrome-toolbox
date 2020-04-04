/**
 * Открывает новое окно с указанным адресом
 *
 * @param link Адрес
 */
export default function openNewWindow(link: string): void {
  if (link) {
    window.open(link, 'newwindow', 'width=1240, height=720');
  }
}
