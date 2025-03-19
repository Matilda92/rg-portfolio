import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

function SEO({ description, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const siteName = data.contentfulSiteInformation.siteName;
        const siteDescription = data.contentfulSiteInformation.siteDescription
          ? documentToPlainTextString(data.contentfulSiteInformation.siteDescription.json)
          : "";
        const linkedInURL = data.contentfulSiteInformation.linkedInURL;

        return (
          <>
            <Helmet
              htmlAttributes={{ lang }}
              title={title}
              titleTemplate={`%s | ${siteName}`}
              meta={[
                {
                  name: `description`,
                  content: description || siteDescription,
                },
                {
                  property: `og:title`,
                  content: title,
                },
                {
                  property: `og:description`,
                  content: description || siteDescription,
                },
                {
                  property: `og:type`,
                  content: `website`,
                },
              ]
                .concat(
                  keywords.length > 0
                    ? {
                        name: `keywords`,
                        content: keywords.join(`, `),
                      }
                    : []
                )
                .concat(meta)}
            />
            {linkedInURL && (
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(linkedInURL)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || siteDescription)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#0077B5",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Share on LinkedIn
              </a>
            )}
          </>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: "",
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    contentfulSiteInformation {
      siteName
      siteDescription {
        json
      }
      linkedInURL
    }
  }
`;
