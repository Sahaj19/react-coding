import { useState } from "react";

function App() {
  // const [currentAccordionIndex, setCurrentAccordionIndex] = useState(null); // tracking one accordion at a time
  const [openIndices, setOpenIndices] = useState([]);                          // tracking multiple accordions at a time

  // accordion items
  const items = [
    {
      title: "What's the prerequisites of this course?",
      content: "A basic understanding of html, css & js will be fine.",
    },
    {
      title: "Can i get a job after completing this course?",
      content:
        "We don't promise anything, but if you work hard and complete this course with consistency. You will be ready.",
    },
    {
      title: "What if i don't like the course?",
      content: "There's a 7 day no-questions asked refund policy.",
    },
  ];

  // accordion open & close handler
  const handleAccordionState = (index) => {
    // setCurrentAccordionIndex(currentAccordionIndex === index ? null : index);
  
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((particularIndex) => particularIndex !== index) : [...prev, index]
    )
  }

  return (
    <div className="container">
      {items.length === 0
        ? "No items available"
        : items.map((item, index) => {
            return (
              <div className="accordion" key={index}>
                <h2 onClick={() => handleAccordionState(index)} >{item.title}</h2>
                {/* {currentAccordionIndex === index && <p>{item.content}</p>}  */}
                {openIndices.includes(index) && <p>{item.content}</p>}
              </div>
            );
          })}
    </div>
  );
}

export default App;
