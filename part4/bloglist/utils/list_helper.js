const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const fav =  blogs.reduce( (fav, blog) => blog.likes > fav.likes ? blog : fav )
    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const getAuthorBlogs =  (blogs) => {
    return blogs.reduce( (list, blog) => {
    if (!list.find( (author) => author.author === blog.author)) // If author not already on list
        list.push({ author: blog.author, blogs: 1, likes: blog.likes})
    else {
        index = list.findIndex((author) => author.author === blog.author)
        list[index].blogs++
        list[index].likes += blog.likes
    }
    return list
    }, [])
}

const mostBlogs = (blogs) => {
    const authorBlogs = getAuthorBlogs(blogs)
    const mostBlogsAuthor = authorBlogs.reduce((most, author) => author.blogs > most.blogs ? author : most)
    return { author: mostBlogsAuthor.author, blogs: mostBlogsAuthor.blogs }
}

const mostLikes = (blogs) => {
    const authorBlogs = getAuthorBlogs(blogs)
    const mostLikesAuthor = authorBlogs.reduce((most, author) => author.likes > most.likes ? author : most)
    return { author: mostLikesAuthor.author, likes: mostLikesAuthor.likes }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}