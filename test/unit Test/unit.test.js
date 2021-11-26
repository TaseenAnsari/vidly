const auth = require('../../auth/auth')
require('jest')
describe('generateToken& verifyToken',()=>{
    it('should return generated token',async ()=>{
        token =await  auth.generateToken({email:"taseen@gmail.com"})
        expect(await auth.verifyToken(token)).toHaveProperty('email',"taseen@gmail.com")
    })
})
describe('encryptPassword & decryptPassword',()=>{
    it("should return matched password",async ()=>{
        const password = await auth.encryptPassword('1234abcd')
        expect(await auth.decryptPassword('1234abcd',password)).toBe(true)
    })
})

