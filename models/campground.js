const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

// https://res.cloudinary.com/dxmldoxwi/image/upload/w_300/v1745571401/YelpCamp/l9nzveqs9lrtxgasq23l.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 30)}...</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);























// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const CampgroundSchema = new Schema({
//     title: String,
//     price: String,
//     description: String,
//     location: String
// });

// module.exports = mongoose.model('Campground', CampgroundSchema);