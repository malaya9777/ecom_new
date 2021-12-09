const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = require('../middleware/auth');

const router = express.Router();