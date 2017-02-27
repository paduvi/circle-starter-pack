module.exports = mongoose => {
    var User = mongoose.model('User', {
        username: String,
        password: String,
        permissions: Array
    });
    return User;
}