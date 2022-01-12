import myRefs from './refs';
import ImageApiService from './service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default () => {
  const refs = myRefs;
  const imageApiPictures = new ImageApiService();

  const onSearch = e => {
    e.preventDefault();
    imageApiPictures.query = e.currentTarget.elements.searchQuery.value.trim();
    if (!imageApiPictures.query) return emptyWatch();
    imageApiPictures.getImage().then(({ hits, totalHits }) => {
      cardsReset();
      if (totalHits === 0) {
        return errorWatch();
      }
      appendNewCards(hits);
      firstTotalHits(totalHits);
      if (imageApiPictures.perPage > totalHits) {
        refs.loadMoreBtn.style.display = 'none';
      } else {
        refs.loadMoreBtn.style.display = 'block';
      }
      refs.searchInput.value = '';
    });
    imageApiPictures.resetPage();
  };

  const onLoadMore = () => {
    imageApiPictures.getImage().then(({ hits, totalHits }) => {
      appendNewCards(hits);

      if (imageApiPictures.perPage * (imageApiPictures.page + 1) >= totalHits) {
        return (refs.loadMoreBtn.style.display = 'none');
      }
    });
  };

  const appendNewCards = cards => {
    refs.gallery.insertAdjacentHTML('beforeend', renderPhoto(cards));
  };

  const errorWatch = () => {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    refs.loadMoreBtn.style.display = 'none';
    refs.searchInput.value = '';
  };

  const emptyWatch = () => {
    Notify.warning('You have not entered anything');
    refs.loadMoreBtn.style.display = 'none';
    refs.searchInput.value = '';
  };

  const renderPhoto = image => {
    return image
      .map(
        ({ webformatURL, tags, likes, views, comments, downloads }) =>
          `<div class="cardItem">
          <div>
            <img
                class="gallery__img"
                src="${webformatURL}"
                alt="${tags}"
                loading="lazy"
            />
            <div class="info">
                <p class="info__item">Likes <span>${likes}</span></p>
                <p class="info__item">Views <span>${views}</span></p>
                <p class="info__item">Comments <span>${comments}</span></p>
                <p class="info__item">Downloads  <span>${downloads}</span></p>
            </div>
        </div>
        </div>`,
      )
      .join('');
  };

  const cardsReset = () => {
    refs.gallery.innerHTML = '';
  };

  const firstTotalHits = totalHits => {
    Notify.success(`Hooray! We found totalHits  ${totalHits} images.`);
  };

  refs.searchForm.addEventListener('submit', onSearch);
  refs.loadMoreBtn.addEventListener('click', onLoadMore);
};
