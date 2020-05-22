class Table {
    constructor(number) {
        this.number = number;
        //this.items = new Array();
        this.items = new Map();
        this.itemsCount = 0;
    }

    getTotal() {
        let total = 0;
        this.itemsCount = 0;
        for (let item of this.items) {
            //console.log("inside");
            total += menu[item[0]].price * item[1];
            this.itemsCount += item[1];
            //total += menu.price;
        }
        return total;
    }
    getBill() {
        this.getTotal();
        //console.log(this.number);
        var bill = document.getElementById("billdetails");
        var msg = '<h1> Table no ' + this.number + ' - Bill Details</H1>';
        //console.log(msg);
        console.log(this.itemsCount);
        if (this.itemsCount > 0) {
            //console.log("enter in loop");
            msg += '<table id="' + this.number + '"><thead> <td>S.No</td> <td>Item Description </td> <td> Quantity</td> <td> Price(Rs) </td><td></td> </thead>';
            var count = 1;
            //console.log(msg);
            for (let item of this.items) {
                //total += menu[item[0]].price*item[1];
                //total += menu.price;
                msg += '<tr><td>' + count++ + '</td><td>' + menu[item[0]].description + '</td><td><input min="1" id="' + item[0] + '" onchange="changeBill(this)" type="number" value="' + item[1] + '"/></td><td>' + menu[item[0]].price * item[1] + '</td><td><img id="' + item[0] + '" onclick="deleteItem(this)" src="del.png" /></td> </tr>';

            }
            msg += '<tr><td colspan="3">Total Amount</td><td>' + this.getTotal() + '</td></tr></table>';

            msg += '<button type="button" onclick="closeSession(' + this.number + ')">Close Session (Print Bill)</button>';

        } else {
            msg += 'There are no Items added in this table ';
        }
        bill.innerHTML = msg;
    }
}

class Item {
    constructor(id, description, price) {
        this.id = id;
        this.description = description;
        this.price = price;
    }
}

var tables = new Array();
var menu = new Array();
tables.push(new Table(0));
tables.push(new Table(1));
tables.push(new Table(2));

function displayTables(val) {
    var tableList = document.getElementById("tableList");
    tableList.innerHTML = '';
    for (let table of tables) {
        let tableElement = document.createElement("div");
        tableElement.setAttribute("class", "table");
        tableElement.setAttribute("id", "tb" + table.number);
        tableElement.setAttribute("ondrop", "drop(event)");
        tableElement.setAttribute("ondragover", "allowDrop(event)");
        tableElement.setAttribute("onclick", "showbill(event)");
        tableElement.innerHTML = "Table " + table.number + "</br></br>Rs." + table.getTotal() + "| Total Items :" + table.itemsCount;

        if (val == null || ("Table " + table.number).match(eval("/" + val + "/gi"))) {
            tableList.appendChild(tableElement);
        }
    }
}
menu.push(new Item(0, "chicken Biryani", 200));
menu.push(new Item(1, "veg Biryani", 180));
menu.push(new Item(2, "Veg pulav", 200));
menu.push(new Item(3, "Fried Rice", 100));
menu.push(new Item(4, "Ice Cream", 70));
menu.push(new Item(0, "chicken Biryani", 200));
menu.push(new Item(1, "veg Biryani", 180));
menu.push(new Item(2, "Veg pulav", 200));
menu.push(new Item(3, "Fried Rice", 100));
menu.push(new Item(4, "Ice Cream", 70));
menu.push(new Item(0, "chicken Biryani", 200));
menu.push(new Item(1, "veg Biryani", 180));
menu.push(new Item(2, "Veg pulav", 200));
menu.push(new Item(3, "Fried Rice", 100));
menu.push(new Item(4, "Ice Cream", 70));


function displayMenus(val) {
    var menuList = document.getElementById("menuList");
    menuList.innerHTML = '';
    for (let item of menu) {
        if (val == null || item.description.match(eval("/" + val + "/gi"))) {
            menuList.innerHTML += '<div class="item" id="item' + item.id + '" draggable="true" ondragstart="passData(event)" > <div class="title">' + item.description + '</div><div class="price">' + item.price + '</div> ';
        }
    }

}

function passData(ev) {
    ev.dataTransfer.setData("menuId", ev.target.id.substring(4));
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("menuId");
    var tableId = ev.target.id.substring(2);
    //console.log(tableId);
    if (tables[tableId].items.has(data)) {
        tables[tableId].items.set(data, tables[tableId].items.get(data) + 1);
    } else {
        tables[tableId].items.set(data, 1);
    }
    //console.log(tables[tableId].items);
    displayTables();
}

function closebill(ev) {
    var bill = document.getElementById("bill");
    bill.style.display = "none";
}

function showbill(ev) {
    var bill = document.getElementById("bill");
    bill.style.display = "block";
    var tableId = ev.target.id.substring(2);
    //console.log(tableId);
    tables[tableId].getBill();
}
function closeSession(id) {
    //console.log("int the session");
    tables[id].items.clear();
    tables[id].getBill();
    displayTables();
}

function filterMenu(ev) {
    console.log("filter");
    var val = ev.value;
    displayMenus(val);

}
function filterTable(ev) {
    console.log("filter");
    var val = ev.value;
    displayTables(val);

}

function changeBill(element) {
    console.log("changeBill");
    var menuId = element.id;
    var val = element.value;
    var tableId = element.parentNode.parentNode.parentNode.parentNode.id;
    console.log(menuId, val, tableId);

    if (val > 0) {
        tables[tableId].items.set(menuId, parseInt(val));
        displayTables();
        tables[tableId].getBill();
    }

}
function deleteItem(element) {
    console.log("deleteitem");
    var menuId = element.id;
    var tableId = element.parentNode.parentNode.parentNode.parentNode.id;
    console.log(menuId, tableId);
    tables[tableId].items.delete(menuId);
    displayTables();
    tables[tableId].getBill();
}

function init() {
    displayTables();
    displayMenus();
}
init();