import React from "react";

type HowItWorksProps = {
  step: string;
  desc: string;
  highlights: string[];
};

const HowItWorks = ({ step, desc, highlights }: HowItWorksProps) => {
  return (
    <div className="my-2 py-3 even:border-t even:border-b">
      <h3 className="text-xl font-bold">{step}</h3>
      <p className="my-2 italic">{desc}</p>
      <ul className="list-disc list-inside">
        {highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorks;
