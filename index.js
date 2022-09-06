const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', './views');

const arrStaff = [];

app.get('/create', (req, res) => {
    res.render("create");
});

app.get('/view', (req, res) => {
    res.render("view", {data: arrStaff});
})

app.post('/create', upload.none(), (req, res) => {
    if (req.body.id && req.body.name && req.body.department) {
        const staff = {
            id: req.body.id,
            name: req.body.name,
            department: req.body.department
        }
        arrStaff.push(staff);
        res.render("create", {data: arrStaff});
    }
});

app.post('/view', upload.none(),(req, res)=>{
    if(req.body.id){
        for(let i=0; i<arrStaff.length; i++) {
            if(arrStaff[i].id === req.body.id){
                arrStaff.splice(i, 1);
                break;
            }
        }
    }
    res.render("view", {data: arrStaff});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});