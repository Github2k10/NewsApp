import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import LoadingPage from "../LoadingPage/LoadingPage";
import NewsItem from "../NewsItem/NewsItem";
import useFetch from "../../services/FetchNews";
import Navbar from "../Navbar/Navbar";
import "./Search.scss";
import "../../style/pagination.scss";

const Search = () => {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [showNews, setShowNews] = useState([]);
  const [page, setPage] = useState(Math.random() * 10 + 1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      setKeyword(keywordParam);
    }
  }, [location.search]);

  const searchApi = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14`;

  const data = useFetch(searchApi);
  useEffect(() => {
    if (data) {
      console.log(data[0].articles);
      setNews(data[0].articles);
    }
  }, [data]);

  useEffect(() => {
    if (news) {
      const newsPerPage = (page - 1) * 6;
      setShowNews(news.slice(newsPerPage > 1 ? newsPerPage : 1, page * 6));
    }
  }, [news, page]);

  return (
    <>
      <Navbar />

      {news ? (
        <div className="news-container">
          <div className="news-articles">
            {showNews.map((item) => (
              <NewsItem article={item} />
            ))}
          </div>
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
    </>
  );
};

export default Search;
