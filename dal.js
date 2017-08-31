const users = [
  {id:1, name: 'Alonya Lafayette', username: 'lotushack', password: 'cheeks'},
  {id:2, name: 'Ahnyia Jenkins', username: 'ajenkins', password: 'jenks'},
]

function getUsers(){
  return users
}

function getId(userId){
  const foundUser = users.find(user => number(id) === user.id);
  return foundUser
  console.log('get user', foundUser);

}

function getUserbyUsername(usrname){
  const foundUser = users.find(usr => usrname === users.username);
  return foundUser
  console.log('found user', foundUser);
}



module.export = {
getUsers,
getId,
getUserbyUsername
}
