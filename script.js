import { getNews, getSearchNews } from './api.js';

const newsSearchInput = document.getElementById('newsSearchInput');
const contentWrapper = document.getElementById('contentWrapper');

getNews().then(data => renderNews(data.articles));

function renderNews(newsdata) {
    contentWrapper.innerHTML = ""; 
    newsdata.forEach(news => {
        const defaultImage='./default.png'
        const data = {
            urlImage: news.urlToImage ?? defaultImage,
            date: new Date(news.publishedAt).toDateString(),
            title: news.title || "No Title Available",
            description: news.description || "No Description",
            url: news.url || "#"
        };

        const card = `
            <div class="card">
                <div class="card-image-wrapper">
                    <img src="${data.urlImage}" alt="Card Image">
                </div>
                <div class="card-content">
                    <span class="card-date">${data.date}</span>
                    <h2 class="card-title">
                        <a href="${data.url}" target="_blank">${data.title}</a>
                    </h2>
                    <p class="card-description">${data.description}</p>
                </div>
            </div>
        `;

        contentWrapper.insertAdjacentHTML('beforeend', card);
    });
}

let searchTimeout;
newsSearchInput.addEventListener("input", event => {
    // clearTimeout(searchTimeout);
    const inputSearchValue = event.target.value.trim();

    contentWrapper.innerHTML=''
    if (inputSearchValue==''){
        getNews().then(data => 
            renderNews(data.articles))
    }
    else{
        getSearchNews(inputSearchValue).then(
            data => renderNews(data.articles));
    
    }
});
