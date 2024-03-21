import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import LoadingPage from "../LoadingPage/LoadingPage";
import NewsItem from "../NewsItem/NewsItem";
import useFetch from "../../services/FetchNews";
import Pagination from "../Pagination/Pagination";
import Navbar from "../Navbar/Navbar";
import "./Search.scss";

const Search = () => {
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [showNews, setShowNews] = useState([]);
  const [page, setPage] = useState(0);

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
      setNews(data[0].articles);
    }
  }, [data]);

  useEffect(() => {
    if (news) {
      setShowNews(news.slice(page, page + 6));
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
          <Pagination
            page={page}
            setPage={setPage}
            length={news.length}
            noOfPage={6}
          />
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Search;
