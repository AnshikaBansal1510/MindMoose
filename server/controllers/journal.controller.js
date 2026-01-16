import Journal from '../models/journal.models.js';

export const createJournal = async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ success: false, message: "Content is required" });
        }

        const newJournal = new Journal({
            user: req.userId,
            content,
        });

        await newJournal.save();

        return res.status(200).json({ success: true, message: "Journal Created" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
}

export const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.userId }).sort({ date: -1 });
        return res.json({ success: true, journals });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;

        const journal = await Journal.findOne({ _id: id, user: req.userId });
        if (!journal) {
            return res.status(404).json({ success: false, message: "Journal not found or unauthorized" });
        }

        await Journal.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Journal deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to delete journal', error: error.message });
    }
};