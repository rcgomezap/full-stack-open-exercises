// @ts-check
import { test, expect } from '@playwright/test';
import { loginWith, newBlog } from './helper';

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

    await request.post('/api/blogs', {
      data: {
        title: 'Existent blog title',
        author: 'Tester',
        url: 'url.com'
      },
      headers: 
      {
        Authorization: `Bearer ${responseBody.token}`
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

    })

  })
})