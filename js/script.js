/* scroll to top button */
//get button
var topButton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function(){
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } 
  else {
    topButton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* form autofill */
//autofills form based on local storage
function localAutofill() {
  document.getElementById('name').value = localStorage.getItem('userName');
  document.getElementById('email').value = localStorage.getItem('userEmail');
  document.getElementById('phone').value = localStorage.getItem('userPhone');
}

/* form validations */
function checkName() { //validates name entry
	var name = document.getElementById("name").value;  
  if (name == "") { //if message is empty, show error and make border red
    document.getElementById("name").style.borderColor = "red";
		document.getElementById("nameError").innerHTML = "Please enter a name.";
		return false;
	}
	
  else { //input is valid
    document.getElementById("name").style.borderColor = "#228B22";
		document.getElementById("nameError").innerHTML = "";
    return true;
  }
}

function checkEmail(formID, elementID, errorID) { //validates email entry (must have @, etc)
  var x = document.forms[formID][elementID].value;
  var atpos = x.indexOf("@"); 
  var dotpos = x.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    document.getElementById(elementID).style.borderColor = "red";	
    document.getElementById(errorID).innerHTML = "Please enter a valid email";
    return false;
  }

	else { //input is valid
    document.getElementById(elementID).style.borderColor = "#228B22";
		document.getElementById(errorID).innerHTML = "";
    return true;
	}
}

function checkPhone(elementID, errorID) { //validates phone number
  var phone = document.getElementById(elementID).value;
  var phoneno = /^\d{11}$/; //length should be 11
  if (phone == "" || !phone.match(phoneno)) { //if it doesn't match var phoneno or is empty, input is invalid 
    document.getElementById(elementID).style.borderColor = "red";
    document.getElementById(errorID).innerHTML = "Please enter a valid 11-digit phone number (ex. 09123456789).";
    return false;
  }
    
	else { //input is valid
		document.getElementById(elementID).style.borderColor = "#228B22";		
    document.getElementById(errorID).innerHTML = "";
    return true;
	}	
}

function checkGig() {
  var gig = document.getElementById("gig");   
  var gigPrice = document.getElementById('gig-price');
    (function calculate() { //get gig price based on data-price attribute in select options of order.html
      "use strict";
      var selects = document.getElementsByClassName('calculate'), select;
      for (var i = 0; select = selects[i]; i++) {
        select.addEventListener("focusout",function (){
          var newPrice = 0;
          var selectedItems = document.querySelectorAll('.calculate option:checked'), selected;
        for(var x = 0; selected = selectedItems[x]; x++) {
          newPrice += Number(selected.getAttribute('data-price'));
        }
        gigPrice.innerHTML = newPrice.toFixed(2);
        var savePrice = newPrice;
        sessionStorage.setItem('userPrice', savePrice); //save price to sessionStorage
        },false);
      }
    })();
  
  if (gig.value) { //if gig dropdown has value, input is valid
  	document.getElementById("gigError").innerHTML = "";
    document.getElementById("gig").style.borderColor = "#228B22";
  	return true;
  }
    
  else { //else it's invalid and user must select one
  	document.getElementById("gigError").innerHTML = "Select one";			
    document.getElementById("gig").style.borderColor = "red";	
  	return false;	
  }
}	

function checkTicket() {
  var ticket = document.getElementById("ticketQty").value;
  var n = parseFloat(document.getElementById("gig-price").textContent); //gets price of gig
  
  if (ticket == 0) { //if ticketQty is 0 -> border should be red and error must be displayed
    document.getElementById("ticketQty").style.borderColor = "red";
    document.getElementById("ticketError").innerHTML = "Please enter number of tickets";			
  	return false;	
  }

  else if (ticket > 10) { //if ticketQty exceeds 10, display a different error message
    document.getElementById("ticketQty").style.borderColor = "red";
    document.getElementById("ticketError").innerHTML = "You have exceeded the number of tickets that can be purchased (10).";		
  	return false;	
  }
  
  else { //input is valid
    document.getElementById("ticketQty").style.borderColor = "#228B22";	  
    document.getElementById("ticketError").innerHTML = "";

    //if ticketQty is valid, compute for total price of tickets (qty * price) & save in sessionStorage
    var ticketTotal = ticket * n;
    document.getElementById("ticketTotal").innerHTML = "₱" + ticketTotal;
    saveTotal = ticketTotal;
    sessionStorage.setItem('userTotal', saveTotal);
    return true;
  }
}

function checkMessage() { //validates message entry in contact page
	var message = document.getElementById("message").value;  
  if (message == "") { //if message is empty, show error and make border red
    document.getElementById("message").style.borderColor = "red";
		document.getElementById("messageError").innerHTML = "Please enter a message.";
		return false;
	}
	
  else { //input is valid
    document.getElementById("message").style.borderColor = "#228B22";
		document.getElementById("messageError").innerHTML = "";
    return true;
  }
}
  
function validate() { //onclick of submit button, checks if all required fields were valid before allowing user to submit
  if (!checkName() || !checkEmail('form', 'email', 'emailError') || !checkPhone('phone', 'phoneError') || !checkGig() || !checkTicket()) {
    alert("Please fill out required fields.");
    event.preventDefault(); //prevent form from redirecting to confirmation page
    return false;
  }  //if not all required fields were filled, shows an alert dialog box
    
  else {
    if (confirm ('Are you sure you want to submit?')) {    
      setTimeout(function() {window.location = "../htdocs/confirm.html"}); //if sure with submission, redirected to confirmation page
    }
      
    else {
      event.preventDefault();  //prevent form from redirecting to confirmation page
    }
    return true;
  }
} 

function clearContent(elementID) { //reset function
  if (confirm('Are you sure you want to reset the form?')){
    document.getElementById(elementID).innerHTML = "";
    localStorage.clear();
    sessionStorage.clear(); 
    //clears everything including local and session storage
  }

  else {
    event.preventDefault(); //prevent form from submitting
  }
  return true;
}

function contactValid() { //onclick of submit button, checks if all required fields were valid before allowing user to submit
  if (!checkPhone('cPhone', 'cPhoneError') || !checkEmail('contactForm', 'cEmail', 'cEmailError') || !checkMessage()) {
    alert("Please fill out required fields.");
    event.preventDefault(); //prevent form from submitting
  } 
    
  else { 
    alert('The form was submitted!');
  }
  return false;
}

function localInput(value, elementID, key) { //saves user's name, email, and phone number to localStorage based on passed parameters 
  value = document.getElementById(elementID).value;
  localStorage.setItem(key, value);
}

function sessionInput(value, elementID, key) { //saves user's other info + contact page input to sessionStorage based on passed parameters 
  value = document.getElementById(elementID).value;
  sessionStorage.setItem(key, value);
}

function retrieveData() { //retrieve user input to display in confirm.html
  document.getElementById('recallName').innerHTML = localStorage.getItem('userName');
  document.getElementById('recallEmail').innerHTML = localStorage.getItem('userEmail');
  document.getElementById('recallPhone').innerHTML = localStorage.getItem('userPhone');
  document.getElementById('recallGig').innerHTML = sessionStorage.getItem('userGig');
  document.getElementById('recallQty').innerHTML = sessionStorage.getItem('userTicket');
  document.getElementById('recallPrice').innerHTML = "₱" + sessionStorage.getItem('userPrice');
  document.getElementById('recallNotes').innerHTML = sessionStorage.getItem('userNotes');
  document.getElementById('recallTotal').innerHTML = "₱" + sessionStorage.getItem('userTotal');
}

function unload() { //"Leave site?" in alert dialog
  return "Some changes may not be saved";
}
