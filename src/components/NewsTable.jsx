import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsTable = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const itemsPerPage = 10;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:8000/news");
      setNewsData(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/news", newNews);
      setShowModal(false);
      setNewNews({ title: "", content: "", imageUrl: "" });
      fetchNews();
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const filteredNews = newsData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">News</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add News
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3 w-25"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {displayedNews.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No news found.
                </td>
              </tr>
            ) : (
              displayedNews.map((newsItem, index) => (
                <tr key={newsItem.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{newsItem.title}</td>
                  <td>{newsItem.content}</td>
                  <td>
                    <img
                      src={newsItem.imageUrl}
                      alt="news"
                      width={60}
                      height={60}
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>

      {/* Add News Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleAddNews}>
                <div className="modal-header">
                  <h5 className="modal-title">Add News</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={newNews.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      name="content"
                      value={newNews.content}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="imageUrl"
                      value={newNews.imageUrl}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save News
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsTable;
