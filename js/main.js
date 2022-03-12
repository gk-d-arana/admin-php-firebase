import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

import {
  getStorage,
  ref as sRef,
  uploadBytesResumable ,
  getDownloadURL,
  deleteObject,
  listAll
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";


$(document).ready(async () => {
  const showLoader = () => {
         $('body').loadingModal({
        position: 'auto',
        text: '',
        color: '#fff',
        opacity: '0.7',
        backgroundColor: 'rgb(0,0,0)',
        animation: 'threeBounce'
      })
  }
  async function deleteFolder(path) {
    const folderRef = sRef(storage, path)
    const fileList = await listAll(folderRef)
    const promises = []
    for(let item of fileList.items) {
        promises.push(deleteObject(item))
    }
    const result = await Promise.all(promises)
    return result
}

  showLoader()
  let currPage = `#${location.hash.replace('#', '')}.navigate-now`
  if(!currPage.startsWith('#.')&&document.querySelector(currPage)){ 
     document.querySelector(currPage).click()  
  }
  else{
     document.querySelector('#home-div.navigate-now').click()  
  }
  const firebaseConfig = {
    apiKey: "AIzaSyDhTAGxpX0z5-wDuvK4jQ3DZIn9d7WHB-o",
    authDomain: "drop-it-bc7e7.firebaseapp.com",
    databaseURL: "https://drop-it-bc7e7-default-rtdb.firebaseio.com",
    projectId: "drop-it-bc7e7",
    storageBucket: "drop-it-bc7e7.appspot.com",
    messagingSenderId: "435880717721",
    appId: "1:435880717721:web:22db1d0b9fa86075083708",
    measurementId: "G-GFWE9D6B3Y",
  };

  //for the login form

  $('#smartwizard').smartWizard({
    selected: 0,
    theme: 'dots',
    autoAdjustHeight:true,
    transitionEffect:'fade',
    showStepURLhash: false,
    });
    $('#smartwizard2').smartWizard({
      selected: 0,
      theme: 'dots',
      autoAdjustHeight:true,
      transitionEffect:'fade',
      showStepURLhash: false,
      });
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const storage = getStorage()
  const dbref = ref(db);

  onValue(dbref, async (snapshot) => {
    $('body').loadingModal('destroy');
    let ordersRes = await get(child(dbref, "AllOrders"));
    let customersRes = await get(child(dbref, "UserDetails"));
    let ridersRes = await get(child(dbref, "RiderDetails"));
    let shopsRes = await get(child(dbref, "Shop"));
    let liveRidersRes = await get(child(dbref, "LiveRider"));
    let riderDpRes = await get(child(dbref, "RIDER_DP"));

    let allOrders = "";
    let allRiders = "";
    let allCustomers = "";
    let allShops = "";
    let liveRiders = "";
    let riderDps = ""

    if (ordersRes.exists()) {
      allOrders = ordersRes.val();
      document.querySelector("#orders-count").innerHTML = `
      ${Object.keys(allOrders).length}
    `;
    document.querySelector('#all-orders-row').innerHTML = ""
    
    Object.keys(allOrders).forEach(el => {
        document.querySelector('#all-orders-row').innerHTML += `
        <div class="col-lg-6">
    <!-- Dropdown Card Example -->
    <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
            <div class="dropdown no-arrow">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                    aria-labelledby="dropdownMenuLink">
                    <div class="dropdown-header">Dropdown Header:</div>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
            Dropdown menus can be placed in the card header in order to extend the functionality
            of a basic card. In this dropdown card example, the Font Awesome vertical ellipsis
            icon in the card header can be clicked on in order to toggle a dropdown menu.
        </div>
    </div>

</div>`
    })
      //localStorage.setItem('orders', JSON.stringify(allOrders))
    }

    if (customersRes.exists()) {
      allCustomers = customersRes.val();
      document.querySelector("#customers-count").innerHTML = `
      ${Object.keys(allCustomers).length}
      `;
      //localStorage.setItem('customers', JSON.stringify(allCustomers))
    }




    if (ridersRes.exists()) {
      allRiders = ridersRes.val();
      riderDps = riderDpRes.val()
      let approvedDrivers = [];
      document.querySelector("#all-riders-body").innerHTML = ""
      document.querySelector("#rejected-riders-body").innerHTML = ""
      document.querySelector('.edit-modals-wrapper').innerHTML = ""
      Object.keys(allRiders).forEach((el) => {

        
        if (allRiders[el].status == "approved") {
          approvedDrivers.push(el);
        }
        else{
          if (el.startsWith("+")) {
            let showPersonalDetails = `
        
        <div class="nav-item dropdown no-arrow mx-1 position-static">
        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Click To Show
        </a>
        <!-- Dropdown - Alerts -->
        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
            aria-labelledby="alertsDropdown"> 
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-primary">
                        <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">Adhaar Card Number</div>
                    <span class="font-weight-bold">${allRiders[el].Aadhar}</span>
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-success">
                    <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">Pan Number</div>
                    ${allRiders[el].PAN}
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-secondary">
                        <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">Vehicle Registration Number</div>
                    ${allRiders[el].Vehicle_Registration_Number}
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
                <div class="icon-circle bg-warning">
                    <i class="fas fa-file-alt text-white"></i>
                </div>
            </div>
            <div>
                <div class="small text-gray-500">License Number</div>
                ${allRiders[el].License}
            </div>
        </a>
        </div>
        
    </div>
        
        `;
            let showBankDetails = `
        <div class="nav-item dropdown no-arrow mx-1 position-static">
  
        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            N/A
        </a>
        </div>
        `;
  
            if (allRiders[el].BANK) {
              showBankDetails = `
        
        <div class="nav-item dropdown no-arrow mx-1 position-static">
        <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Click To Show
        </a>
        <!-- Dropdown - Alerts -->
        <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
            aria-labelledby="alertsDropdown"> 
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-primary">
                        <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">Account Holder Name</div>
                    <span class="font-weight-bold">${allRiders[el].BANK.Account_Holder_Name}</span>
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-success">
                    <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">Account Number</div>
                    ${allRiders[el].BANK.Account_Number}
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
                <div class="mr-3">
                    <div class="icon-circle bg-secondary">
                        <i class="fas fa-file-alt text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500">IFSC Code</div>
                    ${allRiders[el].BANK.IFSC_Code}
                </div>
            </a>
            <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
                <div class="icon-circle bg-warning">
                    <i class="fas fa-file-alt text-white"></i>
                </div>
            </div>
            <div>
                <div class="small text-gray-500">Branch Name</div>
                ${allRiders[el].BANK.Branch_Name}
            </div>
        </a>
        <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
                <div class="icon-circle bg-danger">
                    <i class="fas fa-file-alt text-white"></i>
                </div>
            </div>
            <div>
                <div class="small text-gray-500">UPI ID</div>
                ${allRiders[el].BANK.UPI_ID}
            </div>
        </a>
        </div>
        
    </div>
        
        `;
            }
  
            let statusColor = "red";
          
            //append live riders to table
            document.querySelector("#rejected-riders-body").innerHTML += `
        <tr>
        <td style="white-space:nowrap;">${allRiders[el].name}</td>
        <td>${allRiders[el].MobileNumber}</td>
        <td>${showPersonalDetails}</td>
        <td>${showBankDetails}</td>
        <td  style="color:${statusColor};">${allRiders[el].status}</td>
        <td>
        <a id="${el}" href="#" class="btn btn-success btn-circle approve-rider-btn">
        <i id="${el}" class="fas fa-check approve-rider-btn"></i>
    </a>  
    <a id="${el}" href="#" class="btn btn-warning btn-circle reject-rider-btn">
        <i id="${el}" class="fas fa-exclamation-triangle reject-rider-btn"></i>
    </a>
    <a id="${el}" href="#" class="btn btn-danger btn-circle delete-rider-btn">
        <i id="${el}" class="fas fa-trash delete-rider-btn"></i>
    </a>
    <a id="${el}" href="#" class="btn btn-primary btn-circle edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}">
  <i id="${el}" class="fas fa-pen edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}"></i>
</a> 
        
        </td>
    </tr>
        
        `;
          }
        }
        localStorage.setItem(
          "approvedDrivers",
          JSON.stringify(approvedDrivers)
        );


        if (el.startsWith("+")) {

            //edit form
            let link = "img/undraw_profile.svg"
            if(riderDps[el]){
               link = riderDps[el].dp
            }

            //this is this the edit rider modal
          document.querySelector('.edit-modals-wrapper').innerHTML += `
          <div class="container">
        <div class="modal fade" id="editRider${el.replace('+', '')}" tabindex="-1" role="dialog" aria-labelledby="editRider${el.replace('+', '')}Label" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editRider${el.replace('+', '')}Label">Edit Rider</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                             <span aria-hidden="true">&times;</span> </button>
                    </div>
                    <div class="modal-body">
                    <img style="width:10%;" class="img-profile rounded-circle"
                    src="${link}">
                        <form class="editRiderForm" id="edit${el.replace('+', '')}">
                            <div>
                                <div id="step">
                                <div class="my-3" href="#step-1">Step 1:  <small>Phone Number</small></div>
                                    <div>
                                        <div class="col d-flex align-items-center"> +91<input type="text" class="form-control phone-number-input" placeholder="Phone Number" name="phonenumber" value="${allRiders[el].MobileNumber.replace("+91", '')}" required> </div>
                                    </div>
                                </div>
                                <div id="step">
                                <div class="my-3" href="#step-2">Step 2:  <small>Personal Info</small></div>
                                    <div class="row">
                                        <div class="col-md-6"> <label>Name:</label> <input type="text" class="form-control name-input" placeholder="Name" name="ridername" value="${allRiders[el].name}" required> </div>
                                        <div class="col-md-6"> <label>Aadhar Card Number:</label> <input type="text" class="form-control adhaar-card-number-input" value="${allRiders[el].Aadhar}" name="aadhar" placeholder="Adhaar Card Number" required> </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6"> <label>PAN:</label> <input type="text" class="form-control pan-number-input" value="${allRiders[el].PAN}" name="pan" placeholder="PAN Number" required> </div>
                                        <div class="col-md-6"> <label>Vehicle Registration Number:</label> <input type="text" class="form-control vehicle-registration-input" name="vrn" value="${allRiders[el].Vehicle_Registration_Number}" placeholder="Vehicle Registration Number " required> </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6"> <label>License:</label> <input type="text" class="form-control license-input" value="${allRiders[el].License}" name="lf" placeholder="License Number" required> </div>
                                        <div class="col-md-6"> <label>Profile Image:</label> <input type="file" class="form-control profile-image-input" name="riderimage" placeholder="Profile Image"> </div>
                                    </div>
                                </div>
                                <div id="step" class="">
                                <div class="my-3" href="#step-3">Step 3:  <small>Bank Info</small></div>
                                    <div class="row">
                                        <div class="col-md-6"> <label>Account Name:</label> <input type="text" class="form-control account-holder-name-input" name="ahname" value="${allRiders[el].BANK? allRiders[el].BANK.Account_Holder_Name: ''}"  placeholder="Account Holder Name" > </div>
                                        <div class="col-md-6"> <label>Account Number:</label> <input type="text" class="form-control account-holder-number-input" name="ahnum" value="${allRiders[el].BANK? allRiders[el].BANK.Account_Number: ''}" placeholder="Account Holder Number" > </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6"> <label>IFSC Code:</label> <input type="text" class="form-control ifsc-code-input" name="ifsccode" value="${allRiders[el].BANK? allRiders[el].BANK.IFSC_Code: ''}" placeholder="IFSC Code" > </div>
                                        <div class="col-md-6"> <label>Branch Name:</label> <input type="text" class="form-control branch-name-input" name="bn" value="${allRiders[el].BANK? allRiders[el].BANK.Branch_Name: ''}" placeholder="Branch Name" > </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col"> <label>UPI Id:</label> <input type="text" class="form-control upi-id-input" name="upicode" value="${allRiders[el].BANK? allRiders[el].BANK.UPI_ID: ''}" placeholder="UPI ID" > </div>
                                    </div>
                                    <div class="col-md-12 text-center mt-4" >
                                             <span>
                                        <button type="submit" href="#" class="btn btn-success btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-check"></i>
                                            </span>
                                            <span class="text">Confirm Editing The Rider</span>
                                        </button>
                                        <span  data-dismiss="modal" aria-label="Close" class="hide-${el.replace('+', '')} hidden" >hide</span>
                                                </span> 
                                            </div>
                                </div>
    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`



          let showPersonalDetails = `
      
      <div class="nav-item dropdown no-arrow mx-1 position-static">
      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Click To Show
      </a>
      <!-- Dropdown - Alerts -->
      <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
          aria-labelledby="alertsDropdown"> 
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-primary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Adhaar Card Number</div>
                  <span class="font-weight-bold">${allRiders[el].Aadhar}</span>
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-success">
                  <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Pan Number</div>
                  ${allRiders[el].PAN}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-secondary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Vehicle Registration Number</div>
                  ${allRiders[el].Vehicle_Registration_Number}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-warning">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">License Number</div>
              ${allRiders[el].License}
          </div>
      </a>
      </div>
      
  </div>
      
      `;
          let showBankDetails = `
      <div class="nav-item dropdown no-arrow mx-1 position-static">

      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          N/A
      </a>
      </div>
      `;

          if (allRiders[el].BANK) {
            showBankDetails = `
      
      <div class="nav-item dropdown no-arrow mx-1 position-static">
      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Click To Show
      </a>
      <!-- Dropdown - Alerts -->
      <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
          aria-labelledby="alertsDropdown"> 
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-primary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Account Holder Name</div>
                  <span class="font-weight-bold">${allRiders[el].BANK.Account_Holder_Name}</span>
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-success">
                  <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Account Number</div>
                  ${allRiders[el].BANK.Account_Number}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-secondary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">IFSC Code</div>
                  ${allRiders[el].BANK.IFSC_Code}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-warning">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">Branch Name</div>
              ${allRiders[el].BANK.Branch_Name}
          </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-danger">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">UPI ID</div>
              ${allRiders[el].BANK.UPI_ID}
          </div>
      </a>
      </div>
      
  </div>
      
      `;
          }

          let statusColor = "red";
          if (allRiders[el].status == "approved") {
            statusColor = "green";
          }

          //append live riders to table
          document.querySelector("#all-riders-body").innerHTML += `
      <tr>
      <td style="white-space:nowrap;">${allRiders[el].name}</td>
      <td>${allRiders[el].MobileNumber}</td>
      <td>${showPersonalDetails}</td>
      <td>${showBankDetails}</td>
      <td  style="color:${statusColor};">${allRiders[el].status}</td>
      <td>
      <a id="${el}" href="#" class="btn btn-success btn-circle approve-rider-btn">
      <i id="${el}" class="fas fa-check approve-rider-btn"></i>
  </a>  
  <a id="${el}" href="#" class="btn btn-warning btn-circle reject-rider-btn">
      <i id="${el}" class="fas fa-exclamation-triangle reject-rider-btn"></i>
  </a>
  <a id="${el}" href="#" class="btn btn-danger btn-circle delete-rider-btn">
      <i id="${el}" class="fas fa-trash delete-rider-btn"></i>
  </a>
  <a id="${el}" href="#" class="btn btn-primary btn-circle edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}">
  <i id="${el}" class="fas fa-pen edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}"></i>
</a>  
      </td>
  </tr>
      
      `;
        }
        
       



/*
    this is for the steps modal if you want thw edit as steps too
*/
// $(`#smartwizard${el.replace('+', '')}`).smartWizard({
//     selected: 0,
//     theme: 'dots',
//     autoAdjustHeight:true,
//     transitionEffect:'fade',
//     showStepURLhash: false,
//     });


      });

      document.querySelectorAll('.editRiderForm').forEach(fr=>{
        fr.addEventListener('submit', e=>{
            e.preventDefault()
            let form = e.target
            showLoader()
            let phoneNumberField = form.phonenumber.value
            let nameField = form.ridername.value
            let adhaarNumberField = form.aadhar.value
            let panNumberField = form.pan.value
            let vehicleRegistrationField = form.vrn.value
            let licenseField = form.lf.value
            let profileImageField = form.riderimage.files[0]
            let accountHolderNameField = form.ahname.value
            let accountHolderNumberField = form.ahnum.value
            let ifscCodeField = form.ifsccode.value
            let branchNameField = form.bn.value
            let upiIdCodeField = form.upicode.value
            let data = {
                Aadhar : adhaarNumberField,
                BANK : {
                  Account_Holder_Name : accountHolderNameField,
                  Account_Number : accountHolderNumberField,
                  Branch_Name : branchNameField,
                  IFSC_Code : ifscCodeField,
                  UPI_ID : upiIdCodeField
                },  
                License : licenseField,
                MobileNumber : "+91"+phoneNumberField,
                PAN : panNumberField,
                Vehicle_Registration_Number : vehicleRegistrationField,
                name : nameField,
                status : 'approved'
              } 
            if(!profileImageField){
                console.log('in1')
                  update(ref(db, "RiderDetails/+91" + phoneNumberField) ,data).then(() =>  {new Toast({
                    message: 'Rider Edited Successfully',
                    type: 'success'
                  })
                  $('body').loadingModal('destroy');
            document.querySelector(`.hide-91${phoneNumberField}`).click()

                }).catch((err) => console.log(err));
                
            }else{
             const metaData = { contentType : profileImageField.type}
             const ssRef = sRef(getStorage(), `RIDER_DP/+91${phoneNumberField}/${profileImageField.name}`);
             const uploadTask = uploadBytesResumable(ssRef, profileImageField, metaData);
             uploadTask.on('state_changed',function(snapshot) {
              console.log(snapshot)
            }, function(error) {
              console.log(error)
            
           }, function() {
            // Uploaded completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              update(ref(db, "RIDER_DP/+91" + phoneNumberField) ,{
                dp : downloadURL,
                userid : "+91" + phoneNumberField
              })
            });
      
             
            update(ref(db, "RiderDetails/+91" + phoneNumberField) ,data).then(() =>  {new Toast({
              message: 'Rider Edited Successfully',
              type: 'success'
            })

            $('body').loadingModal('destroy');
            document.querySelector(`.hide-91${phoneNumberField}`).click()
      
          }).catch((err) => console.log(err));
          });
        }
        })
    
      })

      document.querySelector("#riders-count").innerHTML = `
      ${Object.keys(allRiders).length}
    `;}









    if (shopsRes.exists()) {
      allShops = shopsRes.val();
      document.querySelector("#shops-count").innerHTML = `
      ${Object.keys(allShops).length}
    `;
      //localStorage.setItem('shops', JSON.stringify(allShops))
    }

    if (liveRidersRes.exists() && ridersRes.exists()) {
      allRiders = ridersRes.val();
      liveRiders = liveRidersRes.val();
      document.querySelector("#live-riders-body").innerHTML = "";
      Object.keys(liveRiders).forEach((el) => {
        if (allRiders[el] && el.startsWith("+")) {
          let showPersonalDetails = `
      
      <div class="nav-item dropdown no-arrow mx-1 position-static">
      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Click To Show
      </a>
      <!-- Dropdown - Alerts -->
      <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
          aria-labelledby="alertsDropdown"> 
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-primary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Adhaar Card Number</div>
                  <span class="font-weight-bold">${allRiders[el].Aadhar}</span>
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-success">
                  <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Pan Number</div>
                  ${allRiders[el].PAN}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-secondary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Vehicle Registration Number</div>
                  ${allRiders[el].Vehicle_Registration_Number}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-warning">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">License Number</div>
              ${allRiders[el].License}
          </div>
      </a>
      </div>
      
  </div>
      
      `;
          let showBankDetails = `
      <div class="nav-item dropdown no-arrow mx-1 position-static">

      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          N/A
      </a>
      </div>
      `;

          if (allRiders[el].BANK) {
            showBankDetails = `
      
      <div class="nav-item dropdown no-arrow mx-1 position-static">
      <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Click To Show
      </a>
      <!-- Dropdown - Alerts -->
      <div class="dropdown-list dropdown-menu dropdown-menu-right shadow"
          aria-labelledby="alertsDropdown"> 
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-primary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Account Holder Name</div>
                  <span class="font-weight-bold">${allRiders[el].BANK.Account_Holder_Name}</span>
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-success">
                  <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">Account Number</div>
                  ${allRiders[el].BANK.Account_Number}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
              <div class="mr-3">
                  <div class="icon-circle bg-secondary">
                      <i class="fas fa-file-alt text-white"></i>
                  </div>
              </div>
              <div>
                  <div class="small text-gray-500">IFSC Code</div>
                  ${allRiders[el].BANK.IFSC_Code}
              </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-warning">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">Branch Name</div>
              ${allRiders[el].BANK.Branch_Name}
          </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
          <div class="mr-3">
              <div class="icon-circle bg-danger">
                  <i class="fas fa-file-alt text-white"></i>
              </div>
          </div>
          <div>
              <div class="small text-gray-500">UPI ID</div>
              ${allRiders[el].BANK.UPI_ID}
          </div>
      </a>
      </div>
      
  </div>
      
      `;
          }

          let statusColor = "red";
          if (allRiders[el].status == "approved") {
            statusColor = "green";
          }

          //append live riders to table
          document.querySelector("#live-riders-body").innerHTML += `
      <tr>
      <td style="white-space:nowrap;">${allRiders[el].name}</td>
      <td>${allRiders[el].MobileNumber}</td>
      <td>${showPersonalDetails}</td>
      <td>${showBankDetails}</td>
      <td  style="color:${statusColor};">${allRiders[el].status}</td>
      <td>
      <a id="${el}" href="#" class="btn btn-success btn-circle approve-rider-btn">
      <i id="${el}" class="fas fa-check approve-rider-btn"></i>
  </a>  
  <a id="${el}" href="#" class="btn btn-warning btn-circle reject-rider-btn">
      <i id="${el}" class="fas fa-exclamation-triangle reject-rider-btn"></i>
  </a>
  <a id="${el}" href="#" class="btn btn-danger btn-circle delete-rider-btn">
      <i id="${el}" class="fas fa-trash delete-rider-btn"></i>
  </a>
  <a id="${el}" href="#" class="btn btn-primary btn-circle edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}">
  <i id="${el}" class="fas fa-pen edit-rider-btn" data-toggle="modal" data-target="#editRider${el.replace('+', '')}"></i>
</a> 
      
      </td>
  </tr>
      
      `;
        }
      });
      //localStorage.setItem('shops', JSON.stringify(allShops))
    }
  });




  document.addEventListener("click", (e) => {



    //add shop
    if(e.target.classList.contains('addShopSubmit')){
      
      let phoneNumberField = document.querySelector('.phone-number-shop-input').value
      let nameField = document.querySelector('.name-shop-input').value
      let emailField = document.querySelector('.email-shop-input').value
      let businessField = document.querySelector('.business-shop-input').value
      let addressField = document.querySelector('.address-shop-input').value
      let profileImageField = document.querySelector('.profile-image-shop-input').files[0]

      
      
      if(phoneNumberField.length ==0 || nameField.length ==0 || emailField.length ==0 || businessField.length ==0 || addressField.length ==0 || profileImageField.length ==0){
        new Toast({
          message: 'Please Fill Out All Fields',
          type: 'danger'
        });
        return
      }
      


      if(!String(emailField)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        new Toast({
          message: 'Please Pass Valid Email',
          type: 'danger'
        });
        return
      }
      if(phoneNumberField.length !=10){
        new Toast({
          message: 'Phone Number Should Contain 10 Numbers',
          type: 'danger'
        });
        return
      }
      showLoader()


      //empty input fields

      document.querySelector('.phone-number-shop-input').value = ""
      document.querySelector('.name-shop-input').value = ""
      document.querySelector('.email-shop-input').value = ""
      document.querySelector('.business-shop-input').value = ""
      document.querySelector('.address-shop-input').value = ""
      document.querySelector('.profile-image-shop-input').value = ""



       const metaData = { contentType : profileImageField.type}
       const ssRef = sRef(getStorage(), 'ShopImages/DP/'+profileImageField.name);
       const uploadTask = uploadBytesResumable(ssRef, profileImageField, metaData);
       uploadTask.on('state_changed',function(snapshot) {
        console.log(snapshot)
      }, function(error) {
        console.log(error)
      
     }, function() {
      // Uploaded completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        let now = new Date()
        let data = {
          DP : {
            dp : downloadURL,
            userid : "+91" + phoneNumberField
          },  
          Details : {
            address : addressField,
            date :  `${now.toLocaleString()}`,
            email : emailField,
            image : downloadURL,
            key : "+91" + phoneNumberField,
            mob: "+91" + phoneNumberField,
            name : nameField,
            shopname : businessField,
            status : 'approved',
            userid: "+91" + phoneNumberField
          },
          Location : {
            lat : '28.6862738',
            long : '77.2217831'
          }
        }      
      set(ref(db, "Shop/+91" + phoneNumberField) ,data).then(() =>  {new Toast({
        message: 'Shop Added Successfully',
        type: 'success'
      })
      document.querySelector('.close-add-shop').click()
     document.querySelector('#home-div.navigate-now').click()  
      $('body').loadingModal('destroy');
    }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
    });
     

    }


    //add rider

    if(e.target.classList.contains('addRiderSubmit')){
      showLoader()
      
      let phoneNumberField = document.querySelector('.phone-number-input').value
      let nameField = document.querySelector('.name-input').value
      let adhaarNumberField = document.querySelector('.adhaar-card-number-input').value
      let panNumberField = document.querySelector('.pan-number-input').value
      let vehicleRegistrationField = document.querySelector('.vehicle-registration-input').value
      let licenseField = document.querySelector('.license-input').value
      let profileImageField = document.querySelector('.profile-image-input').files[0]
      let accountHolderNameField = document.querySelector('.account-holder-name-input').value
      let accountHolderNumberField = document.querySelector('.account-holder-number-input').value
      let ifscCodeField = document.querySelector('.ifsc-code-input').value
      let branchNameField = document.querySelector('.branch-name-input').value
      let upiIdCodeField = document.querySelector('.upi-id-input').value
      
      //empty input fields
       document.querySelector('.phone-number-input').value = ""
 document.querySelector('.name-input').value = ""
 document.querySelector('.adhaar-card-number-input').value = ""
 document.querySelector('.pan-number-input').value = ""
 document.querySelector('.vehicle-registration-input').value = ""
 document.querySelector('.license-input').value = ""
 document.querySelector('.profile-image-input').value = ""
 document.querySelector('.account-holder-name-input').value = ""
 document.querySelector('.account-holder-number-input').value = ""
 document.querySelector('.ifsc-code-input').value = ""
 document.querySelector('.branch-name-input').value = ""
 document.querySelector('.upi-id-input').value = ""




       const metaData = { contentType : profileImageField.type}
       const ssRef = sRef(getStorage(), `RIDER_DP/+91${phoneNumberField}/${profileImageField.name}`);
       const uploadTask = uploadBytesResumable(ssRef, profileImageField, metaData);
       uploadTask.on('state_changed',function(snapshot) {
        console.log(snapshot)
      }, function(error) {
        console.log(error)
      
     }, function() {
      // Uploaded completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        set(ref(db, "RIDER_DP/+91" + phoneNumberField) ,{
          dp : downloadURL,
          userid : "+91" + phoneNumberField
        })
      });

      let data = {
        Aadhar : adhaarNumberField,
        BANK : {
          Account_Holder_Name : accountHolderNameField,
          Account_Number : accountHolderNumberField,
          Branch_Name : branchNameField,
          IFSC_Code : ifscCodeField,
          UPI_ID : upiIdCodeField
        },  
        License : licenseField,
        MobileNumber : "+91"+phoneNumberField,
        PAN : panNumberField,
        Vehicle_Registration_Number : vehicleRegistrationField,
        name : nameField,
        status : 'approved'
      } 
      set(ref(db, "RiderDetails/+91" + phoneNumberField) ,data).then(() =>  {new Toast({
        message: 'Rider Added Successfully',
        type: 'success'
      })
     document.querySelector('#all-riders-div.navigate-now').click()  
      $('body').loadingModal('destroy');

    }).catch((err) => console.log(err));
    });
     

    }




    if (e.target.classList.contains("approve-rider-btn")) {
      let approvedDrivers = JSON.parse(
        localStorage.getItem("approvedDrivers")
          ? localStorage.getItem("approvedDrivers")
          : "[]"
      );
      if (approvedDrivers.find((el) => el == e.target.id)) {
        return;
      }
      update(ref(db, "RiderDetails/" + e.target.id) ,{
        status : 'approved'
      }).then(() =>  new Toast({
        message: 'Rider Approved',
        type: 'success'
      })).catch((err) => console.log(err));
    }


    if (e.target.classList.contains("reject-rider-btn")) {
      let approvedDrivers = JSON.parse(
        localStorage.getItem("approvedDrivers")
          ? localStorage.getItem("approvedDrivers")
          : "[]"
      );

      if (!approvedDrivers.find((el) => el == e.target.id)) {
        return;
      }

      update(ref(db, "RiderDetails/" + e.target.id) ,{
        status : 'rejected'
      }).then(() => new Toast({
        message: 'Rider Rejected',
        type: 'warning'
      })).catch((err) => console.log(err));
    
    }
    if (e.target.classList.contains("delete-rider-btn")) {
      showLoader()
      deleteFolder(`RIDER_DP/${e.target.id}/`).then((ress)=>{
        remove(ref(db, "RiderDetails/" + e.target.id)).then(() =>{
          remove(ref(db, "RIDER_DP/" + e.target.id)).then(() =>{
            new Toast({
                        message: 'Rider Deleted',
                        type: 'danger'
                      })
                      $('body').loadingModal('destroy');
            }).catch((err) => console.log(err));
          })
      }).catch(err => console.log(err))
    }
  });
});