var benchmarks = [];

// function Create_list(){
// 	document.querySelector("#history").innerHTML = "";
// 	var i;
// 	for (i = 0; i < benchmarks.length; i++){
// 		var placeStr = benchmarks[i]
// 		console.log("place string is: ", placeStr);
// 		var historyList = document.querySelector("#history");
// 		var newListItem = document.createElement("li");
// 		historyList.appendChild(newListItem);
// 		newListItem.innerHTML = placeStr;	
// 	};
// };

var URL = "https://benchmark-cs3200.herokuapp.com"

function Get_request(){
	hideTextbox();
	fetch( URL + "/benchmarks", {
		credentials: "include"
	}).then(function(response) {
		console.log("server responded.");
		if (response.status == 200){
			hideTextbox();
			response.json().then(function (data){
				console.log("data received from server:", data);
				// data is ready to use (an array of objects)
				benchmarks = data;
				//Create_list();
				document.querySelector("#history").innerHTML = "";
				benchmarks.forEach(function (bench ){
					console.log("place string is: ", bench);
					var historyList = document.querySelector("#history");
					var newListItem = document.createElement("li")
					newListItem.innerHTML = "CPU: "+ bench.cpu + "<br> Motherboard: " + bench.motherboard + "<br> Memory: " + bench.memory + "<br> Storage: " + bench.storage + "<br> GPU: " + bench.gpu + "<br> Score: " + bench.score + "<br>";
					newListItem.id = "list" + bench.id;
					var deleteButton = document.createElement("button");
						deleteButton.innerHTML = "Delete";
						deleteButton.onclick = function(){
							console.log("delete clicked", bench.id);
							if (confirm("are you sure you want to delete this benchmark ?")){
								deleteBench(bench.id);
							}
						};
					var updateButton = document.createElement("button");
						updateButton.innerHTML = "Edit";
						updateButton.onclick = function() {
							console.log("edit clicked", bench.id);
							// updateBench(bench.id);
							createForm(bench.id, bench.cpu, bench.motherboard, bench.memory, bench.storage, bench.gpu, bench.score);
						};

					newListItem.appendChild(deleteButton);
					newListItem.appendChild(updateButton)
					historyList.appendChild(newListItem);
			});
		});
	} else{
		signIn();
		registration();
			}
		}
	);
};
Get_request();





var addButton = document.querySelector("#scores");
score.onclick = function(){
	document.querySelector("#history").innerHTML = "";
	var newCPU = document.querySelector("#cpu").value
	var newMotherboard = document.querySelector("#motherboard").value
	var newMemory = document.querySelector("#memory").value
	var newStorage = document.querySelector("#storage").value
	var newGPU = document.querySelector("#gpu").value
	var newScore = document.querySelector("#Benchscore").value

	var bodyStr = "cpu=" + encodeURIComponent(newCPU);
	bodyStr += "&motherboard=" + encodeURIComponent(newMotherboard);
	bodyStr += "&memory=" + encodeURIComponent(newMemory);
	bodyStr += "&storage=" + encodeURIComponent(newStorage);
	bodyStr += "&gpu=" + encodeURIComponent(newGPU);
	bodyStr += "&score=" + encodeURIComponent(newScore);
	console.log(bodyStr)

	fetch( URL + "/benchmarks", {
		//request parameters:
		//inputField.value
		credentials: "include",
		method: "POST",
		body: bodyStr,
		headers: {
			"Content-Type":"application/x-www-form-urlencoded"
		}
	}).then(function(response){
		//handle the response
		console.log("Server responded!");
		Get_request();
		//Create_list();
		//reload data here
	});
};

var deleteBench = function(benchID){
	fetch(URL + "/benchmarks/" + benchID, {
		credentials: "include",
		method: "DELETE",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response){
		Get_request();
	})
}

var updateBench = function(benchID){
	var newCPU = document.querySelector("#cpuUpdate").value
	var newMotherboard = document.querySelector("#MBUpdate").value
	var newMemory = document.querySelector("#memoryUpdate").value
	var newStorage = document.querySelector("#storageUpdate").value
	var newGPU = document.querySelector("#gpuUpdate").value
	var newScore = document.querySelector("#scoreUpdate").value

	var bodyStr = "cpu=" + encodeURIComponent(newCPU);
	bodyStr += "&motherboard=" + encodeURIComponent(newMotherboard);
	bodyStr += "&memory=" + encodeURIComponent(newMemory);
	bodyStr += "&storage=" + encodeURIComponent(newStorage);
	bodyStr += "&gpu=" + encodeURIComponent(newGPU);
	bodyStr += "&score=" + encodeURIComponent(newScore);

	fetch( URL + "/benchmarks/" + benchID, {
		credentials: "include",
		method: "PUT",
		body: bodyStr,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response){
		Get_request();
	})
}

var createForm = function(benchID, cpu, motherboard, memory, storage, gpu, score){
	var templist = document.querySelector("#list" + benchID);
	var updateButton = document.createElement("div");

	updateButton.innerHTML += '<span>New CPU: <input type="text" id="cpuUpdate"><small></small></span>\r\n <br>'
	updateButton.innerHTML += '<span>New Motherboard: <input type="text" id="MBUpdate"><small></small></span>\r\n <br>'
	updateButton.innerHTML += '<span>New Memory: <input type="text" id="memoryUpdate"><small></small></span>\r\n <br>'
	updateButton.innerHTML += '<span>New Storage: <input type="text" id="storageUpdate"><small></small></span>\r\n <br>'
	updateButton.innerHTML += '<span>New GPU: <input type="text" id="gpuUpdate"><small></small></span>\r\n <br>'
	updateButton.innerHTML += '<span>New Score: <input type="text" id="scoreUpdate"><small></small></span>\r\n <br>'
	var submitButton = document.createElement("button");
	submitButton.innerHTML = "Submit Change";
	submitButton.onclick = function(){
		console.log("submit clicked", benchID);
			updateBench(benchID);
			updateButton.innerHTML ="";
		}
	updateButton.id = 'newForm'
	updateButton.appendChild(submitButton);
	templist.appendChild(updateButton);
	document.querySelector('#cpuUpdate').value = cpu;
	document.querySelector('#MBUpdate').value = motherboard;
	document.querySelector('#MemoryUpdate').value = memory;
	document.querySelector('#storageUpdate').value = storage;
	document.querySelector('#gpuUpdate').value = gpu;
	document.querySelector('#scoreUpdate').value = score;
	}

function hideTextbox() {
	var x = document.getElementById("textbox");
	var y = document.getElementById("authentication")
	if (x.style.display == "none") {
		x.style.display = "block";
		y.style.display = "none";
	} else {
		x.style.display = "none";
	}
}


function signIn(){
	var SignInButton = document.querySelector("#signIn");
	SignInButton.onclick = function(){
		var email = document.querySelector("#signInEmail").value
		var pass = document.querySelector("#signInPass").value
		var bodyStr = "email=" + encodeURIComponent(email);
		bodyStr += "&sombra=" + encodeURIComponent(pass);
		console.log("sign in button")
		fetch( URL + "/sessions", {
			//request parameters:
			//inputField.value
			credentials: "include",
			method: "POST",
			body: bodyStr,
			headers: {
				"Content-Type":"application/x-www-form-urlencoded"
			}
		}).then(function (response){
			console.log(response.status)
			if (response.status == 401){
				alert( "Username and password are incorrect")
				document.querySelector("#signInEmail").value ="";
				document.querySelector("#signInPass").value ="";
			}
			else{
				hideTextbox();	
				Get_request();		}
		})
	}
}


function registration (){
	var RegButton = document.querySelector("#register"); register
	RegButton.onclick = function(){
		var email = document.querySelector("#RegEmail").value
		var pass = document.querySelector("#RegPass").value	
		var first = document.querySelector("#RegFirst").value	
		var last = document.querySelector("#RegLast").value
		var bodyStr  = "email=" + encodeURIComponent(email);
		bodyStr += "&sombra=" + encodeURIComponent(pass);
		bodyStr += "&first=" + encodeURIComponent(first);
		bodyStr += "&last=" + encodeURIComponent(last);

		fetch( URL + "/users", {
			//request parameters:
			//inputField.value
			credentials: "include",
			method: "POST",
			body: bodyStr,
			headers: {
				"Content-Type":"application/x-www-form-urlencoded"
			}
		}).then(function (response){
			if(response.status == 201){
				if (confirm("The user with the email address: " + email +" has successfully registered")){
					hideTextbox();
					Get_request();
				}
			} else{
				confirm("The user with the email address: " + email +" is already registered please use a different email")
				document.querySelector("#RegEmail").value ="";
				document.querySelector("#RegPass").value ="";
				document.querySelector("#RegFirst").value ="";
				document.querySelector("#RegLast").value ="";
			}
		})
	}
}
