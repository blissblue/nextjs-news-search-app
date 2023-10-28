import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const fetchNewsData = async () => {
      const formattedDate = format(startDate, "yyyy-MM-dd");
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&from=${formattedDate}&apiKey=111d0fca13b04500a9bdfa4e5bceb449`
      );
      setArticles(response.data.articles);
    };
    fetchNewsData();
  }, [search, startDate]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search news..."
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
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

// export async function getStaticProps() {
//   const response = await axios.get(
//     `https://newsapi.org/v2/everything?q=${search}&from=${formattedDate}&apiKey=111d0fca13b04500a9bdfa4e5bceb449`
//   );
//   return {
//     props: {
//       initialArticles: response.data.articles,
//     },
//     revalidate: 50, // Optional: Re-generate the data every 10 seconds
//   };
// }
