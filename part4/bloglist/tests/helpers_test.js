const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {listWithOneBlog, initialBlogs} = require('./test_helpers')


test('dummy returns one', () => {

  const result = listHelper.dummy(initialBlogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

    
    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]),0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(
    initialBlogs)
        assert.strictEqual(result, 36)
    })

  })

describe('favorite blog', () => {

    test('when provided a large list', () => {
        result = listHelper.favoriteBlog(initialBlogs)
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })


})

describe('author with most initialBlogs', () => {
    
    test('given a large list of initialBlogs', () => {
        const result = listHelper.mostBlogs(initialBlogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('author with most likes', () => {

    test('when provided a large list', () => {
        result = listHelper.mostLikes(initialBlogs)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})
