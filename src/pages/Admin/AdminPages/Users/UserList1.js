import React from "react";
import { useStateValue } from "../../../../context/StateProvider";
import "../../../../assets/AdminAssests/UserLIst1.scss";
import { Box } from "@mui/system";
import Header from "../../AdminComponents/Header";

const UserList1 = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  return (
    <Box m="20px" className="userlist_section">
     
      <div className="user_list">
        <div className="list">
          <div className="div_3">
            <p className="text">
              Count{" "}
              <span className="text-sm font-bold text-textColor">
                {allUsers?.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default UserList1;
