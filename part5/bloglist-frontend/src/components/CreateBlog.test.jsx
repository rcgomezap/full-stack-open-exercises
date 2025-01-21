import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {

    const newBlog = {
        title: 'Blog title test',
        author: 'Blog author test',
        url: 'Blog url test',
    }

    const setToggleMock = vi.fn()
    const createBlogMock = vi.fn()
    const notifHandlerMock = vi.fn()
    const toggleComponentVisibilityMock = vi.fn()

    const { container } = render(<CreateBlog toggle={0} setToggle={setToggleMock} notifHandler={notifHandlerMock} toggleComponentVisibility={toggleComponentVisibilityMock} createBlogService={createBlogMock}/>)
    const titleInput = container.querySelector('.inputTitle')
    const authorInput = container.querySelector('.inputAuthor')
    const urlInput = container.querySelector('.inputUrl')
    const submitBtn = container.querySelector('.btnSubmit')

    const user = userEvent.setup()
    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(submitBtn)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]).toEqual(newBlog)


})
