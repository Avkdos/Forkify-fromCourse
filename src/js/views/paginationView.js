import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkUp() {
    const currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1,and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkUpButton('next');
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkUpButton('prev');
    }
    //Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkUpButton('prev') + this._generateMarkUpButton('next')
      );
    }
    //Page 1,and there aren't any pages more
    return '';
  }

  _generateMarkUpButton(dir) {
    const curPage = this._data.page;

    if (dir === 'next') {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
  `;
    }
    if (dir === 'prev') {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
  `;
    }
  }
}

export default new PaginationView();
