
//test the getTicketPrice Function
const getTicketPrice=require('./getTicketPrice');

const ticketData1 = [{
    ticketType:"normal",
    ticketPrice:"0",
    ticketFrom:"Kalutara",
    ticketTo:"Colombo",
    ticketDate:"2022.11.01",
    ticketTime:"16.00",
    ticketSeat:"55",
    ticketBus:"ND-1010",
    ticketPassenger:"user1",
    routeNumber:"400/1"
}]

const out=500;

describe("getTicket",()=>{
    test('Bus route should be',()=>{
        expect(getTicketPrice(ticketData1).toBe(out))
    })
})