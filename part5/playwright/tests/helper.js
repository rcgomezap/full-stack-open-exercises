const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Submit' }).click()
}

const newBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.locator('div').filter({ hasText: /^title:$/ }).getByRole('textbox').fill(blog.title)
    await page.locator('div').filter({ hasText: /^author:$/ }).getByRole('textbox').fill(blog.author)
    await page.locator('div').filter({ hasText: /^url:$/ }).getByRole('textbox').fill(blog.url)
    await page.getByRole('button', { name: 'create' }).click()
}

const fillRandomLikesBlogs = async (request, validToken, numberOfBlogs) => {

    for (let i = 0; i < numberOfBlogs; i++) {
        await request.post('/api/blogs', {
            data: {
            title: 'random',
            author: 'random',
            url: 'random',
            likes: Math.floor(Math.random() * 100)
            },
            headers: 
            {
            Authorization: `Bearer ${validToken}`
            }
        })
    }
}

const isSorted = (array) => {
    for (let i = 0 ; i < array.length - 1; i++) {
        if (array[i + 1] - array[i] > 0)
            return false
    }
    return true
}

export { loginWith, newBlog, fillRandomLikesBlogs, isSorted }
