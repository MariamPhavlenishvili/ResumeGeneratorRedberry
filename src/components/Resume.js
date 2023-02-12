import { useState, useEffect } from "react";

import logo from "../img/ResumeLogo.png";

import email from "../icons/email.svg";
import phone from "../icons/mobile.svg";

const Resume = ({ props }) => {
  const [info, setInfo] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (props) {
      console.log("test");
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
      console.log("test1")
      const storedData = JSON.parse(localStorage.getItem("data"));
      if (storedData) {
        setInfo({ ...info, storedData });
      }
    }
  }, [props]);

  return (
    <>
      <div className="resume">
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
            <p className="paragraph">{info?.personalInfo?.about}</p>
          </div>
        )}
        {info?.experience?.map((data) => (
          <div key={data.id}>
            <>
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
              {(data?.startDate || data?.endDate) && (
                <div className="dates">
                  <span className="date">{data?.startDate} </span>
                  <span className="date">{data?.endDate}</span>
                </div>
              )}
              {data?.description && (
                <div className="text description">{data?.description}</div>
              )}
            </>
          </div>
        ))}
        {info?.education?.map((data) => (
          <div key={data.id}>
            <>
              <hr className="line" />
              {(data?.school || data?.degree) && (
                <>
                  <h3>განათლება</h3>
                  <div className="resume-flex">
                    <div className="position-employer">{data?.school}</div>
                    <div className="position-employer">{data?.degree}</div>
                  </div>
                </>
              )}
              {data?.endDate && (
                <div className="dates">
                  <span className="date">{data?.endDate}</span>
                </div>
              )}
              {data?.description && (
                <div className="text description">{data?.description}</div>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
};

export default Resume;
