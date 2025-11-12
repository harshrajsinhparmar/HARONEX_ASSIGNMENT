import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaRedo } from "react-icons/fa";

function EventsList() {
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
    let filteredData = events;
    if (city) filteredData = filteredData.filter((e) => e.city.toLowerCase().includes(city.toLowerCase()));
    if (state) filteredData = filteredData.filter((e) => e.state.toLowerCase().includes(state.toLowerCase()));
    setFiltered(filteredData);
  };

  const clearFilters = () => {
    setCity("");
    setState("");
    setFiltered(events);
  };

  return (
    <div className="min-h-screen bg-[#145E50] p-8 font-[Lato]">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#A4C73C] font-[Playfair_Display]">
        Upcoming Events
      </h1>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Filter by City"
          className="p-3 rounded-lg w-full md:w-1/4 bg-[#145E50] text-[#F8F8F8] border border-[#A4C73C]/50 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A4C73C]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by State"
          className="p-3 rounded-lg w-full md:w-1/4 bg-[#145E50] text-[#F8F8F8] border border-[#A4C73C]/50 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A4C73C]"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="flex items-center justify-center gap-2 bg-[#A4C73C] text-[#103B35] px-6 py-2 rounded-lg font-semibold hover:bg-[#8FB52E] transition-all duration-300"
        >
          <FaSearch /> Filter
        </button>
        <button
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 bg-[#145E50] text-[#A4C73C] px-6 py-2 rounded-lg font-semibold hover:bg-[#1A6A5D] border border-[#A4C73C]/50 transition-all duration-300"
        >
          <FaRedo /> Reset
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <div
            key={event._id}
            className="bg-[#145E50] rounded-xl shadow-lg border border-[#A4C73C]/30 hover:shadow-[#A4C73C]/30 hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {event.image && (
              <img
                src={`http://192.168.0.102:5000${event.image}`}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 text-[#F8F8F8]">
              <h2 className="text-2xl font-semibold mb-1 text-[#A4C73C] font-[Playfair_Display]">
                {event.title}
              </h2>
              <p className="text-sm italic mb-3 text-[#F8F8F8]/80">{event.ngo?.name}</p>
              <p className="text-[#F8F8F8]/90 mb-3 line-clamp-2">{event.description}</p>

              <p className="flex items-center text-sm gap-2 mb-1">
                <FaCalendarAlt className="text-[#A4C73C]" />{" "}
                {new Date(event.dateTime).toLocaleString()}
              </p>
              <p className="flex items-center text-sm gap-2 mb-3">
                <FaMapMarkerAlt className="text-[#A4C73C]" /> {event.city}, {event.state}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="block mt-3 text-center bg-[#A4C73C] text-[#103B35] py-2 rounded-lg font-semibold hover:bg-[#8FB52E] transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#F8F8F8]/70 mt-10">No events found for your filter.</p>
      )}
    </div>
  );
}

export default EventsList;
