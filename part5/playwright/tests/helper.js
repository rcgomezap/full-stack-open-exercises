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

export { loginWith, newBlog }
