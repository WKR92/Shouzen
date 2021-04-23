import React, {} from 'react';

const UserInfoTable = () => {

    return(
        <div id="userInfoTable" className="userInfoTableOuterContainer">
            <form className="userInfoTableForm"> 
                <h2>Where and to whom should we deliver the shoes?</h2>
                <input type="text" min="3" className="name" placeholder="name" />
                <input type="text" min="3" className="surname" placeholder="surname" />
                <input type="address" min="3" className="address" placeholder="address" />
                <div className="postAndTownInputsContainer">
                    <input type="number" className="postCode" pattern="\d{2}-\d{2}" placeholder="post code" />
                    <input type="text" className="town" placeholder="town" />
                </div>
                <input type="text" className="country" placeholder="country" />
                <input type="tel" className="telephone" placeholder="telephone" />
                <button type="submit">Go to payment</button>
            </form>
        </div>
    )
}
export default UserInfoTable;