const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define ClanMember schema
const ClanMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  relationships: [{
    relationship: { type: String, required: true, enum: ["parent", "child", "sibling", "spouse", "other"] },
    relatedName: { type: String, required: true }
  }]
});

// Create ClanMember model using the schema
const ClanMember = mongoose.model('ClanMember', ClanMemberSchema);

// Export the model
module.exports = ClanMember;

//History

// notable memebers

// traditions
