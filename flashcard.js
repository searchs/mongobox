// MongoDB Dumps
// var Mongoose = require('Mongoose');
// const db = new Mongoose();

db.movieDetails.find({
    rate: "PG-13"
}).pretty();
db.movieDetails.find({
    rate: "PG-13"
}).count();


// Equality Match
db.movieDetails.find({
    "tomato.meter": 100
}).count(); //nested document


db.movieDetails.find({
    "writers": ["Ethan Coen", "Joel Coen"]
}).count();

db.movieDetails.find({
    "actors.0": "Jeff Bridges"
}).pretty(); //get movies where Jeff is main actor

// Cursors
// To check what's left
var c = db.movieDetails.find();
var doc = function() {
    return c.hasNext() ? c.next() : null;
}

// Check how many objects are left in the batch - MongoDB gets results in batches

c.objLeftInBatch();

//Projections - Used to reduce the size of the results returned for a query
db.movieDetails.find({
    rated: "PG-13"
}, {
    title: 1
}).pretty(); //the title is a projection
// Explicitly exclude _id from results
db.movieDetails.find({
    rated: "PG-13"
}, {
    title: 1,
    _id: 0
}).pretty(); //the title is a projection

// Comparison Operators
db.movieDetails.find({
    runtime: {
        $gt: 90
    }
}).pretty(); // all movives with Runtime greater than 90

// Project just the titles in the above query
db.movieDetails.find({
    runtime: {
        $gt: 90
    }
}, {
    title: 1,
    runtime: 1,
    _id: 0
}).pretty(); // all movives with Runtime greater than 90

// Greater than and Less than ==> greater or equal to | less than or equal to
db.movieDetails.find({
    runtime: {
        $gte: 90,
        $lte: 129
    }
}).pretty();

// More filtering plus Projections
db.movieDetails.find({
    "tomato.meter": {
        $gte: 95
    },
    runtime: {
        $gte: 180
    }
}, {
    title: 1,
    runtime: 1,
    _id: 0
}).pretty();

// Not Equal To
db.movieDetails.find({
    rated: {
        $ne: "UNRATED"
    }
}).count();

// In Operator ($in) -- values must in an array.
// There is a non-in operator: $nin
db.movieDetails.find({
    rated: {
        $in: ["G", "PG"]
    }
}).pretty();

// Element Operators
db.movieDetails.find({
    "tomato.meter": {
        $exists: true
    }
}).count();

// Type Operator
db.movieDetails.find({
    "_id": {
        $type: "string"
    }
}).count()

// Logical Operators
// $or - takes an array as an argument
db.movieDetails.find({
    $or: [{
            "tomato.meter": {
                $gt: 95
            }
        },
        {
            "metacritic": {
                $gt: 88
            }
        }
    ]
}).pretty();


// $and - Multiple criteria on the same field
db.movieDetails.find({
    $and: [{
            "tomato.meter": {
                $gt: 95
            }
        },
        {
            "metacritic": {
                $gt: 88
            }
        }
    ]
}).pretty();

db.movieDetails.find({
    $and: [{
            "metacritic": {
                $ne: null
            }
        },
        {
            "metacritic": {
                $exists: true
            }
        }
    ]
}).pretty();


// Regex Operators
db.movieDetails.find({}, {
    "awards.text": 1,
    _id: 0
}).pretty();
// Now in Regex
db.movieDetails.find({
    "awards.text": {
        $regex: /^Won\s.*/
    }
});
db.movieDetails.find({
    "awards.text": {
        $regex: /^Won\s.*/
    }
}, {
    title: 1,
    "awards": 1,
    _id: 0
});

// Array Operators: $all, $size, $elemMatch
db.movieDetails.find({
    genres: {
        $all: ["Comedy", "Crime", " Drama"]
    }
}).pretty();
db.movieDetails.find({
    countries: {
        $size: 1
    }
}).pretty();

// Using $elemMatch

db.movieDetails.find({
    boxOffice: {
        country: "UK",
        revenue: {
            $gt: 15
        }
    }
}).pretty();


// Now using $elemMatch
db.movieDetails.find({
    boxOffice: {
        $elemMatch: {
            country: "UK",
            revenue: {
                $gt: 15
            }
        }
    }
});


