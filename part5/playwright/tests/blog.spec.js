// @ts-check
import { test, expect } from '@playwright/test';
import { loginWith, newBlog, fillRandomLikesBlogs, isSorted } from './helper';

let validToken = ''

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testing User',
        username: 'test',
        password: '1234'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Testing User 2',
        username: 'test2',
        password: '1234'
      }
    })

    const response = await request.post('/api/login', {
      data: {
        username: 'test2',
        password: '1234'
      }
    })

    const responseBody = await response.json()
    validToken = responseBody.token

    await request.post('/api/blogs', {
      data: {
        title: 'Existent blog title',
        author: 'Tester',
        url: 'url.com'
      },
      headers: 
      {
        Authorization: `Bearer ${validToken}`
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', '1234')
      await expect(page.getByText('logout')).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', '4321')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {

    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'test', '1234')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'title',
        author: 'author',
        url: 'url'
      }
      await newBlog(page, blog)
      await expect(page.getByText('title authorview')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByText('view').click()
      await page.getByText('like').click()
      const liked = page.getByText('likes 1 like')
      await liked.waitFor()
      expect(liked).toBeVisible()
    })

    test('blogs are arranged in the order according to the likes, the blog with the most likes first', async ({ page, request }) => {
      const blogsToFill = 37
      await fillRandomLikesBlogs(request, validToken, blogsToFill)
      await page.reload()
      const blog = page.getByText('random').first()
      await blog.waitFor()
      
      //  Click every view button
      while (await page.getByText('view').count() > 0) {
        await page.getByText('view').first().click()
      }

      // Fill an array with every like
      let likesArray = []
      const likesElements = await page.locator('.likes').all()
      for (const element of likesElements) {
        const match = (await element.innerText()).match(/\d+/) // Use a regular expression to find the first number in the string
        const number = Number(match ? match[0] : null) // match[0] will contain the first number found in the string
        likesArray.push(number)
      }

      // Check if the array is sorted
      const sorted = isSorted(likesArray)
      expect(sorted).toBeTruthy()
    })

    test.describe('when a blog is created', () => {

      test.beforeEach(async ({ page }) => {
        const blog = {
          title: 'title',
          author: 'author',
          url: 'url'
        }
        await newBlog(page, blog)
        const createdBlog = page.getByText('title authorview')
        await createdBlog.waitFor()
      })

      test('the user who added the blog can delete the blog', async ({ page }) => {

        await page.locator('div').filter({ hasText: /^title authorview$/ }).getByRole('button').click()

        const requestPromise = page.waitForResponse(response => response.request().method() === 'DELETE')
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await requestPromise
        await page.reload()

        const previousBlog = page.getByText('Existent blog title Testerview')
        await previousBlog.waitFor()

        expect(page.getByText('title authorview')).not.toBeVisible()

      })

      test('only the user who added the blog sees the blog\'s delete button', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Existent blog title Testerview$/ }).getByRole('button').click()
        await page.locator('div').filter({ hasText: /^title authorview$/ }).getByRole('button').click()

        expect(page.getByText('Existent blog title').getByText('delete')).not.toBeVisible()
        expect(page.getByText('title authorhideurllikes 0').getByText('delete')).toBeVisible()

      })

    })

  })
})