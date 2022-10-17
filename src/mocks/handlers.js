import { rest } from 'msw';
import { ROW_1, ROW_2 } from '../data/testData';

export const handlers = [
    rest.get('data.json', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([ROW_1, ROW_2])
        )
    }),
]