import React from "react";
import PropTypes from "prop-types";
import { LinkedinShareButton } from "react-share";

const Share = ({ socialConfig }) => {
  return (
    <div className="post-social">
      <h6 className="title is-6">Share:</h6>
      <LinkedinShareButton
        url={socialConfig.config.url}
        className="button is-outlined is-rounded linkedin"
        title={socialConfig.config.title}
      >
        <span className="icon">
          <i className="fab fa-linkedin"></i>
        </span>
        <span className="text">LinkedIn</span>
      </LinkedinShareButton>
    </div>
  );
};

Share.propTypes = {
  socialConfig: PropTypes.shape({
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }).isRequired
};

export default Share;
