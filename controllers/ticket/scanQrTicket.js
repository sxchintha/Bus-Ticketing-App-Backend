
const Ticket = require("../../models/ticket.model");
const TempTicket = require("../../models/tempTicket.model");
const User = require("../../models/iUser.model");
const { getRouteByStartAndDestination } = require("../busroute/getBusRoute");
const getBusByBusNumber = require("../bus/getBusByBusNumber");
const { AC_BUS, LUXURY_BUS, NORMAL_BUS } = require("../../common/TicketPrices");
const retryOperation = require("../../common/retry");

const calculateTicketPrice = async (ticketPrice, busType) => {
    if (busType === 'ac') {
        return ticketPrice * AC_BUS;
    } else if (busType === 'luxury') {
        return ticketPrice * LUXURY_BUS;
    } else {
        return ticketPrice * NORMAL_BUS;
    }
}

const scanQrTicket = async (req, res) => {
    const ticketData = req.body;
    try {
        const tempTicket = await TempTicket.findOne({ userID: ticketData.userID })
            .then(async tempTicket => {
                if (tempTicket) {
                    // get the bus route and bus details
                    const busRoute = await getRouteByStartAndDestination(tempTicket.startStation, ticketData.busLocation);
                    const bus = await getBusByBusNumber(tempTicket.busNumber);

                    // calculate the ticket price
                    const ticketPrice = await calculateTicketPrice(busRoute.ticketPrice, bus.busType);

                    // get user account balance
                    const user = await User.findOne({ nic: ticketData.userID });
                    // check if the user has enough balance to pay for the ticket
                    if (user.accountBalance >= ticketPrice) {
                        const dateNow = new Date();
                        // year month and date
                        const date = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        // hour and minute
                        const time = dateNow.getHours() + ':' + dateNow.getMinutes();
                        const newTicket = new Ticket({
                            ticketType: "qrScan",
                            ticketPrice: ticketPrice,
                            ticketFrom: tempTicket.startStation,
                            ticketTo: ticketData.busLocation,
                            ticketDate: date,
                            ticketTime: time,
                            ticketBus: tempTicket.busNumber,
                            userID: ticketData.userID,
                        });

                        newTicket.save()
                            .then(async ticket => {
                                // remove the temp ticket
                                // use the retry design pattern to retry the operation if it fails
                                await retryOperation(TempTicket.deleteOne({ userID: ticketData.userID }), 3);

                                // deduct the ticket price from the user account balance
                                // use the retry design pattern to retry the operation if it fails
                                await retryOperation(User.updateOne({ nic: ticketData.userID }, { $inc: { accountBalance: -ticketPrice } }), 3);

                                res.status(200).json({
                                    message: "Ticket created successfully",
                                    resCode: 201,
                                    ticket: ticket
                                })
                            })
                            .catch(err => {
                                console.log(err.message);
                                res.status(400).json({
                                    message: "Error creating ticket",
                                    resCode: 401,
                                    error: err
                                })
                            });
                    } else {
                        res.status(400).json({
                            error: "Insufficient balance",
                            resCode: 402
                        })
                    }
                } else {
                    // check if the user id is valid
                    const user = await User.findOne({ nic: ticketData.userID });
                    if (user) {
                        const newTempTicket = new TempTicket({
                            userID: ticketData.userID,
                            startStation: ticketData.busLocation,
                            busNumber: ticketData.busNumber,
                        });
                        newTempTicket.save()
                            .then(tempTicket => {
                                res.status(200).json({
                                    message: "Start location saved",
                                    resCode: 202,
                                    tempTicket: tempTicket
                                })
                            })
                            .catch(err => {
                                console.log(err.message);
                                res.status(500).json({
                                    message: "Error saving start location",
                                    resCode: 403,
                                    error: err
                                })
                            });
                    } else {
                        res.json({
                            message: "Invalid user id",
                            resCode: 400
                        })
                    }
                }
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating Ticket",
            resCode: 401,
            error: error
        })
    }
}

module.exports = scanQrTicket;
