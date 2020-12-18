"use strict";

var _mongoose = require("mongoose");

//TODO: define list of categories
var categories = {
  values: ['Belleza', 'Salud', 'Ocio', 'Mantenimiento', 'Tecnologia', 'Mascotas', 'Musica', 'Educacion', 'Alimentacion'],
  message: '{VALUES} no es una categoria valida'
};
var serviceSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La catogoria es necesaria'],
    "enum": categories
  },
  freelancer_id: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, 'El freelancer es obligatorio']
  },
  is_presencial: {
    type: Boolean,
    "default": false
  },
  description: {
    type: String,
    trim: true
  },
  reviews: [{
    stars: {
      type: Number
    },
    review: {
      type: String
    },
    user_id: {
      type: _mongoose.Schema.Types.ObjectId
    }
  }],
  num_purchases: {
    type: Number,
    "default": 0
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    "default": true
  }
}, {
  versionKey: false,
  timestamps: true
});
module.exports = {
  Service: (0, _mongoose.model)('Service', serviceSchema),
  categories: categories
};