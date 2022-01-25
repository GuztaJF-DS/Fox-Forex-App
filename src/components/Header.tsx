import React from 'react';

function Header(){
    return(
        <div className="header">
        <div className="foxforextext">
          Fox Forex
        </div>
          <div className="CurrentUserData">
            <div>
              Current Profit:0$
            </div>
            <div>
              Current lots:0
            </div>
          </div>
      </div>
    )
}

export default Header