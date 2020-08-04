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
        {this.props.attributes.type === "textarea" ? (
          <textarea
            {...this.props.attributes}
            className={`input-text js-input ${this.state.inputClass}`}
            required
            onChange={this.handleOnChange}
          />
        ) : (
          <input
            {...this.props.attributes}
            className={`input-text js-input ${this.state.inputClass}`}
            required
            onChange={this.handleOnChange}
          />
        )}
        <label className="label" htmlFor={this.props.attributes.id}>
          {this.props.label || this.props.attributes.id}
        </label>
      </div>
    );
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
    this.state = { name: "", email: "", message: "", isSubmitted: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    this.setState({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    })
      .then(() => this.setState({ isSubmitted: true }))
      .catch(error => console.log(error));
  };

  render() {
    const { pageContext } = this.props;
    const isSubmitted = this.state.isSubmitted;
    const fields = [
      {
        attributes: {
          id: "name",
          type: "text",
          name: "name",
        },
        label: pageContext.i18n.name,
      },
      {
        attributes: {
          id: "email",
          type: "email",
          name: "email",
        },
      },
      {
        attributes: {
          id: "message",
          type: "textarea",
          name: "message",
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
            {!isSubmitted ? (
              <form
                name="contact"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                onSubmit={this.handleSubmit}
              >
                <input type="hidden" name="bot-field" aria-label="bot-field" />
                <input
                  type="hidden"
                  name="form-name"
                  value="contact"
                  aria-label="form-name"
                />
                {fields.map(field => {
                  return (
                    <ContactField
                      key={field.attributes.id}
                      {...field}
                    ></ContactField>
                  );
                })}
                <div className="form-field col x-100 align-center">
                  <input
                    className="submit-btn"
                    type="submit"
                    aria-label="Submit"
                    value={pageContext.i18n.submit}
                  />
                </div>
              </form>
            ) : (
              pageContext.i18n.thankyou
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Contact;
