import React, { useEffect, useState } from "react";

import { Navbar, LoadingPage } from "../index";
import useFetch from "../../services/FetchNews";
import "./Home.scss";

const newsApi =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const topHeading =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

const changeDate = (date) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return `${months[month - 1]} ${day}, ${year}`;
};

const Home = () => {
  const data = useFetch(newsApi);
  const news = data[0].articles;
  const recentPost = useFetch(topHeading)[0].articles;
  const [page, setPage] = useState(Math.random() * 10 + 1);
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
              <div className="news" key={article.title + article.publishedAt}>
                <img className="news-img" src={article.urlToImage} alt="" />
                <h2 className="news-title">{article.title}</h2>
                <p className="news-description">{article.description}</p>
                <div className="news-details">
                  <a href={article.url} target="_blank" className="view">
                    Read More
                  </a>
                  <p className="date">{changeDate(article.publishedAt)}</p>
                </div>
              </div>
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
          <LoadingPage />
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
