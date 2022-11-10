import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Alert, AlertTitle, TextField} from "@mui/material";
import {Collapse} from "react-bootstrap";
import {checkCorrectSyntax} from "../helper/expressionValidator";
import {toast} from "react-toastify";
import {evaluateTruthtable, TruthtableEvaluation} from "../helper/expressionEvaluator";
import Top from "../components/top";
import "./common.css";
import Main from "../components/main";
import Footer from "../components/footer";


function Layout() {
  const [open, setOpen] = useState(false);
  const [expression, setExpression] = useState('');
  const [evaluatedExpression, setEvaluatedExpression] = useState<TruthtableEvaluation>();
  const getEvaluation = () => {
    if (!checkCorrectSyntax(expression)) {
      toast.error('Der eingegebene Ausdruck enthält einen Fehler und kann nicht ausgewertet werden!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      const evaluated = evaluateTruthtable(expression);
      setEvaluatedExpression(evaluated);
    }
  };

  return (
      <div className="page">
        {/*top: include instructions for use and task text*/}
        <Top></Top>

        {/*main field*/}
        <Main></Main>

        {/* foot */}
        <Footer></Footer>
      </div>
  );
}

export default Layout;
