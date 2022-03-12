<div class="container position-absolute">
    <div class="modal fade" id="addShop" tabindex="-1" role="dialog" aria-labelledby="addShopLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addShopLabel">Add A Shop</h5> <button type="button" class="close close-add-shop" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body">
                    <div id="smartwizard2">
                        <ul>
                            <li><a href="#step-1">Step 1<br /><small>Choose Location</small></a></li>
                            <li><a href="#step-2">Step 2<br /><small>Shop Info</small></a></li>
                        </ul>
                        <div>
                            <div id="step-1">
                                <div class="row">
                                    <div id="myMap"></div>
                                    <input id="address" type="text" style="width:600px;" /><br />
                                    <input type="text" id="latitude" placeholder="Latitude" />
                                    <input type="text" id="longitude" placeholder="Longitude" />
                                </div>
                            </div>
                            <div id="step-2">
                                <div class="row">
                                    <div class="col-md-6"> <input type="text" class="form-control name-shop-input" placeholder="Owner Name" required> </div>
                                    <div class="col-md-6"> <input type="email" class="form-control email-shop-input" placeholder="Email" required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col"><input type="text" class="form-control phone-number-shop-input" placeholder="Phone Number Without (+91)" required> </div>
                                    <div class="col-md-6"> <input type="text" class="form-control business-shop-input" placeholder="Business Or Shop Name" required> </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"> <input type="text" class="form-control address-shop-input" placeholder="Address" required> </div>
                                    <div class="col-md-6"> <input type="file" class="form-control profile-image-shop-input" placeholder="Profile Image" required> </div>
                                </div>
                                <div class="mt-4 col-md-12 text-center">
                                    <span>
                                        <a href="#" class="btn btn-success btn-icon-split">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-check"></i>
                                            </span>
                                            <span class="text addShopSubmit">Confirm Adding The Shop</span>
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