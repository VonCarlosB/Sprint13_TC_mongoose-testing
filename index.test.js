const request = require('supertest')
const app = require('./index')
const Post = require('./models/Post.js')

describe('testing/posts', () => {
    const post = {
        title: "Testing_post",
        body: "Description of the post"
    }

    afterAll(() => {
        return Post.deleteMany()
    })

    test('Create a post', async () => {
        let postCount = await Post.countDocuments()
        expect(postCount).toBe(0)
        let resPost = await request(app).post('/create').send(post).expect(201)
        postCount = await Post.countDocuments()
        expect(postCount).toBe(1)
        
        expect(resPost.body._id).toBeDefined()
        expect(resPost.body.createdAt).toBeDefined()
        expect(resPost.body.updatedAt).toBeDefined()     
    })
    
});
