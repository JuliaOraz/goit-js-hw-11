const createImage = (d) => {
    return d.map(d => { 
        return `
    <div class="photo-card">
        <a href="${d.largeImageURL }" class="photo-img">
            <img src="${d.webformatURL}" alt="${d.tags}" loading="lazy" width="100%" height="270"/>
        </a>
        <div class="info">
            <p class="info-item">
            Likes <span>${d.likes}</span>
            </p>
            <p class="info-item">
            Views <span>${d.views}</span>
            </p>
            <p class="info-item">
            Comments <span>${d.comments}</span>
            </p>
            <p class="info-item">
            Downloads <span>${d.downloads}</span>
            </p>
        </div>
    </div>`
    }).join('');
    
    
} 

export default createImage;