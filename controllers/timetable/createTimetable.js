
const Timetable = require("../../models/timetable.model");

const createTimetable = async (req, res) => {
    const timetableData = req.body;
    try {
        const newTicket = new Timetable(timetableData);
        newTicket.save()
            .then(bus => {
                res.status(200).json({
                    message: "Timetable created successfully",
                    bus: bus
                })
            })
            .catch(err => {
                console.log(err.message);
                res.status(400).json({
                    message: "Error creating timetable",
                    error: err
                })
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating timetable",
            error: error
        })
    }
};

module.exports = createTimetable;
