import ApiImages from "./api-images";
import createImage from "./create-images";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 

const apiImages = new ApiImages();
const gallery = new SimpleLightbox('.photo-img', {captionSelector: 'img', captionsData: "alt", captionPosition: 'bottom', captionDelay: 250 });

const refs = {
    searchForm: document.getElementById('search-form'),
    imgContainer: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearchImages)
refs.loadMore.addEventListener('click', onLoadMore)

// Загрузить картинки
async function onSearchImages(e) {
    e.preventDefault();
    try {
        refs.loadMore.classList.add('is-visible');
        apiImages.resetPage()
        apiImages.searchQuery = e.currentTarget.searchQuery.value;
        clearImages()
        
        const datas = await apiImages.fetchImages();
        
        markupImages(datas.hits)
        showNotice(datas.totalHits);
        refs.loadMore.classList.remove('is-visible');
    } catch (error) {
        refs.loadMore.classList.add('is-visible');
        showNotice(error)
    }
}

// Создание разметки картинок
function markupImages(list) { 
    const markup = createImage(list);
    refs.imgContainer.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
}
// Загрузить еще
async function onLoadMore() { 
    try {
        refs.loadMore.classList.add('is-visible');
        const datas = await apiImages.fetchImages();
        refs.loadMore.classList.remove('is-visible');
        markupImages(datas.hits);
        scrollImg()
        showNotice(datas.totalHits);        
    } catch (error) {
        refs.loadMore.classList.add('is-visible');
        console.log(error)
        showNotice(error)
        
    }
}

// Очистка картинок
function clearImages() { 
    refs.imgContainer.innerHTML = "";
}

// Уведомления
function showNotice(n) { 
    if (n === 'empty') {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else if (n === 'finish') { 
        return Notify.warning("We're sorry, but you've reached the end of search results.");
    } else if (n === 'error') { 
        return Notify.failure('error');
    }
    return Notify.success(`Hooray! We found ${n} images.`);
    
}

// плавный скролл
function scrollImg() { 
    const { height: cardHeight } = refs.imgContainer.firstElementChild.getBoundingClientRect();
   
    window.scrollBy({
        top: (cardHeight * 2) - 75,
        behavior: "smooth",
    });
}




