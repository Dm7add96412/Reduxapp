beforeAll(() => {

})

beforeEach(() => {
    console.log("should be printed two times")
})

describe("Return truthy", () => {
    test("Should be true", () => {
        expect(true).toBeTruthy()
    })
})

describe("Return falsy", () => {
    test("Should be true", () => {
        expect(false).toBeFalsy()
    })
})