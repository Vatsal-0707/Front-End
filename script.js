const API="http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {

  const role = localStorage.getItem("role");

  // 🔐 PAGE PROTECTION
  if (location.pathname.includes("admin.html") && role !== "admin") {
    alert("Access Denied ❌");
    location.href = "login.html";
    return;
  }

  if (location.pathname.includes("user.html") && !role) {
    location.href = "login.html";
    return;
  }

  // ✅ LOAD USER PAGE
  if (document.getElementById("tripForm")) {
    initUser();
  }

  // ✅ LOAD ADMIN PAGE
  if (document.getElementById("destForm")) {
    initAdmin();
  }

});

let chart;

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    };

    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!result.success) {
      alert("Invalid Login ❌");
      return;
    }

    localStorage.setItem("user", result.username);
    localStorage.setItem("role", result.role);

    if (result.role === "admin") {
      location.href = "admin.html";
    } else {
      location.href = "user.html";
    }
  };
}

// REGISTER (ADD THIS BELOW LOGIN BLOCK)
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: document.getElementById("regUser").value,
      password: document.getElementById("regPass").value,
      role: document.getElementById("regRole").value
    };

    const res = await fetch(API + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    // 🔑 CHECK FOR FORGOT PASSWORD (LOCAL)
const storedPass = localStorage.getItem("demoUser_" + data.username);

if (!result.success) {

  // if user used reset password
  if (storedPass && storedPass === data.password) {
    localStorage.setItem("user", data.username);
    localStorage.setItem("role", "user");

    location.href = "user.html";
    return;
  }

  alert("Invalid Login ❌");
  return;
}

    alert("Registered Successfully ✅");

    // redirect to login
    window.location.href = "login.html";
  };
}

// LOGOUT
function logout(){
localStorage.clear();
location.href="login.html";
}

// TOAST
function toast(msg){
const t=document.getElementById("toast");
if(!t)return;
t.innerText=msg;
t.className="show";
setTimeout(()=>t.className="",2000);
}

// USER
// function initUser(){

// tripForm.onsubmit=async e=>{
// e.preventDefault();



// const data={
// name:tripName.value,
// start:startDate.value,
// end:endDate.value,
// budget:budget.value
// };

// await fetch(API+"/trips",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
// toast("Trip Created ✈️");
// tripForm.reset();
// loadTrips();
// };

// loadTrips();
// loadDestinations();
// loadCart();
// loadPlan();
// addToCart(id);
// }

function initUser(){

  const tripForm = document.getElementById("tripForm");

  tripForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("tripName").value;
    const budget = document.getElementById("budget").value;

    if(!name || !budget){
      alert("Please fill all fields ❌");
      return;
    }

    const data = {
      name: name,
      budget: budget
    };

    await fetch(API + "/trips", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data)
    });

    toast("Trip Created ✈️");

    tripForm.reset();

    loadTrips();
    loadMyTrips();
    loadMyTripSummary();
  });

  loadTrips();
  loadDestinations();
  loadCart();
  loadPlan();
  loadMyTrips();
  loadMyTripSummary();
}

async function loadMyTrips(){

  const res = await fetch(API + "/trips");
  const trips = await res.json();

  const box = document.getElementById("myTrips");

  if(!box) return;

  box.innerHTML = "";

  trips.forEach(t => {
    box.innerHTML += `
      <div class="card">
        <h3>${t.name}</h3>
        <p>💰 Budget: ₹${t.budget}</p>
      </div>
    `;
  });
}

// LOAD TRIPS
async function loadTrips(){
const r=await fetch(API+"/trips");
const d=await r.json();

tripCount.innerText=d.length;

renderChart(d);
}

// CHART
function renderChart(d){
const ctx=document.getElementById("chart");
if(!ctx)return;

if(chart)chart.destroy();

chart=new Chart(ctx,{
type:"bar",
data:{
labels:d.map(x=>x.name),
datasets:[{
label:"Budget",
data:d.map(x=>x.budget||0)
}]
}
});
}

// LOAD DESTINATIONS 
async function loadDestinations(){

  destList.innerHTML = "<h2>⏳ Loading destinations...</h2>";

  const r = await fetch(API + "/destinations");
  let d = await r.json();

  const s = document.getElementById("searchBox")?.value.toLowerCase() || "";
  d = d.filter(x => x.name.toLowerCase().includes(s));

  if(d.length === 0){
    destList.innerHTML = "<h2>😕 No destinations found</h2>";
    return;
  }

  destList.innerHTML = "";

  d.forEach(x => {

    let badge = "";
    if(x.rating >= 5){
      badge = "⭐ Top Rated";
    } else if(x.cost <= 8000){
      badge = "💰 Budget";
    } else {
      badge = "🔥 Trending";
    }

    // 🔥 DYNAMIC HIGHLIGHTS
    let highlights = "";
    if(x.name.toLowerCase().includes("goa")){
      highlights = "🏖 Beaches, 🎉 Nightlife, 🍤 Seafood";
    }
    else if(x.name.toLowerCase().includes("manali")){
      highlights = "🏔 Snow, 🧗 Adventure, 🚵 Trekking";
    }
    else if(x.name.toLowerCase().includes("jaipur")){
      highlights = "🏰 Forts, 🎭 Culture, 🛍 Shopping";
    }
    else if(x.name.toLowerCase().includes("kerala")){
      highlights = "🌿 Backwaters, 🚤 Houseboats, 🌴 Nature";
    }
    else if(x.name.toLowerCase().includes("dubai")){
      highlights = "🏙 Luxury, 🏜 Desert Safari, 🛍 Shopping";
    }
    else{
      highlights = "🌍 Popular Destination";
    }

    destList.innerHTML += `
    <div class="card" onclick='openDetails(${JSON.stringify(x)})'>

      <span class="badge">${badge}</span>

      <img src="${x.image}" class="img">

      <div class="card-content">
        <h3>${x.name}</h3>
        <p>📍 ${x.name}, India</p>
      </div>

      <div class="card-body">

        <p>${x.desc}</p>

        <p>🗓 Best Time: Oct – Mar</p>
        <p>⏱ Duration: 3–5 Days</p>

        <p>🔥 ${highlights}</p>

        <p>💰 ₹${x.cost} | ⭐ ${x.rating}</p>

        <iframe src="${x.map}" class="map"></iframe>

        <button onclick='event.stopPropagation(); openDetails(${JSON.stringify(x)})'>
          👁 View Details
        </button>

        <button onclick="event.stopPropagation(); addToCart(${x.id})">
          ❤️ Add to Trip
        </button>

        <button onclick="openBooking()">
          💳 Book Now
        </button>

      </div>

    </div>
    `;

    // ✅ FIXED RECENT STORAGE
    let recent = JSON.parse(localStorage.getItem("recent") || "[]");
    recent.unshift(x);
    localStorage.setItem("recent", JSON.stringify(recent.slice(0,5)));

  });
}

function filterCategory(cat){
  fetch(API + "/destinations")
    .then(res => res.json())
    .then(data => {

      const filtered = data.filter(d => d.category === cat);

      destList.innerHTML = "";

      filtered.forEach(x => {
        destList.innerHTML += `
        <div class="card">
          <img src="${x.image}" class="img">

          <div class="card-content">
            <h3>${x.name}</h3>
            <p>💰 ${x.cost} | ⭐ ${x.rating}</p>
          </div>

          <div style="padding:15px;">
            <p>${x.desc}</p>
            <iframe src="${x.map}" class="map"></iframe>
            <button onclick="addToCart(${x.id})">❤️ Add to Trip</button>
          </div>
        </div>
        `;
      });

    });
}

// FAKE WEATHER
async function getWeather(city){
  const API_KEY = "YOUR_API_KEY"; // get from openweathermap.org
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();

  return `${data.main.temp}°C ${data.weather[0].main}`;
}

function loadMap(){
  const map = L.map('map').setView([20, 78], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  fetch(API + "/destinations")
    .then(res => res.json())
    .then(data => {
      data.forEach(d => {
        L.marker([20 + Math.random()*10, 78 + Math.random()*10])
          .addTo(map)
          .bindPopup(d.name);
      });
    });
}

function savePlan(){
  const data = document.getElementById("itinerary").value;
  localStorage.setItem("plan", data);
  toast("Saved 📅");
}

// LOAD PLAN
function loadPlan(){
  const data = localStorage.getItem("plan");
  if(data){
    document.getElementById("itinerary").value = data;
    toast("Plan Loaded 📂");
  } else {
    toast("No saved plan ❌");
  }
}

// LOAD DETAILS PAGE
if (window.location.pathname.includes("details.html")) {

  const data = JSON.parse(localStorage.getItem("selectedPlace"));

  if(data){
    document.getElementById("dImg").src = data.image;
    document.getElementById("dName").innerText = data.name;
    document.getElementById("dDesc").innerText = data.desc;
    document.getElementById("dCost").innerText = "💰 ₹" + data.cost;
    document.getElementById("dRating").innerText = "⭐ " + data.rating;
    document.getElementById("dMap").src = data.map;
  }

}

function addToCartFromDetails(){
  const data = JSON.parse(localStorage.getItem("selectedPlace"));

  if(!data) return;

  addToCart(data.id);
}

function goBack(){
  window.history.back();
}

function loadAnalytics(){

  // DESTINATIONS
  fetch(API+"/destinations")
    .then(res=>res.json())
    .then(data=>{
      document.getElementById("totalPlaces").innerText = data.length;
    });

  // TRIPS
  fetch(API+"/trips")
    .then(res=>res.json())
    .then(data=>{
      document.getElementById("totalTrips").innerText = data.length;
    });

  // USERS
  fetch(API+"/users")
    .then(res=>res.json())
    .then(data=>{
      document.getElementById("totalUsers").innerText = data.length;
    });

}
// FAVORITES
// ADD TO TRIP
function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if(!cart.includes(id)){
    cart.push(id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  toast("Added to Trip ✈️");
}

// LOAD CART
async function loadCart(){

  const box = document.getElementById("cartList");
const totalBox = document.getElementById("cartTotal");

box.innerHTML = "<h3>⏳ Loading your trip...</h3>"; 

  if(!box || !totalBox) return;

  const r = await fetch(API + "/destinations");
  const data = await r.json();

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // 🟢 EMPTY STATE
  if(cart.length === 0){
    box.innerHTML = "<h3>🛒 Your trip is empty</h3>";
    totalBox.innerText = "₹0";   // ✅ FIX RESET
    return;
  }

  box.innerHTML = "";

  let total = 0;

  data.forEach(d => {
    if(cart.includes(d.id)){
      total += Number(d.cost);

      box.innerHTML += `
      <div class="card">
        <img src="${d.image}" class="img">
        <h3>${d.name}</h3>
        <p>₹${d.cost}</p>
        <button onclick="removeFromCart(${d.id})">❌ Remove</button>
      </div>
      `;
    }
  });

  totalBox.innerText = "₹" + total;  // ✅ ALWAYS UPDATE
}
// REMOVE
function removeFromCart(id){

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  cart = cart.filter(x => x !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart(); // ✅ refresh UI + total
}


// ADMIN
function initAdmin(){
destForm.onsubmit=async e=>{
e.preventDefault();

const data={
name:destName.value,
image:image.value,
cost:cost.value,
desc:desc.value,
rating:rating.value,
map:map.value
};

await fetch(API+"/destinations",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
toast("Added 🌍");
destForm.reset();
loadAdmin();
};

loadAdmin();
loadAnalytics();
}

async function loadAdmin(){
  destList.innerHTML = "<h2>⏳ Loading places...</h2>";

const r=await fetch(API+"/destinations");
const d=await r.json();

destList.innerHTML="";

d.forEach(x=>{
destList.innerHTML+=`
<div class="card">
<img src="${x.image}" class="img">
<h3>${x.name}</h3>
<button onclick="del(${x.id})">Delete</button>
</div>`;
});
}

let currentId = null;

function openModal(id, name, img, desc, cost, rating){
  currentId = id;

  document.getElementById("modal").style.display = "flex";

  document.getElementById("modalImg").src = img;
  document.getElementById("modalName").innerText = name;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalCost").innerText = "💰 " + cost;
  document.getElementById("modalRating").innerText = "⭐ " + rating;

}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function addFromModal(){
  if(currentId){
    addToCart(currentId);
    closeModal();
  }
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

// OPEN BOOKING
function openBooking(){
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if(cart.length === 0){
    alert("Your trip is empty ❌");
    return;
  }

  document.getElementById("bookingModal").style.display = "flex";
}

// CLOSE
function closeBooking(){
  document.getElementById("bookingModal").style.display = "none";
}

// CONFIRM
function confirmBooking(){
  alert("🎉 Booking Confirmed!\nHave a great trip ✈️");

  // clear cart
  localStorage.removeItem("cart");
  loadCart();

  closeBooking();
}
function openDetails(x){
  localStorage.setItem("selectedPlace", JSON.stringify(x));
  window.location.href = "details.html";
}

function toggleSidebar(){
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// AUTO CLOSE SIDEBAR ON OUTSIDE CLICK
document.addEventListener("click", function(e){
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.querySelector(".menu-btn");

  if(!sidebar || !menuBtn) return;

  // if click is outside sidebar and menu button
  if(!sidebar.contains(e.target) && !menuBtn.contains(e.target)){
    sidebar.classList.remove("active");
  }
});

let highlights = "";

if(data.name === "Goa"){
  highlights = "🏖 Beaches, 🎉 Nightlife, 🍴 Seafood";
}

async function loadMyTripSummary(){
  const res = await fetch(API + "/trips");
  const trips = await res.json();

  let totalCost = 0;
  let totalPlaces = trips.length;
  let days = trips.length * 2; // simple logic

  trips.forEach(t => {
    totalCost += Number(t.budget || 0);
  });

  document.getElementById("totalCost").innerText = "₹" + totalCost;
  document.getElementById("totalPlaces").innerText = totalPlaces;
  document.getElementById("totalDays").innerText = days;
}


// ADMIN INIT
function initAdmin(){
  loadAdmin();
  loadTripsAdmin();

  destForm.onsubmit = async e=>{
    e.preventDefault();

    await fetch(API+"/destinations",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name:destName.value,
        image:image.value,
        cost:cost.value,
        desc:desc.value,
        rating:rating.value,
        map:map.value
      })
    });

    loadAdmin();
  };
}

// LOAD DESTINATIONS
async function loadAdmin(){
  const r=await fetch(API+"/destinations");
  const d=await r.json();

  totalPlaces.innerText = d.length;

  destList.innerHTML="";
  d.forEach(x=>{
    destList.innerHTML+=`
    <div class="card">
      <img src="${x.image}" class="img">
      <h3>${x.name}</h3>
      <button onclick="del(${x.id})">Delete</button>
    </div>`;
  });
}

// LOAD TRIPS
async function loadTripsAdmin(){
  const r=await fetch(API+"/trips");
  const d=await r.json();

  totalTrips.innerText = d.length;

  tripList.innerHTML="";
  d.forEach(x=>{
    tripList.innerHTML+=`
    <div class="card">
      <h3>${x.name}</h3>
      <p>💰 Budget: ${x.budget}</p>
    </div>`;
  });
}


function openForgot(){
  document.getElementById("forgotModal").style.display = "flex";
}

function closeForgot(){
  document.getElementById("forgotModal").style.display = "none";
}

function resetPassword(){

  const user = document.getElementById("fpUser").value;
  const pass = document.getElementById("fpNewPass").value;

  if(!user || !pass){
    alert("Fill all fields ❌");
    return;
  }

  // DEMO STORAGE
  localStorage.setItem("demoUser_"+user, pass);

  alert("Password Reset Successfully ✅");
  closeForgot();
}

// SHOW USER NAME
const userBox = document.getElementById("welcomeUser");
if (userBox) {
  const name = localStorage.getItem("user");
  userBox.innerText = "Welcome " + name + " 👋";
}

async function del(id){
await fetch(API+"/destinations/"+id,{method:"DELETE"});
loadAdmin();
}