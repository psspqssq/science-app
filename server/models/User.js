//backend/models/User.js 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema =
	new Schema(
		{
			name: {
				type: String
			},
			password: {
				type: String
			},
			email: {
				type: String
			},
			dob: {
				type: Date
			},
			city: {
				type: String
			},
			country: {
				type: String
			},
			userType: {
				type: String
			}
		},
		{
			collection: 'users'
		})

module.exports =
	mongoose.model('User', userSchema);
