import react, { useEffect } from 'react';
import profile from './homephotos/profile1.png';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const Toaster = (props) => {
    const navigate = useNavigate();

    const {  toastermsg,toastercolor,toasterlink ,rendernum} = props;
    console.log( toastermsg,toastercolor,toasterlink,rendernum);
    const showToast = () => {
        const toast = new window.bootstrap.Toast(document.getElementById('liveToast'));
        toast.show();
    
        setTimeout(() => {
          toast.hide();
        }, 5000);
      };
    
      useEffect(() => {
        if(rendernum!=undefined && rendernum!=0){
            console.log( toastermsg,toastercolor,toasterlink,rendernum);
        var button = document.getElementById('toasterclickwithid');
        button.click();
        }
  },[rendernum]);

    return (<>
        {/* toast in bootstrap */}
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div class={`${toastercolor}  toast align-items-center border-0`} id="liveToast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div class={`toast-body `}>
    <i class={`${toasterlink} me-3 `}></i>      {toastermsg}
    </div>
    <button type="button" class="btn-close btn-close-white  me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
        </div>
        <button type="button" class="btn btn-primary d-none" id='toasterclickwithid' onClick={showToast}></button>

    </>);
}
export default Toaster;