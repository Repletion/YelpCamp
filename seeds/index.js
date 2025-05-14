const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '67f63159997ca026f8479430',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel rerum omnis sapiente eius sunt molestiae corrupti? Dolores reiciendis rerum quod autem explicabo distinctio dicta minus, odio quae quibusdam ut qui.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxmldoxwi/image/upload/v1746180762/YelpCamp/jtnwaptack6dd8vs7sd6.jpg',
                    filename: 'YelpCamp/ug4xlztsja5btl2sml23'
                },
                {
                    url: 'https://res.cloudinary.com/dxmldoxwi/image/upload/v1746180576/YelpCamp/ug4xlztsja5btl2sml23.jpg',
                    filename: 'YelpCamp/y66ifjogkyld7uiuzrno'
                },
                {
                    url: 'https://res.cloudinary.com/dxmldoxwi/image/upload/v1745323183/YelpCamp/uc3r2q10yotqlbljhhkl.png',
                    filename: 'YelpCamp/uc3r2q10yotqlbljhhkl'
                }
            ],
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})




















// const mongoose = require('mongoose');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');
// const Campground = require('../models/campground');

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const sample = array => array[Math.floor(Math.random() * array.length)];


// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const camp = new Campground({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`
//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// })