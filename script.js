const properties = [
 {id:1,name:"The Fern Residence",area:"Whitefield",city:"Bengaluru",rent:25000,deposit:100000,bhk:2,furnishing:"Semi-furnished",pets:true,parking:true,maintenance:3000,bedrooms:2,bathrooms:2,size:1120,image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",description:"A bright, well-planned home with a comfortable living area and a practical kitchen.",commute:30,transit:42},
 {id:2,name:"Olive Grove Apartments",area:"Sarjapur Road",city:"Bengaluru",rent:32000,deposit:128000,bhk:3,furnishing:"Furnished",pets:false,parking:true,maintenance:3500,bedrooms:3,bathrooms:2,size:1450,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",description:"A furnished family apartment with generous daylight and shared community spaces.",commute:35,transit:50},
 {id:3,name:"The Courtyard Studio",area:"Kondapur",city:"Hyderabad",rent:14500,deposit:45000,bhk:1,furnishing:"Furnished",pets:true,parking:false,maintenance:1200,bedrooms:1,bathrooms:1,size:620,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",description:"A compact studio designed for simple city living, with furnishings already in place.",commute:22,transit:35},
 {id:4,name:"Maple Heights",area:"Gachibowli",city:"Hyderabad",rent:28000,deposit:90000,bhk:2,furnishing:"Semi-furnished",pets:false,parking:true,maintenance:2500,bedrooms:2,bathrooms:2,size:1180,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",description:"A spacious two-bedroom home close to offices, everyday shops and dining options.",commute:18,transit:28},
 {id:5,name:"Palm Springs Home",area:"Miyapur",city:"Hyderabad",rent:19000,deposit:60000,bhk:2,furnishing:"Unfurnished",pets:true,parking:true,maintenance:1800,bedrooms:2,bathrooms:2,size:980,image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",description:"An airy unfurnished apartment that gives you room to make the space your own.",commute:38,transit:45},
 {id:6,name:"Cedar Park Living",area:"Hitech City",city:"Hyderabad",rent:38000,deposit:150000,bhk:3,furnishing:"Furnished",pets:true,parking:true,maintenance:4000,bedrooms:3,bathrooms:3,size:1580,image:"https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80",description:"A larger furnished home with comfortable shared spaces and practical storage.",commute:12,transit:20},
 {id:7,name:"Lakeview Nest",area:"Manikonda",city:"Hyderabad",rent:22000,deposit:70000,bhk:2,furnishing:"Semi-furnished",pets:false,parking:true,maintenance:2000,bedrooms:2,bathrooms:2,size:1050,image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",description:"A calm residential setting with a useful layout for couples or small families.",commute:25,transit:37},
 {id:8,name:"The Urban Nook",area:"Madhapur",city:"Hyderabad",rent:17000,deposit:55000,bhk:1,furnishing:"Semi-furnished",pets:false,parking:false,maintenance:1500,bedrooms:1,bathrooms:1,size:700,image:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",description:"A neat one-bedroom apartment suited to someone who wants a practical city base.",commute:15,transit:24},
 {id:9,name:"Sandalwood Enclave",area:"Nallagandla",city:"Hyderabad",rent:30000,deposit:110000,bhk:3,furnishing:"Semi-furnished",pets:true,parking:true,maintenance:2800,bedrooms:3,bathrooms:2,size:1370,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",description:"A family-sized apartment with multiple bedrooms and a well-proportioned living room.",commute:28,transit:39},
 {id:10,name:"Amber House",area:"Kukatpally",city:"Hyderabad",rent:12500,deposit:40000,bhk:1,furnishing:"Unfurnished",pets:true,parking:false,maintenance:1000,bedrooms:1,bathrooms:1,size:580,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",description:"A budget-friendly one-bedroom option with a simple, flexible floor plan.",commute:32,transit:40},
 {id:11,name:"Willow Court",area:"Jubilee Hills",city:"Hyderabad",rent:42000,deposit:180000,bhk:3,furnishing:"Furnished",pets:false,parking:true,maintenance:4500,bedrooms:3,bathrooms:3,size:1650,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",description:"A premium furnished residence with roomy interiors and a polished finish.",commute:20,transit:31},
 {id:12,name:"Meadow Lane",area:"Chandanagar",city:"Hyderabad",rent:16000,deposit:50000,bhk:2,furnishing:"Unfurnished",pets:true,parking:true,maintenance:1400,bedrooms:2,bathrooms:1,size:900,image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",description:"A straightforward two-bedroom home with a practical layout and useful amenities.",commute:36,transit:48}
];

const $ = (id) => document.getElementById(id);
const money = (n) => "₹" + Math.max(0, Number(n)||0).toLocaleString("en-IN");
const savedKey = "nestnavigator-shortlist";
const requestKey = "nestnavigator-visit-requests";
let saved = JSON.parse(localStorage.getItem(savedKey) || "[]");
let selectedCompare = [];
let panoramaInstance = null;

function persistSaved(){ localStorage.setItem(savedKey, JSON.stringify(saved)); updateShortlist(); }
function isSaved(id){ return saved.includes(id); }
function toggleSaved(id){
  saved = isSaved(id) ? saved.filter(x=>x!==id) : [...saved,id];
  persistSaved();
  renderProperties();
}
function propertyCard(p){
  return `<article class="property-card">
    <div class="property-image" style="background-image:url('${p.image}')">
      <span class="verified-tag">✓ VERIFIED OWNER</span><span class="image-tag">${p.bhk} BHK</span>
      <button class="save-button ${isSaved(p.id)?"saved":""}" data-save="${p.id}" aria-label="Save ${p.name}">${isSaved(p.id)?"♥":"♡"}</button>
    </div>
    <div class="property-info"><p class="property-location">${p.area}, ${p.city}</p><h3>${p.name}</h3>
      <div class="property-meta"><span>${p.bedrooms} bed · ${p.bathrooms} bath</span><span>${p.size} sq.ft.</span><span>${p.furnishing}</span></div>
      <div class="property-bottom"><div class="price">${money(p.rent)}<small> / month</small></div><div class="card-actions"><button class="small-action" data-tour="${p.id}">360° tour</button><button class="small-action" data-details="${p.id}">Details ↗</button></div></div>
    </div></article>`;
}
function renderProperties(){
  const term = $("locationSearch").value.trim().toLowerCase();
  const rent = $("rentFilter").value, bhk = $("bhkFilter").value, furnishing = $("furnishingFilter").value;
  const filtered = properties.filter(p=>
    (!term || `${p.name} ${p.area} ${p.city}`.toLowerCase().includes(term)) &&
    (rent==="all" || p.rent<=Number(rent)) &&
    (bhk==="all" || p.bhk===Number(bhk)) &&
    (furnishing==="all" || p.furnishing===furnishing) &&
    (!$("petFilter").checked || p.pets) &&
    (!$("parkingFilter").checked || p.parking)
  );
  $("propertyGrid").innerHTML = filtered.map(propertyCard).join("");
  $("resultCount").textContent = `${filtered.length} ${filtered.length===1?"home":"homes"} found`;
  $("emptyState").classList.toggle("hidden", filtered.length!==0);
}
function updateShortlist(){
  $("shortlistCount").textContent = saved.length;
  const list = properties.filter(p=>saved.includes(p.id));
  $("shortlistMessage").textContent = list.length ? `${list.length} saved ${list.length===1?"home":"homes"} · Select up to 3 to compare.` : "You haven't saved any homes yet.";
  $("shortlistGrid").innerHTML = list.map(p=>`<label class="shortlist-item"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>${p.area} · ${money(p.rent)}/month</small></span><input type="checkbox" data-compare="${p.id}" aria-label="Select ${p.name} to compare"></label>`).join("");
}
function openModal(html){
  $("modalBody").innerHTML = html;
  $("propertyModal").classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeModal(){
  $("propertyModal").classList.add("hidden"); document.body.style.overflow="";
  if(panoramaInstance){try{panoramaInstance.destroy();}catch(e){} panoramaInstance=null;}
}
function showDetails(id){
  const p=properties.find(x=>x.id===id); if(!p)return;
  openModal(`<div class="detail-layout"><div><img src="${p.image}" alt="${p.name} interior"></div><div><p class="eyebrow">✓ VERIFIED OWNER LISTING</p><p class="property-location">${p.area}, ${p.city}</p><h2 id="modalTitle">${p.name}</h2><div class="detail-price">${money(p.rent)} <small>/ month</small></div><p class="detail-description">${p.description}</p><ul class="detail-list"><li>${p.bhk} BHK · ${p.bedrooms} bedrooms · ${p.bathrooms} bathrooms</li><li>${p.size} sq.ft. · ${p.furnishing}</li><li>Security deposit: ${money(p.deposit)}</li><li>Maintenance: ${money(p.maintenance)} / month</li><li>Pets: ${p.pets?"Allowed":"Not specified as allowed"} · Parking: ${p.parking?"Available":"Not available"}</li></ul><button class="button button-dark" id="detailTourBtn">Take 360° tour →</button></div></div>`);
  $("detailTourBtn").addEventListener("click",()=>showTour(id));
}
function showTour(id){
  const p=properties.find(x=>x.id===id);
  openModal(`<p class="eyebrow">IMMERSIVE ROOM EXPERIENCE</p><h2 id="modalTitle" style="font-family:var(--serif);color:var(--forest)">${p.name} · 360° Tour</h2><div class="panorama-wrap"><div id="panorama"></div><p class="panorama-help">Drag to look around · Scroll or pinch to zoom. Sample living-room panorama by @unreal via Pixexid (CC BY 4.0); replace with each owner’s verified 360° room photo for a real listing.</p></div>`);
  setTimeout(()=>{
    if(window.pannellum && $("panorama")){
      panoramaInstance = pannellum.viewer("panorama",{type:"equirectangular",panorama:"https://media.pixexid.com/furnished-living-room-360-panorama-with-large-window-070fda53/778ff71aa2d6/original.jpg",autoLoad:true,showControls:true,compass:false});
    } else if($("panorama")) $("panorama").innerHTML='<p style="padding:25px;color:#53645a">The 360° viewer needs an internet connection. Please check the connection and reopen the tour.</p>';
  },100);
}
function calculate(){
  const rent=Math.max(0,Number($("calcRent").value)||0), dep=Math.max(0,Number($("calcDeposit").value)||0), maint=Math.max(0,Number($("calcMaintenance").value)||0), salary=Math.max(0,Number($("calcSalary").value)||0);
  $("totalMoveIn").textContent=money(rent+dep+maint); $("outRent").textContent=money(rent); $("outDeposit").textContent=money(dep); $("outMaintenance").textContent=money(maint);
  const ratio=salary?rent/salary:0, dot=$("affordabilityDot");
  dot.style.background=salary?(ratio<=.3?"#9bc99c":ratio<=.4?"#e2c277":"#e28d7c"):"#d6b66e";
  $("affordabilityText").textContent=!salary?"Enter your salary to see your rent affordability.":ratio<=.3?"Rent is within 30% of your monthly salary — a commonly used budgeting guide.":ratio<=.4?"Rent is over 30% of your salary. Review other monthly expenses.":"Rent takes a high share of your salary. Consider a lower monthly rent.";
}
function renderComparison(){
  const chosen=properties.filter(p=>selectedCompare.includes(p.id));
  if(chosen.length<2){$("comparisonContent").innerHTML="<p>Select at least 2 saved homes (maximum 3) to compare.</p>";}
  else{
    const rows=[["Monthly rent",p=>money(p.rent)],["Security deposit",p=>money(p.deposit)],["BHK",p=>`${p.bhk} BHK`],["Furnishing",p=>p.furnishing],["Area",p=>`${p.size} sq.ft.`],["Maintenance",p=>money(p.maintenance)],["Pets",p=>p.pets?"Allowed":"Not listed"],["Parking",p=>p.parking?"Available":"Not available"]];
    $("comparisonContent").innerHTML=`<table class="comparison-table"><thead><tr><th>Details</th>${chosen.map(p=>`<th>${p.name}</th>`).join("")}</tr></thead><tbody>${rows.map(([label,fn])=>`<tr><th>${label}</th>${chosen.map(p=>`<td>${fn(p)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  $("comparisonPanel").classList.remove("hidden");
}
function fillPropertySelects(){
  const options=properties.map(p=>`<option value="${p.id}">${p.name} — ${p.area}</option>`).join("");
  $("visitProperty").insertAdjacentHTML("beforeend",options);
  $("commuteProperty").innerHTML=options;
}
function updateCommute(){
  const p=properties.find(x=>x.id===Number($("commuteProperty").value))||properties[0];
  const transit=$("travelMode").value==="transit";
  const time=transit?p.transit:p.commute;
  $("commuteTime").textContent=`${Math.max(5,time-5)}–${time+5} min`;
  $("commuteDestination").textContent=`${transit?"Public transport":"Driving"} · illustrative trip to a major tech park from ${p.area}`;
}
function setMinDate(){
  const today=new Date(); const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  $("visitDate").min=local;
}
function wireEvents(){
  ["applyFilters","locationSearch","rentFilter","bhkFilter","furnishingFilter","petFilter","parkingFilter"].forEach(id=>$(id).addEventListener(id==="locationSearch"?"input":"change",renderProperties));
  $("clearFilters").addEventListener("click",()=>{$("locationSearch").value="";["rentFilter","bhkFilter","furnishingFilter"].forEach(id=>$(id).value="all");$("petFilter").checked=false;$("parkingFilter").checked=false;renderProperties();});
  $("propertyGrid").addEventListener("click",e=>{
    const save=e.target.closest("[data-save]"), detail=e.target.closest("[data-details]"), tour=e.target.closest("[data-tour]");
    if(save)toggleSaved(Number(save.dataset.save)); if(detail)showDetails(Number(detail.dataset.details)); if(tour)showTour(Number(tour.dataset.tour));
  });
  $("shortlistGrid").addEventListener("change",e=>{
    if(e.target.matches("[data-compare]")){
      const id=Number(e.target.dataset.compare);
      if(e.target.checked && selectedCompare.length>=3){e.target.checked=false;alert("You can compare up to 3 homes at a time.");return;}
      selectedCompare=e.target.checked?[...selectedCompare,id]:selectedCompare.filter(x=>x!==id);
    }
  });
  $("compareBtn").addEventListener("click",renderComparison);
  $("closeComparison").addEventListener("click",()=>$("comparisonPanel").classList.add("hidden"));
  $("calculateBtn").addEventListener("click",calculate);
  ["calcRent","calcDeposit","calcMaintenance","calcSalary"].forEach(id=>$(id).addEventListener("input",calculate));
  $("visitForm").addEventListener("submit",e=>{
    e.preventDefault();
    const req={name:$("visitorName").value,email:$("visitorEmail").value,propertyId:Number($("visitProperty").value),date:$("visitDate").value,time:$("visitTime").value,createdAt:new Date().toISOString()};
    const all=JSON.parse(localStorage.getItem(requestKey)||"[]");all.push(req);localStorage.setItem(requestKey,JSON.stringify(all));
    $("visitFeedback").textContent="Your demo visit request is saved on this device. No owner has been contacted.";
    e.target.reset();setMinDate();
  });
  $("commuteProperty").addEventListener("change",updateCommute);$("travelMode").addEventListener("change",updateCommute);
  $("openDemoTour").addEventListener("click",()=>showTour(1));
  $("propertyModal").addEventListener("click",e=>{if(e.target.matches("[data-close-modal]"))closeModal();});
  $("agreementModal").addEventListener("click",e=>{if(e.target.matches("[data-close-agreement]"))$("agreementModal").classList.add("hidden");});
  $("agreementForm").addEventListener("submit",e=>{
    e.preventDefault();
    const tenant=$("tenantName").value,owner=$("ownerName").value,address=$("agreementAddress").value,rent=Number($("agreementRent").value)||0,deposit=Number($("agreementDeposit").value)||0;
    const start=new Date(),end=new Date(start);end.setMonth(end.getMonth()+11);
    $("agreementPreview").innerHTML=`<div class="agreement-paper"><p class="eyebrow">NESTNAVIGATOR · SAMPLE TEMPLATE</p><h3 id="agreementPreviewTitle">RESIDENTIAL RENTAL AGREEMENT</h3><p>This is a demonstration preview, not a legally validated agreement.</p><p>This sample records the following proposed rental details:</p><p><strong>Owner / Landlord:</strong> ${escapeHTML(owner)}</p><p><strong>Tenant:</strong> ${escapeHTML(tenant)}</p><p><strong>Property address:</strong> ${escapeHTML(address)}</p><p><strong>Monthly rent:</strong> ${money(rent)}</p><p><strong>Security deposit:</strong> ${money(deposit)}</p><p><strong>Proposed term:</strong> 11 months (${start.toLocaleDateString("en-IN")} to ${end.toLocaleDateString("en-IN")})</p><p>The parties should independently confirm payment terms, maintenance responsibilities, notice period, applicable stamp duty, registration requirements and all local legal provisions.</p><p class="agreement-note">This generated sample is for educational demonstration only. It is not legal advice and should not be signed or relied on without review by a qualified local professional.</p></div>`;
    $("agreementModal").classList.remove("hidden");$("agreementFeedback").textContent="Preview generated. Review the disclaimer before printing.";
  });
  $("printAgreement").addEventListener("click",()=>window.print());
  $("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
  $("mainNav").addEventListener("click",e=>{if(e.target.tagName==="A")$("mainNav").classList.remove("open");});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();$("agreementModal").classList.add("hidden");}});
}
function escapeHTML(str){return String(str).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));}

document.addEventListener("DOMContentLoaded",()=>{
  renderProperties();updateShortlist();fillPropertySelects();calculate();updateCommute();setMinDate();wireEvents();
});
