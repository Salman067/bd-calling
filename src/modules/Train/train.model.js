import { Schema, model } from 'mongoose';

const trainStopSchema = new Schema({
  stationCode: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
});

const trainSchema = new Schema(
  {
    trainName: {
      type: String,
      required: true,
    },
    trainCode: {
      type: String,
      required: true,
      unique: true,
    },
    stops: {
      type: [trainStopSchema],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    capacity:{
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }, 
);

trainSchema.statics.isTrainExistsByTrainCode = async function (trainCode) {
  const existingTrain = await Train.findOne({ trainCode });
  return existingTrain;
};

export const Train = model('Train', trainSchema);
