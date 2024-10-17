import cron from 'node-cron';
import {Train} from '../modules/Train/train.model.js';
import { Ticket } from '../modules/Ticket/ticket.model.js';
import {TrainScheduleServices} from '../modules/TrainSchedule/train.schedule.service.js'
import { Station } from '../modules/Station/station.model.js';

async function updateTrainStatuses() {
  const now = new Date();
  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',  // "Wed"
      year: 'numeric',   // "2024"
      month: 'short',    // "Oct"
      day: 'numeric',    // "16"
      hour: 'numeric',   // "16"
      minute: 'numeric', // "45"
      hour12: false      // 24-hour format
    });
  };
  try {
    const allTrains = await Train.find();
    for (const train of allTrains) {
      console.log(`${train.trainName}:`);
      
      for (const stop of train.stops) {
        const station = await Station.findOne({ stationCode: stop.stationCode }); // Add await here
        if (station) {
          console.log(`- ${station.stationName}(${station.stationCode}) - Departure: ${formatDate(stop.departureTime)} - Arrival: ${formatDate(stop.arrivalTime)}`);
        } else {
          console.log(`- Station with code ${stop.stationCode} not found`);
        }
      }
    }

    const trains = await Train.find({ 'stops.departureTime': { $gte: now } });
    console.log('Trains with upcoming stops:', trains.length);

    for (let train of trains) {
      console.log('Processing train:', train.trainCode);
      console.log('Stops:', train.stops);

      const nextStop = train.stops.find(stop => new Date(stop.departureTime) > now);
      console.log('Next stop:', nextStop);

      if (nextStop) {
        train.currentStatus = `En route to ${nextStop.stationName}`;
      } else {
        train.currentStatus = 'Completed';
      }
      await train.save();
    }
  } catch (error) {
    console.error('Error in updateTrainStatuses:', error);
  }
}


  // Function to send reminders for upcoming trips
  async function sendTripReminders() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);  
  
    console.log('Searching for tickets between:', now, 'and', tomorrow);
  
    try {
      const upcomingTickets = await Ticket.find({
        createdAt: { $lte: now },  
      }).populate('userId trainId');
  
      console.log('Found tickets:', upcomingTickets.length);
  
      for (let ticket of upcomingTickets) {
        const fromStation = await Station.findOne({ stationCode: ticket.fromStation });
        const toStation = await Station.findOne({ stationCode: ticket.toStation });
  
        if (!fromStation || !toStation) {
          console.log(`Unable to find stations for ticket ${ticket.ticketNumber}`);
          continue;
        }
  
        console.log(`Reminder: Dear ${ticket.userId.fullName}, your trip on train ${ticket.trainId.trainName} from ${fromStation.stationName} to ${toStation.stationName} is coming up. Ticket number: ${ticket.ticketNumber}`);
      }
  
      console.log('Trip reminders sent');
    } catch (error) {
      console.error('Error in sendTripReminders:', error);
    }
  }

  // Function to generate daily reports
async function generateDailyReports() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const ticketsSold = await Ticket.countDocuments({ purchaseDate: { $gte: yesterday, $lt: today } });
    const revenue = await Ticket.aggregate([
      { $match: { purchaseDate: { $gte: yesterday, $lt: today } } },
      { $group: { _id: null, total: { $sum: '$fare' } } }
    ]);
  
    console.log(`Daily Report:
      Date: ${yesterday.toDateString()}
      Tickets Sold: ${ticketsSold}
      Total Revenue: $${revenue[0]?.total || 0}
    `);
  }

async function trainSchedule(){
  console.log('Running cron job to fetch all train schedule...');
  try {
    const trainSchedule = await TrainScheduleServices.getAllTrainScheduleFromDB();
    console.log('Fetched all train schedule:', trainSchedule);
  } catch (error) {
    console.error('Error during cron job:', error);
  }
}

function scheduleTasks() {
    // Update train statuses every 5 minutes
    cron.schedule('*/5 * * * *', updateTrainStatuses);
  
    // Send trip reminders daily at 8:00 AM
    cron.schedule('0 8 * * *', sendTripReminders);
  
    // Generate daily reports at 12:01 AM
    cron.schedule('1 0 * * *', generateDailyReports);

    // Fetch all train schedule every 5 minute
    cron.schedule('*/5 * * * *',trainSchedule);
  }
export default scheduleTasks;