import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./contact.module.scss";

export class ContactField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputClass: "" };
  }

  handleOnChange = e => {
    this.setState({ inputClass: e.target.value === "" ? "" : "not-empty" });
  };

  render() {
    return (
      <div
        className={`form-field col ${
          this.props.className === undefined ? "x-50" : this.props.className
        }`}
      >
        <input
          {...this.props.attributes}
          className={`input-text js-input ${this.state.inputClass}`}
          required
          onChange={this.handleOnChange}
        />
        <label className="label" htmlFor={this.props.attributes.id}>
          {this.props.label || this.props.attributes.id}
        </label>
      </div>
    );
  }
}

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSubmitted: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitted: true });
  };

  render() {
    const { pageContext } = this.props;
    const isSubmitted = this.state.isSubmitted;

    const fields = [
      {
        attributes: {
          id: "name",
          type: "text",
        },
        label: pageContext.i18n.name,
      },
      {
        attributes: {
          id: "email",
          type: "email",
        },
      },
      {
        attributes: {
          id: "message",
          type: "text",
        },
        className: "x-100",
      },
    ];

    let form;
    if (!isSubmitted) {
      return (
        <form
          name="contact"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          {fields.map(field => {
            return <ContactField {...field}></ContactField>;
          })}
          <div className="form-field col x-100 align-center">
            <input
              className="submit-btn"
              type="submit"
              value={pageContext.i18n.submit}
              onSubmit={this.handleSubmit}
            />
          </div>
        </form>
      );
    } else {
      return (
        <div>
          <p>Thank your for your submission</p>
        </div>
      );
    }
  }
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    this.setState({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => alert("submitted"))
      .catch(error => alert(error));
  };

  render() {
    const { pageContext } = this.props;
    const fields = [
      {
        attributes: {
          id: "name",
          type: "text",
        },
        label: pageContext.i18n.name,
      },
      {
        attributes: {
          id: "email",
          type: "email",
        },
      },
      {
        attributes: {
          id: "message",
          type: "text",
        },
        className: "x-100",
      },
    ];

    return (
      <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
        <SEO title="Contact" />
        <h1>{pageContext.i18n.title}</h1>
        <div className={styles.contactWrapper}>
          <div className={styles.side}>
            <div
              dangerouslySetInnerHTML={{ __html: pageContext.i18n.tldr }}
            ></div>
            <div
              dangerouslySetInnerHTML={{ __html: pageContext.i18n.history }}
            ></div>
          </div>
          <div className={styles.side}>
            <h2>{pageContext.i18n.contacttitle}</h2>
            <form
              name="contact"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />
              {fields.map(field => {
                return <ContactField {...field}></ContactField>;
              })}
              <div className="form-field col x-100 align-center">
                <input
                  className="submit-btn"
                  type="submit"
                  value={pageContext.i18n.submit}
                />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Contact;
