module.exports = mongoose => {
    var Todo = mongoose.model('Todo', {
        author: String,
        text: String,
        complete: Boolean
    });
    return Todo;
}