const express = require('express');
const myDB = require('mongodb');

const router = express.Router();
const dbFunctions = require('../db/dbFunctions');
const {genPassword} =require('./encryption');

const loginRedirect="/?msg=login needed";

const path = require('path');

const {shiftList} = require('../data/shiftList');

router.get('/api/allReviews', async (req, res) => {
  if (!req.session.login||!isManager(req)) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    const docs = await dbFunctions.getAllReviews();
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/login', async (req, res) => {
  let data = req.body;

  let user = await dbFunctions.findUser(data.username);
  if (user) {
    if (user.password == genPassword(data.password)) {
      req.session.user = user;
      req.session.login = true;
      if (user.position == "manager") {
        res.redirect("/manager");
      } else {
        res.redirect("/employee");
      }
    } else {
      res.redirect("/?msg=wrong password");
    }
  } else {
    res.redirect("/?msg=user not exists");
  }
});

router.post('/api/register', async (req, res) => {
  let data = req.body;
  //console.log("register:"+data);
  try {
    if (await dbFunctions.findUser(data.username)) {
      res.redirect("/register?msg=user already exist");
    } else {
      data.password=genPassword(data.password);
      await dbFunctions.addUser(data);
      res.redirect("/?msg=register succeed");
    }
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/addShift', async (req, res) => {
  if (!req.session.login||!isEmployee(req)) {
    res.redirect(loginRedirect);
    return;
  }
  let data={shift:req.body.shift,name:req.session.user.username};
  try {
    let item=await dbFunctions.findOneShift(data);
    if(item){
      res.json({message: 'shift already exist'});
      return;
    }
    data = await dbFunctions.addShift(data);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/giveReviews', async (req, res) => {
  if (!req.session.login||!isManager(req)) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    const data = await dbFunctions.giveReviews(req.body);
    res.json(data);
  } catch (err) {
    console.error('# Post Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.get('/api/getByName', async (req, res) => {
  if (!req.session.login) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    const docs = await dbFunctions.findByName(req.session.user.username);
    // const docs = await dbFunctions.findByName('employee1');
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/checkin', async (req, res) => {
  if (!req.session.login||!isEmployee(req)) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    let data=req.body;
    data.name=req.session.user.username;
    // data.name='employee1';
    if(await dbFunctions.findOneCheckIn(data)){
      return;
    }
    const docs = await dbFunctions.addCheckIn(data);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.post('/api/getCheckInByName', async (req, res) => {
  if (!req.session.login) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    const docs = await dbFunctions.getCheckInByName(req.body);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }
});

router.get('/api/logout',async (req, res) => {
  req.session.user = null;
  req.session.login = false;
  return res.json();
})

router.post('/api/search',async (req, res) => {
  if (!req.session.login||!isManager(req)) {
    res.redirect(loginRedirect);
    return;
  }

  try {
    const docs = await dbFunctions.searchReviews(req.body);
    res.json(docs);
  } catch (err) {
    console.error('# Get Error', err);
    res.status(500).send({ error: err.name + ', ' + err.message });
  }

  return;
})

router.get('/api/getShiftList',async function(req, res) {
  return res.send(shiftList);
})

router.get('*', async function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../frontend/build')});
});

function isEmployee(req){
  return req.session.user.position==="employee";
}

function isManager(req){
  return req.session.user.position==="manager";
}

module.exports = router;