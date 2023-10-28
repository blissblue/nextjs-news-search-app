import axios from "axios";
import { useState, useEffect } from "react";

export async function getNewsData() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=111d0fca13b04500a9bdfa4e5bceb449`
      );
      setArticles(response.data.articles);
    };
    fetchNewsData();
  }, [search]);
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news..."
      />
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <img src={article.urlToImage} alt={article.title} />
          <p>{article.description}</p>
          <a href={article.url}>Read more</a>
        </div>
      ))}
    </div>
  );
}

// https://newsapi.org/v2/everything?q=tesla&from=2023-09-26&sortBy=publishedAt&apiKey=111d0fca13b04500a9bdfa4e5bceb449
