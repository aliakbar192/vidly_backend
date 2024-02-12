const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { movieSchema } = require("./movies");
const { customerSchema } = require("./customers");

const rentalSchema = mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Number,
  },
  rentalFee: {
    type: Number,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validaterental(rental) {
  const schema = Joi.object({
    movieId: Joi.objectId().required(),
    customerId: Joi.objectId().required(),
  });
  let result = schema.validate(rental);
}
exports.Rental = Rental;
exports.validate = validaterental;
