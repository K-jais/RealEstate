const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const {
    createPool
}= require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Rasmk@890",
    database: "project",
    connectionLimit: 10
})



const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', async(req, res) => {
    var images=["./images/4.jpg","./images/5.jpg","./images/6.jpg","./images/7.jpg","./images/8.jpg","./images/9.jpg","./images/10.jpg","./images/11.jpg"];
    await pool.query("select * from property where available='"+"YES' and p_type='BUY' order by price" , function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        pool.query("select * from property where available='"+"YES' and p_type='RENT' order by price" , function(err1, result1, fields1) {
            if(err1){
                return console.log(err1);
            }
            else{
                res.render('index',{result,result1,images});
                return console.log(' ');
            }
        })
        return console.log(' ');
    })
});

app.get('/property/:id/:number/index',async(req,res)=>{
    var images=["/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg"];
    var id=req.params.id;
    var number=req.params.number;
    number=parseInt(number);
    var image="http://localhost:3000"+images[number];
    await pool.query("select * from (property natural join manages) join agent using (agent_id) where prop_id="+id , function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        res.render('property',{result,image});
        return console.log(' ');
    })
})

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/buy', async(req, res) => {
    var images=["/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg"];
    await pool.query("select * from property where p_type='BUY'" , function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        res.render('buy',{result,images});
        return console.log(' ');
    })
});

app.get('/rent', async(req, res) => {
    var images=["/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg"];
    await pool.query("select * from property where p_type='RENT'" , function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        res.render('rent',{result,images});
        return console.log(' ');
    })
});

app.get('/agent', (req, res) => {
    res.render('agent');
});

app.post('/agent',async(req,res)=>{
    var id=req.body.user;
    var images=["/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg"]; 
    await pool.query("select * from agent where agent_id="+id , function(err, result, fields) {
        if (err) {
            return console.log(err);
        }
        pool.query("select TRANSACTION_ID,AMOUNT,YEAR,PROP_ID,P_TYPE,SIZE,LOCATION from transaction natural join property where agent_id="+id+" order by YEAR desc" , function(err1, result1, fields1) {
            if (err1) {
                return console.log(err1);
            }
            pool.query("select * from property natural join manages where available='YES' and agent_id="+id , function(err2, result2, fields2) {
                if (err2) {
                    return console.log(err2);
                }
                console.log(result2);
                console.log(result1);
                console.log(result);
                res.render('agentname',{result,result1,result2,images});
                return console.log(' ');
            })
            return console.log(' ');
        })
        return console.log(' ');
    })
});

app.post('/make-transaction',async(req,res)=>{
    var property_id=req.body.property_id;
    var agent_id=req.body.agent_id;
    var images=["/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/4.jpg","/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg","/images/9.jpg","/images/10.jpg","/images/11.jpg"];
    await pool.query("select PROP_ID,PRICE from property natural join manages where agent_id="+agent_id+" and prop_id="+property_id , function(err0, result0, fields0) {
        if (err0) {
            return console.log(err0);
        }
        if(result0.length > 0){
            var prop_id=result0[0].PROP_ID;
        var amount=result0[0].PRICE;
        amount=parseInt(amount);
        pool.query("update property set available='NO' where prop_id="+prop_id, function(err1, result1, fields1) {
            if (err1) {
                return console.log(err1);
            }
            return console.log('');
        });
        var letters = "0123456789ABCDEF";
        var number = "";
        prop_id=parseInt(prop_id);
        var year=2021;
        var agent_id_int=parseInt(agent_id);
        for (var i = 0; i < 7; i++)
        {
            number+= letters[(Math.floor(Math.random() * 16))];
        }
        console.log(number+"-number");
        pool.query("insert into transaction(agent_id,year,transaction_id,amount,prop_id) values("+agent_id_int+","+year+",'"+number+"',"+amount+","+prop_id+")", function(err2, result2, fields2) {
            if (err2) {
                console.log(err2);
                return console.log('hi');
            }
            return console.log('');
        });
        res.redirect('/');
        }
        else{
            res.render('error');
        }
        
        return console.log(' ');
    })
});

const port=process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Serving on port 3000');
})