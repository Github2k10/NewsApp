import React, { useEffect, useState } from "react";

import { LoadingPage, NewsItem } from "../index";
import useFetch from "../../services/FetchNews";
import changeDate from "../../services/ChangeDate";
import Pagination from "../Pagination/Pagination";
import images from "../../assets/images";
import "./Home.scss";
import axios from "axios";

const newsApi =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const topHeading =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const Home = () => {
  const [page, setPage] = useState(Math.random() * 20);
  const [showNews, setShowNews] = useState([]);
  const [recent, setRecent] = useState([]);
  const recentPost = useFetch(topHeading)[0].articles;
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(newsApi)
      .then((res) => setShowNews(res.data.articles.slice(page, page + 5)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setInterval(() => {
      axios
        .get(newsApi)
        .then((res) => setNews(res.data.articles))
        .catch((err) => console.log(err));

      if (news) {
        setShowNews(news.slice(page, page + 5));
      }
      return clearInterval();
    }, 1000 * 60 * 60);
  }, [news, page]);

  useEffect(() => {
    if (recentPost) {
      setRecent(recentPost.slice(0, 5));
    }
  }, [recentPost]);

  return (
    <>
      {news && recentPost ? (
        <div className="home">
          <div className="news-loader">
            {showNews.map((article) => (
              <NewsItem article={article} key={article.title} />
            ))}

            <Pagination
              page={page}
              setPage={setPage}
              length={news.length}
              noOfPage={5}
            />
          </div>

          <div className="news-recent">
            <p className="rec">Recent Posts</p>

            {recent.map((news) => (
              <a
                className="rec-news"
                href={news.url}
                target="_blank"
                key={news.title}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={news.urlToImage || images.noImage}
                  onError={(e) => (e.target.src = images.noImage)}
                  alt={news.title}
                />
                <div className="rec-details">
                  <h1>{news.title}</h1>
                  <p>{changeDate(news.publishedAt)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Home;
