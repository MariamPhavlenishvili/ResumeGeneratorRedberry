import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";

import Resume from "../Resume";
import "./style.css";
import arrow from "../../icons/Vector.svg";

const Education = () => {
  const storedData = JSON.parse(localStorage.getItem("data"));

  const navigate = useNavigate();

  const [formCount, setFormCount] = useState(1);
  const [image, setImage] = useState({});
  const [data, setData] = useState({
    personalInfo: storedData.personalInfo,
    experience: storedData.experience,
    education: [
      {
        id: 1,
        institute: "",
        degree_id: "",
        due_date: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    if (storedData.education) {
      setData(storedData);
    }
  }, []);

  const handleChange = (e, id) => {
    const updatedForms = data.education.map((form) => {
      if (form.id === id) {
        return { ...form, [e.target.name]: e.target.value };
      }
      return form;
    });
    setData({ ...data, education: updatedForms });
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
  };

  const handleClick = () => {
    setFormCount(formCount + 1);
    setData({
      ...data,
      education: [
        ...data.education,
        {
          id: formCount + 1,
          institute: "",
          degree_id: "",
          due_date: "",
          description: "",
        },
      ],
    });
  };

  const removeData = () => {
    localStorage.removeItem("data");
  };

  const onSubmit = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.personalInfo.file);
    reader.onloadend = () => {
      setImage({
        image: URL.createObjectURL(data.personalInfo.file),
        userImage: reader.result,
      });
    };

    event.preventDefault();

    axios
      .post("https://resume.redberryinternship.ge/api/cvs", {
        name: data.personalInfo.firstname,
        surname: data.personalInfo.lastname,
        email: data.personalInfo.email,
        phone_number: data.personalInfo.phone,
        image: image.userImage,
        about_me: data.personalInfo.about,
        experiences: data.experience,
        educations: data.education,
      })
      .then(() => {
        navigate("/result");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onBack = () => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/experience");
  };

  return (
    <div className="grid-container">
      <div className="form-generator">
        <a href="/" className="icon" onClick={removeData}>
          <img src={arrow} alt="Your SVG" className="svg" />
        </a>
        <header className="form-header">
          <div className="header-content">
            <div className="header-text">???????????????????????????</div>
            <div>3/3</div>
          </div>
        </header>
        {data.education.map((form) => (
          <Form key={form.id} form={form} onChange={handleChange} />
        ))}
        <div className="content">
          <button className="add-button" onClick={handleClick}>
            ???????????? ???????????????????????????????????? ????????????????????????
          </button>
          <div className="buttons">
            <button className="back" onClick={onBack} type={"button"}>
              ????????????
            </button>
            <input
              className="submit"
              onClick={onSubmit}
              value={"???????????????????????????"}
              type="submit"
            />
          </div>
        </div>
      </div>
      <div className="resume">
        <Resume props={data} />
      </div>
    </div>
  );
};

const Form = ({ form, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    axios
      .get("https://resume.redberryinternship.ge/api/degrees")
      .then((response) => {
        setDegrees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <form action="" className="content">
      <div className="form-div form-content">
        <label htmlFor="institute" type="text">
          ???????????????????????????
        </label>
        <div>
          <input
            type="text"
            {...register("institute", {
              required: true,
              minLength: 2,
            })}
            onChange={(e) => onChange(e, form.id)}
            value={form.institute}
            placeholder="????????????????????????????????????"
          />
        </div>
        <p className="warning">????????????????????? 2 ?????????</p>
      </div>
      <div className="flex-container">
        <div className="form-div form-content">
          <label htmlFor="degree">?????????????????????</label>
          <select
            name="degree_id"
            onChange={(e) => onChange(e, form.id)}
            value={form.degree_id}
          >
            {degrees.map((option) => (
              <Fragment>
                <option value="????????????????????? ?????????????????????" hidden disabled>
                  ????????????????????? ?????????????????????
                </option>
                <option key={"option" + option.id} value={option.id}>
                  {option.title}
                </option>
              </Fragment>
            ))}
          </select>
        </div>
        <div className="form-div form-content">
          <label htmlFor="endDate">????????????????????????????????? ??????????????????</label>
          <input
            type="date"
            placeholder="mm / dd / yyyy"
            pattern="\d{2}/\d{2}/\d{4}"
            {...register("due_date", { required: true })}
            value={form.due_date}
            onChange={(e) => onChange(e, form.id)}
          />
        </div>
      </div>
      <div className="form-div form-content ">
        <label htmlFor="description">??????????????????</label>
        <textarea
          {...register("description", { required: true })}
          className="textbox"
          cols="30"
          rows="5"
          value={form.description}
          onChange={(e) => onChange(e, form.id)}
          placeholder="?????????????????????????????? ??????????????????"
        ></textarea>
      </div>
      <hr />
    </form>
  );
};

export default Education;
