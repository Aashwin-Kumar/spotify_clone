import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({

    artistsname: {
        type: String,
        required: true
    },
    geners: {
        type: String,
        required: true
    },

    date: {
        type: Object,
        required: true
    }


})

// artistSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// artistSchema.set('toJSON', {
//     virtuals: true
// });


const Artist = mongoose.model("Artist", artistSchema);

export default Artist;

