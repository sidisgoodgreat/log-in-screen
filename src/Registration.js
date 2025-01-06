import React from 'react'
import './App.css';
import {useRef, useState, use, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Checks if the username is valid. Can be upper or lowercase, number,-,_ has to be between 3 and 23 characters
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;


const Registration = () => {
  const userRef = useRef();
  const errRef = useRef();
  //handles any errors

  const [user, setUser] = useState('');
  //Tied to user input
  const [validName, setValidName] = useState(false);
  //whether the name validates or not
  const [userFocus, setUserFocus] = useState(false);
  //wheter the user input is selected and ready to recieve the input

  //same thing but for password
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //same thing but for match password
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [gender, setGender] = useState('');

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result);
  }, [phone])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd, email, phone])

  return (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Registration</h1>
        <form>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={!validName && user ? "invalid" : "hide"} />
            </label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Has to be between 4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens are allowed.
            </p>
            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={!validPwd && pwd ? "invalid" : "hide"} />

            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={(!validMatch && matchPwd) ? "invalid" : "hide"} />     
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={!validEmail && email ? "invalid" : "hide"} />
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid email address.
            </p>

            <label htmlFor="phone">
              Phone Number:
              <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={!validPhone && phone ? "invalid" : "hide"} />
            </label>
            <input
              type="tel"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              aria-invalid={validPhone ? "false" : "true"}
              aria-describedby="phonenote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p id="phonenote" className={phoneFocus && !validPhone ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Please enter a valid phone number.<br />
               Format: (123) 456-7890 or 123-456-7890
            </p>

            <div className="gender-options">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                /> Male
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                /> Female
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                /> Other
              </label>
            </div>

            <div className="terms-container">
              <label>
                <input
                  type="checkbox"
                  required
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I accept the terms and conditions
              </label>
            </div>

            <label htmlFor="profile-image">
              Upload Image:
            </label>
            <input
              type="file"
              id="Profile Image"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}


            <button disabled={!validName || !validPwd || !validMatch || !validEmail || !validPhone || !termsAccepted}>
              Sign Up
            </button>
      </form>
    </section>
  )
}

export default Registration