import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {

    const { container } = render(<Blog blog={blog}/>)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.url)

})

test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {

    const { container } = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog')

    const user = userEvent.setup()
    const button = container.querySelector('.view')
    await user.click(button)


    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)

})