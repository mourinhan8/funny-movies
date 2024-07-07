const mockResponse = {
  data: {
    data: [
      {
        _id: '1',
        title: 'Test Movie',
        url: 'https://www.youtube.com/watch?v=abcdefghijk',
        sharedBy: { email: 'test@example.com' },
        likes: 10,
        dislikes: 2,
        description: 'This is a test movie.',
      },
    ],
    paging: { total: 1 },
  }
};


export default {
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue(mockResponse),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }))
}