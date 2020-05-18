var formElements = document.getElementsByTagName("input");

function validate() {
    let msg = '';
    if (isEmpty(formElements[0])) {
        msg += "FirstName Cannot be Empty\n";
    }
    if (isEmpty(formElements[1])) {
        msg += "LastName Cannot be Empty \n";
    }
    if (!isEmail(formElements[2])) {
        msg += "Enter Valid Email Address \n";
    }
    if (!isValidPhoneNumber(formElements[3])) {
        msg += "Enter Valid Phone Number \n";
    }
    if (msg !== '') {
        alert(msg);
        return false;
    } else {
        alert("Successful !");
        formElements[0].value='';
        formElements[1].value='';
        formElements[2].value='';
        formElements[3].value='';
        var ta=document.getElementById("note");
        ta.value='';
        return true;
    }

}

function validateAddForm() {
    let msg = '';
    let id = document.getElementById("imgid");
    let url = document.getElementById("formurl");
    let name = document.getElementById("formname");
    let info = document.getElementById("forminfo");
    let date = document.getElementById("formdate");
    let addoredit="Edited";
    if(id.value===""){
        addoredit="Added";
    }

    if (!isValidurl(url.value)) {
        msg += "Enter valid image url \n";
    }
    if (isEmpty(name)) {
        msg += "Name Cannot be Empty \n";
    }
    if (isEmpty(info)) {
        msg += "Information Cannot be Empty \n";
    }
    if (isEmpty(date)) {
        msg += "Date Cannot be Empty \n";
    }


    if (msg !== '') {
        alert(msg);
        return false;
    } else {
        alert("Image "+addoredit+" Successfully !!");
        addImage(id.value,url.value, name.value, info.value, date.value);
        id.value='';
        url.value = '';
        name.value = '';
        info.value = '';
        date.value = '';
        document.getElementById("addpreview").innerHTML = '';
        document.getElementById("btn").innerHTML="Add Image";
        return true;
    }

}
function getlocalid() {
    if (localStorage.getItem("localid") !== null) {
        return localStorage.getItem("localid");
    } else {
        localStorage.setItem("localid", 0);
        return localStorage.getItem("localid");
    }
}



function isEmpty(inputTask) {
    if (inputTask == null) { return true; }
    inputValue = inputTask.value;
    if (inputValue.trim() != '') {
        return false;
    } else {
        return true;
    }
}

function isEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return (true)
    }
    return (false)
}

function isValidPhoneNumber(element) {
    var phoneno = /^\d{10}$/;
    if (element.value.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}

function loadImagesFromJson(jsonPath) {

    fetch(jsonPath)
        .then(res => res.json())
        .then(data => {
            addImagesintoLocalStorage(data)
        })
        .catch(err => console.error(err));


}

function addImagesintoLocalStorage(data) {

    for (let i = 0; i < data.length; i++) {
        addImage("",data[i]["url"], data[i]["name"], data[i]["information"], data[i]["UploadedDate"]);

    }

}



function imgpreview(element) {
    if (element.value.trim() != '' && isValidurl(element.value)) {
        var prevcontainer = document.getElementById("addpreview");
        var thumb = document.createElement("img");
        thumb.setAttribute("src", element.value);
        thumb.setAttribute("width", 300);
        thumb.setAttribute("height", 200);
        if (prevcontainer.hasChildNodes) {

            prevcontainer.innerHTML = '';
            prevcontainer.appendChild(thumb);
        } else {
            prevcontainer.appendChild(thumb);
        }
        console.log("url is valid");
    } else {
        console.log("wrong url");
    }
}

function isValidurl(url) {
    //console.log("got here")
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);

}

function addImage(id,url, name, info, date) {
    console.log(getlocalid());
    if(id===""){
    id = getlocalid();
    localStorage.setItem("localid", parseInt(id) + 1);}

    let image = {
        "id": id,
        "url": url,
        "name": name,
        "information": info,
        "UploadedDate": date
    };
    localStorage.setItem("image" + id, JSON.stringify(image));
    
    slideshowAdmin();
    slideshow();
}

function editImage(element) {
    let id = document.getElementById("imgid");
    let url = document.getElementById("formurl");
    let name = document.getElementById("formname");
    let info = document.getElementById("forminfo");
    let date = document.getElementById("formdate");
    image = JSON.parse(localStorage.getItem("image" + element.id));
    id.value = image["id"];
    url.value=image["url"];
    name.value=image["name"];
    info.value=image["information"];
    date.value = image["UploadedDate"];
    document.getElementById("btn").innerHTML="Edit Image";
    imgpreview(url);

}
function removeImage(element) {
    console.log(element.id);
    localStorage.removeItem("image" + element.id);
    slideshowAdmin();
    slideshow();
}



function slideshowAdmin() {
    var admingall = document.getElementById("admingall");
    admingall.innerHTML = '';
    id = getlocalid();
    for (let i = 0; i < id; i++) {
        image = JSON.parse(localStorage.getItem("image" + i));
        //console.log(image["url"]);
        if (localStorage.getItem("image" + i) !== null) {
            admingall.innerHTML += ' <div class="imgwrap" id="' + i + '"><img src="' + image["url"] + '" /><button type="button" class="remove" id="' + i + '" onclick="removeImage(this)">Remove</button> <a href="#admingallery"><button type="button" class="edit" id="' + i + '" onclick="editImage(this)">Edit</button></a></div>';
        }
    }
}

function slideshow() {
    var gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    id = getlocalid();
    for (let i = 0; i < id; i++) {
        image = JSON.parse(localStorage.getItem("image" + i));
        //console.log(image["url"]);
        if (localStorage.getItem("image" + i) !== null) {
             var img = document.createElement('img');
            img.setAttribute('src', image["url"]);
            gallery.appendChild(img);
        }
    }
}
function init() {
    if (localStorage.getItem("jsonLoaded") === null) {
        loadImagesFromJson('./images.json');
        localStorage.setItem("jsonLoaded", 1);
    }
    slideshow();
    slideshowAdmin();
}
init();