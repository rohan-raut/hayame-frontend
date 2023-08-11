import React, { useState } from "react";

function AlertMessage(props) {
    
    return (
        props.alert && <div className="container fixed-top my-3">
            <div className="row justify-content-center">
                <div className="col-11 col-sm-11 col-md-6 col-lg-5">
                    <div class={`alert alert-${props.alert.type}`} role="alert">
                        {props.alert.message}
                    </div>
                </div>
            </div>

        </div>
    );


};

export default AlertMessage;
