// @ts-check
import { test, expect } from '@playwright/test';
import { loginWith, newBlog } from './helper';
import { beforeEach, describe } from 'node:test';

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
      await expect(page.getByText('view')).toBeVisible()
    })

    describe('when a blog is created', () => {

      test.beforeEach(async ({ page }) => {
        const blog = {
          title: 'title',
          author: 'author',
          url: 'url'
        }
        await newBlog(page, blog)
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByText('view').click()
        await page.getByText('like').click()
        const liked = page.getByText('likes 1 like')
        await liked.waitFor()
        expect(liked).toBeVisible()
      })
    })

  })
})