/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from "react-hook-form";

import "./style.css";
import arrow from "../icons/Vector.svg";

const Personal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="grid-container">
        <div>
          <a href="#" className="icon" onClick={() => console.log("prev")}>
            <img src={arrow} alt="Your SVG" className="svg" />
          </a>
          <header>
            <div className="header-content">
              <div className="header-text">პირადი ინფო</div>
              <div>1/3</div>
            </div>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-first-row">
              <div className="form-div form-content">
                <label htmlFor="fname" type="text">
                  სახელი
                </label>
                <input
                  type="text"
                  {...register("firstname", {
                    required: true,
                    minLength: 2,
                    pattern: /[^a-z]/gi,
                  })}
                  placeholder="ანზორ"
                  className="Names"
                />
                <p className="warning">მინიმუმ 2 ასო, ქართული ასოები</p>
              </div>
              <div className="form-div form-content">
                <label htmlFor="lname" type="text">
                  გვარი
                </label>
                <input
                  type="text"
                  {...register("lastname", {
                    required: true,
                    minLength: 2,
                    pattern: /[^a-z]/gi,
                  })}
                  placeholder="მულაძე"
                  className="Names"
                />
                <p className="warning">მინიმუმ 2 ასო, ქართული ასოები</p>
              </div>
            </div>
            <div className="form-div">
              <label htmlFor="fupload" className="file-label">
                პირადი ფოტოს ატვირთვა
              </label>
              <input
                type="file"
                {...register("file", {
                  required: "სავალდებულოა ფოტოს ატვირთვა",
                })}
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
                    /([a-zA-Z0-9]+)([.{1}])?([a-zA-Z0-9]+)@redberry([.])ge/g,
                })}
                placeholder="anzor666@redberry.ge"
              />
              <p className="warning">უნდა მთავრდებოდეს @redberry.ge-ით</p>
            </div>
            <div className="form-div form-content">
              <label htmlFor="mobile">მობილურის ნომერი</label>
              <input
                type="tel"
                {...register("mobile", {
                  required: true,
                  pattern: /[+](995)?(79\d{7}|5\d{8})$/,
                })}
                placeholder="+995 551 12 34 56"
              />

              <p className="warning">
                უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს
              </p>
            </div>
            <input type="submit" value="შემდეგი" className="submit" />
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Personal;
