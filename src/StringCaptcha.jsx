import React, { useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export const StringCaptcha = ({ setIsCaptchaValid }) => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const newCaptcha = generateRandomString();
    setCorrectAnswer(newCaptcha);
    drawCaptcha(newCaptcha);
  }, []);

  const validationSchema = Yup.object({
    answer: Yup.string()
      .required("Captcha is required")
      .test(
        "is-correct",
        "Invalid CAPTCHA. Please check and re-enter the characters",
        (value) => value === correctAnswer
      ),
  });

  const drawCaptcha = (captcha) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const width = 200;
      const height = 50;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, width, height);
      captcha.split("").forEach((char, index) => {
        const fontSize = 30 + Math.random() * 10;
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = rainbowColors[index % rainbowColors.length];
        ctx.fillText(char, 20 + index * 30, 35 + Math.random() * 10);
      });
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateRandomString();
    setCorrectAnswer(newCaptcha);
    drawCaptcha(newCaptcha);
    setIsCaptchaValid(false);
  };

  return (
    <div className="string-captcha mt-4 p-4 border border-gray-300 rounded-lg relative">
      <Formik
        initialValues={{ answer: "" }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ handleSubmit, values }) => {
          useEffect(() => {
            setIsCaptchaValid(values.answer === correctAnswer);
          }, [values.answer, correctAnswer, setIsCaptchaValid]);
          return (
            <form onSubmit={handleSubmit}>
              <h4>Please enter the captcha shown in the image</h4>
              <div className="flex items-center gap-3 mt-4 mb-2">
                <canvas ref={canvasRef} className="border rounded h-11" />
                <div className="flex items-start gap-2">
                  <input
                    type="text"
                    id="answer"
                    name="answer"
                    className="border p-2 rounded"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="btn-primary"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

// Helper functions
const rainbowColors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];
const generateRandomString = () => Math.random().toString(36).substring(2, 8).toUpperCase();
