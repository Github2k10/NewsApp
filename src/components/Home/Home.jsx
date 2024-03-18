import React, { useEffect, useState } from "react";

import { Navbar, LoadingPage } from "../index";
import useFetch from "../../services/FetchNews";
import "./Home.scss";

const newsApi =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14";

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
  const [page, setPage] = useState(1);
  const [showNews, setShowNews] = useState([]);

  useEffect(() => {
    if (news) {
      console.log(page);
      setShowNews(news.slice((page - 1) * 10, page * 10));
    }
  }, [news, page]);

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="news-loader">
          {news ? (
            showNews.map((article) => (
              <div className="news" key={article.title + article.publishedAt}>
                <img className="news-img" src={article.urlToImage} alt="" />
                <h2 className="news-title poppins-regular">{article.title}</h2>
                <p className="news-description poppins-light">
                  {article.description}
                </p>
                <div className="news-details">
                  <p className="view poppins-light">Read More</p>
                  <p className="date poppins-light">
                    {changeDate(article.publishedAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <LoadingPage />
          )}

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

        <div className="news-recent"></div>
      </div>
    </>
  );
};

export default Home;
