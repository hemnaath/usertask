const orgController = require('../controller/org-controller');
const express = require('express');
const passport = require('../middleware/auth-middleware');


const router = express.Router();

router.post('/create-org', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json('Unauthorized access');
    }
    next();
}, orgController.createOrg);
router.get('/read-org', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json('Unauthorized access');
    }
    next();
}, orgController.readOrg);
router.get('/read-org-by-id/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json('Unauthorized access');
    }
    next();
}, orgController.readOrgById);
router.delete('/delete-org/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json('Unauthorized access');
    }
    next();
}, orgController.deleteOrg);
router.put('/update-org/:id', passport.authenticate('jwt', { session: false }), (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json('Unauthorized access');
    }
    next();
}, orgController.updateOrg);

module.exports = router;