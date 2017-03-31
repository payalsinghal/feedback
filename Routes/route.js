var express = require('express');
var app = express();
var mongoose = require('mongoose');
var User = require('../model/user');
var Presenter = require('../model/presenter');
var router = express.Router();



router.route('/userregister').post(function(req, res) {

    register = new User();
    register.name = req.body.name;
    register.phone = req.body.phone;
    register.email = req.body.email;

    User.findOne({ email: req.body.email }, function(err, data) {
        if (data == null || data == undefined) {


            register.save(function(err) {
                if (err)
                    res.send(err);

                else {
                    res.send({ message: ' registration done!' });
                }
            });
        } else
            res.send({ message: ' registration already done!' });

    })
});



router.route('/presenterregister').post(function(req, res) {

    presenter = new Presenter();
    presenter.name = req.body.name;
    presenter.orgname = req.body.orgname;
    presenter.phone = req.body.phone;
    presenter.email = req.body.email;
   




    Presenter.findOne({ email: req.body.email }, function(err, data) {
        if (data == null || data == undefined) {


            presenter.save(function(err) {
                if (err)
                    res.send(err);

                else {
                    res.send({ message: ' registration done!' });
                }
            });
        } else
            res.send({ message: ' registration already done!' });

    })
})




router.route('/login').post(function(req, res) {


    Register.findOne({ email_id: req.body.email_id }, function(err, d) {

        if (err) throw err;

        if (!d) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            if (d.password != req.body.password) {
                res.send({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                Hotel.findOne({ email_id: req.body.email_id }, function(err, d) {

                    var ip = req.ip.split(":")
                    ipClient = ip[3];

                    obj = { date: new Date(), ip: ipClient };
                    d.lastLogin.push(obj);
                    d.markModified('lastLogin');

                    d.save(function(err) {
                        if (err)
                            res.send(err);

                        else {
                            res.send({ success: true, message: 'Successful login.' });
                        }



                    })
                })
            }
        }
    })
})


router.route('/addques').post(function(req, res) {

    Presenter.findOne({ email: req.body.email }, function(err, d) {

        qno = req.body.qno;
        q = req.body.q;

        //text=req.body.text;

        d.ques.push({ qno, q })
            //d.ques[0].choice.push({text})


        d.save(function(err) {
            if (err)
                res.send(err);

            else {
                res.json({ message: 'Item created!' });
            }
        });

    })
});




router.route('/addchoices').post(function(req, res) {
    //db.presenters.update({email:"mlab11@gmail.com","ques.qno":3},{$push:{"ques.$.choice":{"text":"gh","vote":0}}})
    //db.presenters.update({email:"mlab11@gmail.com","ques.qno":3,"ques.choice.text":"ad111"},{$set:{"ques.$.choice":{"vote":1}}})

    Presenter.findOne({ email: req.body.email, "ques.qno": req.body.qno }, function(err, d)

        {
            console.log(d)

            qno = req.body.qno;
            q = qno - 1;

            text = req.body.text;
            vote = 0

            //d.ques.push({qno,q})
            d.ques[q].choice.push({ text, vote })


            d.save(function(err) {
                if (err)
                    res.send(err);

                else {
                    res.json({ message: 'Item created!' });
                }
            });

        })
});




router.route('/get_ques').post(function(req, res) {
    Presenter.findOne({ email: req.body.email }, function(err, items) {
        if (err)
            res.send(err);
        res.json(items);
    });
});




router.route('/userchoices').post(function(req, res) {
    //db.presenters.update({email:"mlab11@gmail.com","ques.qno":3},{$push:{"ques.$.choice":{"text":"gh","vote":0}}})
    //db.presenters.update({email:"mlab11@gmail.com","ques.qno":3,"ques.choice.text":"ad111"},{$set:{"ques.$.choice":{"vote":1}}})
console.log(req.body.email)
    User.findOne({ email: req.body.email}, function(err, d){
            console.log(d)
                console.log(req.body.ans[0].qno)

            qno = req.body.ans[0].qno;
            
        

           choice=req.body.ans[0].choice;
           console.log(choice)

            d.ans.push({qno,choice})


            d.save(function(err) {
                if (err)
                    res.send(err);

                else {
                    res.json({ message: 'Item created!' });
                }
            });

        })
});


















// router.route('/delete_item').delete(function(req, res) {
//        Hotel.findOne({email_id: req.body.email_id}, function(err, data) {
//          //data.remove($and:[{menu:{item_name: req.body.item_name,price:req.body.price}}], function(err, menu) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'Item Successfully deleted' });
//         });
//         });
//     //});







// router.route('/update_item').put(function(req, res) {

//      Hotel.findOne({email_id: req.body.email_id}, function(err, d) {
//              item_name = req.body.item_name;
//             price     = req.body.price;
//            //d.menu.push({item_name,price})

//         d.save(function(err) {
//             if (err)
//                 res.send(err);

//             else {
//                 res.json({ message: 'Item created!' });

//         }
//     });
//     })
// });


// router.route('/delete_hotel').delete(function(req, res) {

//     Hotel.remove({ email_id: req.body.email_id }, function(err, menu) {
//         if (err)
//             res.send(err);

//         res.json({ message: 'Item Successfully deleted' });
//     });
// });



// router.route('/get_items/id').post(function(req, res) {
//     Hotel.findOne({ hotel_id: req.body.hotel_id }, function(err, items) {
//         if (err)
//             res.send(err);
//         res.json(items);
//     });
// });



// router.route('/create_order').post(function(req, res) {

//     var order = new Order()
//     order.hotel_id = req.body.hotel_id;
//     order.order_name = req.body.order_name;
//     order.item_name = req.body.item_name;
//     order.item_price = req.body.item_price;

//     order.total_price = req.body.total_price;
//     order.addon_name = req.body.addon_name;
//     order.addon_price = req.body.addon_price;



//     order.save(function(err) {
//         if (err)
//             res.json(err);
//         res.json({ success: true, message: 'Order Successfully make' });
//     });
// });
//});





module.exports = router;


// var minutes = 5, the_interval = minutes * 60 * 1000;
// setInterval(function() {
//   console.log("I am doing my 5 minutes check");
//   // do your stuff here
// }, the_interval);
