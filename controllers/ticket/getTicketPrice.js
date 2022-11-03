const BusRoute = require("../../models/busRoute.model")

//Function For getting ticket price
async function getTicketPrice(ticketData){
    try{
        const routeNo=ticketData.routeNumber;
        const busRoute=await BusRoute.findOne({routeNumber:routeNo})
            .then(async busRoute=>{
                if(busRoute){
                    const start_station=await (busRoute.stations.find(station=>station.stationName==ticketData.ticketFrom))
                    const end_station=await (busRoute.stations.find(station=>station.stationName==ticketData.ticketTo))
                    const ticketPrice= await (end_station.stationDistance-start_station.stationDistance)*10;
                    return ticketPrice;
                } else {
                    return {
                        error:"No bus Route Found"
                    }
                }
            })
            return busRoute;

    } catch (error) {
        // res.status(500).json({
        //     message: "Error creating Ticket",
        //     error: error
        // })
    }
}

module.exports=getTicketPrice;