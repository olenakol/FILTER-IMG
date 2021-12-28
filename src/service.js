export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImage(searchQuery) {
    const response = await fetch(
      `https://pixabay.com/api/?key=24982514-b6b9b361a615e243abfbdf1fa&q=${this.searchQuery}&image_type=photo$safesearch=true&orientation=horizontal&page=${this.page}`,
    );
    const newCard = await response.json();
    this.incrementPage();
    return newCard;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
