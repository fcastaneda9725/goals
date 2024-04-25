var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { parseGoal } = require('../utils/parseGoal');

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await prisma.goal.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (goal) {
      res.json(goal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const { description } = req.body;
    const parsedGoal = parseGoal(description);

    if (!parsedGoal) {
      return res.status(400).json({ error: 'Invalid goal format. Please use the format "I want to [action] every [number] [time units]".' });
    }

    const newGoal = await prisma.goal.create({
      data: {
        title: parsedGoal.title,
        frequency: parsedGoal.frequency,
        description,
        completed: false
      },
    });

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, frequency, completed } = req.body;
  try {
    const updatedGoal = await prisma.goal.update({
      where: { id: parseInt(id) },
      data: { title, description, frequency, completed },
    });
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.goal.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
