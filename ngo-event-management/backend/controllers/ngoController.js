import NGO from "../models/NGO.js";

export const createNGO = async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.status(201).json(ngo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNGOs = async (req, res) => {
  const ngos = await NGO.find();
  res.json(ngos);
};


export const deleteNGO = async (req, res) => {
  try {
    const ngo = await NGO.findByIdAndDelete(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json({ message: "NGO deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNGOById = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


