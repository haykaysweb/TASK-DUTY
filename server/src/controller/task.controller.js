import Task from "../model/task.model.js"
import responseHandler from "../utils/responseHandler.js";

//create new task
export const createTask = async (req, res, next) => {
  const { title, description, tag } = req.body;
  const userId = req.user.id;

  try {
    if (!title || !description) {
      return next(
        responseHandler.errorResponse("Title and description are required"),
      );
    }

    const newTask = await Task.create({
      title,
      description,
      tag,
      user: userId,
    });

    return responseHandler.successResponse(
      res,
      newTask,
      "Task created succesfully",
      201,
    );
  } catch (error) {
    next(error);
  }
};

//get all task with search box
export const getTasks = async (req, res, next) => {
  const userId = req.user.id;
  const { search } = req.query;

  try {
    let query = { user: userId };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 }).lean();

    return responseHandler.successResponse(res, tasks, "Tasks retrieved", 200);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    let task = await Task.findById(id);

    if (!task) {
      return next(responseHandler.notFoundResponse("Task not found"));
    }

    if (task.user.toString() !== userId) {
      return next(
        responseHandler.unauthorizedResponse(
          "Not authorized to update this task",
        ),
      );
    }

    task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    return responseHandler.successResponse(
      res,
      task,
      "Task updated successfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return next(responseHandler.notFoundResponse("Task not found"));
    }

    if (task.user.toString() !== userId) {
      return next(
        responseHandler.unauthorizedResponse(
          "Not authorized to delete this task",
        ),
      );
    }
    await task.deleteOne();
    return responseHandler.successResponse(
      res,
      null,
      "Task deleted succesfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};
