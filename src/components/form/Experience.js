import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import Resume from "../Resume";

import "./style.css";
import arrow from "../../icons/Vector.svg";

const Experience = () => {
  const storedData = JSON.parse(localStorage.getItem("data"));

  const navigate = useNavigate();

  const [formCount, setFormCount] = useState(1);
  const [data, setData] = useState({
    personalInfo: storedData.personalInfo,
    experience: [
      {
        id: 1,
        position: "",
        employer: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    if (storedData.experience) {
      setData(storedData);
    }
  }, []);

  const removeData = () => {
    localStorage.removeItem("data");
  };

  const handleClick = () => {
    setFormCount(formCount + 1);
    setData({
      ...data,
      experience: [
        ...data.experience,
        {
          id: formCount + 1,
          position: "",
          employer: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleChange = (e, id) => {
    const updatedForms = data.experience.map((form) => {
      if (form.id === id) {
        return { ...form, [e.target.name]: e.target.value };
      }
      return form;
    });
    setData({ ...data, experience: updatedForms });
    localStorage.setItem("data", JSON.stringify(data));
  };

  const onSubmit = () => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/education");
  };

  const onBack = () => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/personal-info");
  };

  return (
    <div className="grid-container">
      <div className="form-generator">
        <a href="/" className="icon" onClick={removeData}>
          <img src={arrow} alt="Your SVG" className="svg" />
        </a>
        <header className="form-header">
          <div className="header-content">
            <div className="header-text">გამოცდილება</div>
            <div>2/3</div>
          </div>
        </header>
        {data.experience.map((form) => (
          <Form key={form.id} form={form} onChange={handleChange} />
        ))}
        <div className="content">
          <button className="add-button" onClick={handleClick}>
            მეტი გამოცდილების დამატება
          </button>
          <div className="buttons">
            <button className="back" onClick={onBack} type={"button"}>
              უკან
            </button>
            <input
              className="submit"
              onClick={onSubmit}
              value={"შემდეგი"}
              type="submit"
            />
          </div>
        </div>
      </div>
      <Resume props={data} />
    </div>
  );
};

const Form = ({ form, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="content">
      <div className="form-div form-content">
        <label htmlFor="position" type="text">
          თანამდებობა
        </label>
        <div>
          <input
            type="text"
            {...register("position", {
              required: true,
              minLength: 2,
            })}
            onChange={(e) => onChange(e, form.id)}
            value={form.position}
            placeholder="დეველოპერი, დიზაინერი, ა."
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
      <div className="form-div form-content">
        <label htmlFor="employer" type="text">
          დამსაქმებელი
        </label>
        <div>
          <input
            type="text"
            {...register("employer", {
              required: true,
              minLength: 2,
            })}
            value={form.employer}
            onChange={(e) => onChange(e, form.id)}
            placeholder="დამსაქმებელი"
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
      <div className="flex-container">
        <div className="form-div form-content">
          <label htmlFor="startDate">დაწყების რიცხვი</label>
          <input
            type="date"
            placeholder="mm / dd / yyyy"
            pattern="\d{2}/\d{2}/\d{4}"
            {...register("startDate", { required: true })}
            value={form.startDate}
            onChange={(e) => onChange(e, form.id)}
          />
        </div>
        <div className="form-div form-content">
          <label htmlFor="startDate">დამთავრების რიცხვი</label>
          <input
            type="date"
            placeholder="mm / dd / yyyy"
            pattern="\d{2}/\d{2}/\d{4}"
            {...register("endDate", { required: true })}
            value={form.endDate}
            onChange={(e) => onChange(e, form.id)}
          />
        </div>
      </div>
      <div className="form-div form-content ">
        <label htmlFor="description">აღწერა</label>
        <textarea
          {...register("description", { required: true })}
          className="textbox"
          cols="30"
          rows="5"
          value={form.description}
          onChange={(e) => onChange(e, form.id)}
          placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        ></textarea>
      </div>
      <hr />
    </form>
  );
};

export default Experience;
