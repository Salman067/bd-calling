import { Schema, model } from 'mongoose';

const trainScheduleSchema = new Schema({
    trainCode: { type: String, required: true },
    stationCode: { type: String, required: true},
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    status: { type: String, enum: ['on-time', 'delayed', 'cancelled'], default: 'on-time' }
  });
  
 export const TrainSchedule = model('TrainSchedule', trainScheduleSchema);
  