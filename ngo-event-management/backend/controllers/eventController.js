import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, city, state, ngo } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const event = new Event({
      title,
      description,
      dateTime: new Date(dateTime),
      location,
      city,
      state,
      ngo,
      image,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("ngo");
  res.json(events);
};

export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate("ngo");
  res.json(event);
};

// 🗑️ Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
