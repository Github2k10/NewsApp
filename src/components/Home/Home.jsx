import React from "react";

import Navbar from "../Navbar/Navbar";
import news from "../../services/data";
import "./Home.scss";

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
  const newsArticles = news.articles;
  return (
    <>
      <Navbar />

      <div className="home">
        <div className="news-loader">
          {newsArticles.map((article) => (
            <div className="news">
              <img className="news-img" src={article.image} alt="" />
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
          ))}
        </div>

        <div className="news-recent"></div>
      </div>
    </>
  );
};

export default Home;
