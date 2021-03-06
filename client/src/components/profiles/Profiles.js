import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "./../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "./../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectDevelop"></i>Browse and connect with
            Developers
          </p>
          <div className="profiles">
            {profiles.profiles && profiles.profiles.length > 0 ? (
              profiles.profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
