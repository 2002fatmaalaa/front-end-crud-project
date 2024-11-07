var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productTypeInput = document.getElementById("productTypeInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var nameMessage = document.getElementById("nameMessage");
var priceMessage = document.getElementById("priceMessage")
var typeMessage = document.getElementById("typeMessage")
var indexUpdate = 0;
var productList = [];
if(localStorage.getItem("products")!=null)
{
    productList = JSON.parse(localStorage.getItem("products"));
    display();
}

function addProduct(){
    if(validationName() || validationPrice() || validationType() || validationDesc()){
    var product = {
        name : productNameInput.value,
        price : productPriceInput.value,
        type : productTypeInput.value,
        desc : productDescInput.value,
    }
    productList.push(product);
    localStorage.setItem("products",JSON.stringify(productList)); // to store data temporary on local storage even on closing web page
    display();
    clearForm();
    productNameInput.classList.remove("is-valid")
    productPriceInput.classList.remove("is-valid")
    productTypeInput.classList.remove("is-valid")
    productDescInput.classList.remove("is-valid")
}
}
//////////////////////////////////////////////////////////////////////////////////////////////
function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productTypeInput.value = "";
    productDescInput.value = "";
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function display()
{
    var container = "";
    for(var i=0; i<productList.length;i++)
    {
        container+= `<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].type}</td>
        <td>${productList[i].desc}</td>
        <td>
        <button class="btn btn-warning" onclick="setData(${i})">update</button>
        <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
        </td>
        </tr> `
    }
    document.getElementById("tableBody").innerHTML = container;
}
///////////////////////////////////////////////////////////////////////////////////////////////
function deleteProduct(index)
{
    productList.splice(index,1);
    localStorage.setItem("products",JSON.stringify(productList))
    display();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function searchProduct()
{
    var container = "";
    var term = searchInput.value;
    for(var i=0; i<productList.length;i++)
    {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase()))
        {
            container+= `<tr>
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].type}</td>
            <td>${productList[i].desc}</td>
            <td>
            <button class="btn btn-warning" onclick="setData(${i})">update</button>
            <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
            </td>
            </tr>
            `
        }
    }
    document.getElementById("tableBody").innerHTML = container;

}
/////////////////////////////////////////////////////////////
function setData(index) // de 3shan lma a3mel update ll product , user can edit products , add button removed and displayed with update button
// da bta3 update elso8ayar
{
    indexUpdate = index;
    var currentProduct=productList[index]
    productNameInput.value=currentProduct.name;
    productPriceInput.value=currentProduct.price;
    productTypeInput.value=currentProduct.type;
    productDescInput.value=currentProduct.desc
    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

}
///////////////////////////////////////////////////////////////
function updateProduct(){ // da bta3 update elkeber
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      type: productTypeInput.value,
      desc: productDescInput.value,
    };

    productList.splice(indexUpdate,1,product)
    localStorage.setItem("products", JSON.stringify(productList));
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    display();
    clearForm()
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function validationName()
{
    var regex = /^[A-Z][a-z]{3,8}$/;
    var text = productNameInput.value;
    if(regex.test(text)){
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameMessage.classList.add("d-none");
        return true;


    }else{
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameMessage.classList.remove("d-none");
        return false;
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function validationPrice()
{
    var regex = /^(10|[1-9][0-9]|[1-9][0-9]{2}|1000)$/;
    var text = productPriceInput.value;
    if(regex.test(text)){
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        nameMessage.classList.add("d-none");
        return true;


    }else{
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        nameMessage.classList.remove("d-none");
        return false;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validationType()
{
    var regex = /^(mobile|watch|screen)$/;

    var text = productTypeInput.value;
    if(regex.test(text)){
        productTypeInput.classList.add("is-valid");
        productTypeInput.classList.remove("is-invalid");
        typeMessage.classList.add("d-none");
        return true;


    }else{
        productTypeInput.classList.add("is-invalid");
        productTypeInput.classList.remove("is-valid");
        typeMessage.classList.remove("d-none");
        return false;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validationDesc() {
    var regex = /^.{1,50}$/; // Matches any character (.) between 1 and 50 times
    var text = productDescInput.value;
    
    if (regex.test(text)) {
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        descMessage.classList.add("d-none");
        return true;
    } else {
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        descMessage.classList.remove("d-none");
        return false;
    }
}

//getComputedStyle in JavaScript is a way to see the final style of an HTML element after all CSS rules have been applied.
//You have CSS styles for your webpage. Some styles might be written in a stylesheet, others inline, or even added by the browser itself (default styles).
//getComputedStyle shows you what the browser actually uses after combining all those styles.
