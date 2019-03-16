var gabari = document.querySelector('#gabaris .user');
var dest = document.querySelector('.users .row');
var tbl = document.querySelector('#tbl .user');
var form = document.querySelector('#mod');

var grid = false, table = false ;

$(".close").click(function(){
  form.style.display = "none" ;
});


showGrid() ;

//basculer entre les vues grid et table
function toggle(d){
  if(d.innerText == "Table"){
    d.innerText = "Grid" ;
    dest.innerHTML = null ;
    showTable() ;
    grid = false; table = true;
  }
  else{
    d.innerText = "Table" ;
    dest.innerHTML = null ;
    showGrid() ;
    grid = true; table = false;
  }
}

function showGrid(){
  users.forEach(function(user, index){
    var copy = gabari.cloneNode(true);
    copy.querySelector('.name').innerHTML = '<b>' + user.name.last + '</b> ' + user.name.first;
    copy.querySelector('.email').innerText = user.email;
    copy.querySelector('img').setAttribute('src', user.picture.large);
    copy.classList.add(user.gender);
    copy.querySelector('button').setAttribute('onclick', 'update(' + index + ')');
    dest.appendChild(copy);
  }) ;
}

function showTable(){
  users.forEach(function(user, index){
    var t = tbl.cloneNode(true);
    t.querySelector('.name').innerHTML = '<b>' + user.name.last + '</b> ' + user.name.first;
    t.querySelector('.email').innerText = user.email;
    t.querySelector('img').setAttribute('src', user.picture.large);
    t.classList.add(user.gender);
    t.querySelector('button').setAttribute('onclick', 'update(' + index + ')');
    dest.appendChild(t);
  }) ;
}

function update(index) {
  form.querySelector("img").src = users[index].picture.large ;
  form.querySelector('input.name').value = users[index].name.last+" "+users[index].name.first ;
  form.querySelector('input.email').value = users[index].email ;
  form.querySelector("#sub").setAttribute("onclick","modify("+index+")") ;
  $("#mod").fadeToggle(400) ;
}

function modify(i){
  form.onsubmit = function(){
    //recupération de données
    var name = $.trim(this.querySelector(".name").value) ;
    var email = $.trim(this.querySelector(".email").value) ;
    if(name.length < 3){
      this.querySelector("small.name").innerText = "Vous devez dépasser 3 caractères";
      return false ;
    }
    else if(name.split(" ").length < 2 || name.split(" ").length > 2){
      this.querySelector("small.name").innerText = "Vous devez donner le nom et le prénom";
      return false ;
    }
    //modification de données dans le table users
    users[i].name.last = name.split(" ")[0] ;
    users[i].name.first = name.split(" ")[1] ;
    users[i].email = email ;
    dest.innerHTML = null ;
    this.querySelector("small.name").innerText = null ;
    if(table == true) showTable() ;
    else showGrid() ;
    $("#mod").hide(200) ;
    return false ;
  }
}