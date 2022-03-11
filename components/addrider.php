<div class="container">
    <div class="modal fade" id="addRider" tabindex="-1" role="dialog" aria-labelledby="addRiderLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addRiderLabel">Add A Rider</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body">
                    <div id="smartwizard">
                        <ul>
                            <li><a href="#step-1">Step 1<br /><small>Phone Number</small></a></li>
                            <li><a href="#step-2">Step 2<br /><small>Personal Info</small></a></li>
                            <li><a href="#step-3">Step 3<br /><small>Bank Info</small></a></li>
                            <li><a href="#step-4">Step 4<br /><small>Confirm details</small></a></li>
                        </ul>
                        <div>
                            <div id="step-1">
                                <div class="row">
                                    <div class="col"> +91<input type="text" class="form-control phone-number-input" placeholder="Phone Number" required> </div>
                                </div>
                            </div>
                            <div id="step-2">
                                <div class="row">
                                    <div class="col-md-6"> <input type="text" class="form-control name-input" placeholder="Name" required> </div>
                                    <div class="col-md-6"> <input type="text" class="form-control adhaar-card-number-input" placeholder="Adhaar Card Number" required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"> <input type="text" class="form-control pan-number-input" placeholder="PAN Number" required> </div>
                                    <div class="col-md-6"> <input type="text" class="form-control vehicle-registration-input" placeholder="Vehicle Registration Number " required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"> <input type="text" class="form-control license-input" placeholder="License Number" required> </div>
                                    <div class="col-md-6"> <input type="file" class="form-control profile-image-input" placeholder="Profile Image" required> </div>
                                </div>
                            </div>
                            <div id="step-3" class="">
                                <div class="row">
                                    <div class="col-md-6"> <input type="text" class="form-control account-holder-name-input" placeholder="Account Holder Name" required> </div>
                                    <div class="col-md-6"> <input type="text" class="form-control account-holder-number-input" placeholder="Account Holder Number" required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"> <input type="text" class="form-control ifsc-code-input" placeholder="IFSC Code" required> </div>
                                    <div class="col-md-6"> <input type="text" class="form-control branch-name-input" placeholder="Branch Name" required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col"> <input type="text" class="form-control upi-id-input" placeholder="UPI ID" required> </div>
                                </div>
                            </div>
                            <div id="step-4" class="">
                                <div class="row">
                                    <div class="col-md-12 text-center" >
                                         <span>
                                    <a href="#" class="btn btn-success btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-check"></i>
                                        </span>
                                        <span data-dismiss="modal" aria-label="Close" class="text addRiderSubmit">Confirm Adding The Rider</span>
                                    </a>
                                            </span> 
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>