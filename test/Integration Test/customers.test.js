const validateToken = require('../../middlewares/validateToken')
const request = require('supertest')
const { customers } = require('../../models/customers.model')
const { generateToken } = require('../../auth/auth')
const { mongoose } = require('../../models/conection.db')
let server;
let customer1;
let customer2;
let customer3;


describe('Customers', () => {
  beforeEach(async () => {
    server = require('../../server');
    customer1 = new customers({
      name: "1111",
      email: "aaa@mmm.com",
      isGold: true,
      admin: false,
      password: "12345678"
    })
    customer2 = new customers({
      name: "1111",
      email: "bbb@mmm.com",
      isGold: true,
      admin: true,
      password: "12345678"
    })
    customer3 = new customers({
      name: "1111",
      email: "dddd@mmm.com",
      isGold: true,
      admin: true,
      password: "12345678"
    })
    await customer3.save()
    await customer1.save()
    await customer2.save()

  })
  afterEach(async () => {
    await customers.deleteMany({})
    await server.close();
  })

  describe('ValidateToken', () => {
    it('should return 404 if Token is not avalable', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', '')
        .expect(404)
    })
    it('should return 401 if Token is not valid', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', '213123dfs')
        .expect(401)
    })
  })

  describe('ValidateCustomer', () => {
    it('should return 404 if Token is not avalable', async () => {
      const res = await request(server)
        .post('/api/customers/')
        .send({
          name: "1",
          email: 'sdd'
        })
        .expect(400)
    })

    it('should return 401 if Token is not valid', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', '213123dfs')
        .expect(401)
    })
  })

  describe('ValidateAdmin', () => {
    it('should return 404 if Token is not avalable', async () => {
      const res = await request(server)
        .delete('/api/customers/' + mongoose.Types.ObjectId(customer1._id))
        .set('x-auth-token', await generateToken({ email: "bbb@mmm.com" }))
        .expect(200)
    })
  })

  describe('getCustomer', () => {
    it('should return 401 if Email is not avalable', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', await generateToken({}))
        .expect(401)
    })
    it('should return 401 if Email doesnot match with database', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', await generateToken({ email: "ccc@mmm.com" }))
        .expect(401)
    })
    it('should return 401 if user is not admin return 200 with single object', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', await generateToken({ email: "aaa@mmm.com" }))
        .expect(200)
    })
    it('should return 401 if user is  admin return 200 with all objects', async () => {
      const res = await request(server)
        .get('/api/customers/')
        .set('x-auth-token', await generateToken({ email: "bbb@mmm.com" }))
        .expect(200)
    })
  })

  describe('addCustomer', () => {
    it('should return 401 if Email is not avalable', async () => {
      const res = await request(server)
        .post('/api/customers/')
        .send({
          name: "1111",
          email: 'ddd@mmm.com',
          isGold: true,
          password: "12345678"
        })
        .expect(200)
    })
  })

  describe('updateCustomer', () => {
    it('should return 200 if token and email is valid', async () => {
      const res = await request(server)
        .put('/api/customers/')
        .set('x-auth-token', await generateToken({ email: "aaa@mmm.com" }))
        .send({
          name: "8888",
        })
        .expect(200)
    })
  })

  describe('deleteCustomer', () => {
    it('should return 200 if customer object id is valid', async () => {
      const res = await request(server)
        .delete('/api/customers/' + mongoose.Types.ObjectId(customer1._id))
        .set('x-auth-token', await generateToken({ email: "bbb@mmm.com" }))
        .expect(200)
    })
  })
  describe('loginCustomer', () => {
    it('should return 401 if Email is not avalable', async () => {
      const res = await request(server)
        .delete('/api/customers/' + mongoose.Types.ObjectId(customer1._id))
        .set('x-auth-token', await generateToken({ email: "bbb@mmm.com" }))
        .expect(200)
    })
  })
})