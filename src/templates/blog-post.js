import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Share from "../components/share";

export default class BlogPost extends Component {
  render() {
    const { contentfulBlogs: data, contentfulSiteInformation } = this.props.data;
    const siteurl = contentfulSiteInformation.siteUrl + "/";
    const twitterhandle = contentfulSiteInformation.twitterHandle;
    const socialConfig = {
      url: `${siteurl}${data.slug}`,
      title: data.title,
      twitterhandle,
    };

    return (
      <Layout>
        <SEO
          title={data.title}
          keywords={["Rohit Gupta", "Frontend Developer", "Developer", data.title]}
        />
        <div className="site-container blog-post">
          <div className="container">
            {data.featureImage ? (
              <Img
                className="feature-img"
                fluid={data.featureImage.fluid}
                objectFit="cover"
                objectPosition="50% 50%"
              />
            ) : (
              <div className="no-image"></div>
            )}

            <div className="details">
              <h1 className="title">{data.title}</h1>
              <span className="date">
                <i className="fas fa-calendar-alt"></i> {moment(data.createdAt).format("LL")}
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description?.childMarkdownRemark?.html || "<p>Description unavailable.</p>",
                }}
              />
            </div>
            <Share socialConfig={socialConfig} />

            {/* Utterances Comment Section */}
            <div className="comments">
              <script
                src="https://utteranc.es/client.js"
                repo="your-github-username/your-repo"
                issue-term="title"
                theme="github-light"
                crossOrigin="anonymous"
                async
              ></script>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query SinglePostQuery($slug: String!) {
    contentfulBlogs(slug: { eq: $slug }) {
      id
      title
      slug
      featureImage {
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      createdAt
    }
    contentfulSiteInformation {
      siteUrl
      twitterHandle
    }
  }
`;
