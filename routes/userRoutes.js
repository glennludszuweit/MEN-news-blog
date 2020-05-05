const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
