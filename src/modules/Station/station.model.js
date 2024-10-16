import { Schema, model } from 'mongoose';

// Define the schema for the Station model
const stationSchema = new Schema(
  {
    stationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stationCode: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Static method to check if a station with the given code exists
stationSchema.statics.isStationExistsByStationCode = async function (stationCode) {
  // Check for a station with the specified stationCode
  const existingStation = await this.findOne({ stationCode }); // Use 'this' to refer to the current model
  return existingStation;
};

// Create the Station model using the schema
export const Station = model('Station', stationSchema);
