import React from "react";
import '../App.css'
import brand from '../images/brand_MedTrack.svg'

function Footer() {
  return (
    <div>
      <footer>
        <div
          class="card-footer text-muted"
          style={{display:"flex" , textAlign: "center", width: "100%", justifyContent:"space-between", marginTop:"1rem", padding:"0.5rem 2.5rem 0.1rem", color:"#151515"}}
        >
          {/* <img src={brand} alt="brand-svg" style={{width:"10px"}}/> */}
          <p style={{fontSize:"0.7rem"}}>
            Copyright &#169; MedTrack
          </p>

          <div >
             <ul style={{display:"flex", flexDirection:"row", gap: "0.9rem", listStyle:"none", fontSize:"0.8rem"}}>
              <li>Mail: info@medtrack.io</li>
              <li>Phone: (+233)24 396 6757</li>
              <li>Phone: (+233)302 267 589</li>
             </ul>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
