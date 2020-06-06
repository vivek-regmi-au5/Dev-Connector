import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "./../../actions/profile";
import Spinner from "./../layout/Spinner";
import Experience from "./../dashboard/Experience";
import Education from "./../dashboard/Education";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button
              onClick={() => {
                deleteAccount();
              }}
              className="btn btn-danger"
            >
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You dont have a profile yet.</p>
          <p>Please click below to create yout profile</p>
          <Link to="/create-profile" className="btn btn-primary">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
