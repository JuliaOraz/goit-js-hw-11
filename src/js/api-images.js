import axios from "axios";

export default class ApiImages { 
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
        this.limit = 40;
    }

    async fetchImages() { 
        
        const API_KEY = '29177947-674c6129c973bef5742ba95fc';
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.limit}`;
    
        try {
            const response = await axios.get(url);
            let images = response.data;
            this.totalPages = Math.ceil(response.data.total / this.limit);
            if (this.page > 1 && this.page > this.totalPages) {
                return Promise.reject('finish');
            }
            this.incrementPage();
            if (images.hits.length === 0) {
                return Promise.reject('empty');
                 
            } 

            return images;
            
        } catch (error) {
            if (error.response.status === 400) { 
                return Promise.reject('finish');
            }
            return  Promise.reject('error');
        }
    
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

    set(newQuery) { 
        this.searchQuery = newQuery;
    }
}