//gets the height and width information
/*app.get("/getMembers", (req, res) => {
    let id = req.session.lock;
    mod.getLockMembers(id, function(members) {res.send({members: members});});
  })*/
var height = document.getElementById("height").value;
console.log("this is the height: " + height);