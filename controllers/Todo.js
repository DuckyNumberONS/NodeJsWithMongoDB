const Todo = require("../model/Todo");

const getTodos = async (req, res) => {
  try {
    console.log(req.params.todoID);
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.todoID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        },
      },
      { new: true }
    ).exec();

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.deleteOne({ _id: req.params.todoID });
    res.json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
