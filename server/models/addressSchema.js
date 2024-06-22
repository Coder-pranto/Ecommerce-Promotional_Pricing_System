const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: [true,"please provide the area"]
    },
    city: {
      type: String,
      required: [true,"please provide the city"]
    },
    district: {
      type: String,
      required: [true,"please provide the district"]
    },
    division: {
      type: String,
      required: [true,"please provide the division"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Address', addressSchema);
