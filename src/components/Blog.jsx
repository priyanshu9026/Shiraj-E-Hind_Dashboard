import axios from "axios";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [data, setData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get("https://shiraj-e-hind-backend.onrender.com/news");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    getNews();
  }, []);

  const openModal = (news) => {
    setSelectedNews(news);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setShowModal(false);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              NGO Latest News
            </h1>
            <div className="h-1 w-20 bg-red-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Connect with like-minded individuals and organizations passionate
            about charity and social change. These networking sessions provide
            the perfect environment for forging valuable partnerships and
            collaborations.
          </p>
        </div>

        <div className="flex flex-wrap -m-4">
          {data.map((news) => (
            <div
              key={news.id}
              className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer"
              onClick={() => openModal(news)}
            >
              <div className="bg-gray-100 p-6 rounded-lg min-h-[400px] hover:shadow-lg transition">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={news.photourl || "https://via.placeholder.com/300"}
                  alt={news.title}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                  News
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  {news.title}
                </h2>
                <p className="leading-relaxed text-sm text-gray-700">
                  {news.description?.slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedNews.photourl || "https://via.placeholder.com/500"}
              alt={selectedNews.title}
              className="rounded w-full object-cover h-60 mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{selectedNews.title}</h2>
            <p className="text-gray-700 mb-4">
              {selectedNews.description || "No description available."}
            </p>
            {selectedNews.articlelink && (
              <a
                href={selectedNews.articlelink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read Full Article →
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
