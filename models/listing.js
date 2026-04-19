const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

let listenSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true,
    },

    description: String,

    image: {
        url: String,
        filename: String,
    },

    price: Number,
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});

listenSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listenSchema);

module.exports = Listing;
