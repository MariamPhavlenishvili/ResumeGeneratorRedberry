import { useState, useEffect } from "react";

import logo from "../img/ResumeLogo.png";
import "./form/style.css";

import email from "../icons/email.svg";
import phone from "../icons/mobile.svg";

const Resume = ({ props }) => {
  const [info, setInfo] = useState({});
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (props) {
      if (props["personalInfo"]) {
        setInfo({ ...info, personalInfo: props["personalInfo"] });

        if (props["personalInfo"].phone) {
          const phone = props["personalInfo"].phone;
          const formattedNumber = phone.replace(
            /(\d{3})(\d{3})(\d{2})(\d{2})(\d{2})/,
            "$1 $2 $3 $4 $5"
          );
          setMobileNumber(formattedNumber);
        }
      }
      if (props["experience"]) {
        const storedData = JSON.parse(localStorage.getItem("data"));
        setInfo({ ...storedData, experience: props["experience"] });
      }
      if (props["education"]) {
        const storedData = JSON.parse(localStorage.getItem("data"));
        setInfo({ ...storedData, education: props["education"] });
      }
    } else {
      const storedData = JSON.parse(localStorage.getItem("data"));
      if (storedData) {
        setInfo({ ...info, storedData });
      }
    }
  }, [props]);

  return (
    <>
        {info?.personalInfo?.file && (
          <div className="profile">
            <img src={info?.personalInfo?.file} alt="profile pic" />
          </div>
        )}
        <div className="first-last-name">
          {info?.personalInfo?.firstname && (
            <h1>{info.personalInfo.firstname}</h1>
          )}
          {info?.personalInfo?.lastname && (
            <h1>{info.personalInfo.lastname}</h1>
          )}
        </div>
        <div className="contact">
          {info?.personalInfo?.email && (
            <div className="email">
              <img src={email} alt="email icon" c />
              <p>{info?.personalInfo?.email}</p>
            </div>
          )}
          {info?.personalInfo?.phone && (
            <div className="mobile">
              <img src={phone} alt="phone icon" />
              <p>{mobileNumber}</p>
            </div>
          )}
        </div>
        {info?.personalInfo?.about && (
          <div className="text about">
            <h3>ჩემ შესახებ</h3>
            <div>{info?.personalInfo?.about}</div>
          </div>
        )}
        {info?.experience?.map((data) => (
          <div key={data.id} className="experience">
            <hr className="line" />
            {(data?.position || data?.employer) && (
              <>
                <h3>გამოცდილება</h3>
                <div className="resume-flex">
                  <div className="position-employer">{data?.position}</div>
                  <div className="position-employer">{data?.employer}</div>
                </div>
              </>
            )}
            {(data?.start_date || data?.due_date) && (
              <div className="dates">
                <span className="date">{data?.start_date} </span>
                <span className="date">{data?.due_date}</span>
              </div>
            )}
            {data?.description && (
              <div className="text description">{data?.description}</div>
            )}
          </div>
        ))}
        {info?.education?.map((data) => (
          <div key={data.id}>
            <>
              <hr className="line" />
              {(data?.institute || data?.degree_id) && (
                <>
                  <h3>განათლება</h3>
                  <div className="resume-flex">
                    <div className="position-employer">{data?.institute}</div>
                    <div className="position-employer">{data?.degree_id}</div>
                  </div>
                </>
              )}
              {data?.due_date && (
                <div className="dates">
                  <span className="date">{data?.due_date}</span>
                </div>
              )}
              {data?.description && (
                <div className="text description">{data?.description}</div>
              )}
            </>
          </div>
        ))}
        <img src={logo} alt="ressume logo" className="resume-logo" />
    </>
  );
};

export default Resume;
