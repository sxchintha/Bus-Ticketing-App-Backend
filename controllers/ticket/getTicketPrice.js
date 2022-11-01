const BusRoute = require("../../models/busRoute.model")

async function getTicketPrice(ticketData){
    try{
        console.log("GETT TICKET")
        const routeNo=ticketData.routeNumber;
        const busRoute=await BusRoute.findOne({routeNumber:routeNo})
            .then(async busRoute=>{
                if(busRoute){
                    console.log("XXXXXXXXXX")
                    const start_station=await (busRoute.stations.find(station=>station.stationName==ticketData.ticketFrom))
                    const end_station=await (busRoute.stations.find(station=>station.stationName==ticketData.ticketTo))
                    console.log(start_station)
                    const ticketPrice= await (end_station.stationDistance-start_station.stationDistance)*10;
                    console.log(ticketPrice)
                    return ticketPrice;
                } else {
                    return {
                        error:"No bus Route Found"
                    }
                }
            })
            return busRoute;

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating Ticket",
            error: error
        })
    }
}

module.exports=getTicketPrice;