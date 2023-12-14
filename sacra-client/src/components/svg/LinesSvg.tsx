import "./lines.css"
import React from "react";

export default function LinesSvg({
    className
}: {
    className?: string;
}) {
  return (
    <svg width="100%" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="0 0 1422 800" opacity="1">
        <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="oooscillate-grad">
                <stop stopColor="hsl(216, 86%, 75%)" stopOpacity="1" offset="0%"></stop>
                <stop stopColor="hsl(230, 55%, 70%)" stopOpacity="1" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g strokeWidth="4.5" stroke="url(#oooscillate-grad)" fill="none" strokeLinecap="round">
            <path d="M 0 462 Q 355.5 -5 711 400 Q 1066.5 805 1422 462" opacity="1.00" className="lines-1"></path>
            <path d="M 0 441 Q 355.5 -5 711 400 Q 1066.5 805 1422 441" opacity="0.95" className="lines-2"></path>
            <path d="M 0 420 Q 355.5 -5 711 400 Q 1066.5 805 1422 420" opacity="0.91" className="lines-3"></path>
            <path d="M 0 399 Q 355.5 -5 711 400 Q 1066.5 805 1422 399" opacity="0.86" className="lines-4"></path>
            <path d="M 0 378 Q 355.5 -5 711 400 Q 1066.5 805 1422 378" opacity="0.82" className="lines-5"></path>
            <path d="M 0 357 Q 355.5 -5 711 400 Q 1066.5 805 1422 357" opacity="0.77" className="lines-6"></path>
            <path d="M 0 336 Q 355.5 -5 711 400 Q 1066.5 805 1422 336" opacity="0.73" className="lines-7"></path>
            <path d="M 0 315 Q 355.5 -5 711 400 Q 1066.5 805 1422 315" opacity="0.68" className="lines-8"></path>
            <path d="M 0 294 Q 355.5 -5 711 400 Q 1066.5 805 1422 294" opacity="0.64" className="lines-9"></path>
            <path d="M 0 273 Q 355.5 -5 711 400 Q 1066.5 805 1422 273" opacity="0.59" className="lines-10"></path>
            <path d="M 0 252 Q 355.5 -5 711 400 Q 1066.5 805 1422 252" opacity="0.55" className="lines-11"></path>
            <path d="M 0 231 Q 355.5 -5 711 400 Q 1066.5 805 1422 231" opacity="0.50" className="lines-12"></path>
            <path d="M 0 210 Q 355.5 -5 711 400 Q 1066.5 805 1422 210" opacity="0.46" className="lines-13"></path>
            <path d="M 0 189 Q 355.5 -5 711 400 Q 1066.5 805 1422 189" opacity="0.41" className="lines-14"></path>
            <path d="M 0 168 Q 355.5 -5 711 400 Q 1066.5 805 1422 168" opacity="0.37" className="lines-15"></path>
            <path d="M 0 147 Q 355.5 -5 711 400 Q 1066.5 805 1422 147" opacity="0.32" className="lines-16"></path>
            <path d="M 0 126 Q 355.5 -5 711 400 Q 1066.5 805 1422 126" opacity="0.28" className="lines-17"></path>
            <path d="M 0 105 Q 355.5 -5 711 400 Q 1066.5 805 1422 105" opacity="0.23" className="lines-18"></path>
            <path d="M 0 84 Q 355.5 -5 711 400 Q 1066.5 805 1422 84" opacity="0.19" className="lines-19"></path>
            <path d="M 0 63 Q 355.5 -5 711 400 Q 1066.5 805 1422 63" opacity="0.14" className="lines-20"></path>
            <path d="M 0 42 Q 355.5 -5 711 400 Q 1066.5 805 1422 42" opacity="0.10" className="lines-21"></path>
        </g>
    </svg>
  );
}
