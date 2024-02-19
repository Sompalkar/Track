const { Router } = require("express");
const {
  addExpense,
  viewExpense,
  viewExpenseByCategory,
  setBudget,
  viewExpensesInRange,
  deleteExpense,
  getBudget,
  getTodayExpense,
} = require("../controllers/expenseControllers");
const { requireAuth } = require("../middleware/authMiddleware");
const expenseRouter = Router();

expenseRouter.post("/addexpense", requireAuth, addExpense);
expenseRouter.get("/viewexpense", requireAuth, viewExpense);
expenseRouter.get("/getdailyexpense", requireAuth, getTodayExpense);
expenseRouter.post("/setbudget", requireAuth, setBudget);
expenseRouter.get("/getbudget", requireAuth, getBudget);
expenseRouter.get(
  "/viewexpense/:category",
  requireAuth,
  viewExpenseByCategory
);
expenseRouter.post("/viewexpenseinrange", requireAuth, viewExpensesInRange);
expenseRouter.get("/:id/deleteExpense", requireAuth, deleteExpense);

module.exports = expenseRouter;
