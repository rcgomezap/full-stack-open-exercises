import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    const user = {
        name: 'user name test'
    }
    const blog = {
        title: 'Blog title test',
        author: 'Blog author test',
        url: 'Blog url test',
        likes: 111,
        user
    }

    render(<Blog blog={blog}/>)

    const elementTitle = screen.queryByText(blog.title, {exact: false})
    const elementAuthor = screen.queryByText(blog.author, {exact: false})
    const elementUrl = screen.queryByText(blog.url, {exact: false})
    const elementLikes = screen.queryByText(blog.likes, {exact: false})

    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeDefined()
    expect(elementUrl).toBeNull()
    expect(elementLikes).toBeNull()

})