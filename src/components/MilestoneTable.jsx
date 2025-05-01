import React, { useEffect, useState } from "react";
import axios from "axios";

const MilestonesTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    year: "",
    title: "",
    description: "",
    photourl: "",
  });

  const getMilestones = async () => {
    try {
      const res = await axios.get("http://localhost:8000/milestones");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching milestones:", error);
    }
  };

  useEffect(() => {
    getMilestones();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/milestones", newMilestone);
      setShowModal(false);
      setNewMilestone({ year: "", title: "", description: "", photourl: "" });
      getMilestones();
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedMilestones = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="mb-4 fw-bold">Milestones</h2>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Milestone
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {displayedMilestones.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No milestones found.
                </td>
              </tr>
            ) : (
              displayedMilestones.map((milestone, index) => (
                <tr key={milestone.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{milestone.year}</td>
                  <td>{milestone.title}</td>
                  <td>{milestone.description}</td>
                  <td>
                    <img
                      src={milestone.photourl}
                      alt="milestone"
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
                <h5 className="modal-title">Add New Milestone</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleAddMilestone}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Year</label>
                    <input
                      type="text"
                      className="form-control"
                      name="year"
                      value={newMilestone.year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={newMilestone.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={newMilestone.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Photo URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="photourl"
                      value={newMilestone.photourl}
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
                    Save Milestone
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

export default MilestonesTable;
