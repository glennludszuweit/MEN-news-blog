const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getPost);
postRouter.patch('/:id', updatePost);
postRouter.delete('/:id', deletePost);

module.exports = postRouter;
