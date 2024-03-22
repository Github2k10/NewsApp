import React from "react";

import images from "../../assets/images";
import changeDate from "../../services/ChangeDate";
import "./NewsItem.scss";

const NewsItem = ({ article }) => {
  if (article.content == "[Removed]" || article.content == "null") {
    return <></>;
  }
  return (
    <div className="news" key={article.title + article.publishedAt}>
      <img
        className="news-img"
        src={article.urlToImage || images.noImage}
        onError={(e) => (e.target.src = images.noImage)}
        alt=""
      />
      <h2 className="news-title">{article.title}</h2>
      <p className="news-description">{article.description}</p>
      <div className="news-details">
        <a href={article.url} target="_blank" className="view">
          Read More
        </a>
        <p className="date">{changeDate(article.publishedAt)}</p>
      </div>
    </div>
  );
};

export default NewsItem;
