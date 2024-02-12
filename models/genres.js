const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const genresSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genresSchema);

function validategenres(genres) {
  console.log(genres);
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });
  let result = Genre.validate(genres);
}

exports.genreSchema = genresSchema;
exports.Genre = Genre;
exports.validate = validategenres;
