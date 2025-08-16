const API_KEY = "a544129d2efc4038bdeca6220bfcd420";
const BASE_URL = 'https://newsapi.org/v2';

export async function getNews() {
    try {
        const response = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return { articles: [] };
    }
}

export async function getSearchNews(query) {
    if (!query.trim()) return { articles: [] };

    try {
        const response = await fetch(`${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return { articles: [] };
    }
}

