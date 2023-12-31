import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function NewsPage({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const searchNews = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
    );
    setArticles(response.data.articles);
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      const formattedDate = format(startDate, "yyyy-MM-dd");
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&from=${formattedDate}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );
      setArticles(response.data.articles);
    };
    fetchNewsData();
  }, [startDate]);

  return (
    <div className={styles.contents}>
      <form className={styles.formSt} onSubmit={searchNews}>
        <DatePicker
          className={styles.calendar}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news..."
        />

        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>
      {articles.map((article, index) => (
        <div className={styles.article} key={index}>
          <div className={styles.articleLt}>
            <img
              className={styles.imgView}
              src={article.urlToImage}
              alt={article.title}
            />
          </div>
          <div className={styles.articleRt}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url}>Read more</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  return {
    props: {
      initialArticles: response.data.articles,
    },
    revalidate: 50, // Optional: Re-generate the data every 10 seconds
  };
}
