import React from "react";
import "./Contact.scss";
const Contact = ({ data }) => {
  const {
    name,
    phone,
    country,
    admissionDate,
    company,
    department,
    avatar,
  } = data;

  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(admissionDate));

  return (
    <article className="contact" data-testid="contact">
      <span className="contact__avatar">
        <img src={avatar} alt={name} />
      </span>
      <span className="contact__data" data-testid="contact-name">
        {name}
      </span>
      <span className="contact__data" data-testid="contact-phone">
        {phone}
      </span>
      <span className="contact__data" data-testid="contact-country">
        {country}
      </span>
      <span className="contact__data" data-testid="contact-date">
        {`${day}/${month}/${year}`}
      </span>
      <span className="contact__data" data-testid="contact-company">
        {company}
      </span>
      <span className="contact__data" data-testid="contact-department">
        {department}
      </span>
    </article>
  );
};

export default Contact;
