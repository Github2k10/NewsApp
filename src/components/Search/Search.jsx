import React, { useState, useEffect, useContext } from "react";

import LoadingPage from "../LoadingPage/LoadingPage";
import NewsItem from "../NewsItem/NewsItem";
import Pagination from "../Pagination/Pagination";
import "./Search.scss";
import axios from "axios";

const Search = ({ Context }) => {
  const context = useContext(Context);
  const [page, setPage] = useState(0);
  const [news, setNews] = useState(null);
  const [showNews, setShowNews] = useState([]);

  const searchApi = `https://newsapi.org/v2/everything?q=${context.keyword}&apiKey=841ebe7d9a2b4b8ea9994246bdc8ab14`;

  useEffect(() => {
    setNews(null);
    setPage(0);

    axios.get(searchApi).then((res) => setNews(res.data.articles));
  }, [context.keyword]);

  useEffect(() => {
    if (news) {
      setShowNews(news.slice(page, page + 6));
    }
  }, [news, page]);

  return (
    <>
      {news ? (
        <div className="news-container">
          <h1 className="search-heading">Search: {context.keyword}</h1>
          <div className="news-articles">
            {showNews.map((item) => (
              <NewsItem article={item} key={item.title} />
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
