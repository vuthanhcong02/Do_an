import React from "react";
import "./Home.scss";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import NewsItem from "../../NewsItem/NewsItem";
import CourseItem from "../../CourseItem/CourseItem";
import EventItem from "../../EventItem/EventItem";
import { getBannersOrderByPosition } from "../../../services/BannerService";
import { getSummary } from "../../../utils/function";
import {
  getNewsOrderById,
  getNewByFeatured,
} from "../../../services/NewsService";
import { getCourseOrderById } from "../../../services/CourseService";
import { baseUrl } from "../../../config";
export default function Home() {
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [newsFeatured, setNewsFeatured] = useState([]);
  const [courses, setCourses] = useState([]);

  const [news, setNews] = useState([]);

  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, ";
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await getBannersOrderByPosition();
      if (res.success === true) {
        console.log(res.data);
        setBanners(res.data);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchNewsFeatured = async () => {
      const res = await getNewByFeatured();
      if (res.success === true) {
        console.log(res.data);
        setNewsFeatured(res.data);
      }
    };
    fetchNewsFeatured();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNewsOrderById();
      if (res.success === true) {
        console.log(res.data);
        setNews(res.data);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getCourseOrderById();
      if (res.success === true) {
        console.log("Courses", res.data);
        setCourses(res.data);
      }
    };
    fetchCourses();
  }, []);
  return (
    <>
      <div className="Home-container">
        <div className="Home-slider">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {banners.map((banner, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src={`${baseUrl}${banner.image}`}
                  alt={`Slide ${idx}`}
                />
                <Carousel.Caption>
                  <h3>{banner.title}</h3> <p>{banner.description || null}</p>{" "}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="Home-content">
          <div className="Home-content-courses-and-news">
            <div className="Home-content-courses col-9">
              <div className="Home-content-courses-title">
                <span>Tuyển sinh khóa học</span>
              </div>
              <div className="Home-content-courses-list">
                {/* <CourseItem description={description} />
                <CourseItem description={description} />
                <CourseItem description={description} /> */}
                {courses.map((course, idx) => (
                  <CourseItem key={idx} course={course} />
                ))}
                <div className="Home-content-courses-more">
                  <span>Xem thêm </span>
                </div>
              </div>
            </div>
            <div className="Home-content-news col-3">
              <div className="Home-content-news-title">
                <span>Tin nổi bật</span>
              </div>
              <div className="Home-content-news-list">
                {newsFeatured.map((news, idx) => (
                  <NewsItem key={idx} news={news} />
                ))}
                {/* <NewsItem /> */}
                <div className="Home-content-news-more">
                  <span>Xem thêm </span>
                </div>
              </div>
            </div>
          </div>
          <div className="Home-content-events">
            <div className="Home-content-events-title">
              <span>Sự kiện</span>
            </div>
            <div className="Home-content-events-list">
              {/* <EventItem />
              <EventItem />
              <EventItem />
              <EventItem /> */}
              {news.map((news, idx) => (
                <EventItem key={idx} news={news} />
              ))}
              <div className="Home-content-events-more">
                <span>Xem thêm </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
