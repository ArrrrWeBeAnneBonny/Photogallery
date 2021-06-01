const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const faker = require('faker');
faker.locale = "en";
const Ipsum = require('ipsum').Ipsum
let groot = new Ipsum();

let reviewsConn = mongoose.createConnection('mongodb://localhost/reviewsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

let photoConn = mongoose.createConnection('mongodb://localhost/photogallery2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

let overviewConn = mongoose.createConnection('mongodb://localhost/FEC', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const reviewSchema = new mongoose.Schema({
    campId: {
        unique: true,
        type: Number,
        sparse: true
    },
    recommendedPer: Number,
    reviews: [{
        reviewId: {
            type: Number,
            unique: true
        },
        userName: String,
        review: String,
        dateCreated: Date,
        recommended: Boolean,
        imgUrl: String,
        helpfulness: Number,
        ownerResponse: {
            response: String,
            responseDate: Date,
            helpfulness: Number
        }
    }]
});

const imageSchema = new mongoose.Schema({
    userName: String,
    userImg: String,
    created: String,
    helpfulness: [Number],
    caption: [String],
    priority: Number,
    imageUrl: [String],
});

// ----- SCHEMAS -----
const locationSchema = new mongoose.Schema({
    name: String,
    address: String
});

const ownerSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
});

const pricingSchema = new mongoose.Schema({
    averagePricePerNight: Number,
    cleaningFee: Number,
    monthsOutForBooking: Number,
    weeknightDiscount: Number,
    minimumNights: Number,
    instantBook: Boolean
});

const detailsSchema = new mongoose.Schema({
    checkInTime: Number,
    checkOutTime: Number,
    cancellationPolicy: Number,
    onArrival: Number,
    responseTime: Number,
    responseRate: Number
});

const lodgingSchema = new mongoose.Schema({
    type: Number,
    numberOfSites: Number,
    maxGuestsPerSite: Number,
    ADAaccess: Boolean,
    parking: Boolean
});

const essentialsSchema = new mongoose.Schema({
    campfires: Boolean,
    toilet: Boolean,
    pets: Boolean
});

const amenitiesSchema = new mongoose.Schema({
    potableWater: {
        available: Boolean,
        types: Number,
        description: String
    },
    kitchen: {
        available: Boolean,
        types: [Number],
        description: String
    },
    shower: {
        available: Boolean,
        types: Number,
        description: String
    },
    picnicTable: {
        available: Boolean,
        description: String
    },
    wifi: {
        available: Boolean,
        description: String
    },
    bins: {
        available: Boolean,
        types: [Number],
        description: String
    }
});

const activitiesSchema = new mongoose.Schema({
    biking: Boolean,
    fishing: Boolean,
    hiking: Boolean,
    horsebackRiding: Boolean,
    boating: Boolean,
    offRoading: Boolean,
    whitewaterPaddling: Boolean,
    climbing: Boolean,
    snowsports: Boolean,
    surfing: Boolean,
    windsports: Boolean,
    swimming: Boolean,
    paddling: Boolean,
    wildlifeWatching: Boolean,
    surfing: Boolean
});

const terrainSchema = new mongoose.Schema({
    lake: Boolean,
    beach: Boolean,
    forest: Boolean,
    reviewStreamCreek: Boolean,
    hotSpring: Boolean,
    swimmingHole: Boolean,
    desert: Boolean,
    cave: Boolean,
    waterfall: Boolean,
    driveway: Boolean
});

const overviewSchema = new mongoose.Schema({
    campId: { type: Number, unique: true, required: true },
    name: String,
    description: String,
    location: locationSchema,
    owner: ownerSchema,
    pricing: pricingSchema,
    details: detailsSchema,
    lodging: lodgingSchema,
    essentials: essentialsSchema,
    amenities: amenitiesSchema,
    activities: activitiesSchema,
    terrain: terrainSchema
})

const Review = reviewsConn.model('Review', reviewSchema);
// const Photo = photoConn.model('Photo', imageSchema);
const Overview = overviewConn.model('Overview', overviewSchema);

// Random Generators
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toString();
}

const urls = ['https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1517824806704-9040b037703b.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1523987355523-c7b5b0dd90a7.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1532339142463-fd0a8979791a.jpeg',
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1571687949921-1306bfb24b72.jpeg']

function randomImageArrayLengthAndPop() {
    let amount = getRandomIntInclusive(1, 5);
    let array = [];
    for (var i = 0; i < amount; i++) {
        array.push(urls[getRandomIntInclusive(0, 6)]);
    }
    return array;
}

function randomHelpfullness() {
    let array = [];
    for (var i = 0; i < 5; i++) {
        array.push(getRandomIntInclusive(0, 10));
    }
    return array;
}

function randomCaptions() {
    let array = [];
    for (var i = 0; i < 5; i++) {
        array.push(groot.generate(15, 'sentences'));
    }
    return array;
}

const reviewers = async function (campSite) {
    let array = await Review.find({ campId: campSite })
        .then((results) => {
            let reviewsArray = [];
            results.forEach(element => {
                reviewsArray.push(element.reviews)
            });
            let userNameArray = [];
            for (var i = 0; i < reviewsArray[0].length; i++) {
                userNameArray.push([reviewsArray[0][i].userName, reviewsArray[0][i].imgUrl])
            }
            return userNameArray;
        })
    return array
}

const owner = async function (campSite) {
    await Overview.find({ campId: campSite })
        .then(async (results) => {
            let ownerArray = [results[0].owner.name, results[0].owner.imageUrl];
            return ownerArray;
        })
        .then((results) => {
            let allArray = [results]
            reviewers(campSite)
                .then((results) => {
                    results.forEach(element => {
                        allArray.push(element);
                    });
                })
                .then(() => {
                    // console.log(allArray);
                    for (var i = 0; i < allArray.length; i++) {
                        const Photo = photoConn.model(campSite.toString(), imageSchema);
                        var instance = new Photo({
                            userName: allArray[i][0],
                            userImg: allArray[i][1],
                            created: randomDate(new Date(2012, 0, 1), new Date()),
                            helpfulness: randomHelpfullness(),
                            caption: randomCaptions(),
                            priority: getRandomIntInclusive(0, 5),
                            imageUrl: randomImageArrayLengthAndPop(),
                        }).save((err, data) => {
                            if (err) {
                                return console.log(err)
                            } else {
                                console.log('Data saved sucessfully')
                            }
                        });
                    }
                })
            // return all;        
        })
}

// for (var i = 0; i < 99; i++) {
//     owner(i);
// }

const first25 = async () => {
    for (var i = 0; i < 25; i++) {
        owner(i);
    }
}

const second25 = async () => {
    for (var i = 25; i < 50; i++) {
        owner(i);
    }
}

const third25 = async () => {
    for (var i = 50; i < 75; i++) {
        owner(i);
    }
}

const fourth25 = async () => {
    for (var i = 75; i < 100; i++) {
        owner(i);
    }
}

first25();
setTimeout(() => { second25() }, 10000);
setTimeout(() => { third25() }, 20000);
setTimeout(() => { fourth25() }, 30000);