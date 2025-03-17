import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./header";
import Footer from "./footer";

import "../css/style.css";
import "../css/font-awesome.css";

const Layout = ({ children, header }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("smooth-scroll")('a[href*="#"]');
    }
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulSiteInformation {
            siteName
            siteDescription {
              siteDescription
            }
            logo {
              file {
                url
              }
            }
          }
        }
      `}
      render={data => {
        const { siteName, siteDescription, logo } = data.contentfulSiteInformation;
        return (
          <>
            <Header
              data={data.contentfulSiteInformation}
              siteTitle={siteName}
              header={header}
            />
            <div>
              <main id="home">{children}</main>
            </div>
            <Footer siteName={siteName} />
          </>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string
};

export default Layout;
