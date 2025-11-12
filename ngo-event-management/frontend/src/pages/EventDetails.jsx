import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaGlobe,
} from "react-icons/fa";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ngo, setNgo] = useState(null);
  const [showNgoDetails, setShowNgoDetails] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://192.168.0.102:5000/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        if (res.data.ngo?._id) {
          axios
            .get(`http://192.168.0.102:5000/api/ngos/${res.data.ngo._id}`)
            .then((ngoRes) => setNgo(ngoRes.data))
            .catch((err) => console.error("Error fetching NGO details:", err));
        }
      })
      .catch((err) => console.error("Error fetching event details:", err));
  }, [id]);

  if (!event)
    return (
      <p className="text-center mt-20 text-[#F8F8F8]">
        Loading event details...
      </p>
    );

  return (
    <div className="min-h-screen bg-[#103B35] flex justify-center items-center py-24 px-4 font-[Lato]">
      <div className="bg-[#145E50] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Event Image */}
        {event.image && (
          <img
            src={`http://192.168.0.102:5000${event.image}`}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Event Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2 font-[Playfair_Display] text-[#A4C73C]">
            {event.title}
          </h1>
          <p className="mb-4 italic text-[#F8F8F8]/90">{event.description}</p>

          <div className="space-y-3 text-[#F8F8F8]">
            <p className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#A4C73C]" />
              <span>
                <strong className="text-[#A4C73C]">Date & Time:</strong>{" "}
                {new Date(event.dateTime).toLocaleString()}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#A4C73C]" />
              <span>
                <strong className="text-[#A4C73C]">Location:</strong>{" "}
                {event.location}, {event.city}, {event.state}
              </span>
            </p>
          </div>

          {/* Collapsible NGO Info */}
          {ngo && (
            <div className="mt-8 bg-[#103B35]/60 p-5 rounded-xl border border-[#A4C73C]/30">
              <button
                onClick={() => setShowNgoDetails(!showNgoDetails)}
                className="flex justify-between items-center w-full text-left text-2xl font-semibold text-[#A4C73C] mb-3"
              >
                <span className="flex items-center gap-2">
                  <FaBuilding /> Hosting NGO Details
                </span>
                {showNgoDetails ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {showNgoDetails && (
                <div className="text-[#F8F8F8] mt-2 space-y-2 transition-all duration-300">
                  <p>
                    <strong className="text-[#A4C73C]">NGO Name:</strong>{" "}
                    {ngo.name}
                  </p>
                  <p>
                    <strong className="text-[#A4C73C]">Registration No:</strong>{" "}
                    {ngo.registrationNumber || "N/A"}
                  </p>
                  <p>
                    <strong className="text-[#A4C73C]">Contact Person:</strong>{" "}
                    {ngo.contactPerson || "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-[#A4C73C]" /> {ngo.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-[#A4C73C]" /> {ngo.phone}
                  </p>
                  {ngo.website && (
                    <p className="flex items-center gap-2">
                      <FaGlobe className="text-[#A4C73C]" />
                      <a
                        href={ngo.website}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-[#B8DC58]"
                      >
                        {ngo.website}
                      </a>
                    </p>
                  )}
                  <p>
                    <strong className="text-[#A4C73C]">Address:</strong>{" "}
                    {ngo.address}, {ngo.city}, {ngo.state}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-[#A4C73C] text-[#103B35] px-6 py-2 rounded-lg font-semibold hover:bg-[#8FB52E] transition-all duration-300"
            >
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
