//Is logged in


//logs in user
async function loginUser(username, password) {
    let url = "http://127.0.0.1:3000/api/login";

    //const response = await fetch(url);
    //const data = await response.json();
    const userData = {username, password};
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(userData)
       
    });
    const data = await response.json();
    console.dir(data);

    if (data.response){
        window.sessionStorage.setItem("token", data.response.token);
        console.log("token set: " + data.response.token);    
    }
    
    return data;
};

//registrate user
async function registrerUser(firstname, lastname, email, username, password) {
    let url = "http://127.0.0.1:3000/api/register";
    
    let user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }; 
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    console.log(data);
    return data;
};

//Gets data from database
async function getData() {
    let url = "http://127.0.0.1:3000/workplaces";
    let token = window.sessionStorage.getItem("token");

    console.log("token sent: " + token);
    const response = await fetch(url, {

        headers: {
            "Authorization": "Bearer " + token
        },
    });
    const data = await response.json();
   
    
    return data;
};

//gets a specific workplace
async function getWorkplace(id) {
    let url = "http://127.0.0.1:3000/workplaces";

    const response = await fetch(url);
    const data = await response.json();
    
    for (let i=0; i<data.length; i++) {
        if (data[i]._id == id) {
            return data[i];
        }
    }

    if (!response.ok) {
        throw new Error(data);
    }

};

//creates new workplace
async function createWorkplace(companyname, location, startdate, enddate, title, description) {
    let url = "http://127.0.0.1:3000/workplaces";
    
    let workplaces = {
        companyname: companyname,
        location: location,
        startdate: startdate,
        enddate: enddate,
        title: title,
        description: description
    }; 
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workplaces)
    });
    
    const data = await response.json();

    return data;
}

//changes a workplace
async function changeWorkplace(id, companyname, location, startdate, enddate, title, description) {
    let url = "http://127.0.0.1:3000/workplaces/" + id;
  
    
    let workplaces = {
        id: id,
        companyname: companyname,
        location: location,
        startdate: startdate,
        enddate: enddate,
        title: title,
        description: description
    }; 
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workplaces)
    })
    
    const data = await response.json();

    return data;

}

//deletes a workplace
async function deleteWorkplace(id) {
    let url = "http://127.0.0.1:3000/workplaces/" + id;
    console.log(url);
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "content-type": "Application/json"
        },
       
    });

    if (!response.ok) {
        throw new Error("somethig went wrong");
    }

    window.location.reload();
}
