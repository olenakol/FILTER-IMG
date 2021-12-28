import * as lightbox from 'lightbox';

export default function appendModalImage(modalImage) {
  const instance = lightbox.create(`
      <img src=${modalImage} class="is-loaded" width="800" height="600" style="opacity: 1">
  `);
  instance.show();
}