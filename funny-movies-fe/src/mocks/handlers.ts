import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/movie', () => {
    return HttpResponse.json({
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
    });
  }),
];
