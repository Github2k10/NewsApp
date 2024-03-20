import React, { useEffect, useState } from "react";

import { Navbar, LoadingPage, NewsItem } from "../index";
import useFetch from "../../services/FetchNews";
import changeDate from "../../services/ChangeDate";
import "./Home.scss";
import "../../style/pagination.scss";

const newsApi =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const topHeading =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const Home = () => {
  const data = useFetch(newsApi);
  const news = data[0].articles;
  const recentPost = useFetch(topHeading)[0].articles;
  const [showNews, setShowNews] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (news) {
      const newsPerPage = (page - 1) * 5;
      setShowNews(news.slice(newsPerPage > 1 ? newsPerPage : 1, page * 5));
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

      <div className="home">
        {news ? (
          <div className="news-loader">
            {showNews.map((article) => (
              <NewsItem article={article} key={article.title} />
            ))}
            <div className="pagination">
              <button
                className="prev"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                <i className="fa-solid fa-arrow-left-long"></i>
              </button>
              <button
                className="next"
                onClick={() => {
                  if (page < Math.ceil(news.length / 10)) {
                    setPage(page + 1);
                  }
                }}
              >
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="news-recent">
          <p className="rec">Recent Posts</p>

          {recentPost ? (
            recent.map((news) => (
              <a
                className="rec-news"
                href={news.url}
                target="_blank"
                key={news.title}
                style={{ textDecoration: "none" }}
              >
                <img src={news.urlToImage} alt={news.title} />
                <div className="rec-details">
                  <h1>{news.title}</h1>
                  <p>{changeDate(news.publishedAt)}</p>
                </div>
              </a>
            ))
          ) : (
            <LoadingPage />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
