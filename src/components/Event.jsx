import React, { useEffect, useState } from "react";
import axios from "axios";

const Event = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    photo_url: "",
    date: "",
    address: "",
    city: "",
  });

  const getEvents = async () => {
    try {
      const res = await axios.get("https://shiraj-e-hind-backend.onrender.com/events");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://shiraj-e-hind-backend.onrender.com/events", newEvent);
      setShowModal(false);
      setNewEvent({
        title: "",
        photo_url: "",
        date: "",
        address: "",
        city: "",
      });
      getEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEvents = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="mb-4 fw-bold">Events</h2>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Event
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Address</th>
              <th>City</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {displayedEvents.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No events found.
                </td>
              </tr>
            ) : (
              displayedEvents.map((event, index) => (
                <tr key={event.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.date ? event.date.slice(0, 16).replace("T", " "):"N/A"}</td>
                  <td>{event.address}</td>
                  <td>{event.city}</td>
                  <td>
                    <img
                      src={event.photo_url}
                      alt="event"
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
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddEvent}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="photo_url"
                      value={newEvent.photo_url}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="date"
                      value={newEvent.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={newEvent.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={newEvent.city}
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
                    Save Event
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

export default Event;
