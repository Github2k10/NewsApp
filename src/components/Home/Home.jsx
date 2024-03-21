import React, { useEffect, useState } from "react";

import { Navbar, LoadingPage, NewsItem } from "../index";
import useFetch from "../../services/FetchNews";
import changeDate from "../../services/ChangeDate";
import Pagination from "../Pagination/Pagination";
import images from "../../assets/images";
import "./Home.scss";

const newsApi =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const topHeading =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const Home = () => {
  const data = useFetch(newsApi);
  const news = data[0].articles;
  const recentPost = useFetch(topHeading)[0].articles;

  const [page, setPage] = useState(0);
  const [showNews, setShowNews] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (news) {
      setShowNews(news.slice(page, page + 5));
    }
  }, [news, page]);

  useEffect(() => {
    if (recentPost) {
      setRecent(recentPost.slice(0, 5));
    }
  }, [recentPost]);

  return (
    <>
      <Navbar />

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
