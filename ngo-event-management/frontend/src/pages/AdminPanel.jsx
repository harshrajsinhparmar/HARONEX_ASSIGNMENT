import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function AdminPanel() {
  const [ngoData, setNgoData] = useState({
    name: "",
    registrationNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
  });

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    city: "",
    state: "",
    ngo: "",
    image: null,
  });

  const [ngos, setNgos] = useState([]);
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteType, setDeleteType] = useState(null); // "ngo" or "event"

  useEffect(() => {
    axios.get("http://192.168.0.102:5000/api/ngos").then((res) => setNgos(res.data));
    axios.get("http://192.168.0.102:5000/api/events").then((res) => setEvents(res.data));
  }, []);

  const handleNGOCreate = async () => {
    await axios.post("http://192.168.0.102:5000/api/ngos", ngoData);
    alert("✅ NGO Registered!");
  };

  const handleEventCreate = async () => {
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
      if (key === "dateTime") {
        const isoDate = new Date(eventData[key]).toISOString();
        formData.append("dateTime", isoDate);
      } else {
        formData.append(key, eventData[key]);
      }
    });

    try {
      await axios.post("http://192.168.0.102:5000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Event Created!");
    } catch (error) {
      console.error("❌ Event creation failed:", error);
      alert("❌ Error creating event! Check console for details.");
    }
  };

  // 🧨 Delete NGO or Event
  const handleDelete = async (id) => {
    const type = deleteType;
    const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmed) return;

    try {
      await axios.delete(`http://192.168.0.102:5000/api/${type === "ngo" ? "ngos" : "events"}/${id}`);
      if (type === "ngo") setNgos(ngos.filter((n) => n._id !== id));
      else setEvents(events.filter((e) => e._id !== id));
      alert(`✅ ${type.toUpperCase()} deleted successfully!`);
      setShowDeleteModal(false);
      setDeleteType(null);
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
      alert(`❌ Failed to delete ${type}!`);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-24 px-6"
      style={{
        backgroundColor: "#103B35",
      }}
    >
      {/* Content Section */}
      <div className="bg-[#145E50] text-[#F8F8F8] rounded-2xl shadow-2xl p-10 w-full max-w-6xl mx-6 grid md:grid-cols-2 gap-10">
        {/* NGO Registration */}
        <div>
          <h2 className="text-2xl font-bold mb-6 font-[Playfair_Display]">Register NGO</h2>
          <div className="space-y-3">
            {Object.keys(ngoData).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                className="w-full p-3 rounded-md bg-[#103B35] text-[#F8F8F8] border border-gray-700 focus:ring-2 focus:ring-[#A4C73C] outline-none"
                value={ngoData[key]}
                onChange={(e) =>
                  setNgoData({ ...ngoData, [key]: e.target.value })
                }
              />
            ))}
            <button
              onClick={handleNGOCreate}
              className="w-full mt-4 bg-[#A4C73C] text-[#103B35] font-semibold py-2 rounded-lg hover:bg-[#B8DC58] transition"
            >
              Register NGO
            </button>
          </div>
        </div>

        {/* Event Creation */}
        <div>
          <h2 className="text-2xl font-bold mb-6 font-[Playfair_Display]">Add Event</h2>
          <div className="space-y-3">
            <select
              className="w-full p-3 rounded-md bg-[#103B35] border border-gray-700 focus:ring-2 focus:ring-[#A4C73C]"
              onChange={(e) =>
                setEventData({ ...eventData, ngo: e.target.value })
              }
            >
              <option value="">Select NGO</option>
              {ngos.map((n) => (
                <option key={n._id} value={n._id}>
                  {n.name}
                </option>
              ))}
            </select>

            {Object.keys(eventData)
              .filter((k) => k !== "ngo" && k !== "image")
              .map((key) => (
                <input
                  key={key}
                  type={key === "dateTime" ? "datetime-local" : "text"}
                  placeholder={key}
                  className="w-full p-3 rounded-md bg-[#103B35] text-[#F8F8F8] border border-gray-700 focus:ring-2 focus:ring-[#A4C73C] outline-none"
                  value={eventData[key]}
                  onChange={(e) =>
                    setEventData({ ...eventData, [key]: e.target.value })
                  }
                />
              ))}

            <input
              type="file"
              className="w-full p-2 rounded-md bg-[#103B35] border border-gray-700 text-gray-300"
              onChange={(e) =>
                setEventData({ ...eventData, image: e.target.files[0] })
              }
            />

            <button
              onClick={handleEventCreate}
              className="w-full mt-4 bg-[#A4C73C] text-[#103B35] font-semibold py-2 rounded-lg hover:bg-[#B8DC58] transition"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>

      {/* 🗑️ Delete Button */}
      <button
        onClick={() => setShowDeleteModal(true)}
        className="fixed bottom-8 right-8 bg-[#FF6347] hover:bg-[#E0523B] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all"
      >
        <FaTrashAlt /> Delete
      </button>

      {/* Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-[#145E50] text-[#F8F8F8] p-8 rounded-2xl shadow-2xl w-96">
            <h3 className="text-2xl font-[Playfair_Display] mb-6 text-center">What do you want to delete?</h3>
            <div className="space-y-4">
              <button
                onClick={() => setDeleteType("ngo")}
                className="w-full bg-[#A4C73C] text-[#103B35] font-bold py-2 rounded-lg hover:bg-[#B8DC58] transition"
              >
                Delete NGO
              </button>
              <button
                onClick={() => setDeleteType("event")}
                className="w-full bg-[#A4C73C] text-[#103B35] font-bold py-2 rounded-lg hover:bg-[#B8DC58] transition"
              >
                Delete Event
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>

            {/* If type selected → show list */}
            {deleteType && (
              <div className="mt-6 max-h-60 overflow-y-auto space-y-2">
                {(deleteType === "ngo" ? ngos : events).map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-[#103B35] px-4 py-2 rounded-lg"
                  >
                    <p>{item.name || item.title}</p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-[#FF6347] hover:bg-[#E0523B] text-white px-3 py-1 rounded-md text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
