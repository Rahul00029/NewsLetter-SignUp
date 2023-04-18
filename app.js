const express=require("express")
const bodyParser=require("body-parser")
const request=require("request");

const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function (req,res) {
    const fname=(req.body.firstname)
    const lname=(req.body.lastname)
    const email=(req.body.email)
    const https=require("https");
    
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }
         
    var jsonData=JSON.stringify(data)

    const url='https://us21.api.mailchimp.com/3.0/lists/747311d4ad'
    
    const options={
        method:"POST",
        auth:"Rahul:c6b9f8c2dca8a0720e01285d66acba61-us21"

    }

    const request = https.request(url,options,function(response){
        if (response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function (data) {
            data=(JSON.parse(data));
            console.log(data)
        })
       
    })


    request.write(jsonData);
    request.end();

})

app.post("/failure",function (req,res) {
    res.redirect("/");
    
})

app.listen(process.env.PORT|| 3000,function () {
    console.log("Server is running on port 3000");    
})



// Mailchimps API key =c6b9f8c2dca8a0720e01285d66acba61-us21

//List id
// 747311d4ad.