import React, { Component } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default class Blogs extends Component {
  render() {
    const { data } = this.props;
    const blogPosts = data?.allContentfulBlogPost?.edges || [];

    return (
      <Layout>
        <SEO title="Blogs" keywords={["Rohit Gupta", "Frontend Developer", "Developer", "Blogs"]} />
        <div className="site-container blogs-page" id="Blogs">
          <div className="container">
            <div className="section-head">
              <h1 className="line-heading h2">Blogs</h1>
            </div>
            <ul className={`blogs-list ${blogPosts.length < 5 ? "few-blogs" : ""}`}>
              {blogPosts.map(({ node }, index) => (
                <li key={index} className="item">
                  <div className="inner">
                    <Link className="link" to={`/${node.slug}`} />
                    {node.featureImage ? (
                      <Img fluid={node.featureImage.fluid} alt={node.title} objectFit="cover" objectPosition="50% 50%" />
                    ) : (
                      <div className="no-image"></div>
                    )}
                    <div className="details">
                      <h3 className="title">{node.title}</h3>
                      <span className="date">
                        <i className="fas fa-calendar-alt"></i> {moment(node.createdAt).format("LL")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogsQuery {
    allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
      edges {
        node {
          title
          slug
          featureImage {
            fluid(maxWidth: 1500) {
              ...GatsbyContentfulFluid
            }
          }
          createdAt
        }
      }
    }
  }
`;
