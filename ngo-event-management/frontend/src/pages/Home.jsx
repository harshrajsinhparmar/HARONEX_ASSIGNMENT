import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function Home() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.0.102:5000/api/events")
      .then((res) => {
        setEvents(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleFilter = () => {
    let data = events;
    if (city)
      data = data.filter((e) =>
        e.city?.toLowerCase().includes(city.toLowerCase())
      );
    if (state)
      data = data.filter((e) =>
        e.state?.toLowerCase().includes(state.toLowerCase())
      );
    setFiltered(data);
  };

  const clearFilters = () => {
    setCity("");
    setState("");
    setFiltered(events);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#103B35] text-[#F8F8F8] px-6 md:px-12">
      <h1 className="text-4xl font-serif text-center mb-8 tracking-wide">
        Upcoming Events
      </h1>
{/* Filter Section */}
<div className="flex flex-col md:flex-row justify-center gap-4 mb-10 bg-[#154940]/90 backdrop-blur-md p-5 rounded-xl shadow-md">
  <input
    type="text"
    placeholder="Filter by City"
    className="p-3 rounded-lg w-full md:w-1/4 bg-[#F8F8F8] text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A4C73C]"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />
  <input
    type="text"
    placeholder="Filter by State"
    className="p-3 rounded-lg w-full md:w-1/4 bg-[#F8F8F8] text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A4C73C]"
    value={state}
    onChange={(e) => setState(e.target.value)}
  />
  <button
    onClick={handleFilter}
    className="bg-[#A4C73C] text-[#103B35] font-semibold px-5 py-2 rounded-lg hover:bg-[#B7E04E] transition-all duration-200 shadow-sm"
  >
    Filter
  </button>
  <button
    onClick={clearFilters}
    className="bg-transparent border border-[#A4C73C] text-[#A4C73C] font-semibold px-5 py-2 rounded-lg hover:bg-[#A4C73C] hover:text-[#103B35] transition-all duration-200 shadow-sm"
  >
    Reset
  </button>
</div>

{/* Event Cards */}
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {filtered.map((event) => (
    <div
      key={event._id}
      className="bg-[#184E43] text-[#F8F8F8] rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-[#A4C73C] transition-all duration-300 overflow-hidden"
    >
      {event.image && (
        <img
          src={`http://192.168.0.102:5000${event.image}`}
          alt={event.title}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-1 text-[#A4C73C]">
          {event.title}
        </h2>
        <p className="text-gray-300 text-sm mb-3">{event.ngo?.name}</p>
        <p className="text-gray-200 mb-3 line-clamp-2">{event.description}</p>
        <p className="text-sm flex items-center gap-2 text-gray-300 mb-1">
          <FaCalendarAlt className="text-[#A4C73C]" />
          {new Date(event.dateTime).toLocaleString()}
        </p>
        <p className="text-sm flex items-center gap-2 text-gray-300">
          <FaMapMarkerAlt className="text-[#A4C73C]" />
          {event.city}, {event.state}
        </p>

        <Link
          to={`/event/${event._id}`}
          className="block mt-4 bg-[#A4C73C] text-[#103B35] font-semibold text-center py-2 rounded-lg hover:bg-[#b9e15c] transition-all duration-200"
        >
          View Details
        </Link>
      </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-300 mt-10">No events found.</p>
      )}
    </div>
  );
}

export default Home;
