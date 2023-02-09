/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from "react-hook-form";
import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import component
import Resume from "../Resume";

import "./style.css";
import arrow from "../../icons/Vector.svg";
import warning from "../../icons/Warning.svg";

const Personal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || {
      firstname: "",
      lastname: "",
      file: null,
      about: "",
      email: "",
      phone: "",
      firstnameError: "",
      lastnameError: "",
      fileError: "",
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const [istouched, setIsTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
  });

  const onChange = (event) => {
    const regexGeorgianLang = new RegExp(/^[ა-ჰ]+$/);
    const regexRedberryEmail = new RegExp(
      /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@redberry([.])ge/g
    );
    const regexPhoneNumber = new RegExp(/[+](995)?(79\d{7}|5\d{8})$/);

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "file" && event.target.files.length !== 0) {
      setData({
        ...data,
        [event.target.name]: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const onSubmit = (data) => {
    navigate("/experience");
    // localStorage.removeItem("data");
    setData({
      firstname: "",
      lastname: "",
      file: null,
      about: "",
      email: "",
      phone: "",
      firstnameError: "",
      lastnameError: "",
      fileError: "",
    });
  };

  const removeData = () => {
    localStorage.removeItem("data");
  }

  return (
    <>
      <div className="grid-container">
        <div className="form-generator">
          <a href="/" className="icon" onClick={removeData}>
            <img src={arrow} alt="Your SVG" className="svg" />
          </a>
          <header>
            <div className="header-content">
              <div className="header-text">პირადი ინფო</div>
              <div>1/3</div>
            </div>
          </header>
          <form onSubmit={handleSubmit(onSubmit)} className="content">
            <div className="flex-container">
              <div className="form-div form-content">
                <label htmlFor="fname" type="text">
                  სახელი
                </label>
                <div>
                  <input
                    type="text"
                    {...register("firstname", {
                      required: true,
                      minLength: 2,
                      pattern: /^[ა-ჰ]+$/,
                    })}
                    value={data.firstname}
                    onChange={onChange}
                    placeholder="ანზორ"
                    className={
                      istouched.firstname
                        ? data.firstnameError || !data.firstname
                          ? "wrong"
                          : "correct"
                        : "Names"
                    }
                  />
                  {/* {firstnameError && <img src={warning} alt="Your SVG" className="warning-icon" />} */}
                </div>
                <p className="warning">მინიმუმ 2 ასო, ქართული ასოები</p>
              </div>
              <div className="form-div form-content">
                <label htmlFor="lname" type="text">
                  გვარი
                </label>
                <div>
                  <input
                    type="text"
                    {...register("lastname", {
                      required: true,
                      minLength: 2,
                      pattern: /^[ა-ჰ]+$/,
                    })}
                    placeholder="მულაძე"
                    value={data.lastname}
                    onChange={onChange}
                    className={
                      istouched.lastname
                        ? data.lastnameError || !data.lastname
                          ? "wrong"
                          : "correct"
                        : "Names"
                    }
                  />
                </div>
                {<p className="warning">მინიმუმ 2 ასო, ქართული ასოები</p>}
              </div>
            </div>
            <div className="form-div upload">
              <label htmlFor="fupload" className="file-label">
                პირადი ფოტოს ატვირთვა
              </label>
              <input
                type="file"
                {...register("file", {
                  required: true,
                })}
                onClick={onChange}
                // value={data.file}
                id="actual-btn"
                hidden
              />
              <label htmlFor="actual-btn" className="actual-btn">
                ატვირთვა
              </label>
            </div>
            <div className="form-div form-content">
              <label htmlFor="aboutMe">ჩემ შესახებ (არასავალდებულო)</label>
              <textarea
                {...register("about")}
                cols="30"
                rows="5"
                value={data.about}
                onChange={onChange}
                placeholder="ზოგადი ინფო შენ შესახებ"
              ></textarea>
            </div>
            <div className="form-div form-content">
              <label htmlFor="email">ელ.ფოსტა</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@redberry([.])ge/,
                })}
                value={data.email}
                onChange={onChange}
                placeholder="anzor666@redberry.ge"
              />
              <p className="warning">უნდა მთავრდებოდეს @redberry.ge-ით</p>
            </div>
            <div className="form-div form-content">
              <label htmlFor="mobile">მობილურის ნომერი</label>
              <input
                type="tel"
                {...register("phone", {
                  required: true,
                  pattern: /^(\+995\d{2})(\d{3})(\d{2})(\d{2})$/,
                })}
                value={data.phone}
                onChange={onChange}
                placeholder="+995 551 12 34 56"
                className={
                  istouched.phone
                    ? data.phoneError || !data.phone
                      ? "wrong"
                      : "correct"
                    : ""
                }
              />

              <p className="warning">
                უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს
              </p>
            </div>
            <input type="submit" value="შემდეგი" className="submit" />
          </form>
        </div>
        <Resume props={data} />
      </div>
    </>
  );
};

export default Personal;
