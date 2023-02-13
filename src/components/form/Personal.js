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
      personalInfo: {
        firstname: "",
        lastname: "",
        file: null,
        about: "",
        email: "",
        phone: "",
      },
    }
  );
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const onChange = (event) => {
    const regexGeorgianLang = new RegExp(/^[ა-ჰ]+$/);
    const regexRedberryEmail = new RegExp(
      /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@redberry([.])ge/g
    );
    const regexPhoneNumber = new RegExp(/[+](995)?(79\d{7}|5\d{8})$/);

    setData({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [event.target.name]: event.target.value,
      },
    });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  const onChangeImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await blobToBase64(file);
    const binary = atob(base64.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    const fileObject = new Blob([new Uint8Array(array)], {
      type: file.type,
    });
    const fileUrl = URL.createObjectURL(fileObject);
    setData({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        file: fileUrl,
      },
    });
  };

  const onSubmit = (data) => {
    navigate("/experience");
    // localStorage.removeItem("data");
    setData({
      personalInfo: {
        firstname: "",
        lastname: "",
        file: null,
        about: "",
        email: "",
        phone: "",
      },
    });
  };

  const removeData = () => {
    localStorage.removeItem("data");
  };

  return (
    <>
      <div className="grid-container">
        <div className="form-generator">
          <a href="/" className="icon" onClick={removeData}>
            <img src={arrow} alt="Your SVG" className="svg" />
          </a>
          <header className="form-header">
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
                    value={data.personalInfo.firstname}
                    onChange={onChange}
                    placeholder="ანზორ"
                    className={"Names"}
                  />
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
                    value={data.personalInfo.lastname}
                    onChange={onChange}
                    className={"Names"}
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
                onChange={onChangeImage}
                // value={data.personalInfo.file}
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
                value={data.personalInfo.about}
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
                value={data.personalInfo.email}
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
                value={data.personalInfo.phone}
                onChange={onChange}
                placeholder="+995 551 12 34 56"
              />

              <p className="warning">
                უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს
              </p>
            </div>
            <input
              className="submit"
              onClick={onSubmit}
              value={"შემდეგი"}
              type="submit"
            />
          </form>
        </div>
        <div className="resume">
          <Resume props={data} />
        </div>
      </div>
    </>
  );
};

export default Personal;
